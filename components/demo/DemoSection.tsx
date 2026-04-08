'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MessageSquare } from 'lucide-react'
import VoiceCallCard, { type VoiceCallData } from './VoiceCallCard'
import ChatbotPreviewCard, { type ChatbotData } from './ChatbotPreviewCard'

gsap.registerPlugin(ScrollTrigger)

/* ─── Voice call demos ────────────────────────── */
const voiceCalls: VoiceCallData[] = [
  {
    id: 'restaurant',
    title: 'Restaurant Reservation',
    industry: 'Hospitality',
    scenario: 'AI agent confirms booking, captures dietary needs and special occasion details.',
    accentColor: '#00D4FF',
    agentName: 'Aria',
    transcript: [
      {
        role: 'agent',
        text: "Hi there! This is Aria calling from Bella Vista. I'm reaching out to confirm your reservation for tonight at 7pm for two guests — is that still correct?",
      },
      {
        role: 'customer',
        text: "Yes, that's us!",
      },
      {
        role: 'agent',
        text: "Wonderful! Your table is all confirmed. Is there anything I should know about — any dietary restrictions or perhaps a special occasion?",
      },
      {
        role: 'customer',
        text: "It's actually our anniversary dinner.",
      },
      {
        role: 'agent',
        text: "How lovely! We'll make sure tonight is memorable — I'll note that for the team and have something special arranged. We'll see you at 7!",
      },
      {
        role: 'customer',
        text: "Thank you so much, we're really looking forward to it.",
      },
    ],
  },
  {
    id: 'hotel',
    title: 'Hotel Room Booking',
    industry: 'Travel',
    scenario: 'AI agent proactively calls a warm lead, confirms availability, and closes the booking.',
    accentColor: '#a78bfa',
    agentName: 'Nova',
    transcript: [
      {
        role: 'agent',
        text: "Good afternoon! I'm calling from Grand Plaza Hotel. I noticed you were checking our deluxe room for next weekend — I wanted to confirm availability for you. Are you still interested?",
      },
      {
        role: 'customer',
        text: "Yes, I was looking at Saturday night actually.",
      },
      {
        role: 'agent',
        text: "Perfect timing — I have a deluxe king room available for Saturday night. It's $189 and includes our full breakfast. Shall I go ahead and hold that for you?",
      },
      {
        role: 'customer',
        text: "That sounds great, yes please.",
      },
      {
        role: 'agent',
        text: "Done! You're confirmed for Saturday. I'll send a booking confirmation to your email right now. Is there anything else I can help arrange — airport transfer or early check-in?",
      },
      {
        role: 'customer',
        text: "No that's all, thank you!",
      },
    ],
  },
  {
    id: 'clinic',
    title: 'Aesthetic Clinic Booking',
    industry: 'Healthcare',
    scenario: 'AI agent follows up on a consultation form, schedules appointment and confirms service interest.',
    accentColor: '#FF6B35',
    agentName: 'Luna',
    transcript: [
      {
        role: 'agent',
        text: "Hi! I'm calling from Glow Aesthetics. You filled out our consultation form a few days ago. I wanted to reach out personally — do you have a couple of minutes?",
      },
      {
        role: 'customer',
        text: "Sure, yes I did fill that out.",
      },
      {
        role: 'agent',
        text: "Wonderful! We'd love to get you in for a complimentary skin assessment with Dr. Chen. Do you have any availability this Thursday or Friday?",
      },
      {
        role: 'customer',
        text: "Thursday works for me.",
      },
      {
        role: 'agent',
        text: "I've got you down for Thursday at 2pm with Dr. Chen. Is there a specific treatment you're curious about? I can make sure she's prepared.",
      },
      {
        role: 'customer',
        text: "Yes, I'm interested in the LED light therapy.",
      },
      {
        role: 'agent',
        text: "Perfect, I've noted that. Dr. Chen will walk you through everything. You'll get a reminder the day before — see you Thursday!",
      },
    ],
  },
]

/* ─── Chatbot demo conversations ─────────────── */
const chatbots: ChatbotData[] = [
  {
    id: 'ecommerce',
    title: 'Order & Returns Bot',
    industry: 'E-Commerce',
    description: 'Handles order tracking, address changes, and returns — no human agent needed.',
    accentColor: '#00D4FF',
    messages: [
      { role: 'user',    text: "Hi, where is my order #4521?",                              delay: 600 },
      { role: 'bot',     text: "On it! Let me pull that up right now 🔍",                    delay: 900,  isTyping: true },
      { role: 'bot',     text: "Your order shipped yesterday and is out for delivery today. Estimated arrival: before 3pm 📦",  delay: 1400, isTyping: true },
      { role: 'user',    text: "Can I change the delivery address?",                          delay: 800 },
      { role: 'bot',     text: "Of course! Since it hasn't been picked up yet, I can update that. What's the new address?",    delay: 1000, isTyping: true },
      { role: 'user',    text: "45 Oak Street, same city.",                                   delay: 700 },
      { role: 'bot',     text: "Done! ✅ Delivery address updated to 45 Oak Street. You'll get a new confirmation by email.", delay: 1100, isTyping: true },
    ],
  },
  {
    id: 'restaurant-chat',
    title: 'Table Booking Bot',
    industry: 'Hospitality',
    description: 'Books tables, handles capacity checks, captures dietary preferences, and sends confirmations.',
    accentColor: '#FF6B35',
    messages: [
      { role: 'user', text: "Do you have a table for 4 this Friday at 8pm?",                           delay: 600 },
      { role: 'bot',  text: "Checking Friday evening for you... ✨",                                    delay: 800,  isTyping: true },
      { role: 'bot',  text: "Yes! We have a table available for 4 at 8pm. Would you prefer indoor or outdoor seating?", delay: 1300, isTyping: true },
      { role: 'user', text: "Outdoor please!",                                                          delay: 700 },
      { role: 'bot',  text: "Perfect choice 🌿 Our outdoor terrace is available. Any dietary requirements or allergies I should note?", delay: 1100, isTyping: true },
      { role: 'user', text: "One guest is vegan.",                                                      delay: 700 },
      { role: 'bot',  text: "Noted! Outdoor table for 4, Friday 8pm, one vegan guest. Shall I confirm this under your name?", delay: 1100, isTyping: true },
    ],
  },
  {
    id: 'clinic-chat',
    title: 'Clinic Appointment Bot',
    industry: 'Healthcare',
    description: 'Books appointments, checks doctor availability, and answers treatment FAQs instantly.',
    accentColor: '#a78bfa',
    messages: [
      { role: 'user', text: "What's the earliest I can see a doctor for a general checkup?",            delay: 600 },
      { role: 'bot',  text: "I'll check availability at all our locations right now 🏥",                delay: 900,  isTyping: true },
      { role: 'bot',  text: "Dr. Patel has an opening this Thursday — 10am or 2pm at the downtown clinic. Which works for you?", delay: 1400, isTyping: true },
      { role: 'user', text: "10am please",                                                              delay: 700 },
      { role: 'bot',  text: "Booked! ✅ Thursday at 10am with Dr. Patel, downtown clinic. Do you need a reminder the day before?", delay: 1100, isTyping: true },
      { role: 'user', text: "Yes please",                                                               delay: 600 },
      { role: 'bot',  text: "Done! You'll get a reminder Wednesday evening. Is there anything specific you'd like Dr. Patel to know beforehand?", delay: 1100, isTyping: true },
    ],
  },
]

/* ─── Tab pill ────────────────────────────────── */
function TabPill({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean
  icon: React.ElementType
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300"
      style={{
        background: active ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: active ? '1px solid rgba(0,212,255,0.35)' : '1px solid rgba(255,255,255,0.07)',
        color: active ? '#00D4FF' : 'rgba(240,244,255,0.45)',
      }}
    >
      <Icon size={14} />
      {label}
    </button>
  )
}

/* ─── DemoSection ─────────────────────────────── */
export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="demo-section-heading"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="blob blob-teal absolute"
          style={{ width: 500, height: 500, top: '10%', right: '-10%', opacity: 0.5 }} />
        <div className="blob blob-coral absolute"
          style={{ width: 400, height: 400, bottom: '5%', left: '-8%', opacity: 0.4 }} />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <span className="tag mb-4 inline-flex">Live Demos</span>
          <h2
            id="demo-section-heading"
            className="font-heading font-extrabold text-soft-white mb-4"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Hear it. See it.{' '}
            <span className="gradient-text-teal">Believe it.</span>
          </h2>
          <p className="font-body text-soft-white/45 max-w-lg mx-auto leading-relaxed">
            Real AI agent calls and live chatbot previews — this is exactly what
            your customers experience.
          </p>
        </div>

        {/* ── Voice Calls ─────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <Phone size={15} className="text-teal" />
            </div>
            <h3 className="font-heading font-bold text-soft-white text-lg">Voice Calling Agents</h3>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {voiceCalls.map((call, i) => (
              <VoiceCallCard key={call.id} call={call} index={i} />
            ))}
          </div>
        </div>

        {/* ── Chatbot Previews ─────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <MessageSquare size={15} className="text-coral" />
            </div>
            <h3 className="font-heading font-bold text-soft-white text-lg">AI Chatbot Previews</h3>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {chatbots.map((chat, i) => (
              <ChatbotPreviewCard key={chat.id} chat={chat} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center font-body text-soft-white/25 text-sm mt-10">
          These demos represent real AI agent behavior — trained on your business data, not generic scripts.
        </p>
      </div>
    </section>
  )
}
