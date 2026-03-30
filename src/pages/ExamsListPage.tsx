import { Link } from 'react-router-dom'
import { exams } from '../content/contentStore'

export function ExamsListPage() {
  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12 min-h-screen">
      <section className="mb-16">
        <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl text-primary mb-4 leading-tight tracking-tight">
          Examinations
        </h1>
        <p className="font-body text-lg text-secondary max-w-2xl">
          Upcoming and archived assessments for all courses.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.length > 0 ? (
          exams.map((exam: any, idx) => (
             <Link key={idx} to={`/exam/${exam.reference}`} className="block group">
               <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 transition-colors group-hover:bg-surface-variant group-hover:border-primary">
                 <h3 className="font-headline text-xl text-primary group-hover:text-blue-700">{exam?.title || 'Exam'}</h3>
                 {exam.year && <p className="text-secondary mt-2 text-sm">{exam.year}</p>}
               </div>
             </Link>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-surface-container-lowest rounded-lg border border-dashed border-outline-variant">
             <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-4 block">event_busy</span>
             <h3 className="text-primary font-headline text-xl mb-2">No Scheduled Exams</h3>
             <p className="text-secondary text-sm">There are no upcoming or archived exams available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  )
}
