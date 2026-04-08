import Link from 'next/link'

const footerLinks = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'AI Services', href: '/services#ai-services' },
    { label: 'Automation', href: '/services#automation' },
    { label: 'Voice Agents', href: '/services#voice-agents' },
    { label: 'AI Chatbots', href: '/services#chatbots' },
  ],
  Connect: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/aivized' },
    { label: 'Twitter / X', href: 'https://x.com/aivized' },
    { label: 'zuhaibahmed3213951@gmail.com', href: 'mailto:zuhaibahmed3213951@gmail.com' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative border-t border-slate-border mt-0"
      aria-label="Site footer"
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="AIVIZED home">
              <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                  <path
                    d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"
                    stroke="#0A0E1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-heading font-800 text-xl tracking-tight">
                AI<span className="text-teal">VIZED</span>
              </span>
            </Link>
            <p className="text-soft-white/50 font-body text-sm leading-relaxed max-w-xs">
              We build the intelligence behind businesses that want to do more — without burning out their teams.
            </p>
            <p className="mt-6 text-soft-white/30 text-xs font-body">
              Working with clients worldwide.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-heading font-semibold text-soft-white text-sm uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-soft-white/50 hover:text-teal text-sm font-body transition-colors duration-200 animated-underline"
                      {...(link.href.startsWith('http') || link.href.startsWith('mailto')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-soft-white/30 text-xs font-body">
            © {currentYear} AIVIZED. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-soft-white/30 hover:text-soft-white/60 text-xs font-body transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-soft-white/30 hover:text-soft-white/60 text-xs font-body transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
