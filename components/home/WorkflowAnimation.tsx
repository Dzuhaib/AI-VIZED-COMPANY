'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import anime from 'animejs'
import {
  Mail, Brain, Phone, CheckCircle,
  ArrowRight, Zap, Clock, Users,
} from 'lucide-react'

/* ─── Workflow steps data ────────────────────── */
const steps = [
  {
    id: 'trigger',
    icon: Mail,
    label: 'Lead arrives',
    sub: 'John S. — real estate',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.2)',
    statusLabel: 'Received',
    statusColor: '#00D4FF',
  },
  {
    id: 'analyze',
    icon: Brain,
    label: 'AI qualifies',
    sub: '97% buying intent',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
    statusLabel: 'Analyzing',
    statusColor: '#a78bfa',
  },
  {
    id: 'call',
    icon: Phone,
    label: 'Voice agent calls',
    sub: 'Auto-dialing now...',
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.08)',
    border: 'rgba(255,107,53,0.2)',
    statusLabel: 'Live call',
    statusColor: '#FF6B35',
  },
  {
    id: 'booked',
    icon: CheckCircle,
    label: 'Meeting booked',
    sub: 'Thu 3pm · confirmed',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
    statusLabel: 'Done ✓',
    statusColor: '#34d399',
  },
]

const metrics = [
  { icon: Zap, value: '< 5 min', label: 'Lead response time' },
  { icon: Users, value: '2.4M+', label: 'Calls handled' },
  { icon: Clock, value: '24 / 7', label: 'Always running' },
]

/* ─── Animated flow dot on connector line ─── */
function FlowConnector({
  active,
  color,
  vertical = false,
}: {
  active: boolean
  color: string
  vertical?: boolean
}) {
  const dotRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !dotRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    anime({
      targets: dotRef.current,
      [vertical ? 'translateY' : 'translateX']: ['0%', '100%'],
      opacity: [0, 1, 1, 0],
      duration: 900,
      easing: 'easeInOutQuad',
      loop: true,
      delay: 200,
    })

    gsap.to(lineRef.current, {
      opacity: 0.6,
      duration: 0.4,
    })
  }, [active, vertical])

  return (
    <div
      className={`relative flex items-center justify-center ${vertical ? 'flex-col' : 'flex-row'}`}
      style={{ [vertical ? 'height' : 'width']: '100%' }}
    >
      {/* Line */}
      <div
        ref={lineRef}
        className={vertical ? 'w-px flex-1' : 'h-px flex-1'}
        style={{ background: `linear-gradient(${vertical ? 'to bottom' : 'to right'}, transparent, ${color}50, transparent)`, opacity: 0.3 }}
      />
      {/* Arrow tip */}
      <ArrowRight
        size={10}
        style={{ color, opacity: active ? 0.7 : 0.2 }}
        className={vertical ? 'rotate-90' : ''}
      />
      {/* Moving dot */}
      <div
        ref={dotRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 6,
          height: 6,
          background: color,
          boxShadow: `0 0 8px ${color}`,
          left: vertical ? '50%' : 0,
          top: vertical ? 0 : '50%',
          transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)',
          opacity: 0,
        }}
      />
    </div>
  )
}

/* ─── Individual step card ───────────────────── */
function StepCard({
  step,
  index,
  activeIndex,
}: {
  step: typeof steps[0]
  index: number
  activeIndex: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const isActive = index <= activeIndex
  const isCurrent = index === activeIndex
  const Icon = step.icon

  useEffect(() => {
    if (!isActive || !cardRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 12, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
    )

    if (isCurrent) {
      anime({
        targets: iconRef.current,
        scale: [1, 1.15, 1],
        duration: 600,
        easing: 'easeOutElastic(1, 0.5)',
      })
    }
  }, [isActive, isCurrent])

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-4 transition-all duration-500 flex-1"
      style={{
        background: isActive ? step.bg : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isActive ? step.border : 'rgba(255,255,255,0.05)'}`,
        opacity: isActive ? 1 : 0.35,
        minWidth: 0,
      }}
    >
      {/* Icon row */}
      <div className="flex items-center justify-between mb-3">
        <div
          ref={iconRef}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: isActive ? `${step.color}18` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isActive ? step.color + '30' : 'transparent'}`,
          }}
        >
          <Icon size={15} style={{ color: isActive ? step.color : '#ffffff40' }} />
        </div>

        {/* Status pill */}
        {isActive && (
          <span
            className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${step.statusColor}14`,
              color: step.statusColor,
              border: `1px solid ${step.statusColor}25`,
            }}
          >
            {isCurrent && step.id !== 'booked' ? (
              <span className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: step.statusColor,
                    animation: 'pulse 1.2s ease-in-out infinite',
                  }}
                />
                {step.statusLabel}
              </span>
            ) : (
              step.statusLabel
            )}
          </span>
        )}
      </div>

      {/* Text */}
      <p
        className="font-heading font-semibold text-sm leading-tight mb-1"
        style={{ color: isActive ? '#F0F4FF' : '#F0F4FF40' }}
      >
        {step.label}
      </p>
      <p
        className="font-body text-xs"
        style={{ color: isActive ? `${step.color}cc` : '#ffffff20' }}
      >
        {step.sub}
      </p>
    </div>
  )
}

/* ─── Main workflow animation component ──────── */
export default function WorkflowAnimation() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Sequence steps through one by one, then loop
  useEffect(() => {
    let step = 0
    setActiveIndex(0)

    const advance = () => {
      step = (step + 1) % steps.length
      setActiveIndex(step)
    }

    // Each step appears 1.2s apart, then full loop resets after a pause
    const interval = setInterval(() => {
      if (step === steps.length - 1) {
        // Pause at final state, then restart
        setTimeout(() => {
          step = -1
          setActiveIndex(-1)
          setTimeout(() => {
            step = 0
            setActiveIndex(0)
          }, 400)
        }, 2400)
      } else {
        advance()
      }
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  // Entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.5 }
    )

    gsap.fromTo(
      metricsRef.current?.querySelectorAll('.metric-item') ?? [],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 1 }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full opacity-0"
      style={{ maxWidth: 560 }}
      aria-hidden="true"
    >
      {/* ── Main card ─────────────────────────────── */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(13, 21, 38, 0.8)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.04)',
        }}
      >
        {/* Header bar */}
        <div
          ref={headerRef}
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: '#34d399',
                boxShadow: '0 0 8px #34d39980',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <span className="font-body text-xs font-medium" style={{ color: '#F0F4FF80' }}>
              Automation running
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
        </div>

        {/* Workflow label */}
        <div className="px-5 pt-4 pb-2">
          <p className="font-heading font-semibold text-xs uppercase tracking-widest" style={{ color: '#F0F4FF40' }}>
            Lead → Close Pipeline
          </p>
        </div>

        {/* Step cards — top row (2 steps) */}
        <div className="px-4 pb-2">
          <div className="flex items-stretch gap-2">
            <StepCard step={steps[0]} index={0} activeIndex={activeIndex} />
            <div className="flex items-center w-8 flex-shrink-0">
              <FlowConnector active={activeIndex >= 1} color={steps[1].color} />
            </div>
            <StepCard step={steps[1]} index={1} activeIndex={activeIndex} />
          </div>
        </div>

        {/* Vertical connector */}
        <div className="px-4 py-1 flex justify-end pr-[calc(50%-16px)]">
          <div className="flex flex-col items-center" style={{ height: 32 }}>
            <FlowConnector active={activeIndex >= 2} color={steps[2].color} vertical />
          </div>
        </div>

        {/* Step cards — bottom row (2 steps) */}
        <div className="px-4 pb-4">
          <div className="flex items-stretch gap-2 flex-row-reverse">
            <StepCard step={steps[2]} index={2} activeIndex={activeIndex} />
            <div className="flex items-center w-8 flex-shrink-0">
              <FlowConnector active={activeIndex >= 3} color={steps[3].color} />
            </div>
            <StepCard step={steps[3]} index={3} activeIndex={activeIndex} />
          </div>
        </div>

        {/* Footer — timing info */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-body text-xs" style={{ color: '#F0F4FF30' }}>
            Time to book: <span style={{ color: '#34d399' }}>4 min 12 sec</span>
          </p>
          <p className="font-body text-xs" style={{ color: '#F0F4FF30' }}>
            12 more in queue
          </p>
        </div>
      </div>

      {/* ── Metric chips below ─────────────────────── */}
      <div ref={metricsRef} className="mt-4 grid grid-cols-3 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon
          return (
            <div
              key={i}
              className="metric-item rounded-2xl px-3 py-3 text-center opacity-0"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Icon size={13} className="mx-auto mb-1.5" style={{ color: '#00D4FF60' }} />
              <p className="font-heading font-bold text-sm" style={{ color: '#F0F4FF' }}>
                {m.value}
              </p>
              <p className="font-body text-[10px] mt-0.5" style={{ color: '#F0F4FF35' }}>
                {m.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* Subtle glow behind the card */}
      <div
        className="absolute -inset-8 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  )
}
