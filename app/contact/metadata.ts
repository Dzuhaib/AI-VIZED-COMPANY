import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact AIVIZED — Book a Free Discovery Call',
  description:
    'Book a free 30-minute discovery call or send a message. Tell us what is slowing you down and we will figure out whether AI can help — no pitch, no pressure.',
  alternates: { canonical: 'https://aivized.com/contact' },
  openGraph: {
    title: 'Contact AIVIZED — Book a Free Discovery Call',
    description:
      'No pitch, no pressure. One conversation to understand your situation and explore whether AI is the right move for your business.',
    url: 'https://aivized.com/contact',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Contact AIVIZED' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AIVIZED — Book a Free Discovery Call',
    description: 'Book a 30-min discovery call. We talk through your biggest pain points and tell you honestly whether AI can help.',
    images: ['/opengraph-image'],
  },
}
