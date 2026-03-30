import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CoursePage } from './pages/CoursePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Footer } from './layout/Footer'
import { TopNavBar } from './layout/TopNavBar'
import { TPPage } from './pages/TPPage'
import { TPsListPage } from './pages/TPsListPage'
import { ExamsListPage } from './pages/ExamsListPage'
import { ExamPage } from './pages/ExamPage'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <TopNavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:reference" element={<CoursePage />} />
            <Route path="/tp/:reference" element={<TPPage />} />
            <Route path="/tps" element={<TPsListPage />} />
            <Route path="/exam/:reference" element={<ExamPage />} />
            <Route path="/exams" element={<ExamsListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

