'use client'

/**
 * Barba.js-style page transitions implemented with GSAP.
 *
 * Barba.js cannot be used with Next.js App Router because it fetches raw HTML
 * and replaces DOM nodes — directly conflicting with React's virtual DOM.
 * This component replicates Barba.js's visual transition model:
 *   1. A full-screen panel sweeps IN (covers the current page)
 *   2. Next.js navigates (React reconciles in the background)
 *   3. The panel sweeps OUT (reveals the new page)
 *
 * The animation is indistinguishable from a real Barba transition.
 */

import { useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isAnimating = useRef(false)
  const isFirstMount = useRef(true)

  // Sweep panel OUT after page changes (enter animation)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      // On first load — just a quick reveal
      gsap.fromTo(
        panelRef.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.7,
          ease: 'power4.inOut',
          transformOrigin: 'top center',
          delay: 0.1,
          onComplete: () => {
            isAnimating.current = false
          },
        }
      )
      return
    }

    // Subsequent navigations — reveal new page
    gsap.set(panelRef.current, { transformOrigin: 'top center' })
    gsap.to(panelRef.current, {
      scaleY: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      delay: 0.05,
      onComplete: () => {
        isAnimating.current = false
        gsap.set(logoRef.current, { opacity: 0 })
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Intercept all <a> clicks — sweep panel IN before route change
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return
      if (
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('#') ||
        href === pathname
      )
        return

      // Skip right-click / ctrl+click / cmd+click (open in new tab)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return
      if (isAnimating.current) return

      e.preventDefault()
      isAnimating.current = true

      const panel = panelRef.current
      const logo = logoRef.current

      // Sweep panel in from bottom
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href)
        },
      })

      tl.set(panel, { transformOrigin: 'bottom center', scaleY: 0 })
        .to(panel, {
          scaleY: 1,
          duration: 0.55,
          ease: 'power4.inOut',
        })
        .fromTo(
          logo,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          '-=0.15'
        )
    },
    [pathname, router]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <>
      {children}

      {/* Barba.js-style full-screen transition panel */}
      <div
        className="page-transition-overlay"
        aria-hidden="true"
      >
        <div
          ref={panelRef}
          className="page-transition-panel"
        />

        {/* AIVIZED logo shown mid-transition */}
        <div
          ref={logoRef}
          className="relative z-10 flex items-center gap-3 opacity-0"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"
                stroke="#00D4FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-heading font-bold text-2xl tracking-tight"
            style={{ color: '#F0F4FF' }}
          >
            AI<span style={{ color: '#00D4FF' }}>VIZED</span>
          </span>
        </div>
      </div>
    </>
  )
}
