import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function TopNavBar() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none docked full-width top-0 sticky z-50 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="font-serif italic text-2xl text-blue-950 dark:text-white tracking-tight">
            The Academic Editorial
          </span>
          <nav className="hidden md:flex items-center gap-6 font-serif text-blue-900 dark:text-blue-100">
            <Link
              className="text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-white transition-colors"
              to="/"
            >
              Course Catalog
            </Link>
            <Link 
              className="text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-white transition-colors" 
              to="/tps"
            >
              TPs
            </Link>
            <Link 
              className="text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-white transition-colors" 
              to="/exams"
            >
              Exams
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
              search
            </span>
            <input
              className="bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all"
              placeholder="Search archive..."
              type="text"
            />
          </div>
          <button 
            onClick={toggleTheme}
            title="Toggle theme"
            className="material-symbols-outlined text-blue-900 dark:text-blue-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md transition-all">
            {isDark ? 'light_mode' : 'dark_mode'}
          </button>
        </div>
      </div>
      <div className="bg-slate-200/50 dark:bg-slate-800/50 h-px w-full" />
    </header>
  )
}

