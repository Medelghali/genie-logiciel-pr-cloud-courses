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
        repo="placeholder/repo"
        repoId="placeholder_id"
        category="Announcements"
        categoryId="placeholder_category_id"
        mapping="pathname"
        term="Comments"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  )
}
