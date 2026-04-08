import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — AIVIZED',
  description: 'How AIVIZED collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://aivized.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <span className="tag mb-4 inline-flex">Legal</span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-soft-white mb-4">
          Privacy Policy
        </h1>
        <p className="font-body text-soft-white/40 mb-12 text-sm">
          Last updated: April 2026
        </p>

        <div className="space-y-10 font-body text-soft-white/65 leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly — such as your name, email address, company name,
              and the details you share in our contact form or during discovery calls. We do not collect
              any information passively beyond standard web analytics (page views, referrer, device type).
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              Information you provide is used solely to respond to your enquiry, schedule discovery calls,
              and communicate about a potential or active project. We do not sell, rent, or share your
              personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              3. Data Retention
            </h2>
            <p>
              We retain contact and project information for as long as the business relationship is active
              and for a reasonable period thereafter for legitimate business purposes. You may request
              deletion of your data at any time by emailing us directly.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              4. Cookies
            </h2>
            <p>
              This website does not use tracking cookies. We may use minimal session cookies required for
              the contact form to function correctly. No advertising or behavioural tracking cookies are
              present on this site.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              5. Third-Party Services
            </h2>
            <p>
              We may use Calendly for booking discovery calls. When you interact with Calendly, their
              own privacy policy applies. We do not control how Calendly handles your data.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              6. Contact
            </h2>
            <p>
              For any privacy-related questions or data deletion requests, email us at{' '}
              <a href="mailto:hello@aivized.com" className="text-teal hover:underline">
                hello@aivized.com
              </a>
              . We aim to respond within 2 business days.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/" className="font-body text-sm text-soft-white/40 hover:text-teal transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
