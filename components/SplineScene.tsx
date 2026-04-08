'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import anime from 'animejs'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// Organic animated fallback — warm glowing orbs, not a grid
function OrganicFallback({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const orbs = containerRef.current?.querySelectorAll('.orb')
    if (!orbs) return

    orbs.forEach((orb, i) => {
      anime({
        targets: orb,
        translateX: () => anime.random(-30, 30),
        translateY: () => anime.random(-30, 30),
        scale: [{ value: 0.95 }, { value: 1.08 }, { value: 1 }],
        opacity: [{ value: 0.6 }, { value: 1 }, { value: 0.7 }],
        duration: 4000 + i * 800,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
        delay: i * 500,
      })
    })

    const particles = containerRef.current?.querySelectorAll('.fp')
    if (!particles) return
    particles.forEach((p, i) => {
      anime({
        targets: p,
        translateY: [0, -24, 0],
        opacity: [0.2, 0.8, 0.2],
        duration: 3000 + i * 400,
        easing: 'easeInOutSine',
        loop: true,
        delay: i * 300,
      })
    })
  }, [])

  const floatingParticles = Array.from({ length: 12 }, (_, i) => ({
    x: `${8 + (i * 8) % 84}%`,
    y: `${15 + (i * 13) % 70}%`,
    size: 2 + (i % 3),
    color: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF6B35' : '#F0F4FF',
  }))

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Deep ambient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #0d1828 0%, #0a0e1a 100%)' }}
      />

      {/* Large glowing orb — primary (teal) */}
      <div
        className="orb absolute"
        style={{
          width: '55%',
          height: '55%',
          top: '10%',
          right: '5%',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'radial-gradient(circle at 40% 40%, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0.08) 50%, transparent 75%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Mid orb — coral */}
      <div
        className="orb absolute"
        style={{
          width: '40%',
          height: '40%',
          bottom: '10%',
          left: '10%',
          borderRadius: '40% 60% 70% 30% / 30% 50% 70% 40%',
          background: 'radial-gradient(circle at 60% 60%, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.06) 50%, transparent 75%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Small accent orb */}
      <div
        className="orb absolute"
        style={{
          width: '25%',
          height: '25%',
          top: '50%',
          left: '45%',
          borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Ring accent */}
      <div
        className="absolute"
        style={{
          width: '45%',
          height: '45%',
          top: '15%',
          right: '15%',
          borderRadius: '50%',
          border: '1px solid rgba(0,212,255,0.08)',
          boxShadow: 'inset 0 0 60px rgba(0,212,255,0.04), 0 0 60px rgba(0,212,255,0.04)',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '60%',
          height: '60%',
          top: '7%',
          right: '8%',
          borderRadius: '50%',
          border: '1px solid rgba(0,212,255,0.04)',
        }}
      />

      {/* Floating particles */}
      {floatingParticles.map((p, i) => (
        <div
          key={i}
          className="fp absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}60`,
          }}
        />
      ))}

      {/* Soft center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 65% 45%, rgba(0,212,255,0.04) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

function SplineLoader({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <div
        className="w-10 h-10 rounded-full"
        style={{
          border: '2px solid rgba(0,212,255,0.2)',
          borderTopColor: '#00D4FF',
          animation: 'spin 0.8s linear infinite',
        }}
      />
    </div>
  )
}

export default function SplineScene({ scene, className = '' }: SplineSceneProps) {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setIsWebGLSupported(false)
    } catch {
      setIsWebGLSupported(false)
    }
  }, [])

  const showFallback = !isMounted || !isWebGLSupported || hasError || !scene

  if (showFallback) {
    return <OrganicFallback className={className} />
  }

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {!isLoaded && <SplineLoader className="absolute inset-0" />}
      <Suspense fallback={<SplineLoader className="absolute inset-0" />}>
        <Spline
          scene={scene}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  )
}
