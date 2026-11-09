import { useState, useEffect } from 'react'
import type { BlogPost, BlogPostInput } from '@/types/blog'
import { blogService } from '@/lib/blogService'
import { navigate } from '@/lib/router'

const PRESET_IMAGES = [
  { label: 'Web Tech & Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Design & Analytics', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'E-commerce & Store', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80' },
  { label: 'UI/UX Creative', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' },
]

export function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>(() => blogService.getPosts(true))
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('voxa_admin_auth') === 'true'
  })
  const [pinInput, setPinInput] = useState('')
  const [authError, setAuthError] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: PRESET_IMAGES[0].url,
    category: 'Web Development',
    author: 'فريق Voxa Studio',
    authorRole: 'فريق التحرير والبرمجة',
    tags: ['تصميم مواقع', 'سيو'],
    isPublished: true,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  useEffect(() => {
    document.title = 'لوحة تحكم المدونة | Voxa Studio Admin'
  }, [])

  const refreshPosts = () => {
    setPosts(blogService.getPosts(true))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple admin access PIN (voxa2026 or 1234)
    if (pinInput === 'voxa2026' || pinInput === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true)
      sessionStorage.setItem('voxa_admin_auth', 'true')
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  const handleStartCreate = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: PRESET_IMAGES[0].url,
      category: 'Web Development',
      author: 'فريق Voxa Studio',
      authorRole: 'فريق التحرير والبرمجة',
      tags: ['تصميم مواقع'],
      isPublished: true,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    })
    setIsCreating(true)
  }

  const handleStartEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      category: post.category,
      author: post.author,
      authorRole: post.authorRole || '',
      tags: post.tags,
      isPublished: post.isPublished,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      seoKeywords: post.seoKeywords || '',
    })
    setIsCreating(true)
  }

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف المقال: "${title}"؟`)) {
      blogService.deletePost(id)
      refreshPosts()
      showMessage('تم حذف المقال بنجاح')
    }
  }

  const showMessage = (msg: string) => {
    setStatusMessage(msg)
    setTimeout(() => setStatusMessage(null), 3000)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('يرجى إدخال عنوان المقال')
      return
    }

    if (editingPost) {
      blogService.updatePost(editingPost.id, formData)
      showMessage('تم تحديث المقال بنجاح')
    } else {
      blogService.createPost(formData)
      showMessage('تم نشر المقال الجديد بنجاح وإضافته للمدونة وخريطة الموقع!')
    }

    refreshPosts()
    setIsCreating(false)
    setEditingPost(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-ash/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <span className="font-dm text-xs font-bold uppercase tracking-widest text-voxa">
              VOXA DASHBOARD
            </span>
            <h1 className="mt-2 font-manrope text-2xl font-bold">تسجيل دخول لوحة التحكم</h1>
            <p className="mt-1 text-xs text-[#888]">أدخل رمز المرور للوصول لإدارة مقالات المدونة</p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                placeholder="رمز المرور (Admin PIN)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 font-manrope text-sm text-white placeholder-white/40 outline-none focus:border-voxa focus:ring-1 focus:ring-voxa"
                autoFocus
              />
              {authError && (
                <p className="mt-2 text-xs text-flame">رمز المرور غير صحيح، يرجى المحاولة مجدداً</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-voxa py-3 font-manrope text-sm font-bold text-ash shadow-lg transition-transform hover:scale-[1.02] active:scale-98"
            >
              دخول اللوحة
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xs text-[#777] hover:text-white"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink pt-28 pb-20 text-white sm:pt-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Top Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-manrope text-2xl font-bold sm:text-3xl">لوحة إدارة المدونة</h1>
              <span className="rounded-full bg-voxa/20 px-3 py-0.5 font-dm text-xs font-bold text-voxa">
                CMS Live
              </span>
            </div>
            <p className="mt-1 font-dm text-xs text-[#888]">
              إضافة وتعديل وحذف المقالات وضبط وسوم السيو (SEO Meta Tags) وخريطة الموقع
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="rounded-lg border border-white/15 bg-ash px-4 py-2 font-manrope text-xs font-semibold text-white/80 hover:text-white"
            >
              عرض المدونة ↗
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 bg-ash px-4 py-2 font-manrope text-xs font-semibold text-white/80 hover:text-voxa"
            >
              خريطة الموقع (sitemap.xml) ↗
            </a>
            <button
              type="button"
              onClick={handleStartCreate}
              className="rounded-lg bg-voxa px-5 py-2 font-manrope text-xs font-bold text-ash shadow-md hover:bg-voxa/90"
            >
              + إضافة مقال جديد
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="mt-4 rounded-xl border border-voxa/30 bg-voxa/10 px-4 py-3 text-center font-manrope text-xs font-bold text-voxa">
            {statusMessage}
          </div>
        )}

        {/* Modal / Editor for Add / Edit */}
        {isCreating ? (
          <div className="mt-8 rounded-3xl border border-white/15 bg-ash/60 p-6 backdrop-blur-xl sm:p-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-manrope text-xl font-bold text-white">
                {editingPost ? 'تعديل المقال' : 'إضافة مقال جديد'}
              </h2>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-sm text-[#888] hover:text-white"
              >
                ✕ إلغاء
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-6">
              {/* Post Title */}
              <div>
                <label className="block font-manrope text-xs font-bold text-white/80 mb-2">
                  عنوان المقال (Article Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أهمية تصميم تجربة المستخدم في نمو الشركات"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setFormData((prev) => ({
                      ...prev,
                      title,
                      // auto fill SEO title if empty
                      seoTitle: prev.seoTitle ? prev.seoTitle : title,
                    }))
                  }}
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-voxa"
                />
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-manrope text-xs font-bold text-white/80 mb-2">
                    الرابط المخصص (Dynamic Slug)
                  </label>
                  <input
                    type="text"
                    placeholder="post-slug-example (اتركه فارغاً للتوليد التلقائي)"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-voxa font-mono"
                  />
                  <span className="mt-1 block text-[0.7rem] text-[#777]">
                    المسار: /blog/{formData.slug || 'slug-auto-generated'}
                  </span>
                </div>

                <div>
                  <label className="block font-manrope text-xs font-bold text-white/80 mb-2">
                    التصنيف (Category)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-voxa"
                  >
                    <option value="Web Development">Web Development (تطوير الويب)</option>
                    <option value="UI/UX Design">UI/UX Design (تصميم الواجهات)</option>
                    <option value="E-commerce">E-commerce (التجارة الإلكترونية)</option>
                    <option value="SEO & Marketing">SEO & Marketing (السيو والتسويق)</option>
                    <option value="Technology">Technology (التقنية)</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-manrope text-xs font-bold text-white/80 mb-2">
                  مقتطف تعريفي مختصر (Excerpt)
                </label>
                <textarea
                  rows={2}
                  placeholder="موجز جذاب يظهر في كروت المقال ونتائج البحث..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-voxa"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block font-manrope text-xs font-bold text-white/80 mb-2">
                  الصورة الرئيسية للمقال (Featured Image URL)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-voxa"
                />

                {/* Preset image buttons */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="text-[0.7rem] text-[#777]">أو اختر صورة جاهزة:</span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, featuredImage: preset.url })}
                      className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[0.7rem] text-white/70 hover:border-voxa hover:text-voxa"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-manrope text-xs font-bold text-white/80">
                    محتوى المقال (Article Content - يدعم Markdown والعناوين)
                  </label>
                  <span className="text-[0.7rem] text-[#777]">
                    استخدم # للعناوين و * للقوائم
                  </span>
                </div>
                <textarea
                  rows={12}
                  required
                  placeholder="اكتب محتوى المقال هنا بالتفصيل..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 font-mono text-sm leading-relaxed text-white placeholder-white/30 outline-none focus:border-voxa"
                />
              </div>

              {/* SEO Controls Section */}
              <div className="rounded-2xl border border-voxa/30 bg-black/40 p-5">
                <div className="flex items-center gap-2">
                  <span className="text-base text-voxa">⚡</span>
                  <h3 className="font-manrope text-sm font-bold text-voxa">
                    إعدادات السيو المتقدمة (SEO Meta Tags)
                  </h3>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block font-manrope text-xs font-bold text-white/70 mb-1.5">
                      عنوان السيو (Meta Title)
                    </label>
                    <input
                      type="text"
                      placeholder="عنوان المقال لمحركات البحث (50-60 حرف)"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-voxa"
                    />
                  </div>

                  <div>
                    <label className="block font-manrope text-xs font-bold text-white/70 mb-1.5">
                      وصف السيو (Meta Description)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="الوصف التعريفي الذي يظهر تحت العنوان في جوجل (120-160 حرف)..."
                      value={formData.seoDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, seoDescription: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-voxa"
                    />
                  </div>

                  <div>
                    <label className="block font-manrope text-xs font-bold text-white/70 mb-1.5">
                      الكلمات المفتاحية (Meta Keywords)
                    </label>
                    <input
                      type="text"
                      placeholder="تصميم مواقع, تطوير ويب, سيو, Voxa"
                      value={formData.seoKeywords}
                      onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-voxa"
                    />
                  </div>

                  {/* Google Search Result Preview */}
                  <div className="mt-3 rounded-xl border border-white/10 bg-[#161616] p-4 text-right" dir="rtl">
                    <span className="text-[0.65rem] text-[#777] block mb-1">
                      معاينة الظهور في نتائج بحث جوجل (Google SERP Preview):
                    </span>
                    <span className="text-[0.7rem] text-[#8ab4f8] block font-mono">
                      https://voxa-pi-three.vercel.app &gt; blog &gt; {formData.slug || 'slug'}
                    </span>
                    <h4 className="font-manrope text-sm font-bold text-[#99c3ff] hover:underline cursor-pointer">
                      {formData.seoTitle || formData.title || 'عنوان المقال'} | Voxa Studio
                    </h4>
                    <p className="mt-1 font-dm text-xs text-[#bdc1c6] line-clamp-2">
                      {formData.seoDescription ||
                        formData.excerpt ||
                        'الوصف التعريفي المخصص للسيو لمحركات البحث.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="size-4 accent-voxa"
                  />
                  <span className="font-manrope text-xs font-semibold text-white">
                    نشر المقال مباشرة (Published)
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="rounded-xl border border-white/15 px-5 py-2.5 font-manrope text-xs font-semibold text-white/70 hover:text-white"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-voxa px-7 py-2.5 font-manrope text-xs font-bold text-ash shadow-lg hover:bg-voxa/90"
                  >
                    {editingPost ? 'حفظ التعديلات' : 'نشر المقال الآن'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Articles Table */
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-ash/40">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="border-b border-white/10 bg-black/40 text-[#777] font-manrope uppercase">
                  <tr>
                    <th className="px-6 py-4">المقال</th>
                    <th className="px-4 py-4">التصنيف</th>
                    <th className="px-4 py-4">الحالة</th>
                    <th className="px-4 py-4">تاريخ النشر</th>
                    <th className="px-6 py-4 text-left">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-dm">
                  {posts.map((post) => (
                    <tr key={post.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.featuredImage}
                            alt=""
                            className="size-10 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <p className="font-manrope font-bold text-white text-sm">
                              {post.title}
                            </p>
                            <span className="font-mono text-[0.7rem] text-[#777]">
                              /blog/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-voxa font-semibold">{post.category}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                            post.isPublished
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {post.isPublished ? 'منشور' : 'مسودة'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#888]">
                        {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            title="معاينة"
                            className="rounded-lg border border-white/10 p-2 text-white/70 hover:border-voxa hover:text-voxa"
                          >
                            👁️
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartEdit(post)}
                            title="تعديل"
                            className="rounded-lg border border-white/10 p-2 text-white/70 hover:border-voxa hover:text-voxa"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id, post.title)}
                            title="حذف"
                            className="rounded-lg border border-white/10 p-2 text-flame/70 hover:border-flame hover:text-flame"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
