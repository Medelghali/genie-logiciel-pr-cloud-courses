import { Link, useParams } from 'react-router-dom'
import { coursesByReference, markdownByReference, tps } from '../content/contentStore'
import { MarkdownRenderer } from '../ui/MarkdownRenderer'
import { GiscusComments } from '../ui/GiscusComments'

export function TPPage() {
  const { reference } = useParams()
  const tp = reference ? tps.find((x) => x.reference === reference) : undefined
  const course = tp ? coursesByReference.get(tp.courseRef) : undefined
  const statement = tp?.statementMarkdownRef ? markdownByReference.get(tp.statementMarkdownRef) : undefined

  if (!tp || !course || !statement) {
    return (
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <h1 className="font-headline text-4xl text-primary mb-4">TP introuvable</h1>
        <p className="text-secondary">
          <Link className="text-primary underline underline-offset-4" to={`/course/${tp?.courseRef ?? ''}`}>
            Retour au cours
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
            Course Navigator
          </h3>
          <p className="text-xs text-slate-500 mt-1">Current Module Resources</p>
        </div>
        <nav className="space-y-1">
          <Link
            to={`/course/${course.reference}#related-tps`}
            className="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1 transition-transform group"
          >
            <span className="material-symbols-outlined text-lg" data-icon="menu_book">
              menu_book
            </span>
            <span className="font-sans text-sm font-medium">Related TPs</span>
          </Link>
          <Link
            to={`/course/${course.reference}#content`}
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-200 font-bold rounded-lg shadow-sm hover:translate-x-1 transition-transform"
          >
            <span className="material-symbols-outlined text-lg" data-icon="assignment">
              assignment
            </span>
            <span className="font-sans text-sm">Lesson Content</span>
          </Link>
        </nav>

        {/*<div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-4 font-bold">In this Section</p>
          <ul className="space-y-4">
            <li className="border-l-2 border-primary pl-4">
              <span className="block text-xs font-bold text-primary">01. Executive Overview</span>
            </li>
            <li className="border-l-2 border-transparent pl-4 hover:border-slate-300 transition-colors">
              <span className="block text-xs text-secondary">02. Methodology</span>
            </li>
            <li className="border-l-2 border-transparent pl-4 hover:border-slate-300 transition-colors">
              <span className="block text-xs text-secondary">03. Requirements</span>
            </li>
          </ul>
        </div>*/}
      </aside>

      <section className="flex-1 px-4 sm:px-6 md:px-12 py-6 sm:py-8 bg-surface">
        <nav className="flex flex-wrap items-center gap-2 mb-6 sm:mb-10 text-xs font-medium uppercase tracking-widest text-secondary/70">
          <Link className="hover:text-primary transition-colors" to={`/course/${course.reference}`}>
            {course.title}
          </Link>
          <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">
            chevron_right
          </span>
          <span className="text-primary font-bold">{tp.title}</span>
        </nav>

        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase">
                Practical Assignment
              </span>
              <span className="text-secondary/60 text-[10px] font-medium tracking-widest uppercase">
                REF: {tp.reference.toUpperCase()}
              </span>
            </div>
            <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-3xl">
              {tp.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container-high text-primary rounded-lg text-sm font-medium transition-all">
              <span className="material-symbols-outlined text-lg" data-icon="download">
                download
              </span>
              PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg" data-icon="share">
                share
              </span>
              Reference
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 sm:gap-12">
          <article className="xl:col-span-8 max-w-[70ch]">
            <MarkdownRenderer markdown={statement.content} />
            <GiscusComments />
          </article>

          <aside className="xl:col-span-4 space-y-8">
            {/*<div className="bg-surface-container-low p-8 rounded-xl">
              <h4 className="font-bold text-primary text-sm uppercase tracking-widest mb-4">Further Reading</h4>
              <ul className="space-y-4">
                <li>
                  <Link className="group" to={`/course/${course.reference}`}>
                    <span className="block text-sm font-semibold text-primary group-hover:text-blue-700 transition-colors">
                      Scholarly Guidelines: Course Notes
                    </span>
                    <span className="text-xs text-secondary/70">Archive Reference #000</span>
                  </Link>
                </li>
                <li>
                  <a className="group" href="#">
                    <span className="block text-sm font-semibold text-primary group-hover:text-blue-700 transition-colors">
                      University Press: TP Companion
                    </span>
                    <span className="text-xs text-secondary/70">Archive Reference #001</span>
                  </a>
                </li>
              </ul>
            </div>*/}
          </aside>
        </div>
      </section>
    </main>
  )
}

