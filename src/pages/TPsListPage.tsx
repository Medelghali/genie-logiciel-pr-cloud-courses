import { Link } from 'react-router-dom'
import { coursesByReference, tps } from '../content/contentStore'

export function TPsListPage() {
  return (
    <main className="max-w-screen-2xl mx-auto px-8 py-12 min-h-screen">
      <section className="mb-16">
        <h1 className="font-headline text-5xl md:text-6xl text-primary mb-4 leading-tight tracking-tight">
          Practical Assignments
        </h1>
        <p className="font-body text-lg text-secondary max-w-2xl">
          Browse all laboratory protocols and assignments across our curriculum.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tps.map((tp) => {
          const course = coursesByReference.get(tp.courseRef)
          return (
            <div
              key={tp.reference}
              className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col border border-slate-100 dark:border-slate-800"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="bg-primary-container text-on-primary-container px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                    TP
                  </span>
                </div>
                <h3 className="font-headline text-xl text-primary mb-3 leading-snug">{tp.title}</h3>
                {course && <p className="text-sm font-medium text-secondary mb-6">Course: {course.title}</p>}
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center mt-auto">
                  <span className="text-xs text-secondary italic">{tp.reference}</span>
                  <Link
                    to={`/tp/${tp.reference}`}
                    className="material-symbols-outlined text-primary cursor-pointer hover:translate-x-1 transition-transform"
                    aria-label={`View ${tp.title}`}
                  >
                    arrow_forward
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
        {tps.length === 0 && (
          <p className="text-secondary italic col-span-12">No practical assignments currently available.</p>
        )}
      </div>
    </main>
  )
}
