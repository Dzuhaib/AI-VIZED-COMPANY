import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Services, Automation & Voice Agents',
  description:
    'AI services, automation workflows, voice calling agents, and AI chatbots — built specifically for how your business runs. No generic plugins, no cookie-cutter setups.',
  alternates: { canonical: 'https://aivized.com/services' },
  openGraph: {
    title: 'AIVIZED Services — AI That Does Actual Work',
    description:
      'Four services that solve real business problems: custom AI, automation, voice agents, and chatbots. Human-built for your specific operation.',
    url: 'https://aivized.com/services',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AIVIZED Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVIZED Services — AI That Does Actual Work',
    description: 'Custom AI, automation workflows, voice agents, and chatbots built for your business.',
    images: ['/og-image.png'],
  },
}
