export interface BlogPost {
  id: string
  slug: string
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  content: string
  contentEn?: string
  featuredImage: string
  author: string
  authorEn?: string
  authorRole?: string
  authorRoleEn?: string
  category: string
  categoryEn?: string
  tags: string[]
  tagsEn?: string[]
  publishedAt: string
  updatedAt: string
  readTime: string
  readTimeEn?: string
  isPublished: boolean
  seoTitle: string
  seoTitleEn?: string
  seoDescription: string
  seoDescriptionEn?: string
  seoKeywords?: string
  seoKeywordsEn?: string
  keyTakeaways?: string[]
  keyTakeawaysEn?: string[]
  faqs?: { question: string; answer: string }[]
  faqsEn?: { question: string; answer: string }[]
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'> & {
  id?: string
  publishedAt?: string
  updatedAt?: string
}
