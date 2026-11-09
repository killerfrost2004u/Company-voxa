import type { BlogPost, BlogPostInput } from '@/types/blog'
import { INITIAL_POSTS } from './blogData'

const STORAGE_KEY = 'voxa_blog_posts_v2'

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\-_]+/g, '-')
    .replace(/[^\w\u0621-\u064A\-]/g, '') // allow arabic letters, alphanumeric, hyphens
    .replace(/\-\-+/g, '-')
    .replace(/^-+|-+$/g, '') || `post-${Date.now()}`
}

function calculateReadTime(content: string, lang = 'ar'): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 180))
  return lang === 'ar' ? `${minutes} دقائق قراءة` : `${minutes} min read`
}

export const blogService = {
  getPosts(includeUnpublished = false): BlogPost[] {
    if (typeof window === 'undefined') return INITIAL_POSTS

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS))
        return includeUnpublished ? INITIAL_POSTS : INITIAL_POSTS.filter((p) => p.isPublished)
      }
      const parsed: BlogPost[] = JSON.parse(stored)
      return includeUnpublished ? parsed : parsed.filter((p) => p.isPublished)
    } catch (err) {
      console.error('[blogService] Failed to load posts from storage', err)
      return includeUnpublished ? INITIAL_POSTS : INITIAL_POSTS.filter((p) => p.isPublished)
    }
  },

  getPostBySlug(slug: string): BlogPost | undefined {
    const posts = this.getPosts(true)
    return posts.find((p) => p.slug === slug || encodeURIComponent(p.slug) === slug)
  },

  createPost(input: BlogPostInput): BlogPost {
    const posts = this.getPosts(true)
    const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.title)

    // Ensure unique slug
    let finalSlug = slug
    let counter = 1
    while (posts.some((p) => p.slug === finalSlug)) {
      finalSlug = `${slug}-${counter++}`
    }

    const now = new Date().toISOString()
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: finalSlug,
      title: input.title.trim(),
      excerpt: input.excerpt?.trim() || input.title.slice(0, 140),
      content: input.content || '',
      featuredImage:
        input.featuredImage?.trim() ||
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      author: input.author?.trim() || 'فريق Voxa Studio',
      authorRole: input.authorRole || 'فريق التحرير والبرمجة',
      category: input.category || 'General',
      tags: Array.isArray(input.tags) ? input.tags : [],
      publishedAt: input.publishedAt || now,
      updatedAt: now,
      readTime: calculateReadTime(input.content || ''),
      isPublished: input.isPublished ?? true,
      seoTitle: input.seoTitle?.trim() || input.title,
      seoDescription: input.seoDescription?.trim() || input.excerpt || input.title,
      seoKeywords: input.seoKeywords || '',
    }

    const updated = [newPost, ...posts]
    this._save(updated)
    return newPost
  },

  updatePost(id: string, updates: Partial<BlogPostInput>): BlogPost | null {
    const posts = this.getPosts(true)
    const index = posts.findIndex((p) => p.id === id)
    if (index === -1) return null

    const existing = posts[index]
    const content = updates.content !== undefined ? updates.content : existing.content

    const updatedPost: BlogPost = {
      ...existing,
      ...updates,
      slug: updates.slug ? generateSlug(updates.slug) : existing.slug,
      content,
      readTime: calculateReadTime(content),
      updatedAt: new Date().toISOString(),
    }

    posts[index] = updatedPost
    this._save(posts)
    return updatedPost
  },

  deletePost(id: string): boolean {
    const posts = this.getPosts(true)
    const filtered = posts.filter((p) => p.id !== id)
    if (filtered.length === posts.length) return false
    this._save(filtered)
    return true
  },

  resetToDefaults(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS))
    }
  },

  exportPostsJson(): string {
    return JSON.stringify(this.getPosts(true), null, 2)
  },

  importPostsJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr)
      if (Array.isArray(parsed)) {
        this._save(parsed)
        return true
      }
      return false
    } catch {
      return false
    }
  },

  _save(posts: BlogPost[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
      // Dispatch storage event so all components update in real-time
      window.dispatchEvent(new Event('voxa_posts_updated'))
    }
  },
}
