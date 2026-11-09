export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  authorRole?: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  readTime: string
  isPublished: boolean
  seoTitle: string
  seoDescription: string
  seoKeywords?: string
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'> & {
  id?: string
  publishedAt?: string
  updatedAt?: string
}
