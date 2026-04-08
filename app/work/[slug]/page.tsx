import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import { caseStudies } from '@/lib/case-studies'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = caseStudies.find((s) => s.slug === params.slug)
  if (!study) return {}

  return {
    title: `${study.company} Case Study`,
    description: `How AIVIZED helped ${study.company} in ${study.industry}. ${study.challenge}`,
    openGraph: {
      title: `${study.company} — AIVIZED Case Study`,
      description: study.challenge,
      url: `https://aivized.com/work/${study.slug}`,
    },
  }
}

// Detailed case study content per slug
const caseStudyDetails: Record<
  string,
  {
    overview: string
    context: string
    process: string[]
    outcome: string
    quote: string
    quoteAuthor: string
    quoteRole: string
  }
> = {
  'propvault-realty': {
    overview:
      'PropVault Realty operates across three cities with a team of 22 agents. Their growth had outpaced their lead handling capacity — new inquiries were sitting untouched for days, and agents were spending their mornings on phone calls that often went nowhere.',
    context:
      'The real estate market moves fast. A lead that doesn\'t hear from you in the first hour is probably already talking to a competitor. PropVault knew this, but their team was stretched thin.',
    process: [
      'We mapped every step of their existing lead flow — from inquiry form to first call to CRM entry.',
      'We identified that 80% of new leads were getting their first human contact 24-48 hours after inquiry. That\'s far too late.',
      'We built an AI voice agent that called new leads within 5 minutes of inquiry, introduced itself as part of the PropVault team, and ran a short qualification script.',
      'Qualified leads were automatically routed to the right agent based on location, property type, and budget — with a full conversation summary waiting in the CRM.',
      'Unqualified leads were tagged and placed in a longer-term nurture sequence.',
    ],
    outcome:
      'Within 60 days, PropVault\'s pipeline had grown significantly — not because they had more leads, but because they were actually engaging the ones they already had. Agents reported that their calls felt more productive because they already knew who they were talking to.',
    quote:
      'Before AIVIZED, our morning routine was calling through yesterday\'s leads hoping someone would pick up. Now those calls are already handled by the time we sit down. We talk to people who are ready.',
    quoteAuthor: 'Marcus T.',
    quoteRole: 'Head of Sales, PropVault Realty',
  },
  'lumi-health': {
    overview:
      'Lumi Health is a telehealth platform with 15,000 active patients. Scaling their support was a constant challenge — the questions were predictable, but their support team was burning out answering the same ones repeatedly.',
    context:
      'Healthcare is high-stakes. A chatbot that gives wrong information about medication or billing isn\'t just annoying — it can cause real harm. That meant the solution had to be accurate, carefully scoped, and have strong escalation logic.',
    process: [
      'We spent two weeks going through Lumi\'s support tickets, FAQs, clinical protocols, and compliance requirements before writing a single line of code.',
      'We defined exactly what the chatbot would and wouldn\'t answer — clinical questions always went to a human.',
      'We built the knowledge base from their documentation, then tested it with edge cases designed to trip it up.',
      'We integrated with their patient portal so the chatbot could pull appointment and prescription information in real time.',
      'We ran a two-week soft launch with monitoring before going fully live.',
    ],
    outcome:
      'Seventy-four percent of support tickets are now resolved without a human. The 26% that escalate are genuinely complex — the support team is doing the work they were actually hired for.',
    quote:
      'We thought AI chatbots would frustrate our patients. The one AIVIZED built actually resolves 70% of support tickets without any human involvement. Our team finally has breathing room.',
    quoteAuthor: 'Priya K.',
    quoteRole: 'Customer Success Lead, Lumi Health',
  },
  'northside-commerce': {
    overview:
      'Northside Commerce sells home goods across multiple channels. As they scaled past $3M in annual revenue, their back-end operations didn\'t scale with them — everything from order confirmation to return processing was still done manually.',
    context:
      'One VA. Five systems. No documentation. Things fell through the cracks constantly — sometimes customers waited days for a response to a simple return request. The founder was paying for inconsistency.',
    process: [
      'We audited every recurring task the VA was doing and documented the exact rules behind each one.',
      'We identified that 90% of the tasks followed consistent logic — they were perfect for automation.',
      'We connected Shopify, their 3PL warehouse system, Klaviyo, and their internal returns tracker using a combination of Make and custom API integrations.',
      'We built automated flows for: order confirmation, shipping updates, delivery confirmation, return requests, review asks, and reorder reminders.',
      'Every flow had a fallback — if something didn\'t match the expected pattern, it flagged to the founder with the context they needed.',
    ],
    outcome:
      'The VA now works on actual customer relationships instead of data entry. The founder describes it as "like hiring someone who never makes a mistake and doesn\'t take weekends off."',
    quote:
      'The automation they built connects five different tools we use and runs 140+ tasks a day that used to take my VA four hours. I don\'t even think about those tasks anymore.',
    quoteAuthor: 'James R.',
    quoteRole: 'Founder, Northside Commerce',
  },
  'clearview-financial': {
    overview:
      'ClearView Financial is a boutique advisory firm with 12 advisors. Their typical engagement value was high — but they were spending enormous amounts of time in discovery calls that didn\'t convert. Unqualified leads were eating the same time as great prospects.',
    context:
      'Financial advisors are expensive. Getting them to spend 45 minutes with a lead who was never going to become a client is a real cost — both in time and in opportunity.',
    process: [
      'We worked with the advisory team to build an 8-question pre-qualification script — short enough that people would complete it, specific enough to reveal real buying intent.',
      'We built an AI voice agent that called new inquiry leads, conducted the pre-qualification conversation, and logged results directly to Salesforce.',
      'The CRM automatically scored leads based on responses and routed them accordingly — high-intent leads triggered an immediate advisor follow-up, others went into nurture.',
      'We also built a dashboard so advisors could review call recordings and qualification notes before picking up the phone.',
    ],
    outcome:
      'ClearView\'s advisors recovered almost 30% of their week. Close rates went up significantly — not because the market changed, but because advisors were spending time with people who were already partway convinced.',
    quote:
      'We were spending too much time talking to the wrong people. Now our advisors only get on calls with leads who\'ve already indicated they\'re a real fit. The quality of every conversation has gone up.',
    quoteAuthor: 'Sarah L.',
    quoteRole: 'Managing Director, ClearView Financial',
  },
}

export default function CaseStudyPage({ params }: PageProps) {
  const study = caseStudies.find((s) => s.slug === params.slug)
  if (!study) notFound()

  // TypeScript narrowing: study is guaranteed non-null after notFound() above
  const safeStudy = study!
  const details = caseStudyDetails[safeStudy.slug]
  const currentIndex = caseStudies.findIndex((s) => s.slug === safeStudy.slug)
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length]

  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <div className="pt-28 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-soft-white/40 hover:text-teal transition-colors font-body text-sm"
            aria-label="Back to all case studies"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All Case Studies
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="case-study-heading"
      >
        <div className="max-w-4xl mx-auto">
          <span
            className="tag mb-4 inline-flex"
            style={{
              background: `${safeStudy.accentColor}15`,
              borderColor: `${safeStudy.accentColor}30`,
              color: safeStudy.accentColor,
            }}
          >
            {safeStudy.industry}
          </span>
          <h1
            id="case-study-heading"
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-soft-white mb-6"
          >
            {safeStudy.company}
          </h1>
          <p className="font-body text-soft-white/50 text-lg leading-relaxed max-w-2xl">
            {details?.overview}
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Results */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate/20"
        aria-label="Case study results"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-soft-white text-2xl mb-8">
            The results
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {safeStudy.results.map((result, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-heading font-extrabold text-4xl sm:text-5xl mb-2"
                  style={{ color: safeStudy.accentColor }}
                >
                  <AnimatedCounter
                    end={result.value}
                    suffix={result.suffix}
                    decimals={result.decimals ?? 0}
                    duration={2000}
                  />
                </div>
                <div className="font-body text-soft-white/50 text-sm">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-label="Case study details"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Context */}
          <div>
            <h2 className="font-heading font-bold text-soft-white text-2xl mb-4">
              The context
            </h2>
            <p className="font-body text-soft-white/60 leading-relaxed">
              {details?.context}
            </p>
          </div>

          {/* Challenge */}
          <div>
            <h2 className="font-heading font-bold text-soft-white text-2xl mb-4">
              The challenge
            </h2>
            <p className="font-body text-soft-white/60 leading-relaxed">
              {safeStudy.challenge}
            </p>
          </div>

          {/* What we built */}
          <div>
            <h2 className="font-heading font-bold text-soft-white text-2xl mb-6">
              What we built
            </h2>
            <ol className="space-y-4" aria-label="Project process steps">
              {details?.process.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold mt-0.5"
                    style={{
                      background: `${safeStudy.accentColor}20`,
                      color: safeStudy.accentColor,
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="font-body text-soft-white/60 text-sm leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Outcome */}
          <div>
            <h2 className="font-heading font-bold text-soft-white text-2xl mb-4">
              The outcome
            </h2>
            <p className="font-body text-soft-white/60 leading-relaxed">
              {details?.outcome}
            </p>
          </div>

          {/* Quote */}
          {details?.quote && (
            <blockquote
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
              aria-label={`Quote from ${details.quoteAuthor}`}
            >
              <div
                className="absolute top-4 left-8 font-heading text-7xl leading-none opacity-10"
                style={{ color: safeStudy.accentColor }}
                aria-hidden="true"
              >
                "
              </div>
              <p className="font-body text-soft-white/80 text-base leading-relaxed mb-6 relative z-10">
                {details.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                  style={{
                    background: `${safeStudy.accentColor}20`,
                    color: safeStudy.accentColor,
                    border: `1px solid ${safeStudy.accentColor}30`,
                  }}
                  aria-hidden="true"
                >
                  {details.quoteAuthor.charAt(0)}
                </div>
                <div>
                  <cite className="font-heading font-semibold text-soft-white text-sm not-italic">
                    {details.quoteAuthor}
                  </cite>
                  <p className="font-body text-soft-white/40 text-xs">
                    {details.quoteRole}
                  </p>
                </div>
              </footer>
            </blockquote>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* Next case study */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-label="Next case study"
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-body text-soft-white/40 text-sm mb-1">Next case study</p>
            <Link
              href={`/work/${nextStudy.slug}`}
              className="font-heading font-bold text-xl text-soft-white hover:text-teal transition-colors flex items-center gap-2 group"
              aria-label={`Read ${nextStudy.company} case study`}
            >
              {nextStudy.company}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            <span className="relative z-10">Start Your Project</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
