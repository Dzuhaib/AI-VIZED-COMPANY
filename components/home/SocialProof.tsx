'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCounter from '@/components/AnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    value: 80,
    suffix: '+',
    label: 'Clients served',
    description: 'Companies that trusted us to wire AI into their operations',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Automations built',
    description: 'Workflows running 24/7 across dozens of industries',
  },
  {
    value: 2.4,
    suffix: 'M+',
    decimals: 1,
    label: 'Calls handled',
    description: 'Inbound and outbound calls processed by our voice agents',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client retention',
    description: 'Because results speak louder than promises',
  },
]

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current?.querySelectorAll('.stat-item') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="social-proof-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate/30" />
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div className="absolute inset-x-0 bottom-0 section-divider" />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="social-proof-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl text-soft-white"
          >
            Numbers that matter
          </h2>
          <p className="text-soft-white/40 font-body mt-3 max-w-md mx-auto">
            We measure success by outcomes, not activity.
          </p>
        </div>

        <div
          ref={itemsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center group"
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
            >
              <div className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-teal mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                  duration={2200}
                />
              </div>
              <div className="font-heading font-semibold text-soft-white text-base sm:text-lg mb-2">
                {stat.label}
              </div>
              <p className="font-body text-soft-white/40 text-xs sm:text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
