import { useState, useEffect, useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import mermaid from 'mermaid'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import 'katex/dist/katex.min.css'

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  themeVariables: {
    fontSize: '16px'
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true
  }
})

function MermaidChart({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({ startOnLoad: true, theme: 'default' })
      mermaid.render(`mermaid-${Date.now()}`, code).then(({ svg }) => {
        ref.current!.innerHTML = svg
      })
    }
  }, [code])

  return <div ref={ref} />
}

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isDark
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [text])
  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      style={{
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        background: 'rgba(128,128,128,0.25)',
        border: '1px solid rgba(128,128,128,0.3)',
        borderRadius: '4px',
        color: 'inherit',
        cursor: 'pointer',
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        opacity: 0.6,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

export function MarkdownRenderer({ markdown, className }: { markdown: string; className?: string }) {
  const isDark = useIsDarkMode()

  // remark-math handles $ and $$ delimiters by default, so we convert \[...\] and \(...\) to match
  const processedMarkdown = markdown
    .replace(/\\\[/g, '$$$$')
    .replace(/\\\]/g, '$$$$')
    .replace(/\\\(/g, '$')
    .replace(/\\\)/g, '$')

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            code({ className: codeClassName, children, ...props }) {
              const match = /language-(\w+)/.exec(codeClassName || '')
              const codeString = String(children).replace(/\n$/, '')

              if (match) {
                if (match[1] === 'mermaid') {
                  return <div style={{ width: '100%', overflowX: 'auto' }}><MermaidChart code={codeString} /></div>
                }
                return (
                  <div style={{ position: 'relative' }}>
                    <CopyButton text={codeString} />
                    <SyntaxHighlighter
                      style={isDark ? oneDark : oneLight}
                      language={match[1]}
                      PreTag="div"
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                )
              }

              return (
                <code className={codeClassName} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {processedMarkdown}
        </ReactMarkdown>
      </div>
    </>
  )
}
