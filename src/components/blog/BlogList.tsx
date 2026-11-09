import { useState, useMemo, useEffect } from 'react'
import type { BlogPost } from '@/types/blog'
import { blogService } from '@/lib/blogService'
import { navigate } from '@/lib/router'

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>(() => blogService.getPosts(false))
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(blogService.getPosts(false))
    }
    window.addEventListener('voxa_posts_updated', handleUpdate)
    return () => window.removeEventListener('voxa_posts_updated', handleUpdate)
  }, [])

  // Update page title and meta for /blog
  useEffect(() => {
    document.title = 'المدونة | مقالات تصميم وتطوير المواقع والسيو | Voxa Studio'
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) {
      descMeta.setAttribute(
        'content',
        'مدونة استوديو Voxa: مقالات متخصصة في تصميم وتطوير المواقع، المتاجر الإلكترونية، تجربة المستخدم UI/UX، وأسرار تحسين محركات البحث في مصر والشرق الأوسط.',
      )
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => set.add(p.category))
    return ['All', ...Array.from(set)]
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = selectedCategory === 'All' || post.category === selectedCategory
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [posts, selectedCategory, searchQuery])

  const featuredPost = filteredPosts[0]
  const restPosts = filteredPosts.slice(1)

  return (
    <div className="min-h-screen bg-ink pt-28 pb-20 text-white sm:pt-36">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-[2.4375rem]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[#888]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="transition-colors hover:text-voxa"
          >
            الرئيسية
          </button>
          <span>/</span>
          <span className="text-white">المدونة</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-dm text-xs font-extrabold uppercase tracking-[0.2em] text-voxa">
              VOXA INSIGHTS & ARTICLES
            </span>
            <h1 className="mt-3 font-manrope text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              مدونة <span className="text-voxa">Voxa Studio</span>
            </h1>
            <p className="mt-4 max-w-2xl font-dm text-base leading-relaxed text-[#aaa7a0] sm:text-lg">
              مقالات متخصصة، استراتيجيات برمجية، وأسرار تصميم تجربة المستخدم وتصدر محركات البحث
              للشركات الطامحة لبناء ميزة رقمية حقيقية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="rounded-full border border-white/20 bg-ash/70 px-4 py-2 font-manrope text-xs font-semibold text-white/80 backdrop-blur-md transition-colors hover:border-voxa hover:text-voxa"
            >
              لوحة التحكم (Admin) ⚙️
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-12 flex flex-col gap-5 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 font-manrope text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-voxa text-ash shadow-[0_0_20px_rgba(99,161,242,0.4)]'
                    : 'border border-white/10 bg-ash/50 text-[#888] hover:border-white/25 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'جميع المقالات' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-ash/70 px-4 py-2.5 pl-10 font-manrope text-sm text-white placeholder-white/40 outline-none transition-all focus:border-voxa focus:ring-1 focus:ring-voxa"
            />
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
              🔍
            </span>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mt-10">
            <article
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-ash/40 backdrop-blur-md transition-all duration-300 hover:border-voxa/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                  <span className="absolute top-4 right-4 rounded-full bg-voxa px-3.5 py-1 font-manrope text-xs font-extrabold text-ash">
                    مقال مميز
                  </span>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-5">
                  <div>
                    <div className="flex items-center gap-3 font-dm text-xs text-voxa">
                      <span className="rounded-md bg-voxa/10 px-2.5 py-1 font-bold">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="text-[#888]">{featuredPost.readTime}</span>
                    </div>

                    <h2 className="mt-4 font-manrope text-xl font-bold leading-snug text-white transition-colors group-hover:text-voxa sm:text-2xl lg:text-3xl">
                      {featuredPost.title}
                    </h2>

                    <p className="mt-4 font-dm text-sm leading-relaxed text-[#aaa7a0] sm:text-base">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-voxa/20 font-bold text-voxa">
                        V
                      </div>
                      <div className="flex flex-col">
                        <span className="font-manrope text-xs font-bold text-white">
                          {featuredPost.author}
                        </span>
                        <span className="font-dm text-[0.7rem] text-[#888]">
                          {featuredPost.authorRole || 'فريق التحرير'}
                        </span>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 font-manrope text-xs font-bold text-voxa transition-transform group-hover:translate-x-[-4px]">
                      اقرأ المقال ←
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Rest of Posts Grid */}
        {restPosts.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-ash/30 backdrop-blur-sm transition-all duration-300 hover:border-voxa/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 font-dm text-[0.7rem] font-bold text-voxa backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 font-dm text-[0.75rem] text-[#888]">
                      <span>{new Date(post.publishedAt).toLocaleDateString('ar-EG')}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-3 font-manrope text-lg font-bold leading-snug text-white transition-colors group-hover:text-voxa">
                      {post.title}
                    </h3>

                    <p className="mt-2.5 font-dm text-sm leading-relaxed text-[#aaa7a0] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-dm text-xs text-[#888]">{post.author}</span>
                    <span className="font-manrope text-xs font-bold text-voxa transition-transform group-hover:translate-x-[-3px]">
                      اقرأ المزيد ←
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="mt-16 rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <p className="font-manrope text-lg text-white">لم يتم العثور على مقالات مطابقة للبحث.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-4 rounded-full bg-voxa px-5 py-2 font-manrope text-xs font-bold text-ash"
            >
              عرض جميع المقالات
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-voxa/30 bg-gradient-to-r from-voxa/10 via-ash to-ash p-8 sm:p-12">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-right">
            <div>
              <h3 className="font-manrope text-2xl font-bold text-white sm:text-3xl">
                جاهز لبناء ميزتك الرقمية القادمة؟
              </h3>
              <p className="mt-2 font-dm text-sm text-[#aaa7a0] sm:text-base">
                فريق Voxa Studio يصمم ويطور منصتك بأعلى معايير السرعة، الأمان، والتصدر لمحركات البحث.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/#contact')}
              className="shrink-0 rounded-full bg-voxa px-8 py-3.5 font-manrope text-sm font-bold text-ash shadow-[0_0_25px_rgba(99,161,242,0.4)] transition-transform hover:scale-105 active:scale-95"
            >
              ابدأ مشروعك الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
