'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface FAQItem {
  q: string
  a: string
}

function FAQRow({ item, index, isOpen, onToggle }: {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? 'rgba(0,212,255,0.04)' : 'rgba(13,20,35,0.6)',
        border: `1px solid ${isOpen ? 'rgba(0,212,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className="font-heading font-semibold text-sm sm:text-base leading-snug"
          style={{ color: isOpen ? 'rgba(240,244,255,0.95)' : 'rgba(240,244,255,0.70)' }}
        >
          {item.q}
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(0,212,255,0.14)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isOpen ? 'rgba(0,212,255,0.30)' : 'rgba(255,255,255,0.08)'}`,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          <Plus size={13} style={{ color: isOpen ? '#00D4FF' : 'rgba(240,244,255,0.35)' }} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p
              className="font-body text-sm leading-relaxed px-6 pb-5"
              style={{ color: 'rgba(240,244,255,0.50)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection({
  faqs,
  heading = 'Questions we hear a lot',
  subheading = "If yours isn't here, just ask us directly.",
}: {
  faqs: FAQItem[]
  heading?: string
  subheading?: string
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 84%', once: true } }
      )
      gsap.fromTo(
        listRef.current?.querySelectorAll('.faq-row') ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggle = (i: number) => setOpenIdx(prev => prev === i ? null : i)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={headRef} className="mb-12 text-center">
          <span className="tag mb-4 inline-flex">FAQ</span>
          <h2
            id="faq-heading"
            className="font-heading font-extrabold text-soft-white mb-3"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', lineHeight: 1.15 }}
          >
            {heading}
          </h2>
          <p className="font-body text-soft-white/40 text-sm">{subheading}</p>
        </div>

        <div ref={listRef} className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="faq-row">
              <FAQRow
                item={item}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
