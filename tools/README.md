# Content Manager Tool

This directory contains `manager.ts`, an interactive CLI tool designed to reduce errors and boilerplate when creating new content (Courses, TPs, Exams, and Markdown Documents).

## Prerequisites
Make sure `tsx` is installed and you are running the tool in the context of your repository.

## Usage

You can run the script using npm:

```bash
npm run manager
```

Or you can run it directly via `tsx` if installed globally/locally:

```bash
npx tsx tools/manager.ts
```

### Features

The CLI is interactive and will prompt you to choose an action:
1. **Add a new Course**: 
   - Prompts for `reference`, `title`, `author`, and an `introMarkdownRef`.
   - Generates a `content/courses/<reference>.json` file.
   - Optionally scaffolds a markdown file with JSON frontmatter at `content/markdown/<introMarkdownRef>.md`.
2. **Add a new TP**:
   - Prompts for `reference`, `courseRef`, `title`, and `statementMarkdownRef`.
   - Generates a `content/tps/<reference>.json` file.
   - Optionally scaffolds a markdown file for the statement.
3. **Add a new Exam**:
   - Prompts for `reference`, `courseRef`, `title`, `year`, and `statementMarkdownRef`.
   - Generates a `content/exams/<reference>.json` file.
   - Optionally scaffolds a markdown file for the statement.
4. **Add a standalone Markdown Document**:
   - Directly creates a markdown document with the correct JSON frontmatter.

### Why this tool?

Adding content manually often leads to issues like:
- Invalid JSON frontmatter formatting in `.md` files.
- Forgetting to link a Course, TP, or Exam `.json` file to its corresponding `.md` file reference.
- Missing required fields according to `src/models/content.ts` and `src/content/contentStore.ts`.

By using this tool, references are automatically tied together, and the JSON frontmatter block in your markdown files is correctly injected.
