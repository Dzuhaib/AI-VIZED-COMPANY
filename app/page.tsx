import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import AutomationWorkflowSection from '@/components/home/AutomationWorkflowSection'
import DemoSection from '@/components/demo/DemoSection'
import SocialProof from '@/components/home/SocialProof'
import Testimonials from '@/components/home/Testimonials'
import FAQSection, { type FAQItem } from '@/components/shared/FAQSection'
import CTASection from '@/components/home/CTASection'

const homeFaqs: FAQItem[] = [
  {
    q: "What does AIVIZED actually build?",
    a: "We build working AI systems — automation workflows, voice calling agents, AI chatbots, and custom AI integrations. Everything is built specifically for how your business operates, not off-the-shelf tools with your logo on them.",
  },
  {
    q: "Do you work with small businesses or only large companies?",
    a: "Both. Our smallest clients are solo operators and small teams who want to stop doing repetitive tasks. Our largest are multi-location businesses handling thousands of customer interactions per week. The problems are usually the same — the scale is different.",
  },
  {
    q: "How long does a typical project take?",
    a: "Automation workflows are often live in 2–3 weeks. Voice agents and chatbots typically take 4–8 weeks including testing. We move fast because we stay focused — we don't disappear for months and deliver something to spec that doesn't actually work.",
  },
  {
    q: "What's the first step if I want to work with you?",
    a: "Book a 30-minute discovery call. We'll talk through what's slowing your business down, whether AI is actually the right solution, and what building it would realistically look like. No pitch. No pressure.",
  },
  {
    q: "Is there a minimum project size?",
    a: "We don't have a fixed minimum, but we're not the right fit for very small one-off requests. If you're looking to build something that genuinely changes how your business runs, we're interested in talking.",
  },
]

export const metadata: Metadata = {
  title: 'AIVIZED — AI Services, Automation & Voice Agents',
  description:
    'AIVIZED builds AI systems, automation workflows, voice calling agents, and chatbots that make your business run smarter — 24 hours a day.',
  alternates: { canonical: 'https://aivized.com' },
  openGraph: {
    title: 'AIVIZED — AI Services, Automation & Voice Agents',
    description:
      'We build the intelligence behind your business. AI that works while your team focuses on what humans do best.',
    url: 'https://aivized.com',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'AIVIZED — AI Services & Automation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIVIZED — AI Services, Automation & Voice Agents',
    description: 'We build the intelligence behind your business. AI services, automation, voice agents, and chatbots.',
    images: ['/opengraph-image'],
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <div className="section-divider" />
      <AutomationWorkflowSection />
      <div className="section-divider" />
      <DemoSection />
      <div className="section-divider" />
      <SocialProof />
      <Testimonials />
      <div className="section-divider" />
      <FAQSection faqs={homeFaqs} />
      <CTASection />
    </>
  )
}
