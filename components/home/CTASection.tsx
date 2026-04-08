'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Calendar, Users, Zap, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Users, value: '80+',  label: 'Clients served' },
  { icon: Zap,   value: '2M+',  label: 'Automations run' },
  { icon: Star,  value: '98%',  label: 'Client retention' },
]

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(
        cardRef.current?.querySelectorAll('.cta-item') ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Ambient layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob blob-teal absolute"
          style={{ width: 600, height: 600, top: '-20%', left: '10%', opacity: 0.35 }} />
        <div className="blob blob-coral absolute"
          style={{ width: 500, height: 500, bottom: '-15%', right: '5%', opacity: 0.3 }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Gradient border card */}
        <div
          className="relative rounded-3xl p-px"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.4) 0%, rgba(255,107,53,0.2) 50%, rgba(167,139,250,0.3) 100%)',
          }}
        >
          <div
            ref={cardRef}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'rgba(8,13,24,0.96)', backdropFilter: 'blur(20px)' }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #00D4FF80, #FF6B3540, transparent)' }}
              aria-hidden="true"
            />

            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(0,212,255,0.07) 0%, transparent 55%)' }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left: Main copy */}
              <div className="lg:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                {/* Brand bar */}
                <div className="cta-item flex items-center gap-3 mb-8">
                  <span
                    className="font-heading font-extrabold text-xs tracking-[0.2em] uppercase"
                    style={{ color: '#00D4FF' }}
                  >
                    AIVIZED
                  </span>
                  <div className="h-px flex-1 max-w-[60px]"
                    style={{ background: 'rgba(0,212,255,0.3)' }} />
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold"
                    style={{ color: 'rgba(240,244,255,0.35)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available for new projects
                  </span>
                </div>

                <h2
                  id="cta-heading"
                  className="cta-item font-heading font-extrabold text-soft-white mb-5 leading-[1.08]"
                  style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
                >
                  Your business deserves to
                  run{' '}
                  <span
                    className="relative inline-block"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #00D4FF 0%, #a78bfa 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    smarter.
                  </span>
                </h2>

                <p className="cta-item font-body text-soft-white/50 text-base leading-relaxed mb-8 max-w-md">
                  Book a 30-minute discovery call. We'll map your biggest time-drains,
                  show you what AI can take off your plate, and be honest about whether we're the right fit.
                </p>

                <div className="cta-item flex flex-col sm:flex-row items-start gap-3">
                  <Link
                    href="/contact"
                    className="btn-primary text-sm px-7 py-3.5 group"
                    aria-label="Book a free discovery call"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar size={16} aria-hidden="true" />
                      Book a Free Call
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                  <Link
                    href="/services"
                    className="btn-secondary text-sm px-7 py-3.5"
                    aria-label="Explore all services"
                  >
                    Explore Services
                  </Link>
                </div>

                <p className="cta-item mt-5 font-body text-soft-white/22 text-xs">
                  No commitment. No pitch. Just a conversation about what's possible.
                </p>
              </div>

              {/* Right: Stats panel */}
              <div
                className="lg:col-span-2 flex flex-col justify-center p-8 sm:p-10 gap-6"
                style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}
              >
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <div key={i} className="cta-item flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: i === 0
                          ? 'rgba(0,212,255,0.10)'
                          : i === 1
                          ? 'rgba(255,107,53,0.10)'
                          : 'rgba(167,139,250,0.10)',
                        border: `1px solid ${
                          i === 0
                            ? 'rgba(0,212,255,0.20)'
                            : i === 1
                            ? 'rgba(255,107,53,0.20)'
                            : 'rgba(167,139,250,0.20)'
                        }`,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{
                          color: i === 0 ? '#00D4FF' : i === 1 ? '#FF6B35' : '#a78bfa',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div
                        className="font-heading font-extrabold text-2xl leading-none mb-0.5"
                        style={{ color: 'rgba(240,244,255,0.92)' }}
                      >
                        {value}
                      </div>
                      <div className="font-body text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>
                        {label}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Divider + trust line */}
                <div
                  className="cta-item pt-4 mt-1"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="font-body text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,255,0.28)' }}>
                    Every client started with one conversation. Most are still with us years later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
