'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CaseStudyCard from '@/components/work/CaseStudyCard'
import DemoSection from '@/components/demo/DemoSection'
import AutomationWorkflowSection from '@/components/home/AutomationWorkflowSection'
import FAQSection, { type FAQItem } from '@/components/shared/FAQSection'
import CTASection from '@/components/home/CTASection'
import Link from 'next/link'
import { caseStudies } from '@/lib/case-studies'

const workFaqs: FAQItem[] = [
  {
    q: 'Are these real client results or made-up numbers?',
    a: 'Real. Every case study is based on an actual project with measurable outcomes we tracked together with the client. Numbers are verified, not estimated.',
  },
  {
    q: 'Can I speak to any of the clients featured?',
    a: 'Some clients are happy to take a reference call — we can arrange introductions on a case-by-case basis. Just mention it when you get in touch.',
  },
  {
    q: 'What industries do you work with?',
    a: 'Hospitality, healthcare, e-commerce, real estate, professional services, and SaaS — though the underlying problems (too many manual tasks, slow follow-up, missed leads) are the same across most industries.',
  },
  {
    q: 'How do you measure success on a project?',
    a: 'We agree on the metrics before we start — time saved per week, leads converted, tickets deflected, calls handled. We track those numbers, not vanity metrics.',
  },
  {
    q: 'How long did the projects in these case studies take?',
    a: 'Most were live within 4–8 weeks. Automation workflows are often faster (2–3 weeks). Voice agent deployments take a bit longer because of testing and tuning.',
  },
]

gsap.registerPlugin(ScrollTrigger)

export default function WorkPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.hero-text') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="work-heading"
      >
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <div className="hero-text">
            <span className="tag mb-6 inline-flex">Case Studies</span>
          </div>
          <h1
            id="work-heading"
            className="hero-text font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-soft-white mb-6 max-w-3xl"
          >
            Results we're{' '}
            <span className="text-coral">proud of</span>
          </h1>
          <p className="hero-text font-body text-soft-white/50 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Every project here was a real problem, with a real solution, and
            numbers we actually measured. Click any card to read the full story.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Case study cards grid */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-label="Case studies"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} {...study} index={i} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Automation workflow cards */}
      <AutomationWorkflowSection />

      <div className="section-divider" />

      {/* Demo cards — voice calls + chatbot previews */}
      <DemoSection />

      <div className="section-divider" />

      {/* FAQs */}
      <FAQSection
        faqs={workFaqs}
        heading="Questions about our work"
        subheading="Still curious? Book a call and ask us anything."
      />

      <CTASection />
    </div>
  )
}
