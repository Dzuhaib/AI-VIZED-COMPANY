'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Before AIVIZED, our team was manually following up on 200+ leads a week. Now the AI handles first contact and books calls while we focus on closing. It\'s changed how we operate.',
    author: 'Marcus T.',
    role: 'Head of Sales',
    company: 'PropVault Realty',
    industry: 'Real Estate',
    avatar: 'M',
    accentColor: '#00D4FF',
  },
  {
    quote:
      'We thought AI chatbots would frustrate our customers. The one AIVIZED built actually resolves 70% of support tickets without any human involvement. Our team finally has breathing room.',
    author: 'Priya K.',
    role: 'Customer Success Lead',
    company: 'Lumi Health',
    industry: 'Healthcare',
    avatar: 'P',
    accentColor: '#FF6B35',
  },
  {
    quote:
      'The automation they built connects five different tools we use and runs 140+ tasks a day that used to take my VA four hours. I don\'t even think about those tasks anymore.',
    author: 'James R.',
    role: 'Founder',
    company: 'Northside Commerce',
    industry: 'E-commerce',
    avatar: 'J',
    accentColor: '#00D4FF',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.testimonial-card') ?? [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector('.testimonials-grid'),
            start: 'top 75%',
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
      className="py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">What Clients Say</span>
          <h2
            id="testimonials-heading"
            className="font-heading font-extrabold text-4xl sm:text-5xl text-soft-white"
          >
            Results, not testimonials.{' '}
            <br />
            <span className="gradient-text-teal">Well, both.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card glass-card rounded-2xl p-8 flex flex-col"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Quote mark */}
              <div
                className="font-heading text-6xl leading-none mb-4 opacity-30"
                style={{ color: t.accentColor }}
                aria-hidden="true"
              >
                "
              </div>

              <blockquote className="font-body text-soft-white/70 text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-border">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm flex-shrink-0"
                  style={{
                    background: `${t.accentColor}20`,
                    color: t.accentColor,
                    border: `1px solid ${t.accentColor}40`,
                  }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-heading font-semibold text-soft-white text-sm">
                    {t.author}
                  </div>
                  <div className="font-body text-soft-white/40 text-xs">
                    {t.role}, {t.company}
                  </div>
                </div>
                <span
                  className="tag-coral tag ml-auto text-xs hidden sm:inline-flex"
                  aria-label={`Industry: ${t.industry}`}
                >
                  {t.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
