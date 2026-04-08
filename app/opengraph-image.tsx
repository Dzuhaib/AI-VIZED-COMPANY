import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: 1200, height: 630,
        background: '#0A0E1A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 100px',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow — top-left teal */}
      <div style={{
        position: 'absolute', top: -80, left: -80,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,200,240,0.18) 0%, transparent 70%)',
      }} />
      {/* Ambient glow — bottom-right coral */}
      <div style={{
        position: 'absolute', bottom: -100, right: -60,
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.13) 0%, transparent 70%)',
      }} />

      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 48 }}>
        {/* Icon mark */}
        <div style={{
          width: 58, height: 58, borderRadius: 14,
          background: 'linear-gradient(135deg, #00c8f0, #4f46e5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, fontWeight: 900, color: 'white',
        }}>A</div>
        <span style={{ fontSize: 38, fontWeight: 800, color: 'white', letterSpacing: '-1px' }}>
          AI<span style={{ color: '#00D4FF' }}>VIZED</span>
        </span>
      </div>

      {/* Headline */}
      <div style={{
        fontSize: 60, fontWeight: 800, color: '#F0F4FF',
        lineHeight: 1.08, letterSpacing: '-2px', marginBottom: 28,
        maxWidth: 900,
      }}>
        We Build the Intelligence Behind Your Business.
      </div>

      {/* Sub-line */}
      <div style={{
        fontSize: 26, color: 'rgba(240,244,255,0.50)', marginBottom: 0,
        letterSpacing: '-0.5px',
      }}>
        AI Services · Automation Workflows · Voice Agents · AI Chatbots
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 60, left: 100,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: 72, height: 3, borderRadius: 2,
          background: 'linear-gradient(90deg, #00D4FF, #4f46e5)',
        }} />
        <span style={{ color: 'rgba(240,244,255,0.30)', fontSize: 20 }}>aivized.com</span>
      </div>
    </div>,
    { ...size }
  )
}
