import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aivized.com'),
  title: {
    default: 'AIVIZED — AI Services, Automation & Voice Agents',
    template: '%s | AIVIZED',
  },
  description:
    'AIVIZED builds AI services, automation workflows, voice calling agents, and chatbots that make your business run smarter — day and night.',
  keywords: [
    'AI services',
    'automation workflows',
    'voice calling agents',
    'AI chatbots',
    'business automation',
    'artificial intelligence',
  ],
  authors: [{ name: 'AIVIZED' }],
  creator: 'AIVIZED',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aivized.com',
    siteName: 'AIVIZED',
    title: 'AIVIZED — AI Services, Automation & Voice Agents',
    description:
      'We build the intelligence behind your business. AI services, automation workflows, voice agents, and chatbots — done right.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AIVIZED — AI Services & Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVIZED — AI Services, Automation & Voice Agents',
    description:
      'We build the intelligence behind your business. AI services, automation workflows, voice agents, and chatbots.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="bg-navy text-soft-white font-body antialiased">
        <SmoothScroll>
          <Navigation />
          <PageTransition>
            <main className="page-transition-wrapper">{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
