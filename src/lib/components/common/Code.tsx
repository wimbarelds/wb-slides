import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import xml from 'react-syntax-highlighter/dist/esm/languages/prism/xml-doc';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { MarkDown } from './Markdown';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('xml', xml);

interface CodeProps {
  code: string;
  title?: string;
}

function removeNoCheck(str: string) {
  const lines = str
    .replace(/\r/g, '')
    .split('\n')
    .filter((line) => line.trim() !== '// @ts-nocheck');

  const start = lines.findIndex((line) => line.trim());
  const end = lines
    .slice()
    .reverse()
    .findIndex((line) => line.trim());

  return lines.slice(start, end ? end * -1 : lines.length).join('\n');
}

export function Code({ code, title }: CodeProps) {
  const content = (
    <div className="not-prose">
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} children={removeNoCheck(code)} />
    </div>
  );
  if (!title) return content;
  return (
    <>
      <div className="mb-6">
        <MarkDown content={`## ${title}`} />
      </div>
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} children={removeNoCheck(code)} />
    </>
  );
}
