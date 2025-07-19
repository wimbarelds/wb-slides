import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkDownProps {
  content: string;
}

function LinkRenderer(props: { href?: string; children?: ReactNode; className?: string }) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer" className={props.className}>
      {props.children}
    </a>
  );
}

export function MarkDown({ content }: MarkDownProps) {
  return (
    <ReactMarkdown components={{ a: LinkRenderer }} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
