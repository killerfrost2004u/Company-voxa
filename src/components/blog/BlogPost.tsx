import { useEffect, useMemo, useState } from 'react'
import type { BlogPost } from '@/types/blog'
import { blogService } from '@/lib/blogService'
import { navigate } from '@/lib/router'

interface BlogPostProps {
  slug: string
}

export function BlogPostView({ slug }: BlogPostProps) {
  const [copied, setCopied] = useState(false)
  const post = useMemo(() => blogService.getPostBySlug(slug), [slug])
  const allPosts = useMemo(() => blogService.getPosts(false), [])

  const relatedPosts = useMemo(() => {
    if (!post) return []
    return allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  }, [post, allPosts])

  // Dynamic SEO meta tags and Title
  useEffect(() => {
    if (!post) return

    const pageTitle = `${post.seoTitle || post.title} | Voxa Studio`
    document.title = pageTitle

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const setOgMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const desc = post.seoDescription || post.excerpt
    setMeta('description', desc)
    if (post.seoKeywords) setMeta('keywords', post.seoKeywords)

    const url = `https://voxa-pi-three.vercel.app/blog/${post.slug}`
    setOgMeta('og:title', post.seoTitle || post.title)
    setOgMeta('og:description', desc)
    setOgMeta('og:url', url)
    setOgMeta('og:type', 'article')
    setOgMeta('og:image', post.featuredImage)

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [post])

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center text-white">
        <h1 className="font-manrope text-4xl font-extrabold text-voxa">المقال غير موجود (404)</h1>
        <p className="mt-4 font-dm text-base text-[#aaa7a0]">
          عذراً، لم نتمكن من العثور على المقال المطلوب. ربما تم نقله أو حذفه.
        </p>
        <button
          type="button"
          onClick={() => navigate('/blog')}
          className="mt-6 rounded-full bg-voxa px-6 py-2.5 font-manrope text-sm font-bold text-ash"
        >
          العودة للمدونة
        </button>
      </div>
    )
  }

  // Google Rich Results Compliant BlogPosting Schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Voxa Studio',
      url: 'https://voxa-pi-three.vercel.app/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Voxa Studio',
      url: 'https://voxa-pi-three.vercel.app/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://voxa-pi-three.vercel.app/logo/voxa_logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://voxa-pi-three.vercel.app/blog/${post.slug}`,
    },
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://voxa-pi-three.vercel.app/blog/${post.slug}`

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <article className="min-h-screen bg-ink pt-28 pb-24 text-white sm:pt-36">
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <div className="mx-auto max-w-[54rem] px-5 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#888]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="transition-colors hover:text-voxa"
          >
            الرئيسية
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="transition-colors hover:text-voxa"
          >
            المدونة
          </button>
          <span>/</span>
          <span className="line-clamp-1 max-w-[14rem] text-white/90 sm:max-w-none">
            {post.title}
          </span>
        </nav>

        {/* Post Metadata Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-voxa/15 px-3.5 py-1 font-dm text-xs font-bold text-voxa">
            {post.category}
          </span>
          <span className="font-dm text-xs text-[#777]">
            {new Date(post.publishedAt).toLocaleDateString('ar-EG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="font-dm text-xs text-[#777]">•</span>
          <span className="font-dm text-xs text-[#777]">{post.readTime}</span>
        </div>

        {/* Article Title */}
        <h1 className="mt-5 font-manrope text-2xl font-black leading-snug tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.25]">
          {post.title}
        </h1>

        {/* Author & Share Bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-tr from-voxa to-[#427cd6] font-bold text-white shadow-[0_0_15px_rgba(99,161,242,0.3)]">
              V
            </div>
            <div>
              <p className="font-manrope text-sm font-bold text-white">{post.author}</p>
              <p className="font-dm text-xs text-[#888]">{post.authorRole || 'استوديو Voxa'}</p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="font-dm text-xs text-[#777] ml-2">مشاركة:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ash/60 text-sm text-[#25D366] transition-all hover:scale-110 hover:border-[#25D366]"
            >
              💬
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ash/60 text-sm text-[#0077B5] transition-all hover:scale-110 hover:border-[#0077B5]"
            >
              in
            </a>
            <button
              type="button"
              onClick={copyLink}
              title="نسخ الرابط"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-ash/60 text-xs text-white transition-all hover:scale-110 hover:border-voxa"
            >
              {copied ? '✓' : '🔗'}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-ash shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-[20rem] w-full object-cover sm:h-[26rem] lg:h-[30rem]"
          />
        </div>

        {/* Article Body Content */}
        <div className="mt-12 space-y-6 font-dm text-base leading-[1.9] text-[#d6d4ce] sm:text-lg lg:text-[1.1875rem]">
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim()

            // Header 1 (# ...)
            if (trimmed.startsWith('# ')) {
              return (
                <h2
                  key={index}
                  className="pt-6 font-manrope text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  {trimmed.replace('# ', '')}
                </h2>
              )
            }

            // Header 2 (## ...)
            if (trimmed.startsWith('## ')) {
              return (
                <h3
                  key={index}
                  className="pt-6 font-manrope text-xl font-bold text-voxa sm:text-2xl"
                >
                  {trimmed.replace('## ', '')}
                </h3>
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
                <ul key={index} className="my-4 list-inside list-disc space-y-2 pr-2 text-[#ccc]">
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
                <ol key={index} className="my-4 list-inside list-decimal space-y-2 pr-2 text-[#ccc]">
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
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
            <span className="font-dm text-xs text-[#777] ml-2">الوسوم:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-ash/50 px-3 py-1 font-dm text-xs text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Call to action inside post */}
        <div className="mt-14 rounded-3xl border border-voxa/30 bg-gradient-to-br from-ash via-ash to-[#0a1829] p-8 text-center sm:p-10">
          <h3 className="font-manrope text-2xl font-bold text-white">
            هل تخطط لإطلاق أو إعادة تصميم موقعك؟
          </h3>
          <p className="mt-2.5 font-dm text-sm text-[#aaa7a0] sm:text-base">
            فريق استوديو Voxa يصمم لك منصة رقمية مخصصة تجمع بين الجمالية البصرية وسرعة التحميل الخارقة.
          </p>
          <button
            type="button"
            onClick={() => navigate('/#contact')}
            className="mt-6 inline-flex rounded-full bg-voxa px-8 py-3.5 font-manrope text-sm font-bold text-ash shadow-[0_0_20px_rgba(99,161,242,0.4)] transition-transform hover:scale-105 active:scale-95"
          >
            تواصل معنا وابدأ الآن
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 border-t border-white/10 pt-12">
            <h3 className="font-manrope text-2xl font-bold text-white">مقالات ذات صلة</h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-ash/30 p-4 transition-all hover:border-voxa/40"
                >
                  <img
                    src={rel.featuredImage}
                    alt={rel.title}
                    className="h-36 w-full rounded-xl object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="mt-3 inline-block font-dm text-[0.7rem] text-voxa">
                    {rel.category}
                  </span>
                  <h4 className="mt-1.5 font-manrope text-sm font-bold leading-snug text-white line-clamp-2 group-hover:text-voxa">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
