import { MetadataRoute } from 'next'
import { client } from '../../sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://voxa-pi-three.vercel.app'

  // Core Pages
  const routes = ['', '/services', '/work', '/articles', '/about', '/contact'].flatMap((route) => [
    {
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/ar${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    },
  ])

  // Fetch slugs from Sanity
  const articles = await client.fetch(`*[_type == "article"]{ "slug": slug.current }`)
  const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`)

  // Article Dynamic Pages
  const articleRoutes = articles.flatMap((article: any) => [
    {
      url: `${baseUrl}/en/articles/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ar/articles/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ])

  // Work Dynamic Pages
  const workRoutes = projects.flatMap((study: any) => [
    {
      url: `${baseUrl}/en/work/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ar/work/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  return [...routes, ...articleRoutes, ...workRoutes]
}
