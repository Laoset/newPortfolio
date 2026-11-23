export type ChatInline =
  | { type: 'text'; value: string }
  | { type: 'bold'; children: ChatInline[] }
  | { type: 'link'; href: string; children: ChatInline[] };

export type ChatBlock =
  | { type: 'paragraph'; lines: ChatInline[][] }
  | { type: 'ul'; items: ChatInline[][] }
  | { type: 'ol'; items: ChatInline[][] };

export function safeChatHref(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.href;
  } catch {
    return null;
  }
  return null;
}

export function normalizeChatMarkdown(source: string) {
  return source
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/([^\n])\s+(\d+)\.\s+/g, '$1\n$2. ')
    .replace(/([^\n])\s+[-*]\s+\*\*/g, '$1\n- **');
}

function parseInlines(input: string): ChatInline[] {
  const nodes: ChatInline[] = [];
  let text = '';
  let index = 0;

  const flush = () => {
    if (!text) return;
    nodes.push({ type: 'text', value: text });
    text = '';
  };

  while (index < input.length) {
    if (input.startsWith('**', index)) {
      const end = input.indexOf('**', index + 2);
      if (end !== -1) {
        flush();
        nodes.push({
          type: 'bold',
          children: parseInlines(input.slice(index + 2, end))
        });
        index = end + 2;
        continue;
      }
    }

    if (input[index] === '[') {
      const labelEnd = input.indexOf('](', index + 1);
      const hrefEnd = labelEnd === -1 ? -1 : input.indexOf(')', labelEnd + 2);
      if (labelEnd !== -1 && hrefEnd !== -1) {
        const href = safeChatHref(input.slice(labelEnd + 2, hrefEnd).trim());
        if (href) {
          flush();
          nodes.push({
            type: 'link',
            href,
            children: parseInlines(input.slice(index + 1, labelEnd))
          });
          index = hrefEnd + 1;
          continue;
        }
      }
    }

    text += input[index];
    index += 1;
  }

  flush();
  return nodes;
}

export function parseChatMarkdown(source: string): ChatBlock[] {
  const lines = normalizeChatMarkdown(source).split('\n');
  const blocks: ChatBlock[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({
      type: 'paragraph',
      lines: paragraph.map(parseInlines)
    });
    paragraph = [];
  };

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const ordered = /^(\d+)\.\s+(.*)$/.exec(line);
    const unordered = /^[-*]\s+(.*)$/.exec(line);

    if (ordered || unordered) {
      flushParagraph();
      const items: string[] = [];
      const isOrdered = Boolean(ordered);
      while (index < lines.length) {
        const current = lines[index];
        const match = isOrdered
          ? /^(\d+)\.\s+(.*)$/.exec(current)
          : /^[-*]\s+(.*)$/.exec(current);
        if (!match) break;
        items.push(isOrdered ? match[2] : match[1]);
        index += 1;
      }
      blocks.push({
        type: isOrdered ? 'ol' : 'ul',
        items: items.map(parseInlines)
      });
      continue;
    }

    if (line.trim() === '') {
      flushParagraph();
      index += 1;
      continue;
    }

    paragraph.push(line);
    index += 1;
  }

  flushParagraph();
  return blocks;
}
