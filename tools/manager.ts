import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query: string): Promise<string> => new Promise(resolve => rl.question(query, resolve));

// Adjust if the structure is different, we assume content is at root
const CONTENT_DIR = path.resolve(process.cwd(), 'content');
const COURSES_DIR = path.join(CONTENT_DIR, 'courses');
const TPS_DIR = path.join(CONTENT_DIR, 'tps');
const EXAMS_DIR = path.join(CONTENT_DIR, 'exams');
const MARKDOWN_DIR = path.join(CONTENT_DIR, 'markdown');

function ensureDirectories() {
  const dirs = [CONTENT_DIR, COURSES_DIR, TPS_DIR, EXAMS_DIR, MARKDOWN_DIR];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

function getAvailableCourses(): { reference: string, title: string }[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  const files = fs.readdirSync(COURSES_DIR).filter(f => f.endsWith('.json'));
  const courses: { reference: string, title: string }[] = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(COURSES_DIR, f), 'utf-8');
      const obj = JSON.parse(content);
      if (obj && obj.reference) {
        courses.push({ reference: obj.reference, title: obj.title || obj.reference });
      }
    } catch (e) {
      // ignore parse errors for individual files
    }
  }
  return courses;
}

async function askCourseSelection(): Promise<string> {
  const courses = getAvailableCourses();
  if (courses.length === 0) {
    console.log('No existing courses found. Please type the course reference manually.');
    return await ask('Course Reference: ');
  }

  console.log('\nAvailable Courses:');
  courses.forEach((c, idx) => {
    console.log(`${idx + 1}. ${c.title} (${c.reference})`);
  });
  console.log(`${courses.length + 1}. [Type a custom reference]`);

  while (true) {
    const choiceStr = await ask(`Select a course (1-${courses.length + 1}): `);
    const choice = parseInt(choiceStr.trim(), 10);
    if (!isNaN(choice) && choice >= 1 && choice <= courses.length) {
      return courses[choice - 1].reference;
    } else if (choice === courses.length + 1) {
      return await ask('Enter custom Course Reference: ');
    } else {
      console.log('Invalid choice, please try again.');
    }
  }
}

async function main() {
  ensureDirectories();
  console.log('=================================');
  console.log('   Content Management CLI tool   ');
  console.log('=================================');
  console.log('1. Add a new Course');
  console.log('2. Add a new TP (Practical Work)');
  console.log('3. Add a new Exam');
  console.log('4. Add a standalone Markdown Document');
  console.log('5. Exit');
  
  const typeChoice = await ask('Choose an option (1-5): ');

  switch (typeChoice.trim()) {
    case '1':
      await createCourse();
      break;
    case '2':
      await createTP();
      break;
    case '3':
      await createExam();
      break;
    case '4':
      await createMarkdown();
      break;
    case '5':
      console.log('Exiting...');
      break;
    default:
      console.log('Invalid option. Exiting...');
  }

  rl.close();
}

async function askMarkdown(ref: string, defaultType: string) {
  const createMd = await ask(`\nCreate a markdown file for reference '${ref}'? (Y/n): `);
  if (createMd.trim().toLowerCase() !== 'n') {
    const filePath = path.join(MARKDOWN_DIR, `${ref}.md`);
    const content = `{
  "type": "${defaultType}",
  "reference": "${ref}"
}
---
# ${ref}

Add your markdown content here...
`;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`\x1b[32mCreated Markdown:\x1b[0m ${filePath}`);
    } else {
      console.log(`\x1b[33mFile already exists:\x1b[0m ${filePath}`);
    }
  }
}

async function createCourse() {
  console.log('\n--- Create a New Course ---');
  const reference = await ask('Course Reference (e.g., "python"): ');
  if (!reference) {
    console.log('Reference is required.');
    return;
  }
  const title = await ask('Title: ');
  const author = await ask('Author (optional): ');
  const introMarkdownRef = await ask(`Intro Markdown Ref (optional, default: "${reference}-intro"): `);

  const mdRef = introMarkdownRef.trim() || `${reference}-intro`;

  const obj: any = {
    type: 'Course',
    reference,
    title,
  };
  if (author.trim()) obj.author = author.trim();
  obj.introMarkdownRef = mdRef;

  const filePath = path.join(COURSES_DIR, `${reference}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf-8');
  console.log(`\x1b[32mCreated JSON:\x1b[0m ${filePath}`);

  await askMarkdown(mdRef, 'CourseIntro');
}

async function createTP() {
  console.log('\n--- Create a New TP ---');
  const reference = await ask('TP Reference (e.g., "python-tp1"): ');
  if (!reference) {
    console.log('Reference is required.');
    return;
  }
  const courseRef = await askCourseSelection();
  const title = await ask('Title: ');
  const statementMarkdownRef = await ask(`Statement Markdown Ref (optional, default: "${reference}"): `);

  const mdRef = statementMarkdownRef.trim() || reference;

  const obj: any = {
    type: 'TP',
    reference,
    courseRef,
    title,
    statementMarkdownRef: mdRef,
  };

  const filePath = path.join(TPS_DIR, `${reference}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf-8');
  console.log(`\x1b[32mCreated JSON:\x1b[0m ${filePath}`);

  await askMarkdown(mdRef, 'TPStatement');
}

async function createExam() {
  console.log('\n--- Create a New Exam ---');
  const reference = await ask('Exam Reference (e.g., "python-2025"): ');
  if (!reference) {
    console.log('Reference is required.');
    return;
  }
  const courseRef = await askCourseSelection();
  const title = await ask('Title: ');
  const currentYear = new Date().getFullYear();
  const yearStr = await ask(`Year (default: ${currentYear}): `);
  const statementMarkdownRef = await ask(`Statement Markdown Ref (optional, default: "${reference}"): `);

  const mdRef = statementMarkdownRef.trim() || reference;

  const obj: any = {
    type: 'Exam',
    reference,
    courseRef,
    title,
    year: parseInt(yearStr, 10) || currentYear,
    statementMarkdownRef: mdRef,
  };

  const filePath = path.join(EXAMS_DIR, `${reference}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf-8');
  console.log(`\x1b[32mCreated JSON:\x1b[0m ${filePath}`);

  await askMarkdown(mdRef, 'ExamStatement');
}

async function createMarkdown() {
  console.log('\n--- Create a Standalone Markdown Document ---');
  const reference = await ask('Reference (e.g., "about-us"): ');
  if (!reference) {
    console.log('Reference is required.');
    return;
  }
  const type = await ask('Type (optional, default: "Document"): ');
  const mdType = type.trim() || 'Document';
  await askMarkdown(reference, mdType);
}

main().catch(console.error);