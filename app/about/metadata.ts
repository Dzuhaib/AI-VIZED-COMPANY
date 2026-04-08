import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About AIVIZED — The Team Behind the AI',
  description:
    'AIVIZED started because the gap between AI potential and real business implementation was obvious. Meet the team, our values, and how we got here.',
  alternates: { canonical: 'https://aivized.com/about' },
  openGraph: {
    title: 'About AIVIZED — The Team Behind the AI',
    description:
      'We started because great AI tools existed but businesses could not connect them to their operations. Meet the team closing that gap.',
    url: 'https://aivized.com/about',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'About AIVIZED' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AIVIZED — The Team Behind the AI',
    description: 'Meet the team that builds AI systems, automation workflows, and voice agents for businesses worldwide.',
    images: ['/opengraph-image'],
  },
}
