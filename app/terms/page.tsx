import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — AIVIZED',
  description: 'Terms and conditions governing use of AIVIZED services and this website.',
  alternates: { canonical: 'https://aivized.com/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <span className="tag mb-4 inline-flex">Legal</span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-soft-white mb-4">
          Terms of Service
        </h1>
        <p className="font-body text-soft-white/40 mb-12 text-sm">
          Last updated: April 2026
        </p>

        <div className="space-y-10 font-body text-soft-white/65 leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              1. Services
            </h2>
            <p>
              AIVIZED provides AI development, automation, voice agent, and chatbot services to clients
              under individual project agreements. The specific scope, deliverables, timeline, and payment
              terms for any engagement are defined in a separate Statement of Work or project agreement
              signed by both parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              2. Intellectual Property
            </h2>
            <p>
              Upon full payment, clients receive ownership of all custom code and systems built
              specifically for their project. AIVIZED retains the right to use general methodologies,
              techniques, and non-client-specific tools developed during the engagement.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              3. Confidentiality
            </h2>
            <p>
              Both parties agree to keep confidential any proprietary information shared during the
              course of a project. AIVIZED will not disclose your business data, processes, or systems
              to third parties without your written consent. We are happy to sign an NDA before any
              project discussion — just ask.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              AIVIZED's liability for any claim arising from a project is limited to the fees paid for
              that specific project. We are not liable for indirect, incidental, or consequential damages
              arising from the use or inability to use any system we build.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              5. Website Use
            </h2>
            <p>
              This website is provided for informational purposes. Content is subject to change without
              notice. AIVIZED makes no warranties about the accuracy or completeness of information
              presented on this site.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              6. Governing Law
            </h2>
            <p>
              These terms are governed by applicable law. Any disputes will be resolved through good-faith
              negotiation before resorting to formal legal proceedings.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-soft-white text-xl mb-3">
              7. Contact
            </h2>
            <p>
              Questions about these terms can be directed to{' '}
              <a href="mailto:hello@aivized.com" className="text-teal hover:underline">
                hello@aivized.com
              </a>
              .
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
