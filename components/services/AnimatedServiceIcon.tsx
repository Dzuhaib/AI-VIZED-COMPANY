'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

type ServiceType = 'ai' | 'automation' | 'voice' | 'chatbot'

interface AnimatedServiceIconProps {
  type: ServiceType
  color: string
  size?: number
  animate?: boolean // true = entrance, false = idle only
}

/* ─── AI / Neural network icon ───────────────── */
function AIBrainIcon({ color, isActive }: { color: string; isActive: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const nodes = svgRef.current.querySelectorAll('.ai-node')
    const paths = svgRef.current.querySelectorAll('.ai-path')

    // Path draw animation
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1200,
      delay: anime.stagger(120),
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate',
      loopDelay: 800,
    })

    // Nodes pulse sequentially
    anime({
      targets: nodes,
      scale: [1, 1.4, 1],
      opacity: [0.5, 1, 0.5],
      duration: 900,
      delay: anime.stagger(160),
      easing: 'easeInOutSine',
      loop: true,
      loopDelay: 400,
    })
  }, [isActive])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Neural network paths */}
      <line className="ai-path" x1="24" y1="24" x2="10" y2="14" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round"/>
      <line className="ai-path" x1="24" y1="24" x2="38" y2="14" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round"/>
      <line className="ai-path" x1="24" y1="24" x2="10" y2="34" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round"/>
      <line className="ai-path" x1="24" y1="24" x2="38" y2="34" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round"/>
      <line className="ai-path" x1="10" y1="14" x2="10" y2="34" stroke={color} strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
      <line className="ai-path" x1="38" y1="14" x2="38" y2="34" stroke={color} strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
      <line className="ai-path" x1="10" y1="14" x2="38" y2="34" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 3" strokeLinecap="round"/>
      <line className="ai-path" x1="38" y1="14" x2="10" y2="34" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 3" strokeLinecap="round"/>

      {/* Outer nodes */}
      <circle className="ai-node" cx="10" cy="14" r="3" fill={color} fillOpacity="0.6"/>
      <circle className="ai-node" cx="38" cy="14" r="3" fill={color} fillOpacity="0.6"/>
      <circle className="ai-node" cx="10" cy="34" r="3" fill={color} fillOpacity="0.6"/>
      <circle className="ai-node" cx="38" cy="34" r="3" fill={color} fillOpacity="0.6"/>

      {/* Center node */}
      <circle className="ai-node" cx="24" cy="24" r="5" fill={color} fillOpacity="0.9"/>
      <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="1" strokeOpacity="0.2"/>

      {/* Extra small nodes */}
      <circle className="ai-node" cx="24" cy="8"  r="2" fill={color} fillOpacity="0.5"/>
      <circle className="ai-node" cx="24" cy="40" r="2" fill={color} fillOpacity="0.5"/>
      <line className="ai-path" x1="24" y1="8"  x2="10" y2="14" stroke={color} strokeWidth="0.8" strokeOpacity="0.3"/>
      <line className="ai-path" x1="24" y1="8"  x2="38" y2="14" stroke={color} strokeWidth="0.8" strokeOpacity="0.3"/>
      <line className="ai-path" x1="24" y1="40" x2="10" y2="34" stroke={color} strokeWidth="0.8" strokeOpacity="0.3"/>
      <line className="ai-path" x1="24" y1="40" x2="38" y2="34" stroke={color} strokeWidth="0.8" strokeOpacity="0.3"/>
    </svg>
  )
}

/* ─── Automation / Flow icon ─────────────────── */
function AutomationIcon({ color, isActive }: { color: string; isActive: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const boxes = svgRef.current.querySelectorAll('.auto-box')
    const arrows = svgRef.current.querySelectorAll('.auto-arrow')
    const dots = svgRef.current.querySelectorAll('.auto-dot')

    // Boxes light up in sequence
    anime({
      targets: boxes,
      fillOpacity: [0.08, 0.22, 0.08],
      strokeOpacity: [0.3, 0.9, 0.3],
      duration: 900,
      delay: anime.stagger(300),
      easing: 'easeInOutSine',
      loop: true,
      loopDelay: 600,
    })

    // Arrows pulse
    anime({
      targets: arrows,
      opacity: [0.3, 1, 0.3],
      duration: 700,
      delay: anime.stagger(300, { start: 150 }),
      easing: 'easeInOutSine',
      loop: true,
      loopDelay: 600,
    })

    // Dots travel along path
    anime({
      targets: dots,
      translateX: [0, 10, 0],
      opacity: [0, 1, 0],
      duration: 900,
      delay: anime.stagger(300, { start: 100 }),
      easing: 'easeInOutQuad',
      loop: true,
      loopDelay: 300,
    })
  }, [isActive])

  return (
    <svg ref={svgRef} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Three boxes connected left to right */}
      {/* Box 1 */}
      <rect className="auto-box" x="2" y="18" width="12" height="12" rx="3" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2" strokeOpacity="0.5"/>
      <circle cx="8" cy="24" r="2" fill={color} fillOpacity="0.7"/>

      {/* Arrow 1 */}
      <line className="auto-arrow" x1="14" y1="24" x2="20" y2="24" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round"/>
      <polyline className="auto-arrow" points="18,21 21,24 18,27" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle className="auto-dot" cx="16" cy="24" r="1.5" fill={color}/>

      {/* Box 2 — center (larger, main) */}
      <rect className="auto-box" x="20" y="15" width="8" height="18" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4" strokeOpacity="0.7"/>
      {/* CPU-like lines inside */}
      <line x1="22" y1="20" x2="26" y2="20" stroke={color} strokeWidth="0.8" strokeOpacity="0.5"/>
      <line x1="22" y1="24" x2="26" y2="24" stroke={color} strokeWidth="0.8" strokeOpacity="0.5"/>
      <line x1="22" y1="28" x2="26" y2="28" stroke={color} strokeWidth="0.8" strokeOpacity="0.5"/>

      {/* Arrow 2 */}
      <line className="auto-arrow" x1="28" y1="24" x2="34" y2="24" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round"/>
      <polyline className="auto-arrow" points="32,21 35,24 32,27" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle className="auto-dot" cx="30" cy="24" r="1.5" fill={color}/>

      {/* Box 3 */}
      <rect className="auto-box" x="34" y="18" width="12" height="12" rx="3" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2" strokeOpacity="0.5"/>
      {/* Check inside box 3 */}
      <polyline points="37,24 39,26.5 43,21.5" stroke={color} strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* Top labels */}
      <text x="8" y="14" textAnchor="middle" fontSize="4" fill={color} fillOpacity="0.4" fontFamily="sans-serif">TRIGGER</text>
      <text x="24" y="11" textAnchor="middle" fontSize="4" fill={color} fillOpacity="0.5" fontFamily="sans-serif">PROCESS</text>
      <text x="40" y="14" textAnchor="middle" fontSize="4" fill={color} fillOpacity="0.4" fontFamily="sans-serif">ACTION</text>
    </svg>
  )
}

/* ─── Voice / Waveform icon ──────────────────── */
function VoiceIcon({ color, isActive }: { color: string; isActive: boolean }) {
  const barsRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!barsRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const bars = barsRef.current.querySelectorAll('.voice-bar')

    bars.forEach((bar, i) => {
      anime({
        targets: bar,
        scaleY: [0.2, 1, 0.2],
        duration: 500 + (i % 3) * 150,
        delay: i * 60,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      })
    })

    // Phone icon subtle pulse
    anime({
      targets: barsRef.current.querySelector('.voice-phone'),
      scale: [1, 1.08, 1],
      duration: 1400,
      easing: 'easeInOutSine',
      loop: true,
    })
  }, [isActive])

  // 11 bars each side
  const leftBars  = [4, 7, 10, 6, 9, 5, 8]
  const rightBars = [8, 5, 9, 6, 10, 7, 4]

  return (
    <svg ref={barsRef} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Left waveform bars */}
      {leftBars.map((h, i) => (
        <rect
          key={`l${i}`}
          className="voice-bar"
          x={2 + i * 2.2}
          y={24 - h / 2}
          width={1.4}
          height={h}
          rx={0.7}
          fill={color}
          fillOpacity={0.5 + i * 0.05}
          style={{ transformOrigin: `${2 + i * 2.2 + 0.7}px 24px` }}
        />
      ))}

      {/* Center phone icon */}
      <g className="voice-phone" style={{ transformOrigin: '24px 24px' }}>
        <circle cx="24" cy="24" r="8" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" strokeOpacity="0.5"/>
        {/* Phone handset path */}
        <path
          d="M21 20c0-.6.4-1 1-1h2a1 1 0 0 1 1 1v1.5a1 1 0 0 1-.7 1l-.8.2c.3.8.8 1.5 1.4 2.1.6.6 1.3 1.1 2.1 1.4l.2-.8a1 1 0 0 1 1-.7H29a1 1 0 0 1 1 1V27a1 1 0 0 1-1 1h-1c-2.8 0-5-2.2-5-5v-1Z"
          fill={color}
          fillOpacity="0.8"
        />
      </g>

      {/* Right waveform bars */}
      {rightBars.map((h, i) => (
        <rect
          key={`r${i}`}
          className="voice-bar"
          x={31 + i * 2.2}
          y={24 - h / 2}
          width={1.4}
          height={h}
          rx={0.7}
          fill={color}
          fillOpacity={0.5 + (rightBars.length - i) * 0.03}
          style={{ transformOrigin: `${31 + i * 2.2 + 0.7}px 24px` }}
        />
      ))}

      {/* Arc wave behind bars */}
      <path
        d="M6 24 Q12 14 24 14 Q36 14 42 24"
        stroke={color}
        strokeWidth="0.6"
        strokeOpacity="0.15"
        strokeDasharray="2 3"
        fill="none"
      />
    </svg>
  )
}

/* ─── Chatbot / Bubbles icon ─────────────────── */
function ChatbotIcon({ color, isActive }: { color: string; isActive: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const bubbleA = svgRef.current.querySelector('.chat-a')
    const bubbleB = svgRef.current.querySelector('.chat-b')
    const dots = svgRef.current.querySelectorAll('.chat-typing-dot')

    const tl = anime.timeline({ loop: true, loopDelay: 400 })

    tl.add({
      targets: bubbleA,
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 400,
      easing: 'easeOutCubic',
    })
    .add({
      targets: dots,
      opacity: [0, 1, 0],
      translateY: [3, 0, 3],
      delay: anime.stagger(120),
      duration: 350,
      easing: 'easeInOutSine',
    }, '+=200')
    .add({
      targets: bubbleB,
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 400,
      easing: 'easeOutCubic',
    }, '+=300')
    .add({
      targets: [bubbleA, bubbleB],
      opacity: 0,
      duration: 300,
      easing: 'easeInCubic',
    }, '+=1200')
  }, [isActive])

  return (
    <svg ref={svgRef} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* User bubble (left) */}
      <g className="chat-a" style={{ opacity: 0 }}>
        <rect x="4" y="8" width="22" height="13" rx="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" strokeOpacity="0.4"/>
        <rect x="4" y="18" width="6" height="5" rx="0 0 0 4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0" />
        {/* Lines representing text */}
        <line x1="9" y1="13" x2="21" y2="13" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"/>
        <line x1="9" y1="17" x2="18" y2="17" stroke={color} strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
      </g>

      {/* Typing indicator */}
      <g>
        <rect x="22" y="26" width="18" height="10" rx="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="0.8" strokeOpacity="0.3"/>
        {[0, 1, 2].map(i => (
          <circle
            key={i}
            className="chat-typing-dot"
            cx={27 + i * 5}
            cy="31"
            r="1.4"
            fill={color}
            fillOpacity="0.6"
            style={{ opacity: 0 }}
          />
        ))}
      </g>

      {/* AI bubble (right) */}
      <g className="chat-b" style={{ opacity: 0 }}>
        <rect x="22" y="26" width="22" height="15" rx="6" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.2" strokeOpacity="0.6"/>
        <rect x="36" y="38" width="6" height="5" rx="0 0 4 0" fill={color} fillOpacity="0.2"/>
        {/* Lines representing response */}
        <line x1="27" y1="32" x2="38" y2="32" stroke={color} strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <line x1="27" y1="36" x2="35" y2="36" stroke={color} strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
      </g>

      {/* Small bot indicator */}
      <circle cx="38" cy="10" r="6" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>
      <text x="38" y="13.5" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.7" fontFamily="monospace">AI</text>
    </svg>
  )
}

/* ─── Export wrapper ─────────────────────────── */
export default function AnimatedServiceIcon({
  type,
  color,
  size = 48,
  animate = true,
}: AnimatedServiceIconProps) {
  const isActive = animate

  const icons: Record<ServiceType, React.ReactNode> = {
    ai: <AIBrainIcon color={color} isActive={isActive} />,
    automation: <AutomationIcon color={color} isActive={isActive} />,
    voice: <VoiceIcon color={color} isActive={isActive} />,
    chatbot: <ChatbotIcon color={color} isActive={isActive} />,
  }

  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      role="img"
      aria-label={`${type} service icon`}
    >
      {icons[type]}
    </div>
  )
}
