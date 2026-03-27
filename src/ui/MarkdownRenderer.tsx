import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

export function MarkdownRenderer({ markdown, className }: { markdown: string; className?: string }) {
  // remark-math handles $ and $$ delimiters by default, so we convert \[...\] and \(...\) to match
  const processedMarkdown = markdown
    .replace(/\\\[/g, '$$$$')
    .replace(/\\\]/g, '$$$$')
    .replace(/\\\(/g, '$')
    .replace(/\\\)/g, '$');

  return (
    <>
      <style>
        {`
      .markdown-body img {
        display: block;
        margin: 0 auto;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      `}
      </style>
      <div className={className ? `markdown-body ${className}` : 'markdown-body'}>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{processedMarkdown}</ReactMarkdown>
      </div>
    </>
  )
}

