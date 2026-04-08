'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import anime from 'animejs'
import AnimatedServiceIcon from '@/components/services/AnimatedServiceIcon'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    iconType: 'ai' as const,
    id: 'ai-services',
    color: '#00D4FF',
    title: 'AI Services',
    tagline: 'Stop guessing. Start knowing.',
    body: 'We build AI tools trained on your data — customer prediction, smart search, content generation, and models that actually fit your workflows.',
    href: '/services#ai-services',
  },
  {
    iconType: 'automation' as const,
    id: 'automation',
    color: '#FF6B35',
    title: 'Automation Workflows',
    tagline: 'Your workflow runs even when you sleep.',
    body: 'We map the tasks your team keeps doing manually and build systems that handle them without anyone touching them — start to finish.',
    href: '/services#automation',
  },
  {
    iconType: 'voice' as const,
    id: 'voice-agents',
    color: '#00D4FF',
    title: 'Voice Calling Agents',
    tagline: "We handle the calls so your team doesn't have to.",
    body: 'AI voice agents that book appointments, qualify leads, follow up, and cover after-hours — sounding natural, not robotic.',
    href: '/services#voice-agents',
  },
  {
    iconType: 'chatbot' as const,
    id: 'chatbots',
    color: '#FF6B35',
    title: 'AI Chatbots',
    tagline: 'Customers get answers in seconds, not hours.',
    body: 'Trained on your actual knowledge base. Gives real answers, handles nuance, and hands off to humans only when it genuinely matters.',
    href: '/services#chatbots',
  },
]

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%', once: true },
        }
      )

      gsap.fromTo(
        cardsRef.current?.querySelectorAll('.svc-card') ?? [],
        { opacity: 0, y: 56 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 76%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardEnter = (el: HTMLElement, color: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    anime({
      targets: el.querySelector('.svc-arrow'),
      translateX: [0, 6],
      opacity: [0.4, 1],
      duration: 280,
      easing: 'easeOutCubic',
    })
    gsap.to(el, { y: -6, duration: 0.3, ease: 'power2.out' })
  }

  const handleCardLeave = (el: HTMLElement) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    anime({
      targets: el.querySelector('.svc-arrow'),
      translateX: [6, 0],
      opacity: [1, 0.4],
      duration: 260,
      easing: 'easeOutCubic',
    })
    gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="services-overview-heading"
    >
      {/* Ambient blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <span className="tag mb-4 inline-flex">What We Do</span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              id="services-overview-heading"
              className="font-heading font-extrabold text-soft-white max-w-xl"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', lineHeight: 1.1 }}
            >
              Four ways we make your{' '}
              <span className="gradient-text-teal">business work harder</span>
            </h2>
            <Link href="/services" className="btn-secondary shrink-0 self-start lg:self-end text-sm" aria-label="View all services">
              All Services <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((svc) => (
            <Link
              key={svc.id}
              href={svc.href}
              className="svc-card glass-card rounded-2xl p-7 group block"
              onMouseEnter={(e) => handleCardEnter(e.currentTarget as HTMLElement, svc.color)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget as HTMLElement)}
              aria-label={`Learn more about ${svc.title}`}
            >
              {/* Animated SVG icon */}
              <div className="mb-5">
                <AnimatedServiceIcon type={svc.iconType} color={svc.color} size={52} />
              </div>

              <h3 className="font-heading font-bold text-xl text-soft-white mb-1.5">
                {svc.title}
              </h3>
              <p className="font-body text-sm font-medium mb-3" style={{ color: svc.color }}>
                {svc.tagline}
              </p>
              <p className="font-body text-soft-white/45 text-sm leading-relaxed mb-5">
                {svc.body}
              </p>

              <span
                className="svc-arrow flex items-center gap-2 text-xs font-body font-medium opacity-40"
                style={{ color: svc.color }}
                aria-hidden="true"
              >
                See how it works <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
