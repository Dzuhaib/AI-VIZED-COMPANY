import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies — Real Results from Real Clients',
  description:
    'Real results from real clients across hospitality, healthcare, e-commerce, and financial services. See how AIVIZED built AI systems that measurably changed how businesses operate.',
  alternates: { canonical: 'https://aivized.com/work' },
  openGraph: {
    title: 'AIVIZED Case Studies — Results We Are Proud Of',
    description:
      'How we helped a real estate firm book 68% more meetings, a telehealth platform resolve 74% of tickets without humans, and more.',
    url: 'https://aivized.com/work',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'AIVIZED Case Studies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVIZED Case Studies — Results We Are Proud Of',
    description: 'Real AI automation results: 68% more bookings, 74% ticket deflection, and more. See how we did it.',
    images: ['/opengraph-image'],
  },
}
