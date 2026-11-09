const BASE_URL = 'https://voxa-pi-three.vercel.app'

const DEFAULT_POSTS = [
  { slug: 'web-design-development-egypt-guide-2026', lastmod: '2026-11-08' },
  { slug: 'why-custom-code-beats-wordpress', lastmod: '2026-11-07' },
  { slug: 'ecommerce-speed-conversion-rate-optimization', lastmod: '2026-11-08' },
  { slug: 'ui-ux-design-impact-business-growth', lastmod: '2026-11-09' },
]

export default function handler(req: any, res: any) {
  const today = new Date().toISOString().split('T')[0]

  const urls = [
    `  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    ...DEFAULT_POSTS.map(
      (post) => `  <url>
    <loc>${BASE_URL}/blog/${encodeURIComponent(post.slug)}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('\n')}
</urlset>`.trim()

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')
  res.status(200).send(xml)
}
