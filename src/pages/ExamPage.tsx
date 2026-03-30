import { Link, useParams } from 'react-router-dom'
import { coursesByReference, markdownByReference, exams } from '../content/contentStore'
import { MarkdownRenderer } from '../ui/MarkdownRenderer'
import { GiscusComments } from '../ui/GiscusComments'

export function ExamPage() {
  const { reference } = useParams()
  const exam = reference ? exams.find((x) => x.reference === reference) : undefined
  const course = exam ? coursesByReference.get(exam.courseRef) : undefined
  const statement = exam?.statementMarkdownRef ? markdownByReference.get(exam.statementMarkdownRef) : undefined

  if (!exam || !course || !statement) {
    return (
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <h1 className="font-headline text-4xl text-primary mb-4">Exam not found</h1>
        <p className="text-secondary">
          <Link className="text-primary underline underline-offset-4" to={`/course/${exam?.courseRef ?? ''}`}>
            Return to course
          </Link>
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-screen-2xl mx-auto flex min-h-screen">
      <aside className="hidden lg:flex flex-col gap-y-2 p-6 bg-slate-50 dark:bg-slate-950 h-screen w-64 sticky top-20 border-r-0">
        <div className="mb-8">
          <h3 className="text-blue-900 dark:text-blue-300 font-sans text-sm font-bold uppercase tracking-wider">
            Evaluation Navigator
          </h3>
          <p className="text-xs text-slate-500 mt-1">Syllabus Exam Details</p>
        </div>
        <nav className="space-y-1">
          <Link
            to={`/course/${course.reference}#exams`}
            className="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1 transition-transform group"
          >
            <span className="material-symbols-outlined text-lg" data-icon="history_edu">
              history_edu
            </span>
            <span className="font-sans text-sm font-medium">All Exams</span>
          </Link>
          <Link
            to={`/course/${course.reference}`}
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-200 font-bold rounded-lg shadow-sm hover:translate-x-1 transition-transform"
          >
            <span className="material-symbols-outlined text-lg" data-icon="auto_stories">
              auto_stories
            </span>
            <span className="font-sans text-sm">Course Material</span>
          </Link>
        </nav>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-4 font-bold">Metadata</p>
          <ul className="space-y-4">
            <li className="border-l-2 border-primary pl-4">
              <span className="block text-xs font-bold text-primary">{exam.year}</span>
            </li>
            <li className="border-l-2 border-transparent pl-4 hover:border-slate-300 transition-colors">
              <span className="block text-xs text-secondary">{course.title}</span>
            </li>
          </ul>
        </div>
      </aside>

      <section className="flex-1 px-4 sm:px-6 md:px-12 py-6 sm:py-8 bg-surface">
        <nav className="flex flex-wrap items-center gap-2 mb-6 sm:mb-10 text-xs font-medium uppercase tracking-widest text-secondary/70">
          <Link className="hover:text-primary transition-colors" to={`/course/${course.reference}`}>
            {course.title}
          </Link>
          <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">
            chevron_right
          </span>
          <Link className="hover:text-primary transition-colors" to="/exams">
            Exams
          </Link>
          <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">
            chevron_right
          </span>
          <span className="text-primary font-bold">{exam.title}</span>
        </nav>

        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase">
                Examination {exam.year}
              </span>
              <span className="text-secondary/60 text-[10px] font-medium tracking-widest uppercase">
                REF: {exam.reference.toUpperCase()}
              </span>
            </div>
            <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-3xl">
              {exam.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 sm:gap-12">
          <article className="xl:col-span-8 max-w-[70ch]">
            <MarkdownRenderer markdown={statement.content} />
            <GiscusComments />
          </article>
        </div>
      </section>
    </main>
  )
}
