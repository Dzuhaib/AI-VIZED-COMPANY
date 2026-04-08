import type { MetadataRoute } from 'next'
import { caseStudies } from '@/lib/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aivized.com'
  const now  = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(cs => ({
    url:             `${base}/work/${cs.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  return [...staticRoutes, ...caseStudyRoutes]
}
