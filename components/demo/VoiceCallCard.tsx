'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, X, Phone, Mic, RotateCcw, Volume2 } from 'lucide-react'
import anime from 'animejs'
import { gsap } from 'gsap'

export interface TranscriptLine {
  role: 'agent' | 'customer'
  text: string
}

export interface VoiceCallData {
  id: string
  title: string
  industry: string
  scenario: string
  accentColor: string
  agentName: string
  transcript: TranscriptLine[]
}

/* ─── Web Speech API hook ─────────────────────── */
function useSpeech() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const getVoices = (): SpeechSynthesisVoice[] => {
    if (!supported) return []
    return window.speechSynthesis.getVoices()
  }

  // Score a voice by how human/neural it sounds (higher = better)
  const voiceScore = (v: SpeechSynthesisVoice): number => {
    const n = v.name.toLowerCase()
    if (n.includes('online (natural)')) return 100   // Microsoft Neural (Edge) — most human
    if (n.includes('online'))           return 80    // Microsoft Online (non-natural) — still good
    if (n.includes('neural'))           return 75    // Generic neural label
    if (n.includes('natural'))          return 70
    if (n.includes('google'))           return 50    // Google TTS — decent
    if (n.includes('samantha'))         return 45    // macOS Samantha — natural
    if (n.includes('karen'))            return 44    // macOS Karen
    if (n.includes('daniel'))           return 44    // macOS Daniel
    if (n.includes('alex'))             return 43    // macOS Alex
    if (n.includes('premium'))          return 40
    if (n.includes('enhanced'))         return 38
    return 10                                        // Default synthesized voices
  }

  const englishVoices = (): SpeechSynthesisVoice[] =>
    getVoices()
      .filter(v => v.lang.startsWith('en'))
      .sort((a, b) => voiceScore(b) - voiceScore(a))

  // Agent: prefer natural-sounding female names
  const pickAgentVoice = (): SpeechSynthesisVoice | null => {
    const voices = englishVoices()
    const femaleNames = ['aria', 'jenny', 'michelle', 'sonia', 'libby', 'maisie', 'ana',
                         'samantha', 'karen', 'victoria', 'moira', 'zira', 'female']
    // Try neural/online female first
    const natural = voices.find(v =>
      (v.name.toLowerCase().includes('online (natural)') || v.name.toLowerCase().includes('neural')) &&
      femaleNames.some(n => v.name.toLowerCase().includes(n))
    )
    if (natural) return natural
    // Any online voice
    const online = voices.find(v => v.name.toLowerCase().includes('online'))
    if (online) return online
    // Fallback: highest-scored female name match
    for (const name of femaleNames) {
      const v = voices.find(vv => vv.name.toLowerCase().includes(name))
      if (v) return v
    }
    return voices[0] ?? null
  }

  // Customer: prefer a distinctly different (male) voice so the dialogue is clear
  const pickCustomerVoice = (): SpeechSynthesisVoice | null => {
    const voices = englishVoices()
    const maleNames = ['guy', 'ryan', 'eric', 'christopher', 'brandon',
                       'davis', 'tony', 'thomas', 'david', 'mark', 'alex', 'daniel', 'fred', 'male']
    const natural = voices.find(v =>
      (v.name.toLowerCase().includes('online (natural)') || v.name.toLowerCase().includes('neural')) &&
      maleNames.some(n => v.name.toLowerCase().includes(n))
    )
    if (natural) return natural
    for (const name of maleNames) {
      const v = voices.find(vv => vv.name.toLowerCase().includes(name))
      if (v) return v
    }
    // Last resort: pick a different voice from agent
    const agentVoice = pickAgentVoice()
    return voices.find(v => v !== agentVoice) ?? voices[0] ?? null
  }

  const speak = (text: string, role: 'agent' | 'customer'): Promise<void> => {
    return new Promise((resolve) => {
      if (!supported) {
        const words = text.split(' ').length
        setTimeout(resolve, (words / 130) * 60_000)
        return
      }

      window.speechSynthesis.cancel()

      const utt = new SpeechSynthesisUtterance(text)

      // Natural-sounding rate/pitch — closer to 1.0 sounds more human
      utt.rate   = role === 'agent' ? 1.0  : 1.05
      utt.pitch  = role === 'agent' ? 0.95 : 1.08
      utt.volume = 1

      const trySetVoice = () => {
        const voice = role === 'agent' ? pickAgentVoice() : pickCustomerVoice()
        if (voice) utt.voice = voice
      }

      if (getVoices().length > 0) {
        trySetVoice()
      } else {
        window.speechSynthesis.addEventListener('voiceschanged', trySetVoice, { once: true })
      }

      // Chrome bug workaround: speechSynthesis pauses after ~15s
      const resumeTimer = setInterval(() => {
        if (!window.speechSynthesis.speaking) { clearInterval(resumeTimer); return }
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }, 10_000)

      utt.onend = () => { clearInterval(resumeTimer); resolve() }
      utt.onerror = () => { clearInterval(resumeTimer); resolve() }

      window.speechSynthesis.speak(utt)
    })
  }

  const cancel = () => {
    if (supported) window.speechSynthesis.cancel()
  }

  return { speak, cancel, supported }
}

/* ─── Waveform bars ───────────────────────────── */
function Waveform({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const NUM = 34

  useEffect(() => {
    if (!ref.current) return
    const bars = Array.from(ref.current.querySelectorAll('.wv-bar'))
    anime.remove(bars)

    if (isPlaying) {
      bars.forEach(bar => {
        anime({
          targets: bar,
          scaleY: [
            { value: Math.random() * 0.55 + 0.12 },
            { value: Math.random() * 0.75 + 0.25 },
            { value: Math.random() * 0.4  + 0.08 },
          ],
          duration: Math.round(Math.random() * 280 + 220),
          easing: 'easeInOutSine',
          loop: true,
          direction: 'alternate',
        })
      })
    } else {
      anime({ targets: bars, scaleY: 0.07, duration: 380, easing: 'easeOutCubic' })
    }
  }, [isPlaying])

  return (
    <div ref={ref} className="flex items-center justify-center gap-[3px] h-12" aria-hidden="true">
      {Array.from({ length: NUM }).map((_, i) => (
        <div key={i} className="wv-bar rounded-full flex-shrink-0"
          style={{
            width: 3, height: 38,
            background: `linear-gradient(to top, ${color}28, ${color}dd)`,
            transform: 'scaleY(0.07)',
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Modal ───────────────────────────────────── */
function CallModal({ call, onClose }: { call: VoiceCallData; onClose: () => void }) {
  const [isPlaying, setIsPlaying]             = useState(false)
  const [visibleLines, setVisibleLines]       = useState<number[]>([])
  const [showTyping, setShowTyping]           = useState(false)
  const [currentIdx, setCurrentIdx]           = useState(0)
  const [isFinished, setIsFinished]           = useState(false)
  const [speechAvailable, setSpeechAvailable] = useState(true)

  const isPlayingRef  = useRef(false)
  const currentIdxRef = useRef(0)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const phoneIconRef  = useRef<HTMLDivElement>(null)
  const phoneAnimRef  = useRef<ReturnType<typeof anime> | null>(null)
  const { speak, cancel, supported } = useSpeech()

  // Phone icon animation when playing
  useEffect(() => {
    if (!phoneIconRef.current) return
    const el = phoneIconRef.current
    const icon = el.querySelector('.modal-phone-icon')

    if (phoneAnimRef.current) {
      anime.remove(el)
      anime.remove(icon)
    }

    if (isPlaying) {
      // Container: pulse background opacity + scale
      phoneAnimRef.current = anime({
        targets: el,
        scale: [1, 1.08, 1],
        duration: 900,
        easing: 'easeInOutSine',
        loop: true,
      })
      // Icon: gentle tilt back and forth like a ringing phone
      anime({
        targets: icon,
        rotate: [-12, 12],
        duration: 420,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      })
    } else {
      // Snap back to neutral
      anime({ targets: el,   scale: 1,  rotate: 0, duration: 300, easing: 'easeOutCubic' })
      anime({ targets: icon, rotate: 0, duration: 300, easing: 'easeOutCubic' })
    }
  }, [isPlaying])

  useEffect(() => {
    setSpeechAvailable(supported)
  }, [supported])

  // Auto-scroll transcript
  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleLines, showTyping])

  // Cleanup on unmount / close
  useEffect(() => () => cancel(), []) // eslint-disable-line react-hooks/exhaustive-deps

  const runFrom = useCallback(async (startIdx: number) => {
    for (let i = startIdx; i < call.transcript.length; i++) {
      if (!isPlayingRef.current) break

      currentIdxRef.current = i
      setCurrentIdx(i)

      // Show typing indicator before the line
      setShowTyping(true)

      // Brief pause to show indicator
      await new Promise(r => setTimeout(r, 420))
      if (!isPlayingRef.current) break

      setShowTyping(false)

      // Speak the line — await real speech end
      await speak(call.transcript[i].text, call.transcript[i].role)
      if (!isPlayingRef.current) break

      // Reveal transcript line after speech ends
      setVisibleLines(prev => [...prev, i])

      // Pause between turns
      const gap = call.transcript[i].role === 'agent' ? 380 : 280
      await new Promise(r => setTimeout(r, gap))
    }

    if (isPlayingRef.current) {
      isPlayingRef.current = false
      setIsPlaying(false)
      setShowTyping(false)
      setIsFinished(true)
    }
  }, [call.transcript, speak])

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause
      isPlayingRef.current = false
      cancel()
      setIsPlaying(false)
      setShowTyping(false)
    } else {
      // Restart if finished
      if (isFinished) {
        setVisibleLines([])
        setIsFinished(false)
        currentIdxRef.current = 0
        setCurrentIdx(0)
        isPlayingRef.current = true
        setIsPlaying(true)
        runFrom(0)
      } else {
        // Resume from where we stopped
        isPlayingRef.current = true
        setIsPlaying(true)
        runFrom(currentIdxRef.current)
      }
    }
  }

  const handleRestart = () => {
    isPlayingRef.current = false
    cancel()
    setIsPlaying(false)
    setShowTyping(false)
    setVisibleLines([])
    setIsFinished(false)
    currentIdxRef.current = 0
    setCurrentIdx(0)
    setTimeout(() => {
      isPlayingRef.current = true
      setIsPlaying(true)
      runFrom(0)
    }, 200)
  }

  const progress = isFinished
    ? 100
    : visibleLines.length > 0
    ? Math.round((visibleLines.length / call.transcript.length) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(5, 8, 16, 0.92)', backdropFilter: 'blur(18px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(11, 17, 30, 0.98)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${call.accentColor}14`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3">
            <div
              ref={phoneIconRef}
              className="w-10 h-10 rounded-xl flex items-center justify-center relative"
              style={{
                background: `${call.accentColor}16`,
                border: `1px solid ${call.accentColor}30`,
                boxShadow: isPlaying ? `0 0 18px ${call.accentColor}40` : 'none',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              <Phone size={17} style={{ color: call.accentColor }} className="modal-phone-icon" />
              {/* Ripple rings when playing */}
              {isPlaying && (
                <>
                  <span className="absolute inset-0 rounded-xl animate-ping"
                    style={{ background: `${call.accentColor}18`, animationDuration: '1.2s' }} />
                  <span className="absolute inset-[-6px] rounded-xl animate-ping"
                    style={{ background: `${call.accentColor}0c`, animationDuration: '1.6s', animationDelay: '0.3s' }} />
                </>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-soft-white text-sm">{call.title}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${call.accentColor}12`, color: call.accentColor, border: `1px solid ${call.accentColor}22` }}>
                  {call.industry}
                </span>
              </div>
              <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(240,244,255,0.35)' }}>
                Agent: {call.agentName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleRestart}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,255,0.4)' }}
              aria-label="Restart call">
              <RotateCcw size={12} />
            </button>
            <button onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,255,0.4)' }}
              aria-label="Close">
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Waveform + progress */}
        <div className="px-5 pt-5 pb-3">
          <Waveform isPlaying={isPlaying} color={call.accentColor} />

          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${call.accentColor}, ${call.accentColor}88)` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Speech availability notice */}
          {!speechAvailable && (
            <p className="text-[11px] font-body mt-2 text-center" style={{ color: 'rgba(240,244,255,0.25)' }}>
              Voice not available in this browser — transcript will show automatically
            </p>
          )}

          {/* Play / Pause button */}
          <button onClick={handlePlayPause}
            className="w-full mt-4 py-3 rounded-xl font-heading font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              background: isPlaying
                ? 'rgba(255,255,255,0.06)'
                : `linear-gradient(135deg, ${call.accentColor} 0%, ${call.accentColor}bb 100%)`,
              color: isPlaying ? 'rgba(240,244,255,0.7)' : '#0a0e1a',
              border: isPlaying ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
            aria-label={isPlaying ? 'Pause call' : isFinished ? 'Play again' : 'Play call'}>
            {isPlaying
              ? <><Pause size={15} /> Pause</>
              : isFinished
              ? <><RotateCcw size={15} /> Play Again</>
              : <><Volume2 size={15} /> {speechAvailable ? 'Play with Voice' : 'Play Demo'}</>
            }
          </button>
        </div>

        {/* Transcript */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <Mic size={11} style={{ color: 'rgba(240,244,255,0.22)' }} />
            <span className="font-body text-[10px] uppercase tracking-widest" style={{ color: 'rgba(240,244,255,0.22)' }}>
              Transcript
            </span>
          </div>
          <div ref={transcriptRef} className="space-y-2.5 overflow-y-auto"
            style={{ maxHeight: 230, scrollbarWidth: 'none' }}>

            <AnimatePresence initial={false}>
              {call.transcript.map((line, idx) =>
                visibleLines.includes(idx) ? (
                  <motion.div key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`flex gap-2 ${line.role === 'customer' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-heading font-bold mt-0.5"
                      style={{
                        background: line.role === 'agent' ? `${call.accentColor}20` : 'rgba(255,255,255,0.07)',
                        color: line.role === 'agent' ? call.accentColor : 'rgba(240,244,255,0.5)',
                        border: `1px solid ${line.role === 'agent' ? call.accentColor + '30' : 'rgba(255,255,255,0.1)'}`,
                      }}>
                      {line.role === 'agent' ? 'AI' : 'C'}
                    </div>
                    <div className="max-w-[80%] rounded-2xl px-3 py-2"
                      style={{
                        background: line.role === 'agent' ? `${call.accentColor}10` : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${line.role === 'agent' ? call.accentColor + '20' : 'rgba(255,255,255,0.07)'}`,
                        borderBottomLeftRadius:  line.role === 'agent'    ? 4 : undefined,
                        borderBottomRightRadius: line.role === 'customer' ? 4 : undefined,
                      }}>
                      <p className="font-body text-[12px] leading-relaxed"
                        style={{ color: 'rgba(240,244,255,0.78)' }}>
                        {line.text}
                      </p>
                    </div>
                  </motion.div>
                ) : null
              )}

              {/* Typing indicator */}
              {showTyping && (
                <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-heading font-bold"
                    style={{ background: `${call.accentColor}18`, color: call.accentColor, border: `1px solid ${call.accentColor}28` }}>
                    {call.transcript[currentIdx]?.role === 'agent' ? 'AI' : 'C'}
                  </div>
                  <div className="rounded-2xl px-3 py-2.5 flex items-center gap-1"
                    style={{ background: `${call.accentColor}0e`, border: `1px solid ${call.accentColor}1c`, borderBottomLeftRadius: 4 }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full block"
                        style={{ background: call.accentColor, animationDelay: `${i * 0.18}s`, opacity: 0.5,
                          animation: 'tydot 1.1s ease-in-out infinite' }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {visibleLines.length === 0 && !showTyping && (
              <div className="text-center py-6">
                <p className="font-body text-xs" style={{ color: 'rgba(240,244,255,0.2)' }}>
                  Press play to hear the conversation
                </p>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes tydot {
            0%, 100% { transform: translateY(0); opacity: 0.4; }
            50%       { transform: translateY(-3px); opacity: 1; }
          }
        `}</style>
      </motion.div>
    </motion.div>
  )
}

/* ─── Card ────────────────────────────────────── */
export default function VoiceCallCard({ call, index }: { call: VoiceCallData; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    gsap.to(cardRef.current, { y: -6, duration: 0.26, ease: 'power2.out' })
    anime({ targets: cardRef.current?.querySelector('.play-icon'), rotate: [0, 15], scale: [1, 1.1], duration: 300, easing: 'easeOutElastic(1, 0.5)' })
  }
  const onLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.26, ease: 'power2.out' })
    anime({ targets: cardRef.current?.querySelector('.play-icon'), rotate: [15, 0], scale: [1.1, 1], duration: 250, easing: 'easeOutCubic' })
  }

  return (
    <>
      <motion.div ref={cardRef as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.58, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={onEnter} onMouseLeave={onLeave}
        className="rounded-2xl p-6 cursor-pointer flex flex-col"
        style={{
          background: 'rgba(13, 20, 35, 0.72)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${call.accentColor}14`, border: `1px solid ${call.accentColor}26` }}>
            <Phone size={18} style={{ color: call.accentColor }} />
          </div>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${call.accentColor}10`, color: call.accentColor, border: `1px solid ${call.accentColor}20` }}>
            {call.industry}
          </span>
        </div>

        {/* Static waveform preview */}
        <div className="flex items-center gap-[2.5px] mb-4 h-8" aria-hidden="true">
          {[4,9,14,8,18,11,20,7,16,10,19,6,15,9,17,5,13,11,18,9,14,7,11,16,8,14,6,12,18,9].map((h, i) => (
            <div key={i} className="rounded-full flex-shrink-0"
              style={{ width: 2.5, height: h, background: `${call.accentColor}${i % 4 === 0 ? '90' : i % 2 === 0 ? '55' : '35'}` }} />
          ))}
        </div>

        <h3 className="font-heading font-bold text-soft-white text-base mb-1.5">{call.title}</h3>
        <p className="font-body text-xs leading-relaxed flex-1 mb-5" style={{ color: 'rgba(240,244,255,0.38)' }}>
          {call.scenario}
        </p>

        {/* Agent + play */}
        <div className="flex items-center justify-between">
          <span className="font-body text-xs" style={{ color: 'rgba(240,244,255,0.28)' }}>
            Agent: <span style={{ color: 'rgba(240,244,255,0.55)' }}>{call.agentName}</span>
          </span>
          <button onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-semibold text-sm transition-all hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${call.accentColor} 0%, ${call.accentColor}bb 100%)`, color: '#0a0e1a' }}
            aria-label={`Play ${call.title} demo`}>
            <Play size={13} fill="currentColor" className="play-icon" />
            Play Call
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && <CallModal call={call} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
