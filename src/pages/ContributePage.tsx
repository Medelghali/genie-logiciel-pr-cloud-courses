export function ContributePage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-64px)] font-sans text-[#1f1f1f]">
      {/* Fake Google Docs Toolbar (Desktop only)
      <div className="hidden md:flex bg-white border-b border-gray-200 px-4 py-2 gap-4 items-center sticky top-0 z-20 shadow-sm">
        <div className="flex bg-[#e8f0fe] p-2 rounded-full cursor-pointer" title="Docs Logo">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        </div>
        <div>
          <h1 className="text-[18px] text-gray-800 leading-tight">Contribution Guidelines  <span className="text-gray-400 text-xs ml-2">.docx</span></h1>
          <div className="text-[13px] text-gray-600 mt-0.5 flex gap-4 cursor-pointer">
            <span className="hover:bg-gray-100 px-1 rounded">File</span>
            <span className="hover:bg-gray-100 px-1 rounded">Edit</span>
            <span className="hover:bg-gray-100 px-1 rounded">View</span>
            <span className="hover:bg-gray-100 px-1 rounded">Insert</span>
            <span className="hover:bg-gray-100 px-1 rounded">Format</span>
            <span className="hover:bg-gray-100 px-1 rounded">Tools</span>
            <span className="hover:bg-gray-100 px-1 rounded">Help</span>
          </div>
        </div>
      </div>
      */}

      <div className="flex justify-center max-w-[1250px] mx-auto py-8 px-4 sm:px-8 gap-8">
        {/* Outline Sidebar */}
        <aside className="hidden xl:block w-56 shrink-0 sticky top-24 h-fit">
          <div className="text-gray-600 text-[13px] font-semibold uppercase tracking-wider mb-4 px-2">Outline</div>
          <nav className="flex flex-col gap-0.5 text-[14px] text-gray-700">
            <button onClick={() => scrollTo('title')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300">How to Contribute</button>
            <button onClick={() => scrollTo('overview')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300 ml-2">Overview</button>
            <button onClick={() => scrollTo('adding-course')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300 ml-2">1. Adding a Course</button>
            <button onClick={() => scrollTo('adding-tp')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300 ml-2">2. Adding a Practical Assignment</button>
            <button onClick={() => scrollTo('adding-exam')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300 ml-2">3. Adding an Exam</button>
            <button onClick={() => scrollTo('adding-markdown')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300 ml-2">4. Adding Markdown Content</button>
            <button onClick={() => scrollTo('rules')} className="hover:bg-gray-200/60 text-left px-2 py-1.5 rounded-l-full border-l-4 border-transparent hover:border-gray-300 ml-2">Quick Rules for Success</button>
          </nav>
        </aside>

        {/* The Page (A4) */}
        <main className="bg-white border border-[#dadce0] w-full max-w-[816px] mx-auto xl:mx-0 p-8 sm:p-16 md:p-[96px] shadow-[0_1px_3px_rgba(0,0,0,0.12)] shrink-0 min-h-[1056px]">
          <style>
            {`pre {
              background: #f1f3f4;
              color: #202124;
              padding: 16px;
              border-radius: 8px;
              font-family: 'Consolas', 'Monaco', monospace;
              font-size: 13px;
              border: 1px solid #dadce0;
              margin-bottom: 16px;
              overflow-x: auto;
            }
            code {
              font-family: 'Consolas', 'Monaco', monospace;
              background: #f1f3f4;
              padding: 2px 4px;
              border-radius: 4px;
              font-size: 0.9em;
              color: #d93025;
            }
            pre code {
              background: transparent;
              padding: 0;
              color: inherit;
            }
            .docs-h1 {
              font-family: 'Arial', sans-serif;
              font-size: 26pt;
              margin-bottom: 24pt;
              font-weight: 400;
              color: #000000;
            }
            .docs-h2 {
              font-family: 'Arial', sans-serif;
              font-size: 16pt;
              margin-top: 18pt;
              margin-bottom: 6pt;
              font-weight: 400;
              border-bottom: 1px solid #e2e2e2;
              padding-bottom: 4px;
              color: #000000;
            }
            .docs-p {
              font-family: 'Arial', sans-serif;
              font-size: 11pt;
              line-height: 1.5;
              color: #000000;
              margin-bottom: 11pt;
            }
            .docs-ul {
              font-family: 'Arial', sans-serif;
              font-size: 11pt;
              line-height: 1.5;
              color: #000000;
              margin-bottom: 11pt;
              list-style-type: disc;
              padding-left: 36pt;
            }
            .docs-ul li {
              margin-bottom: 4pt;
            }
            ::selection {
              background: #c2e7ff;
            }
            `}
          </style>

          <h1 id="title" className="docs-h1">How to Contribute Data Files</h1>

          <p className="docs-p text-[14pt] text-gray-700 font-semibold mb-8">
            Learn how to seamlessly add courses, practical works (TPs), and exams to the platform without touching the source code. Follow these instructions exactly to prevent errors during the build process.
          </p>

          <h2 id="overview" className="docs-h2">Overview</h2>
          <p className="docs-p">
            Content is completely decoupled from the application's source code (the <code>src/</code> directory). All data is managed via JSON and Markdown files located in the root <code>content/</code> directory. This setup is highly sensitive to syntax errors.
          </p>
          <p className="docs-p">
            The system automatically loads all content placed in these directories:
          </p>
          <ul className="docs-ul">
            <li><code>content/courses/*.json</code> – Course definitions</li>
            <li><code>content/tps/*.json</code> – Practical assignments (TPs) definitions</li>
            <li><code>content/exams/*.json</code> – Exams definitions</li>
            <li><code>content/markdown/*.md</code> – Page content (statements, instructions, etc.)</li>
          </ul>

          <h2 id="adding-course" className="docs-h2">1. Adding a Course</h2>
          <p className="docs-p">
            Create a JSON file in <code>content/courses/</code>. For example: <code>content/courses/react-intro.json</code>. Avoid trailing commas in the JSON.
          </p>
          <pre><code>{`{
  "type": "Course",
  "reference": "react-intro",
  "title": "Introduction to React",
  "introMarkdownRef": "react-intro-doc"
}`}</code></pre>
          <ul className="docs-ul">
            <li><strong>type</strong>: Must be exactly <code>Course</code>.</li>
            <li><strong>reference</strong>: A unique string ID for this course. Do not use spaces.</li>
            <li><strong>title</strong>: The readable title displayed on the website.</li>
            <li><strong>introMarkdownRef</strong> <em>(Optional)</em>: Points to a Markdown document reference for the course introduction.</li>
          </ul>

          <h2 id="adding-tp" className="docs-h2">2. Adding a Practical Assignment (TP)</h2>
          <p className="docs-p">
            Create a JSON file in <code>content/tps/</code>. For example: <code>content/tps/react-tp1.json</code>
          </p>
          <pre><code>{`{
  "type": "TP",
  "reference": "react-tp1",
  "courseRef": "react-intro",
  "title": "TP 1: Getting Started",
  "statementMarkdownRef": "react-tp1-doc"
}`}</code></pre>
          <ul className="docs-ul">
            <li><strong>type</strong>: Must be exactly <code>TP</code>.</li>
            <li><strong>reference</strong>: A unique ID for the TP.</li>
            <li><strong>courseRef</strong>: Connects this TP to an existing course reference (e.g. <code>react-intro</code>). <strong className="text-red-500">Must be exact.</strong></li>
            <li><strong>title</strong>: The name of the TP.</li>
            <li><strong>statementMarkdownRef</strong> <em>(Optional)</em>: Reference to the markdown file defining the assignment details.</li>
          </ul>

          <h2 id="adding-exam" className="docs-h2">3. Adding an Exam</h2>
          <p className="docs-p">
            Create a JSON file in <code>content/exams/</code>.
          </p>
          <pre><code>{`{
  "type": "Exam",
  "reference": "react-final-2023",
  "courseRef": "react-intro",
  "title": "Final Exam",
  "year": 2023,
  "statementMarkdownRef": "react-exam-2023-doc"
}`}</code></pre>
          <ul className="docs-ul">
            <li><strong>type</strong>: Must be exactly <code>Exam</code>.</li>
            <li><strong>year</strong>: Numeric year, without quotes (e.g., 2023).</li>
            <li><strong>courseRef</strong>: Connects to a specific course reference.</li>
          </ul>

          <h2 id="adding-markdown" className="docs-h2">4. Adding Markdown Content</h2>
          <p className="docs-p">
            To provide actual text content for the <code>introMarkdownRef</code> or <code>statementMarkdownRef</code> fields, create a Markdown file in <code>content/markdown/</code>.
          </p>
          <p className="docs-p font-bold text-[#d93025]">
            Important: This application uses a custom JSON frontmatter system requiring strict adherence.
          </p>
          <p className="docs-p">
            Your document must start with valid JSON, followed by exactly three hyphens (<code>---</code>) on a new line, and then the markdown content.
          </p>
          <pre><code>{`{
  "reference": "react-intro-doc",
  "is_pdf": false
}
---
# React Course Overview

Welcome to the course!`}</code></pre>
          <ul className="docs-ul">
            <li><strong>reference</strong>: This is the ID you use in the <code>...MarkdownRef</code> fields of JSON files. <br /><em>Note: If you omit the JSON frontmatter block entirely, the file name (without extension) will be used as the reference automatically.</em></li>
            <li><strong>is_pdf</strong>: Boolean flag to treat as PDF (optional). Do not quote the value.</li>
          </ul>

          <h2 id="rules" className="docs-h2">Quick Rules for Success</h2>
          <ul className="docs-ul">
            <li>You must <strong>restart the dev server</strong> after adding new metadata files, as Vite eager-loads them at build. Adding a new file without a restart will result in a 404 error temporarily.</li>
            <li>Ensure <code>reference</code> IDs are strictly unique across your content nodes. Duplicate IDs will overwrite previously loaded data.</li>
            <li>Ensure your JSON files are valid. Missing quotes or trailing commas will break the build.</li>
            <li>Link TPs and Exams securely via the exact <code>courseRef</code> attribute.</li>
          </ul>

        </main>
      </div>
    </div>
  )
}
