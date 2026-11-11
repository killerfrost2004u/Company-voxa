import { useState } from 'react'

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\u0621-\u064A\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/^-+|-+$/g, '') || `section-${Math.random().toString(36).slice(2, 7)}`
  )
}

/**
 * Parses markdown content and extracts H2 and H3 headings for the TOC
 */
export function extractHeadings(content: string): TocItem[] {
  if (!content) return []
  const items: TocItem[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    // Check H2 (## ...)
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').trim()
      if (text) {
        items.push({
          id: slugifyHeading(text),
          text,
          level: 2,
        })
      }
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').trim()
      if (text) {
        items.push({
          id: slugifyHeading(text),
          text,
          level: 3,
        })
      }
    }
  }

  return items
}

interface TableOfContentsProps {
  headings: TocItem[]
  lang?: 'ar' | 'en'
}

export function TableOfContents({ headings, lang = 'ar' }: TableOfContentsProps) {
  const isAr = lang === 'ar'
  const [isOpen, setIsOpen] = useState(true)

  if (!headings || headings.length === 0) return null

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      aria-label={isAr ? 'جدول محتويات المقال' : 'Table of contents'}
      className="my-8 rounded-2xl border border-white/10 bg-ash/60 p-5 backdrop-blur-md transition-all hover:border-white/20 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center rounded-md bg-white/10 text-xs">
            📑
          </span>
          <span className="font-manrope text-sm font-bold uppercase tracking-wider text-white/90">
            {isAr ? 'محتويات هذا المقال' : 'Table of Contents'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-xs font-dm font-semibold text-voxa hover:underline"
          aria-expanded={isOpen}
        >
          {isOpen ? (isAr ? 'إخفاء' : 'Collapse') : (isAr ? 'عرض' : 'Expand')}
        </button>
      </div>

      {isOpen && (
        <ol className="mt-4 space-y-2 border-t border-white/10 pt-4 font-dm text-sm">
          {headings.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className={`${item.level === 3 ? (isAr ? 'pr-5' : 'pl-5') : ''}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className="group flex items-baseline gap-2 text-white/70 transition-colors hover:text-voxa"
              >
                <span className="font-mono text-xs text-voxa/60 group-hover:text-voxa">
                  {item.level === 2 ? '•' : '—'}
                </span>
                <span className="line-clamp-1 group-hover:underline">
                  {item.text}
                </span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
