'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'

interface Result {
  value: number
  suffix: string
  label: string
  decimals?: number
}

interface CaseStudyCardProps {
  slug: string
  industry: string
  company: string
  challenge: string
  solution: string
  results: Result[]
  accentColor: string
  index: number
}

export default function CaseStudyCard({
  slug,
  industry,
  company,
  challenge,
  solution,
  results,
  accentColor,
  index,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/work/${slug}`}
        className="glass-card rounded-2xl p-8 flex flex-col h-full group hover:border-teal/30 transition-all duration-300 hover:-translate-y-1 block"
        aria-label={`Case study: ${company} — ${industry}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span
              className="tag mb-3 inline-flex"
              style={{
                background: `${accentColor}15`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
              aria-label={`Industry: ${industry}`}
            >
              {industry}
            </span>
            <h3 className="font-heading font-bold text-xl text-soft-white">
              {company}
            </h3>
          </div>
          <ArrowRight
            size={18}
            className="text-soft-white/20 group-hover:text-teal group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
            aria-hidden="true"
          />
        </div>

        {/* Challenge */}
        <div className="mb-4">
          <span className="text-xs font-body font-medium text-soft-white/30 uppercase tracking-widest">
            Challenge
          </span>
          <p className="font-body text-soft-white/60 text-sm leading-relaxed mt-1">
            {challenge}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-8">
          <span className="text-xs font-body font-medium text-soft-white/30 uppercase tracking-widest">
            What we built
          </span>
          <p className="font-body text-soft-white/60 text-sm leading-relaxed mt-1">
            {solution}
          </p>
        </div>

        {/* Results */}
        <div
          className="mt-auto pt-6 border-t grid grid-cols-3 gap-4"
          style={{ borderColor: `${accentColor}20` }}
          aria-label="Results"
        >
          {results.map((result, i) => (
            <div key={i} className="text-center">
              <div
                className="font-heading font-extrabold text-2xl"
                style={{ color: accentColor }}
              >
                <AnimatedCounter
                  end={result.value}
                  suffix={result.suffix}
                  decimals={result.decimals ?? 0}
                  duration={1800}
                />
              </div>
              <div className="font-body text-soft-white/40 text-xs mt-1 leading-tight">
                {result.label}
              </div>
            </div>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}
