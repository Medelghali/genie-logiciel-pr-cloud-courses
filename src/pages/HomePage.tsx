import { Link } from 'react-router-dom'
import { coursesByReference } from '../content/contentStore'

export function HomePage() {
  const courses = Array.from(coursesByReference.values()).sort((a, b) => a.title.localeCompare(b.title, 'fr'))

  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      <section className="mb-16 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-8">
          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl text-primary mb-4 leading-tight tracking-tight">
            Software Engineering for <br />
            <span className="italic text-surface-tint">Cloud computing</span>
          </h1>
          <p className="font-body text-base sm:text-lg text-secondary max-w-2xl">
            Build, deploy, and scale applications using cutting-edge cloud technologies, modern architectures, and industry best practices.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-wrap justify-start md:justify-end gap-3 pb-2">
          <div className="flex items-center gap-2 bg-secondary-container px-4 py-2 rounded-full text-on-secondary-container text-xs font-semibold tracking-wider uppercase">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            <span>Filter Catalog</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full text-secondary text-xs font-semibold tracking-wider uppercase border border-outline-variant/20">
            <span>Sort by: Latest</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, idx) => {
          const isFeatured = idx === 0
          if (isFeatured) {
            return (
              <div
                key={course.reference}
                className="lg:col-span-2 group relative bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[21/9] w-full overflow-hidden bg-primary-container relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute inset-0">
                    <div className="h-full w-full opacity-60 bg-gradient-to-br from-primary to-primary-fixed-dim" />
                  </div>
                  <div className="absolute bottom-6 left-8">
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm mb-2 inline-block">
                      Featured Discipline
                    </span>
                    <h2 className="font-headline text-3xl text-white">{course.title}</h2>
                  </div>
                </div>
                <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Author</p>
                    <p className="font-headline text-lg text-primary">Editorial Team</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                      Professor
                    </p>
                    <p className="font-headline text-lg text-primary">TBD</p>
                  </div>
                  <div className="sm:col-span-2 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <span className="text-xs text-secondary font-medium italic">Ref: {course.reference}</span>
                    <Link
                      to={`/course/${course.reference}`}
                      className="bg-primary text-on-primary px-6 py-2 rounded text-sm font-semibold hover:brightness-110 transition-all"
                    >
                      View Module
                    </Link>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={course.reference}
              className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="aspect-video w-full bg-slate-200">
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary-fixed-dim opacity-30" />
              </div>
              <div className="p-6">
                <h3 className="font-headline text-xl text-primary mb-4 leading-snug">{course.title}</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Author</span>
                    <span className="text-sm font-medium text-secondary">Editorial Board</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Professor</span>
                    <span className="text-sm font-medium text-secondary">TBD</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-secondary italic">{course.reference}</span>
                  <Link
                    to={`/course/${course.reference}`}
                    className="material-symbols-outlined text-primary cursor-pointer hover:translate-x-1 transition-transform"
                    aria-label={`View ${course.title}`}
                  >
                    arrow_forward
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

     
    </main>
  )
}

