import React from 'react';
import { parseChatMarkdown, type ChatInline } from '@/lib/chat-markdown';

function InlineNodes({ nodes }: { nodes: ChatInline[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === 'text')
          return <React.Fragment key={index}>{node.value}</React.Fragment>;
        if (node.type === 'bold') {
          return (
            <strong key={index} className="font-semibold">
              <InlineNodes nodes={node.children} />
            </strong>
          );
        }
        return (
          <a
            key={index}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-words text-[#BB2649] underline underline-offset-2"
          >
            <InlineNodes nodes={node.children} />
          </a>
        );
      })}
    </>
  );
}

const ChatMarkdown = ({ text }: { text: string }) => {
  const blocks = parseChatMarkdown(text);

  return (
    <div className="space-y-2 leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === 'ul' || block.type === 'ol') {
          const List = block.type === 'ol' ? 'ol' : 'ul';
          return (
            <List
              key={index}
              className={`space-y-1 pl-4 ${
                block.type === 'ol' ? 'list-decimal' : 'list-disc'
              }`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineNodes nodes={item} />
                </li>
              ))}
            </List>
          );
        }

        return (
          <p key={index}>
            {block.lines.map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                <InlineNodes nodes={line} />
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default ChatMarkdown;
