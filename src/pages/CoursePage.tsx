import { Link, useParams } from 'react-router-dom'
import { coursesByReference, markdownByReference, tps } from '../content/contentStore'
import { MarkdownRenderer } from '../ui/MarkdownRenderer'

export function CoursePage() {
  const { reference } = useParams()
  const course = reference ? coursesByReference.get(reference) : undefined

  if (!course) {
    return (
      <main className="max-w-screen-2xl mx-auto px-8 py-12">
        <h1 className="font-headline text-4xl text-primary mb-4">Cours introuvable</h1>
        <p className="text-secondary">
          <Link className="text-primary underline underline-offset-4" to="/">
            Retour à la liste
          </Link>
        </p>
      </main>
    )
  }

  const introDoc = course.introMarkdownRef ? markdownByReference.get(course.introMarkdownRef) : undefined

  const courseTPs = tps
    .filter((tp) => tp.courseRef === course.reference)
    .sort((a, b) => a.title.localeCompare(b.title, 'fr'))

  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
      <nav className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8 text-xs uppercase tracking-widest text-secondary">
        <Link className="hover:text-primary" to="/">
          Catalog
        </Link>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="text-on-surface font-semibold">{course.reference}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <aside className="hidden lg:flex flex-col gap-y-2 p-6 bg-slate-50 dark:bg-slate-950 h-screen w-64 sticky top-24 border-r-0 font-sans text-sm font-medium text-blue-900 dark:text-blue-300">
          <div className="mb-6">
            <h3 className="text-lg font-headline font-bold text-on-background">Course Navigator</h3>
            <p className="text-xs text-secondary font-normal italic">Current Module Resources</p>
          </div>
          <nav className="space-y-1">
            <a
              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-200 font-bold rounded-lg shadow-sm hover:translate-x-1 transition-transform Active: scale-95 duration-150"
              href="#related-tps"
            >
              <span className="material-symbols-outlined" data-icon="assignment">
                assignment
              </span>
              Related TPs
            </a>
            <a
              className="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1 transition-transform"
              href="#exams"
            >
              <span className="material-symbols-outlined" data-icon="quiz">
                quiz
              </span>
              Exams
            </a>
            <a
              className="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1 transition-transform"
              href="#content"
            >
              <span className="material-symbols-outlined" data-icon="menu_book">
                menu_book
              </span>
              Lesson Content
            </a>
          </nav>
          <div className="mt-auto pt-8 border-t border-outline-variant/20">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-[10px] uppercase tracking-tighter mb-2 opacity-60">Faculty Contact</p>
              <p className="text-xs font-bold">Prof. Editorial Team</p>
              <p className="text-[10px] font-normal text-secondary">contact@example.com</p>
            </div>
          </div>
        </aside>

        <div className="flex-1 max-w-4xl">
          <section className="mb-12">
            <div className="relative rounded-xl overflow-hidden mb-8 h-48 sm:h-64 bg-primary-container">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-fixed text-[10px] font-bold tracking-widest rounded-full mb-4 w-fit">
                  {course.reference} • Module
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold text-white tracking-tight leading-tight">
                  {course.title}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-surface-container-lowest rounded-xl shadow-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Lead Professor</p>
                <p className="text-sm font-bold text-primary">Editorial Team</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Author</p>
                <p className="text-sm font-bold text-primary">Scholarly Press</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Last Update</p>
                <p className="text-sm font-bold text-primary">—</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Language</p>
                <p className="text-sm font-bold text-primary">French</p>
              </div>
            </div>
          </section>

          <section className="mb-16" id="content">
            <h2 className="text-2xl font-headline font-bold mb-6 text-primary flex items-center gap-2">
              Introduction
            </h2>

            {introDoc ? (
              <div className="serif-text text-lg leading-relaxed text-on-surface space-y-4 max-w-[65ch]">
                <MarkdownRenderer markdown={introDoc.content} />
              </div>
            ) : (
              <p className="opacity-85">Aucun contenu d'introduction n'a été trouvé pour cette référence.</p>
            )}

            <div className="mt-8 border-l-2 border-surface-tint bg-surface-container-low p-6 rounded-r-lg italic serif-text text-on-surface-variant">
              "The beauty of higher-order calculus lies not in the numbers, but in the elegant structure of the
              space they define." — <span className="font-bold not-italic">Archive Foreword</span>
            </div>
          </section>

          <section className="mb-16" id="related-tps">
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 mb-8">
              <h2 className="text-2xl font-headline font-bold text-primary">Assigned Practical Works (TPs)</h2>
              <span className="text-xs uppercase tracking-widest text-secondary">Ordered by Sequence</span>
            </div>

            {courseTPs.length === 0 ? (
              <p className="opacity-85">Pas de TP pour ce cours (encore).</p>
            ) : (
              <div className="space-y-4">
                {courseTPs.map((tp, idx) => {
                  const num = String(idx + 1).padStart(2, '0')

                  return (
                    <div key={tp.reference} id={tp.reference}>
                      <Link
                        to={`/tp/${tp.reference}`}
                        className="group flex items-center gap-6 p-4 bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition-all cursor-pointer"
                      >
                        <div className="w-12 h-12 flex items-center justify-center bg-primary-container text-on-primary-container rounded font-headline text-xl font-bold">
                          {num}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-primary group-hover:text-primary transition-colors">{tp.title}</h3>
                          <p className="text-xs text-secondary">{tp.reference}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-on-secondary-container bg-secondary-container px-2 py-1 rounded-full uppercase">
                            Pending
                          </span>
                          <span className="material-symbols-outlined text-slate-300">download</span>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          <section className="mb-16" id="exams">
            <h2 className="text-2xl font-headline font-bold mb-8 text-primary">Examination Archive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-surface-container-lowest border border-outline-variant/10 rounded-xl hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-md text-[10px] font-bold">— EDITION</div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">file_present</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-primary mb-2">No exams yet</h3>
                <p className="text-xs text-secondary leading-relaxed mb-6">
                  Add `content/exams/*.json` later, then render them here.
                </p>
                <button className="w-full py-2 bg-slate-100 text-primary text-[10px] font-bold uppercase tracking-widest rounded hover:bg-primary hover:text-white transition-colors">
                  View Resource
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

