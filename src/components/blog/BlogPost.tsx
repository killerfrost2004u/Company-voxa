import { useEffect, useMemo, useState } from 'react'
import type { BlogPost } from '@/types/blog'
import { blogService } from '@/lib/blogService'
import { navigate } from '@/lib/router'
import { useLanguage } from '@/context/LanguageContext'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  updateArticleHeadMetadata,
  formatIsoDate,
} from '@/lib/seo/schema'
import { KeyTakeaways } from './KeyTakeaways'
import { TableOfContents, extractHeadings, slugifyHeading } from './TableOfContents'

interface BlogPostProps {
  slug: string
}

export function BlogPostView({ slug }: BlogPostProps) {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [copied, setCopied] = useState(false)
  const post = useMemo(() => blogService.getPostBySlug(slug), [slug])
  const allPosts = useMemo(() => blogService.getPosts(false), [])

  const relatedPosts = useMemo(() => {
    if (!post) return []
    return allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  }, [post, allPosts])

  // Resolve localized post content
  const title = post ? (isAr ? post.title : (post.titleEn || post.title)) : ''
  const content = post ? (isAr ? post.content : (post.contentEn || post.content)) : ''
  const excerpt = post ? (isAr ? post.excerpt : (post.excerptEn || post.excerpt)) : ''
  const author = post ? (isAr ? post.author : (post.authorEn || post.author)) : ''
  const authorRole = post
    ? (isAr ? (post.authorRole || 'فريق استوديو Voxa') : (post.authorRoleEn || 'Voxa Studio Team'))
    : ''
  const category = post ? (isAr ? post.category : (post.categoryEn || post.category)) : ''
  const tags = post ? (isAr ? post.tags : (post.tagsEn || post.tags)) : []
  const readTime = post ? (isAr ? post.readTime : (post.readTimeEn || post.readTime)) : ''

  // Pre-parse Headings for Table of Contents
  const headings = useMemo(() => extractHeadings(content), [content])

  // JSON-LD Schemas
  const articleSchema = useMemo(() => (post ? generateArticleSchema(post, lang) : null), [post, lang])
  const breadcrumbSchema = useMemo(() => (post ? generateBreadcrumbSchema(post, lang) : null), [post, lang])
  const faqSchema = useMemo(() => {
    if (!post || !post.faqs || post.faqs.length === 0) return null
    return generateFaqSchema(isAr ? post.faqs : (post.faqsEn || post.faqs))
  }, [post, isAr])

  // Sync document head metadata, OpenGraph, Twitter, canonical and preloads
  useEffect(() => {
    if (!post) return
    updateArticleHeadMetadata(post, lang)
  }, [post, lang])

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center text-white">
        <p className="font-manrope text-4xl font-extrabold text-voxa" role="alert">
          {isAr ? 'المقال غير موجود (404)' : 'Article Not Found (404)'}
        </p>
        <p className="mt-4 font-dm text-base text-[#aaa7a0]">
          {isAr
            ? 'عذراً، لم نتمكن من العثور على المقال المطلوب. ربما تم نقله أو حذفه.'
            : 'Sorry, we could not find the requested article. It may have been relocated or removed.'}
        </p>
        <button
          type="button"
          onClick={() => navigate('/blog')}
          className="mt-6 rounded-full bg-voxa px-6 py-2.5 font-manrope text-sm font-bold text-ash transition-transform hover:scale-105"
        >
          {isAr ? 'العودة للمدونة' : 'Back to Blog'}
        </button>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://voxa-pi-three.vercel.app/blog/${post.slug}`

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <article className="min-h-screen bg-ink pt-28 pb-24 text-white sm:pt-36">
      {/* 1. Article / TechArticle JSON-LD Schema */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* 2. BreadcrumbList JSON-LD Schema */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* 3. Conditional FAQPage JSON-LD Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-[54rem] px-5 sm:px-8">
        {/* Article Semantic Header */}
        <header>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#888]">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="transition-colors hover:text-voxa"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="transition-colors hover:text-voxa"
            >
              {isAr ? 'المدونة' : 'Blog'}
            </button>
            <span>/</span>
            <span className="line-clamp-1 max-w-[14rem] text-white/90 sm:max-w-none">
              {title}
            </span>
          </nav>

          {/* Post Metadata Header */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-voxa/15 px-3.5 py-1 font-dm text-xs font-bold text-voxa">
              {category}
            </span>
            <time
              dateTime={formatIsoDate(post.publishedAt)}
              className="font-dm text-xs text-[#777]"
            >
              {new Date(post.publishedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="font-dm text-xs text-[#777]">•</span>
            <span className="font-dm text-xs text-[#777]">{readTime}</span>
          </div>

          {/* Exactly ONE H1 Per Article */}
          <h1 className="mt-5 font-manrope text-2xl font-extrabold leading-snug tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.25] text-white">
            {title}
          </h1>

          {/* Semantic Author & Social Share Bar */}
          <div className="mt-8 flex flex-col justify-between gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center">
            <address className="not-italic flex items-center gap-3.5">
              <div
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-gradient-to-tr from-voxa to-[#427cd6] font-bold text-white shadow-[0_0_15px_rgba(99,161,242,0.3)]"
              >
                V
              </div>
              <div className="flex flex-col">
                <span className="font-manrope text-sm font-bold text-white">{author}</span>
                <span className="font-dm text-xs text-[#888]">{authorRole}</span>
              </div>
            </address>

            {/* Social Share Controls */}
            <div className="flex items-center gap-2">
              <span className="font-dm text-xs text-[#777] mx-1">{isAr ? 'مشاركة:' : 'Share:'}</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isAr ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ash/60 text-sm text-[#25D366] transition-all hover:scale-110 hover:border-[#25D366]"
              >
                💬
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isAr ? 'مشاركة عبر لينكد إن' : 'Share on LinkedIn'}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ash/60 text-sm text-[#0077B5] transition-all hover:scale-110 hover:border-[#0077B5]"
              >
                in
              </a>
              <button
                type="button"
                onClick={copyLink}
                aria-label={isAr ? 'نسخ رابط المقال' : 'Copy article link'}
                title={isAr ? 'نسخ الرابط' : 'Copy Link'}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ash/60 text-xs text-white transition-all hover:scale-110 hover:border-voxa"
              >
                {copied ? '✓' : '🔗'}
              </button>
            </div>
          </div>

          {/* Module 1: Direct Answer / Key Takeaways for Position Zero */}
          <KeyTakeaways
            summary={excerpt}
            points={isAr ? post.keyTakeaways : (post.keyTakeawaysEn || post.keyTakeaways)}
            lang={lang}
          />

          {/* Module 2: Automated Table of Contents */}
          <TableOfContents headings={headings} lang={lang} />
        </header>

        {/* Semantic Hero Image (LCP Prioritized + Aspect-Ratio Container for CLS = 0) */}
        <figure className="relative my-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e0e] aspect-[16/9] shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <img
            src={post.featuredImage}
            alt={title}
            width="1200"
            height="675"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="size-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </figure>

        {/* Section: Article Body Content with Strict Heading Hierarchy */}
        <section
          aria-label={isAr ? 'نص المقال' : 'Article content'}
          className="article-body mt-10 space-y-6 font-dm text-base leading-[1.9] text-[#d6d4ce] sm:text-lg lg:text-[1.1875rem]"
        >
          {content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim()

            // Header 2 (## or # normalized to H2 to protect single H1 rule)
            if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
              const rawText = trimmed.replace(/^#{1,2}\s+/, '').replace(/\*\*/g, '').trim()
              const headingId = slugifyHeading(rawText)
              return (
                <h2
                  key={index}
                  id={headingId}
                  className="group pt-8 font-manrope text-2xl font-bold tracking-tight text-white sm:text-3xl scroll-mt-24"
                >
                  <a href={`#${headingId}`} className="hover:text-voxa transition-colors">
                    {rawText}
                  </a>
                </h2>
              )
            }

            // Header 3 (###)
            if (trimmed.startsWith('### ')) {
              const rawText = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').trim()
              const headingId = slugifyHeading(rawText)
              return (
                <h3
                  key={index}
                  id={headingId}
                  className="group pt-6 font-manrope text-xl font-bold text-voxa sm:text-2xl scroll-mt-24"
                >
                  <a href={`#${headingId}`} className="hover:underline">
                    {rawText}
                  </a>
                </h3>
              )
            }

            // Header 4 (####)
            if (trimmed.startsWith('#### ')) {
              const rawText = trimmed.replace(/^####\s+/, '').replace(/\*\*/g, '').trim()
              return (
                <h4
                  key={index}
                  className="pt-4 font-manrope text-lg font-bold text-white/90 sm:text-xl scroll-mt-24"
                >
                  {rawText}
                </h4>
              )
            }

            // Divider (---)
            if (trimmed === '---') {
              return <hr key={index} className="my-8 border-white/10" />
            }

            // Bullet list
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n')
              return (
                <ul key={index} className="my-4 list-inside list-disc space-y-2 px-2 text-[#ccc]">
                  {items.map((it, i) => (
                    <li key={i} className="leading-relaxed">
                      {it.replace(/^[\*\-]\s+/, '')}
                    </li>
                  ))}
                </ul>
              )
            }

            // Numbered list
            if (/^\d+\./.test(trimmed)) {
              const items = trimmed.split('\n')
              return (
                <ol key={index} className="my-4 list-inside list-decimal space-y-2 px-2 text-[#ccc]">
                  {items.map((it, i) => (
                    <li key={i} className="leading-relaxed">
                      {it.replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
                </ol>
              )
            }

            // Standard Paragraph
            return (
              <p key={index} className="text-[#ccc]">
                {trimmed}
              </p>
            )
          })}
        </section>

        {/* Semantic Article Footer: Tags */}
        {tags && tags.length > 0 && (
          <footer className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
            <span className="font-dm text-xs text-[#777] mx-1">{isAr ? 'الوسوم:' : 'Tags:'}</span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-ash/50 px-3 py-1 font-dm text-xs text-white/70"
              >
                #{tag}
              </span>
            ))}
          </footer>
        )}

        {/* Conversion CTA Block */}
        <div className="mt-14 rounded-3xl border border-voxa/30 bg-gradient-to-br from-ash via-ash to-[#0a1829] p-8 text-center sm:p-10 shadow-xl">
          <h2 className="font-manrope text-2xl font-bold text-white sm:text-3xl">
            {isAr ? 'هل تخطط لإطلاق أو تطوير منصتك الرقمية؟' : 'Planning to launch or elevate your digital platform?'}
          </h2>
          <p className="mt-2.5 font-dm text-sm text-[#aaa7a0] sm:text-base max-w-xl mx-auto">
            {isAr
              ? 'فريق استوديو Voxa يصمم لك موقعاً رقمياً مخصصاً يجمع بين الفخامة البصرية وسرعة التحميل الخارقة مع تهيئة السيو الشاملة.'
              : 'Voxa Studio crafts bespoke digital platforms merging luxury aesthetics with sub-second loading performance and deep SEO.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/#contact')}
            className="btn-shine mt-6 inline-flex rounded-full bg-voxa px-8 py-3.5 font-manrope text-sm font-bold text-ash shadow-[0_0_20px_rgba(99,161,242,0.4)] transition-transform hover:scale-105 active:scale-95"
          >
            {isAr ? 'تواصل معنا وابدأ الآن' : 'Start Your Project Now'}
          </button>
        </div>

        {/* Related Posts Section (Lazy Loaded Below Fold) */}
        {relatedPosts.length > 0 && (
          <aside aria-label={isAr ? 'مقالات ذات صلة' : 'Related articles'} className="mt-20 border-t border-white/10 pt-12">
            <h2 className="font-manrope text-2xl font-bold text-white sm:text-3xl">
              {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rel) => {
                const relTitle = isAr ? rel.title : (rel.titleEn || rel.title)
                const relCat = isAr ? rel.category : (rel.categoryEn || rel.category)
                return (
                  <article
                    key={rel.id}
                    onClick={() => navigate(`/blog/${rel.slug}`)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-ash/30 p-4 transition-all hover:border-voxa/40"
                  >
                    <div className="overflow-hidden rounded-xl aspect-[16/10] bg-[#0c0c0c]">
                      <img
                        src={rel.featuredImage}
                        alt={relTitle}
                        width="400"
                        height="250"
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="mt-3 inline-block font-dm text-[0.7rem] text-voxa font-semibold uppercase tracking-wider">
                      {relCat}
                    </span>
                    <h3 className="mt-1.5 font-manrope text-sm font-bold leading-snug text-white line-clamp-2 group-hover:text-voxa transition-colors">
                      {relTitle}
                    </h3>
                  </article>
                )
              })}
            </div>
          </aside>
        )}
      </div>
    </article>
  )
}
