'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ArrowRight, Sparkles } from 'lucide-react'
import anime from 'animejs'
import WorkflowAnimation from './WorkflowAnimation'

export default function HeroSection() {
  const blobsRef    = useRef<HTMLDivElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const line1Ref    = useRef<HTMLDivElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const line3Ref    = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const proofRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Ambient blobs fade in
    gsap.fromTo(
      blobsRef.current?.querySelectorAll('.hero-blob') ?? [],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 2.2, stagger: 0.3, ease: 'power2.out' }
    )

    // Staggered text reveal
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 14, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }
    )
    .fromTo(line1Ref.current, { opacity: 0, y: 48, skewX: -1 }, { opacity: 1, y: 0, skewX: 0, duration: 0.7, ease: 'power4.out' }, '-=0.2')
    .fromTo(line2Ref.current, { opacity: 0, y: 48, skewX: -1 }, { opacity: 1, y: 0, skewX: 0, duration: 0.7, ease: 'power4.out' }, '-=0.52')
    .fromTo(line3Ref.current, { opacity: 0, y: 48, skewX: -1 }, { opacity: 1, y: 0, skewX: 0, duration: 0.7, ease: 'power4.out' }, '-=0.52')
    .fromTo(subRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.3')
    .fromTo(ctaRef.current,   { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' }, '-=0.35')
    .fromTo(proofRef.current, { opacity: 0 },         { opacity: 1, duration: 0.5 },                           '-=0.2')

    // Badge dot pulse
    anime({
      targets: badgeRef.current?.querySelector('.badge-dot'),
      scale: [1, 1.7, 1],
      opacity: [0.8, 1, 0.8],
      duration: 2200,
      loop: true,
      easing: 'easeInOutSine',
    })
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
      data-barba-namespace="home"
    >
      {/* ── Organic ambient blobs ─────────────────── */}
      <div ref={blobsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob blob blob-teal absolute" style={{ width: 680, height: 680, top: '-18%', left: '-12%' }} />
        <div className="hero-blob blob blob-coral absolute" style={{ width: 480, height: 480, bottom: '-8%', right: '30%' }} />
        <div
          className="hero-blob absolute"
          style={{
            width: 360, height: 360,
            top: '25%', right: '5%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* ── Layout ────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-7rem)]">

          {/* ── LEFT — text ──────────────────────── */}
          <div className="flex-1 flex flex-col justify-center lg:max-w-[52%]">

            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 mb-8 self-start opacity-0"
              style={{
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: 100,
                padding: '6px 14px 6px 10px',
              }}
            >
              <span
                className="badge-dot w-2 h-2 rounded-full"
                style={{ background: '#00D4FF', boxShadow: '0 0 8px #00D4FF' }}
                aria-hidden="true"
              />
              <span className="text-teal text-xs font-body font-medium tracking-wide">
                AI-Powered Business Solutions
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-extrabold tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5.2rem)', lineHeight: 1.02 }}
            >
              <div ref={line1Ref} className="opacity-0">
                <span className="block text-soft-white">We build the</span>
              </div>
              <div ref={line2Ref} className="opacity-0">
                <span className="block gradient-text-teal">intelligence</span>
              </div>
              <div ref={line3Ref} className="opacity-0">
                <span className="block text-soft-white">
                  behind your{' '}
                  <span className="gradient-text-warm">business.</span>
                </span>
              </div>
            </h1>

            {/* Subtext */}
            <p
              ref={subRef}
              className="text-soft-white/55 font-body leading-relaxed mb-10 opacity-0"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', maxWidth: '44ch' }}
            >
              Your team is brilliant at what they do. Let AI handle the rest —
              the calls, the handoffs, the questions at midnight. We build
              systems that run even when you don't.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-start gap-3 mb-10 opacity-0"
            >
              <Link href="/contact" className="btn-primary text-base px-7 py-3.5 group" aria-label="Book a discovery call">
                <Sparkles size={15} aria-hidden="true" />
                <span className="relative z-10">Book a Call</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform relative z-10" aria-hidden="true" />
              </Link>
              <Link href="/work" className="btn-secondary text-base px-7 py-3.5" aria-label="See case studies">
                See Our Work
              </Link>
            </div>

            {/* Social proof */}
            <div ref={proofRef} className="flex items-center gap-4 opacity-0">
              <div className="flex -space-x-2">
                {[
                  { l: 'M', teal: true }, { l: 'P', teal: false },
                  { l: 'J', teal: true }, { l: 'S', teal: false },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                    style={{
                      background: a.teal ? 'rgba(0,212,255,0.15)' : 'rgba(255,107,53,0.15)',
                      color: a.teal ? '#00D4FF' : '#FF6B35',
                      border: '2px solid #0a0e1a',
                    }}
                    aria-hidden="true"
                  >
                    {a.l}
                  </div>
                ))}
              </div>
              <p className="text-soft-white/35 text-sm font-body">
                Trusted by <strong className="text-soft-white/60 font-medium">80+ teams</strong>{' '}
                across e-commerce, SaaS, healthcare &amp; real estate
              </p>
            </div>
          </div>

          {/* ── RIGHT — Workflow animation ─────────── */}
          <div className="flex-1 flex items-center justify-center w-full">
            <WorkflowAnimation />
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-soft-white/20 text-[10px] font-body tracking-[0.2em] uppercase">scroll</span>
        <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(240,244,255,0.08)' }}>
          <div className="w-full bg-teal" style={{ height: '40%', animation: 'scroll-line 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(350%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
      `}</style>
    </section>
  )
}
