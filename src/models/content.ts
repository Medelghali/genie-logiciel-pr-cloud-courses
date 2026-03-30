export type Course = {
  type: 'Course'
  reference: string
  title: string
  introMarkdownRef?: string
}

export type TP = {
  type: 'TP'
  reference: string
  courseRef: string
  title: string
  statementMarkdownRef?: string
}

export type Exam = {
  type: 'Exam'
  reference: string
  courseRef: string
  title: string
  year: number
  statementMarkdownRef?: string
}

export type MarkdownDocument = {
  type?: string
  reference: string
  meta: unknown
  content: string
}

