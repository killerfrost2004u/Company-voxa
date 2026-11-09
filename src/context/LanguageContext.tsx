import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Language, type TranslationDictionary } from '@/lib/translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: TranslationDictionary
  isRtl: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'voxa_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'ar' || stored === 'en') {
        return stored
      }
    } catch {
      // ignore storage access errors
    }
    return 'en'
  })

  const t = translations[lang]
  const isRtl = lang === 'ar'

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore storage access errors
    }

    // Sync HTML tag attributes
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'

    // Sync document title and meta description dynamically
    document.title = t.meta.title

    let descMeta = document.querySelector('meta[name="description"]')
    if (!descMeta) {
      descMeta = document.createElement('meta')
      descMeta.setAttribute('name', 'description')
      document.head.appendChild(descMeta)
    }
    descMeta.setAttribute('content', t.meta.description)

    let keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta')
      keywordsMeta.setAttribute('name', 'keywords')
      document.head.appendChild(keywordsMeta)
    }
    keywordsMeta.setAttribute('content', t.meta.keywords)
  }, [lang, t, isRtl])

  const toggleLanguage = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  const setLanguage = (newLang: Language) => {
    setLangState(newLang)
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: setLangState,
        setLanguage,
        toggleLanguage,
        t,
        isRtl,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
