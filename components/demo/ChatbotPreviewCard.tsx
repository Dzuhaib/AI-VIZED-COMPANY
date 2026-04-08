'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, RefreshCw } from 'lucide-react'
import { gsap } from 'gsap'
import { useInView } from 'framer-motion'

export interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  delay: number   // ms after previous message to appear
  isTyping?: boolean // show typing indicator before this message
}

export interface ChatbotData {
  id: string
  title: string
  industry: string
  description: string
  accentColor: string
  messages: ChatMessage[]
}

/* ─── Individual message bubble ──────────────── */
function ChatBubble({ msg, color }: { msg: ChatMessage; color: string }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex gap-2 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {isBot && (
        <div
          className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-heading font-bold mt-0.5"
          style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
          aria-hidden="true"
        >
          AI
        </div>
      )}
      <div
        className="max-w-[82%] rounded-2xl px-3 py-2"
        style={{
          background: isBot ? `${color}14` : 'rgba(255,255,255,0.07)',
          border: `1px solid ${isBot ? color + '22' : 'rgba(255,255,255,0.08)'}`,
          borderBottomLeftRadius: isBot ? 4 : undefined,
          borderBottomRightRadius: !isBot ? 4 : undefined,
        }}
      >
        <p className="font-body text-[12px] leading-relaxed" style={{ color: 'rgba(240,244,255,0.82)' }}>
          {msg.text}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Typing dots indicator ───────────────────── */
function TypingIndicator({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2 }}
      className="flex gap-2"
    >
      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-heading font-bold"
        style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
        AI
      </div>
      <div className="rounded-2xl px-3 py-2.5 flex items-center gap-1"
        style={{ background: `${color}12`, border: `1px solid ${color}20`, borderBottomLeftRadius: 4 }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full block"
            style={{
              background: color,
              animation: 'chat-dot 1.1s ease-in-out infinite',
              animationDelay: `${i * 0.18}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Chat preview card ───────────────────────── */
export default function ChatbotPreviewCard({
  chat,
  index,
}: {
  chat: ChatbotData
  index: number
}) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [loopCount, setLoopCount] = useState(0)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef as React.RefObject<Element>, { once: true, margin: '-60px' })
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const runConversation = () => {
    clearAllTimeouts()
    setVisibleMessages([])
    setShowTyping(false)

    let cumulativeDelay = 600

    chat.messages.forEach((msg, idx) => {
      const isBot = msg.role === 'bot'

      // Show typing indicator before bot message
      if (isBot) {
        const typingStart = cumulativeDelay
        timeoutsRef.current.push(setTimeout(() => setShowTyping(true), typingStart))
        cumulativeDelay += msg.delay
        timeoutsRef.current.push(setTimeout(() => {
          setShowTyping(false)
          setVisibleMessages(prev => [...prev, idx])
        }, cumulativeDelay))
      } else {
        cumulativeDelay += msg.delay
        timeoutsRef.current.push(setTimeout(() => {
          setVisibleMessages(prev => [...prev, idx])
        }, cumulativeDelay))
      }
    })

    // Loop after full conversation + pause
    const loopDelay = cumulativeDelay + 2800
    timeoutsRef.current.push(setTimeout(() => {
      setLoopCount(c => c + 1)
    }, loopDelay))
  }

  // Start when in view, then loop
  useEffect(() => {
    if (!isInView) return
    runConversation()
    return clearAllTimeouts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, loopCount])

  // Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [visibleMessages, showTyping])

  const handleMouseEnter = () => gsap.to(cardRef.current, { y: -6, duration: 0.28, ease: 'power2.out' })
  const handleMouseLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.28, ease: 'power2.out' })

  const restart = () => {
    clearAllTimeouts()
    setVisibleMessages([])
    setShowTyping(false)
    setTimeout(runConversation, 300)
  }

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(13, 20, 35, 0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${chat.accentColor}15`, border: `1px solid ${chat.accentColor}28` }}>
              <MessageSquare size={15} style={{ color: chat.accentColor }} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-soft-white text-sm">{chat.title}</h3>
              <span className="font-body text-[10px]" style={{ color: `${chat.accentColor}aa` }}>{chat.industry}</span>
            </div>
          </div>
          <button
            onClick={restart}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(240,244,255,0.35)' }}
            aria-label="Replay chat demo"
            title="Replay"
          >
            <RefreshCw size={12} />
          </button>
        </div>
        <p className="font-body text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,255,0.35)' }}>
          {chat.description}
        </p>
      </div>

      {/* Chat window */}
      <div
        className="px-4 pt-3 pb-2 flex-1"
        style={{
          background: 'rgba(8, 13, 24, 0.5)',
          minHeight: 220,
        }}
      >
        {/* Top bar — browser-like chrome */}
        <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: chat.accentColor, opacity: 0.6, animation: 'pulse 2s ease-in-out infinite' }}
          />
        </div>

        {/* Messages */}
        <div
          ref={chatBodyRef}
          className="space-y-2.5 overflow-y-hidden"
          style={{ maxHeight: 200, scrollbarWidth: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {chat.messages.map((msg, idx) =>
              visibleMessages.includes(idx) ? (
                <ChatBubble key={idx} msg={msg} color={chat.accentColor} />
              ) : null
            )}
            {showTyping && <TypingIndicator key="typing" color={chat.accentColor} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Input bar — decorative */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        aria-hidden="true"
      >
        <div
          className="flex-1 h-7 rounded-xl text-[11px] font-body flex items-center px-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(240,244,255,0.2)' }}
        >
          Type a message...
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${chat.accentColor}22`, border: `1px solid ${chat.accentColor}30` }}
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
            <path d="M1 7h12M7 1l6 6-6 6" stroke={chat.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes chat-dot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-3px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
    </motion.div>
  )
}
