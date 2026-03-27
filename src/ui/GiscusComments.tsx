import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'

export function GiscusComments() {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
      <Giscus
        id="comments"
        repo="Medelghali/genie-logiciel-pr-cloud-courses"
        repoId="R_kgDORxcjtQ"
        category="Q&A"
        categoryId="DIC_kwDORxcjtc4C5ZwS"
        mapping="pathname"
        term="Comments"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="fr"
        loading="lazy"
      />
    </div>
  )
}
