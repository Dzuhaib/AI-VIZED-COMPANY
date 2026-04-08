'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import {
  Mail, Clock, Globe, Calendar,
  ArrowRight, Send, MessageSquare, Phone,
} from 'lucide-react'
import anime from 'animejs'
import ContactForm from '@/components/contact/ContactForm'
import FAQSection, { type FAQItem } from '@/components/shared/FAQSection'

gsap.registerPlugin(ScrollTrigger)

const contactFaqs: FAQItem[] = [
  {
    q: "What happens after I submit the contact form?",
    a: "You'll hear from us within 1 business day — usually sooner. We'll review what you've shared, ask any clarifying questions, and propose a time to talk. No automated sequences, no drip campaign. A real person replies.",
  },
  {
    q: "Is the discovery call actually free?",
    a: "Yes. No catch. We use it to understand your situation and decide together if we're the right fit. If we're not, we'll tell you — and often point you toward what would actually work better.",
  },
  {
    q: "What should I prepare for the first call?",
    a: "Just a rough description of what's slow, broken, or repetitive in your business. You don't need a spec document or technical knowledge. The clearer you can describe the pain, the more useful the call will be.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. If you need an NDA before sharing sensitive business details, we'll sign one. Just mention it when you get in touch.",
  },
  {
    q: "Do you work with clients outside of your time zone?",
    a: "Yes — our team is distributed across time zones and we have clients on multiple continents. We find overlap for calls and handle most communication async.",
  },
]

/* ─── Animated world map ──────────────────────── */
const cities = [
  { x: 22, y: 42, name: 'New York' },
  { x: 47, y: 29, name: 'London' },
  { x: 59, y: 44, name: 'Dubai' },
  { x: 74, y: 51, name: 'Singapore' },
  { x: 81, y: 65, name: 'Sydney' },
]

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 2], [1, 3],
]

function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const paths = Array.from(svgRef.current.querySelectorAll('.conn-path'))
    paths.forEach((path) => {
      const len = (path as SVGPathElement).getTotalLength?.() ?? 80
      anime.set(path, { strokeDasharray: len, strokeDashoffset: len })
    })
    anime({
      targets: paths,
      strokeDashoffset: 0,
      duration: 1800,
      delay: anime.stagger(200, { start: 400 }),
      easing: 'easeInOutQuad',
    })
  }, [])

  return (
    <div
      className="relative h-52 rounded-2xl overflow-hidden"
      style={{ background: 'rgba(6,10,20,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 60"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Latitude grid */}
        {[10, 20, 30, 40, 50].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y}
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />
        ))}
        {/* Longitude grid */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="60"
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />
        ))}
        {/* Connection paths */}
        {connections.map(([f, t], i) => (
          <path
            key={i}
            className="conn-path"
            d={`M ${cities[f].x} ${cities[f].y} Q ${(cities[f].x + cities[t].x) / 2} ${Math.min(cities[f].y, cities[t].y) - 8} ${cities[t].x} ${cities[t].y}`}
            fill="none"
            stroke="#00D4FF"
            strokeWidth="0.45"
            strokeOpacity="0.35"
          />
        ))}
      </svg>

      {/* Pulsing city dots */}
      {cities.map((city, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <span
            className="absolute block rounded-full border border-teal/40 animate-ping"
            style={{
              width: 20, height: 20,
              top: -8, left: -8,
              animationDuration: '2.2s',
              animationDelay: `${i * 0.45}s`,
            }}
          />
          <span
            className="absolute block rounded-full border border-teal/20 animate-ping"
            style={{
              width: 30, height: 30,
              top: -13, left: -13,
              animationDuration: '2.8s',
              animationDelay: `${i * 0.45 + 0.5}s`,
            }}
          />
          <div
            className="w-2 h-2 rounded-full relative z-10"
            style={{ background: '#00D4FF', boxShadow: '0 0 8px #00D4FF88' }}
          />
          <span
            className="absolute whitespace-nowrap font-body"
            style={{ top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 6, color: 'rgba(240,244,255,0.35)' }}
          >
            {city.name}
          </span>
        </div>
      ))}

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 65%)' }}
      />
      <p
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 font-body uppercase tracking-widest whitespace-nowrap"
        style={{ fontSize: 8, color: 'rgba(240,244,255,0.22)' }}
      >
        Remote-first · Clients worldwide
      </p>
    </div>
  )
}

/* ─── Animated contact info card ─────────────── */
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  index,
  animType,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
  color: string
  index: number
  animType: 'pulse' | 'float' | 'spin' | 'shake'
}) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!iconRef.current) return
    const el = iconRef.current

    // Entrance
    anime({
      targets: el,
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 550,
      delay: index * 120,
      easing: 'easeOutElastic(1, 0.55)',
    })

    // Continuous signature animation per icon
    const delay = index * 400

    if (animType === 'float') {
      anime({
        targets: el,
        translateY: [-3, 3],
        duration: 2200,
        delay,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      })
    } else if (animType === 'pulse') {
      anime({
        targets: el,
        scale: [1, 1.12, 1],
        duration: 1800,
        delay,
        easing: 'easeInOutQuad',
        loop: true,
      })
    } else if (animType === 'spin') {
      anime({
        targets: el,
        rotate: 360,
        duration: 8000,
        delay,
        easing: 'linear',
        loop: true,
      })
    } else if (animType === 'shake') {
      const shake = () => {
        anime({
          targets: el,
          rotate: [-6, 6, -6, 6, 0],
          duration: 500,
          easing: 'easeInOutSine',
        })
        setTimeout(shake, 3000 + delay)
      }
      setTimeout(shake, 1200 + delay)
    }
  }, [animType, index])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 rounded-2xl"
      style={{
        background: 'rgba(13,20,35,0.65)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        ref={iconRef}
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `${color}14`,
          border: `1px solid ${color}28`,
          boxShadow: `0 0 16px ${color}18`,
        }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <p className="font-body text-[10px] uppercase tracking-widest mb-0.5"
          style={{ color: 'rgba(240,244,255,0.35)' }}>
          {label}
        </p>
        {href ? (
          <a href={href}
            className="font-body text-sm font-medium transition-colors hover:text-teal"
            style={{ color: 'rgba(240,244,255,0.82)' }}>
            {value}
          </a>
        ) : (
          <p className="font-body text-sm font-medium" style={{ color: 'rgba(240,244,255,0.82)' }}>
            {value}
          </p>
        )}
      </div>
    </motion.div>
  )
}

/* ─── "What happens next" steps ──────────────── */
const processSteps = [
  {
    icon: Send,
    color: '#00D4FF',
    step: '01',
    label: 'You reach out',
    sub: 'Fill the form or email us directly. A few sentences about the problem is enough.',
  },
  {
    icon: MessageSquare,
    color: '#FF6B35',
    step: '02',
    label: 'We review & reply',
    sub: 'A real person reads your message and replies within 1 business day.',
  },
  {
    icon: Phone,
    color: '#a78bfa',
    step: '03',
    label: '30-min discovery call',
    sub: "We talk through your situation honestly. If we can help, we'll say how. If not, we'll tell you.",
  },
]

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('.process-step'),
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      }
    )
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
      {processSteps.map(({ icon: Icon, color, step, label, sub }, i) => (
        <div
          key={i}
          className="process-step relative rounded-2xl p-5 flex flex-col gap-3"
          style={{
            background: 'rgba(13,20,35,0.65)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Step number */}
          <span
            className="font-heading font-extrabold text-4xl absolute top-4 right-5 leading-none select-none"
            style={{ color: 'rgba(255,255,255,0.04)' }}
          >
            {step}
          </span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}14`, border: `1px solid ${color}28` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-soft-white text-sm mb-1">{label}</h3>
            <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(240,244,255,0.42)' }}>
              {sub}
            </p>
          </div>
          {/* Connector arrow */}
          {i < processSteps.length - 1 && (
            <div
              className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center"
              style={{ background: 'rgba(13,20,35,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
              aria-hidden="true"
            >
              <ArrowRight size={11} style={{ color: 'rgba(240,244,255,0.3)' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Page ────────────────────────────────────── */
export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.hero-text') ?? [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen">

      {/* ── Hero ──────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="contact-heading"
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="blob blob-teal absolute"
            style={{ width: 500, height: 500, top: '-10%', right: '-5%', opacity: 0.45 }} />
          <div className="blob blob-coral absolute"
            style={{ width: 380, height: 380, bottom: '-5%', left: '-8%', opacity: 0.35 }} />
        </div>

        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10">
          <div className="hero-text">
            <span className="tag mb-6 inline-flex">Get in Touch</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                id="contact-heading"
                className="hero-text font-heading font-extrabold text-soft-white mb-6 leading-[1.08]"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
              >
                Let's talk about{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #00D4FF 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  what's possible.
                </span>
              </h1>
              <p className="hero-text font-body text-soft-white/50 text-lg leading-relaxed mb-8 max-w-md">
                Tell us what's slowing your business down. We'll be honest about
                whether we can help — and what that would actually look like.
              </p>
              <div className="hero-text flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-body"
                  style={{ color: 'rgba(240,244,255,0.45)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available for new projects
                </div>
                <div className="flex items-center gap-2 text-sm font-body"
                  style={{ color: 'rgba(240,244,255,0.45)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Reply within 1 business day
                </div>
              </div>
            </div>

            {/* Hero decorative card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block rounded-3xl p-px"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.3) 0%, rgba(167,139,250,0.2) 100%)',
              }}
            >
              <div className="rounded-3xl p-7"
                style={{ background: 'rgba(8,13,24,0.97)', backdropFilter: 'blur(16px)' }}>
                <p className="font-body text-xs uppercase tracking-widest mb-5"
                  style={{ color: 'rgba(240,244,255,0.3)' }}>
                  What a typical first message looks like
                </p>
                {[
                  { q: "We're a clinic handling 200+ calls/week — most are appointment bookings.", color: '#00D4FF' },
                  { q: "Our support team spends 4 hours/day on the same 10 questions.", color: '#FF6B35' },
                  { q: "We lose leads because no one follows up fast enough.", color: '#a78bfa' },
                ].map((item, i) => (
                  <div key={i}
                    className="flex items-start gap-3 mb-4 last:mb-0 p-3 rounded-xl"
                    style={{ background: `${item.color}08`, border: `1px solid ${item.color}18` }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: item.color }} />
                    <p className="font-body text-xs leading-relaxed"
                      style={{ color: 'rgba(240,244,255,0.60)' }}>
                      {item.q}
                    </p>
                  </div>
                ))}
                <p className="font-body text-[11px] mt-5" style={{ color: 'rgba(240,244,255,0.25)' }}>
                  Any of these sound familiar? That's enough for us to start.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── What happens next ─────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Process steps">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="tag mb-3 inline-flex">The Process</span>
            <h2 className="font-heading font-bold text-soft-white text-xl">
              What happens after you reach out
            </h2>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Main content ──────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Contact options">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: contact info + map + calendly */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-heading font-bold text-soft-white text-xl mb-6">
              Reach us directly
            </h2>

            {/* Contact cards with animated icons */}
            <ContactCard
              icon={Clock} label="Response time" value="Within 1 business day"
              color="#00D4FF" index={0} animType="pulse"
            />
            <ContactCard
              icon={Globe} label="Where we work" value="Remote-first, clients worldwide"
              color="#a78bfa" index={1} animType="spin"
            />
            <ContactCard
              icon={Mail} label="Direct email" value="hello@aivized.com"
              href="mailto:hello@aivized.com"
              color="#FF6B35" index={2} animType="shake"
            />

            {/* Animated world map */}
            <div>
              <p className="font-body text-[10px] uppercase tracking-widest mb-2"
                style={{ color: 'rgba(240,244,255,0.28)' }}>
                Our clients span the globe
              </p>
              <WorldMap />
            </div>

            {/* Calendly CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(13,20,35,0.65)',
                border: '1px solid rgba(255,107,53,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)' }}>
                  <Calendar size={16} className="text-coral" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-soft-white text-sm">
                    Prefer to book directly?
                  </h3>
                  <p className="font-body text-[10px]" style={{ color: 'rgba(240,244,255,0.35)' }}>
                    Skip the form entirely
                  </p>
                </div>
              </div>
              <p className="font-body text-xs leading-relaxed mb-4"
                style={{ color: 'rgba(240,244,255,0.45)' }}>
                Book a 30-minute discovery call and we'll come prepared with questions specific to your industry.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-xs py-2.5"
                aria-label="Book a discovery call on Calendly"
              >
                <Calendar size={13} aria-hidden="true" />
                Book on Calendly
              </a>
            </motion.div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-soft-white text-xl mb-1.5">
                Send us a message
              </h2>
              <p className="font-body text-soft-white/40 text-sm">
                The more context you give us, the better our first conversation will be.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FAQ ───────────────────────────────── */}
      <FAQSection
        faqs={contactFaqs}
        heading="Before you reach out"
        subheading="Common questions from people in your position."
      />
    </div>
  )
}
