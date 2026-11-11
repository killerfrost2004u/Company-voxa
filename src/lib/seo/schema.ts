import type { BlogPost } from '@/types/blog'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FaqItem {
  question: string
  answer: string
}

const BASE_URL = 'https://voxa-pi-three.vercel.app'
const DEFAULT_LOGO = `${BASE_URL}/logo/voxa_logo.jpg`

/**
 * Truncates text to a specified character limit safely on word boundaries
 */
export function truncate(text: string, maxLength: number): string {
  if (!text) return ''
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  const slice = trimmed.slice(0, maxLength)
  const lastSpace = slice.lastIndexOf(' ')
  return lastSpace > 0 ? `${slice.slice(0, lastSpace)}...` : `${slice}...`
}

/**
 * Ensures a valid ISO 8601 date string
 */
export function formatIsoDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString()
  try {
    const d = new Date(dateStr)
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

/**
 * Generates Google Rich Results Compliant BlogPosting / TechArticle JSON-LD Schema
 */
export function generateArticleSchema(
  post: BlogPost,
  lang = 'ar',
  canonicalUrl?: string,
) {
  const isAr = lang === 'ar'
  const postUrl = canonicalUrl || `${BASE_URL}/blog/${post.slug}`
  const title = isAr ? post.title : (post.titleEn || post.title)
  const description = isAr
    ? (post.seoDescription || post.excerpt)
    : (post.seoDescriptionEn || post.excerptEn || post.excerpt)
  const authorName = isAr ? post.author : (post.authorEn || post.author)
  const authorRole = isAr ? (post.authorRole || 'مهندس برمجيات وتصميم') : (post.authorRoleEn || 'Senior Software Engineer')

  const isTech = post.category === 'Web Development' || post.category === 'Technology' || post.category === 'برمجة وتطوير'

  return {
    '@context': 'https://schema.org',
    '@type': isTech ? 'TechArticle' : 'BlogPosting',
    '@id': `${postUrl}#article`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: 'Voxa Studio',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: truncate(title, 110),
    name: title,
    description: truncate(description, 160),
    image: [
      post.featuredImage,
    ],
    datePublished: formatIsoDate(post.publishedAt),
    dateModified: formatIsoDate(post.updatedAt || post.publishedAt),
    inLanguage: isAr ? 'ar-EG' : 'en-US',
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
      url: `${BASE_URL}/#about`,
      worksFor: {
        '@type': 'Organization',
        name: 'Voxa Studio',
        url: BASE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Voxa Studio',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_LOGO,
        width: 512,
        height: 512,
      },
    },
    articleSection: isAr ? post.category : (post.categoryEn || post.category),
    keywords: (isAr ? post.tags : (post.tagsEn || post.tags))?.join(', ') || undefined,
  }
}

/**
 * Generates BreadcrumbList Schema for Google SERP breadcrumbs
 */
export function generateBreadcrumbSchema(
  post: BlogPost,
  lang = 'ar',
  canonicalUrl?: string,
) {
  const isAr = lang === 'ar'
  const postUrl = canonicalUrl || `${BASE_URL}/blog/${post.slug}`
  const title = isAr ? post.title : (post.titleEn || post.title)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'المدونة' : 'Blog',
        item: `${BASE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: truncate(title, 70),
        item: postUrl,
      },
    ],
  }
}

/**
 * Generates conditional FAQPage Schema for articles with FAQs
 */
export function generateFaqSchema(faqs: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.trim(),
      },
    })),
  }
}

/**
 * Updates full document head metadata (Title, Meta Description, OpenGraph, Twitter, Canonical, Preloads)
 */
export function updateArticleHeadMetadata(
  post: BlogPost,
  lang = 'ar',
) {
  if (typeof window === 'undefined') return

  const isAr = lang === 'ar'
  const postUrl = `${BASE_URL}/blog/${post.slug}`
  const title = isAr ? post.title : (post.titleEn || post.title)
  const pageTitle = `${isAr ? (post.seoTitle || title) : (post.seoTitleEn || post.titleEn || title)} | Voxa Studio`
  const desc = isAr
    ? (post.seoDescription || post.excerpt)
    : (post.seoDescriptionEn || post.excerptEn || post.excerpt)
  const keywords = isAr ? post.seoKeywords : post.seoKeywordsEn

  // 1. Document title
  document.title = pageTitle

  // 2. Helper to set/update standard meta tag
  const setMeta = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  // 3. Helper to set/update OpenGraph / Property meta tag
  const setPropertyMeta = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  // Basic SEO
  setMeta('description', truncate(desc, 160))
  if (keywords) setMeta('keywords', keywords)
  setMeta('author', isAr ? post.author : (post.authorEn || post.author))
  setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]')
  if (!canonicalEl) {
    canonicalEl = document.createElement('link')
    canonicalEl.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalEl)
  }
  canonicalEl.setAttribute('href', postUrl)

  // Open Graph
  setPropertyMeta('og:title', pageTitle)
  setPropertyMeta('og:description', truncate(desc, 160))
  setPropertyMeta('og:url', postUrl)
  setPropertyMeta('og:type', 'article')
  setPropertyMeta('og:image', post.featuredImage)
  setPropertyMeta('og:site_name', 'Voxa Studio')
  setPropertyMeta('og:locale', isAr ? 'ar_EG' : 'en_US')
  setPropertyMeta('article:published_time', formatIsoDate(post.publishedAt))
  setPropertyMeta('article:modified_time', formatIsoDate(post.updatedAt || post.publishedAt))
  setPropertyMeta('article:section', isAr ? post.category : (post.categoryEn || post.category))
  if (post.tags && post.tags.length > 0) {
    post.tags.forEach((tag) => setPropertyMeta('article:tag', tag))
  }

  // Twitter Cards
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', pageTitle)
  setMeta('twitter:description', truncate(desc, 160))
  setMeta('twitter:image', post.featuredImage)
  setMeta('twitter:creator', '@voxastudio')

  // LCP Priority Preload for Featured Image
  let preloadLink = document.querySelector('link[data-lcp-preload="true"]')
  if (!preloadLink) {
    preloadLink = document.createElement('link')
    preloadLink.setAttribute('rel', 'preload')
    preloadLink.setAttribute('as', 'image')
    preloadLink.setAttribute('data-lcp-preload', 'true')
    preloadLink.setAttribute('fetchpriority', 'high')
    document.head.appendChild(preloadLink)
  }
  preloadLink.setAttribute('href', post.featuredImage)
}
