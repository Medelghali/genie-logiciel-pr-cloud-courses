import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function TopNavBar() {
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none docked full-width top-0 sticky z-50 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center w-full px-4 sm:px-8 py-3 sm:py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className="font-serif italic text-lg sm:text-2xl text-blue-950 dark:text-white tracking-tight">
            Software Engineering
          </Link>
          {/* Desktop nav */}
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
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
              search
            </span>
            <input
              className="bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 w-48 lg:w-64 transition-all"
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
          {/* Hamburger menu button - mobile only */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden material-symbols-outlined text-blue-900 dark:text-blue-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-1 animate-[slideDown_200ms_ease-out]">
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
            to="/"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Course Catalog
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
            to="/tps"
          >
            <span className="material-symbols-outlined text-lg">assignment</span>
            TPs
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
            to="/exams"
          >
            <span className="material-symbols-outlined text-lg">quiz</span>
            Exams
          </Link>
          {/* Mobile search */}
          <div className="sm:hidden relative mt-2 px-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
              search
            </span>
            <input
              className="w-full bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Search archive..."
              type="text"
            />
          </div>
        </nav>
      )}

      <div className="bg-slate-200/50 dark:bg-slate-800/50 h-px w-full" />
    </header>
  )
}
