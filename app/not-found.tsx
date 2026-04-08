import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div
          className="font-heading font-extrabold text-9xl text-teal/10 mb-4 leading-none"
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="font-heading font-bold text-3xl text-soft-white mb-4">
          This page doesn't exist
        </h1>
        <p className="font-body text-soft-white/50 mb-8 leading-relaxed">
          Maybe the link is wrong, or this page moved. Either way, let's get
          you somewhere useful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <span className="relative z-10">Go Home</span>
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
