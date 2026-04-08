'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import anime from 'animejs'
import { ChevronDown, type LucideIcon } from 'lucide-react'

interface ServiceFeature {
  title: string
  description: string
}

interface ServiceBlockProps {
  id: string
  icon: LucideIcon
  color: string
  number: string
  title: string
  tagline: string
  body: string
  features: ServiceFeature[]
  howItWorks: string[]
}

export default function ServiceBlock({
  id,
  icon: Icon,
  color,
  number,
  title,
  tagline,
  body,
  features,
  howItWorks,
}: ServiceBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        rotate: isExpanded ? [15, 0] : [0, 15],
        scale: isExpanded ? [1.1, 1] : [1, 1.1],
        duration: 400,
        easing: 'easeOutElastic(1, 0.5)',
      })
    }
    if (btnRef.current) {
      anime({
        targets: btnRef.current.querySelector('.chevron-icon'),
        rotate: isExpanded ? [180, 0] : [0, 180],
        duration: 350,
        easing: 'easeInOutCubic',
      })
    }
  }

  return (
    <div
      id={id}
      className="glass-card rounded-2xl overflow-hidden"
      aria-labelledby={`service-${id}-title`}
    >
      {/* Main content */}
      <div className="p-8 lg:p-12">
        <div className="flex items-start gap-6 flex-col sm:flex-row">
          {/* Icon */}
          <div
            ref={iconRef}
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}30`,
            }}
            aria-hidden="true"
          >
            <Icon size={28} style={{ color }} />
          </div>

          {/* Header */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-heading font-extrabold text-5xl opacity-10 leading-none"
                style={{ color }}
                aria-hidden="true"
              >
                {number}
              </span>
              <h2
                id={`service-${id}-title`}
                className="font-heading font-bold text-2xl sm:text-3xl text-soft-white"
              >
                {title}
              </h2>
            </div>
            <p className="font-body font-medium text-sm mb-4" style={{ color }}>
              {tagline}
            </p>
            <p className="font-body text-soft-white/60 text-base leading-relaxed max-w-2xl">
              {body}
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-8 flex flex-wrap gap-3" aria-label={`${title} features`}>
          {features.map((feat, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-lg text-sm font-body"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}20`,
                color: `${color}`,
              }}
            >
              {feat.title}
            </div>
          ))}
        </div>

        {/* Expand button */}
        <button
          ref={btnRef}
          onClick={handleToggle}
          className="mt-6 flex items-center gap-2 text-sm font-body font-medium transition-all duration-200 hover:opacity-80 focus:outline-none"
          style={{ color }}
          aria-expanded={isExpanded}
          aria-controls={`${id}-details`}
        >
          {isExpanded ? 'Hide details' : 'See how it works'}
          <ChevronDown
            size={16}
            className={`chevron-icon transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Expandable section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`${id}-details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div
              className="px-8 lg:px-12 pb-8 lg:pb-12 border-t"
              style={{ borderColor: `${color}20` }}
            >
              <h3 className="font-heading font-semibold text-soft-white text-lg mt-8 mb-6">
                How it works
              </h3>
              <ol className="space-y-4">
                {howItWorks.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold mt-0.5"
                      style={{
                        background: `${color}20`,
                        color,
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="font-body text-soft-white/70 text-sm leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
