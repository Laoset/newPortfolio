import { describe, expect, test } from 'vitest';
import { parseChatMarkdown, safeChatHref } from '@/lib/chat-markdown';

describe('chat markdown', () => {
  test('turns a one-line numbered reply into a list with bold names', () => {
    const blocks = parseChatMarkdown(
      '1. **Puntospoint** (Santiago de Chile) - Mayo 2025 2. **Muvinai**'
    );
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe('ol');
    if (blocks[0].type !== 'ol') return;
    expect(blocks[0].items).toHaveLength(2);
    expect(blocks[0].items[0][0]).toEqual({
      type: 'bold',
      children: [{ type: 'text', value: 'Puntospoint' }]
    });
  });

  test('keeps real line breaks inside a paragraph', () => {
    const blocks = parseChatMarkdown('Hola\nKevin');
    expect(blocks[0]).toMatchObject({
      type: 'paragraph',
      lines: [
        [{ type: 'text', value: 'Hola' }],
        [{ type: 'text', value: 'Kevin' }]
      ]
    });
  });

  test('allows only http(s) links', () => {
    expect(safeChatHref('https://kevincorman.com')).toBe(
      'https://kevincorman.com/'
    );
    expect(safeChatHref('javascript:alert(1)')).toBeNull();

    const blocks = parseChatMarkdown(
      '[sitio](https://kevincorman.com) <script>alert(1)</script> [malo](javascript:alert(1))'
    );
    const paragraph = blocks[0];
    expect(paragraph.type).toBe('paragraph');
    if (paragraph.type !== 'paragraph') return;
    expect(paragraph.lines[0].some((node) => node.type === 'link')).toBe(true);
    expect(
      paragraph.lines[0].some(
        (node) => node.type === 'text' && node.value.includes('<script>')
      )
    ).toBe(true);
    expect(
      paragraph.lines[0].some(
        (node) => node.type === 'text' && node.value.includes('javascript:')
      )
    ).toBe(true);
  });
});
