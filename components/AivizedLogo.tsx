/* ─── AIVIZED Logo Mark ───────────────────────────────────────────────────────
   A stylised "A" built from three neural-network nodes (apex + two crossbar
   nodes) connected by circuit-style paths. The apex glows teal — a nod to the
   brand's primary accent. The gradient background (teal → indigo) mirrors the
   gradient-text-teal used across the site.
   Works at any size; defaults to 32 × 32 for the nav.
──────────────────────────────────────────────────────────────────────────── */

export default function AivizedLogoMark({
  size = 32,
  id = 'logo',
}: {
  size?: number
  id?: string
}) {
  const gradId = `logoGrad-${id}`
  const glowId = `logoGlow-${id}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#00c8f0" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Rounded-square background */}
      <rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />

      {/* Left leg of the A */}
      <line
        x1="8"  y1="24.5"
        x2="16" y2="8"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.92"
      />
      {/* Right leg of the A */}
      <line
        x1="16" y1="8"
        x2="24" y2="24.5"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.92"
      />
      {/* Crossbar */}
      <line
        x1="11.4" y1="18.8"
        x2="20.6" y2="18.8"
        stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeOpacity="0.78"
      />

      {/* Apex node — glowing teal */}
      <circle cx="16"    cy="8"    r="3.2" fill={`url(#${gradId})`} opacity="0.35" />
      <circle cx="16"    cy="8"    r="2.1" fill="#00D4FF" filter={`url(#${glowId})`} />

      {/* Left crossbar node */}
      <circle cx="11.4" cy="18.8" r="1.6" fill="white" opacity="0.82" />

      {/* Right crossbar node */}
      <circle cx="20.6" cy="18.8" r="1.6" fill="white" opacity="0.82" />

      {/* Tiny dot accent — bottom centre (represents the base/foundation) */}
      <circle cx="16"   cy="24.5" r="1.1" fill="white" opacity="0.38" />
    </svg>
  )
}
