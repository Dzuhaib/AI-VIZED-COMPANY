'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import anime from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Globe, Cpu, CheckCircle2, CalendarCheck, Database,
  ShoppingCart, CreditCard, Package2, Truck, BellRing,
  MessageCircle, ScanSearch, GitBranch, Zap, CheckCheck,
  Workflow,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface WorkflowStep {
  icon: React.ElementType
  label: string
  sub: string
}

interface WorkflowData {
  id: string
  title: string
  description: string
  accentColor: string
  stat: string
  statLabel: string
  steps: WorkflowStep[]
}

const workflows: WorkflowData[] = [
  {
    id: 'lead-qual',
    title: 'Lead Qualification',
    description: 'Every lead scored and routed before a human sees it.',
    accentColor: '#00D4FF',
    stat: '< 3s',
    statLabel: 'per lead',
    steps: [
      { icon: Globe,         label: 'Form Submit',      sub: 'Website / Landing' },
      { icon: Cpu,           label: 'AI Scores Lead',   sub: 'Intent + fit analysis' },
      { icon: CheckCircle2,  label: 'Qualifies',        sub: 'Threshold auto-check' },
      { icon: CalendarCheck, label: 'Books Call',       sub: 'Calendly / Cal.com' },
      { icon: Database,      label: 'CRM Updated',      sub: 'HubSpot / Salesforce' },
    ],
  },
  {
    id: 'order-flow',
    title: 'Order Fulfillment',
    description: 'Payment to doorstep — no one has to touch it.',
    accentColor: '#FF6B35',
    stat: '100%',
    statLabel: 'automated',
    steps: [
      { icon: ShoppingCart, label: 'Order Placed',       sub: 'Shopify / WooCommerce' },
      { icon: CreditCard,   label: 'Payment Confirmed',  sub: 'Stripe processes' },
      { icon: Package2,     label: 'Stock Updated',      sub: 'Inventory adjusted' },
      { icon: Truck,        label: 'Label Created',      sub: 'Carrier assigned' },
      { icon: BellRing,     label: 'Customer Notified',  sub: 'Email + SMS sent' },
    ],
  },
  {
    id: 'support',
    title: 'Support Triage',
    description: 'Most tickets answered before your team reads them.',
    accentColor: '#a78bfa',
    stat: '78%',
    statLabel: 'auto-resolved',
    steps: [
      { icon: MessageCircle, label: 'Ticket Arrives',  sub: 'Any channel' },
      { icon: ScanSearch,    label: 'AI Reads It',     sub: 'Intent + urgency' },
      { icon: GitBranch,     label: 'Smart Route',     sub: 'By topic + agent' },
      { icon: Zap,           label: 'Auto-Reply',      sub: 'Under 2 seconds' },
      { icon: CheckCheck,    label: 'Resolved',        sub: 'Logged + closed' },
    ],
  },
]

/* ─── Animated connector line ──────────────────── */
function Connector({
  active,
  done,
  color,
}: {
  active: boolean
  done: boolean
  color: string
}) {
  const fillRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fillRef.current || !dotRef.current) return

    if (active) {
      anime.remove([fillRef.current, dotRef.current])
      anime({
        targets: fillRef.current,
        scaleY: [0, 1],
        duration: 720,
        easing: 'easeInOutQuad',
      })
      anime({
        targets: dotRef.current,
        translateY: [0, 44],
        opacity: [0, 1, 1, 0],
        duration: 720,
        easing: 'easeInQuad',
      })
    } else if (!done) {
      // Reset when neither active nor done (loop restart)
      anime.remove([fillRef.current, dotRef.current])
      anime({ targets: fillRef.current, scaleY: 0, duration: 0 })
      anime({ targets: dotRef.current, translateY: 0, opacity: 0, duration: 0 })
    }
  }, [active, done])

  return (
    <div className="ml-[14px] py-0.5">
      <div className="relative w-0.5 h-11">
        {/* Track */}
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(255,255,255,0.07)' }} />
        {/* Animated fill */}
        <div
          ref={fillRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to bottom, ${color}, ${color}55)`,
            transformOrigin: 'top',
            transform: 'scaleY(0)',
          }}
        />
        {/* Traveling dot */}
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
          style={{
            top: -5,
            background: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}66`,
            opacity: 0,
          }}
        />
      </div>
    </div>
  )
}

/* ─── Single workflow step node ────────────────── */
function WorkflowNode({
  step,
  isActive,
  isDone,
  color,
}: {
  step: WorkflowStep
  isActive: boolean
  isDone: boolean
  color: string
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const Icon = step.icon

  useEffect(() => {
    if (!nodeRef.current || !isActive) return
    anime({
      targets: nodeRef.current,
      scale: [1, 1.18, 1.06],
      duration: 480,
      easing: 'easeOutElastic(1, 0.5)',
    })
  }, [isActive])

  return (
    <div className="flex items-center gap-3">
      <div
        ref={nodeRef}
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: isActive
            ? `${color}22`
            : isDone
            ? `${color}0e`
            : 'rgba(255,255,255,0.04)',
          border: `1px solid ${
            isActive
              ? color + '60'
              : isDone
              ? color + '28'
              : 'rgba(255,255,255,0.08)'
          }`,
          boxShadow: isActive ? `0 0 18px ${color}35` : 'none',
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
        }}
      >
        <Icon
          size={14}
          style={{
            color: isActive
              ? color
              : isDone
              ? color + 'aa'
              : 'rgba(240,244,255,0.22)',
            transition: 'color 0.35s ease',
          }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="font-heading font-semibold text-xs leading-none mb-0.5 truncate"
          style={{
            color: isActive
              ? 'rgba(240,244,255,0.92)'
              : isDone
              ? 'rgba(240,244,255,0.48)'
              : 'rgba(240,244,255,0.28)',
            transition: 'color 0.35s ease',
          }}
        >
          {step.label}
        </p>
        <p
          className="font-body text-[10px] truncate"
          style={{
            color: isActive ? color + 'cc' : 'rgba(240,244,255,0.18)',
            transition: 'color 0.35s ease',
          }}
        >
          {step.sub}
        </p>
      </div>

      {isActive && (
        <div
          className="flex-shrink-0 flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{
            background: `${color}15`,
            color: color,
            border: `1px solid ${color}28`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color, animation: 'pulse 1s ease-in-out infinite' }}
          />
          Live
        </div>
      )}
    </div>
  )
}

/* ─── Workflow card ────────────────────────────── */
function AutomationWorkflowCard({
  workflow,
  index,
}: {
  workflow: WorkflowData
  index: number
}) {
  const [activeStep, setActiveStep] = useState(-1)
  const cardRef  = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInView = useInView(cardRef as React.RefObject<Element>, { once: true, margin: '-60px' })

  const runCycle = (step: number) => {
    setActiveStep(step)
    if (step < workflow.steps.length - 1) {
      timerRef.current = setTimeout(() => runCycle(step + 1), 1150)
    } else {
      timerRef.current = setTimeout(() => {
        setActiveStep(-1)
        timerRef.current = setTimeout(() => runCycle(0), 700)
      }, 2400)
    }
  }

  useEffect(() => {
    if (!isInView) return
    timerRef.current = setTimeout(() => runCycle(0), index * 380)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  const onEnter = () => gsap.to(cardRef.current, { y: -5, duration: 0.24, ease: 'power2.out' })
  const onLeave = () => gsap.to(cardRef.current, { y: 0,  duration: 0.24, ease: 'power2.out' })

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="rounded-2xl p-5 flex flex-col"
      style={{
        background: 'rgba(13, 20, 35, 0.72)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${workflow.accentColor}14`,
              border: `1px solid ${workflow.accentColor}28`,
            }}
          >
            <Workflow size={14} style={{ color: workflow.accentColor }} />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading font-bold text-soft-white text-sm leading-tight">
              {workflow.title}
            </h3>
            <p
              className="font-body text-[10px] mt-0.5 leading-snug"
              style={{ color: 'rgba(240,244,255,0.35)' }}
            >
              {workflow.description}
            </p>
          </div>
        </div>
        {/* Stat */}
        <div className="flex-shrink-0 text-right">
          <div
            className="font-heading font-extrabold text-lg leading-none"
            style={{ color: workflow.accentColor }}
          >
            {workflow.stat}
          </div>
          <div
            className="font-body text-[9px] mt-0.5"
            style={{ color: 'rgba(240,244,255,0.28)' }}
          >
            {workflow.statLabel}
          </div>
        </div>
      </div>

      {/* Node list */}
      <div className="flex flex-col">
        {workflow.steps.map((step, i) => (
          <div key={i}>
            <WorkflowNode
              step={step}
              isActive={activeStep === i}
              isDone={activeStep > i}
              color={workflow.accentColor}
            />
            {i < workflow.steps.length - 1 && (
              <Connector
                active={activeStep === i + 1}
                done={activeStep > i + 1}
                color={workflow.accentColor}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────── */
export default function AutomationWorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
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
      className="relative py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="workflow-section-heading"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="blob blob-teal absolute"
          style={{ width: 450, height: 450, top: '5%', left: '-8%', opacity: 0.4 }}
        />
        <div
          className="blob blob-coral absolute"
          style={{ width: 380, height: 380, bottom: '10%', right: '-6%', opacity: 0.35 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <span className="tag mb-4 inline-flex">Automation Workflows</span>
          <h2
            id="workflow-section-heading"
            className="font-heading font-extrabold text-soft-white mb-4"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Your workflow runs{' '}
            <span className="gradient-text-teal">while you sleep.</span>
          </h2>
          <p className="font-body text-soft-white/45 max-w-lg mx-auto leading-relaxed">
            Every step connected, every action automatic. Watch how your data moves
            from trigger to outcome — no one has to touch it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {workflows.map((workflow, i) => (
            <AutomationWorkflowCard key={workflow.id} workflow={workflow} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
