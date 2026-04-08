export interface CaseStudyResult {
  value: number
  suffix: string
  label: string
  decimals?: number
}

export interface CaseStudy {
  slug: string
  industry: string
  company: string
  challenge: string
  solution: string
  results: CaseStudyResult[]
  accentColor: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'propvault-realty',
    industry: 'Real Estate',
    company: 'PropVault Realty',
    challenge:
      'Their sales team was manually calling and emailing every new lead — a process that took 3 hours per agent per day and left many leads untouched for 48+ hours.',
    solution:
      'AI voice agent for immediate lead follow-up + CRM automation to route, score, and tag leads by buying intent. Human agents only touched warm, qualified leads.',
    results: [
      { value: 68, suffix: '%', label: 'More meetings booked' },
      { value: 14, suffix: 'hrs', label: 'Saved per agent/week' },
      { value: 3.2, suffix: 'x', label: 'Pipeline growth', decimals: 1 },
    ],
    accentColor: '#00D4FF',
  },
  {
    slug: 'lumi-health',
    industry: 'Healthcare',
    company: 'Lumi Health',
    challenge:
      'A growing telehealth platform was drowning in support tickets — 600+ per week, mostly the same 20 questions about prescriptions, appointments, and billing.',
    solution:
      'AI chatbot trained on their entire knowledge base, integrated into their patient portal and website. Included strict compliance guardrails and escalation protocols for clinical questions.',
    results: [
      { value: 74, suffix: '%', label: 'Tickets auto-resolved' },
      { value: 22, suffix: 's', label: 'Avg. response time' },
      { value: 91, suffix: '%', label: 'Patient satisfaction' },
    ],
    accentColor: '#FF6B35',
  },
  {
    slug: 'northside-commerce',
    industry: 'E-commerce',
    company: 'Northside Commerce',
    challenge:
      'Their post-purchase flow was entirely manual — order confirmations, shipping updates, return requests, and review asks were all handled by a VA working inconsistent hours.',
    solution:
      'End-to-end automation connecting Shopify, their 3PL, their email platform, and a custom returns system. Every step from purchase to review was automated with smart fallbacks.',
    results: [
      { value: 140, suffix: '+', label: 'Tasks/day automated' },
      { value: 4, suffix: 'hrs', label: 'VA time saved daily' },
      { value: 31, suffix: '%', label: 'Review rate increase' },
    ],
    accentColor: '#00D4FF',
  },
  {
    slug: 'clearview-financial',
    industry: 'Financial Services',
    company: 'ClearView Financial',
    challenge:
      "Their advisors were spending 40% of their week on discovery calls that often led nowhere — talking to leads who weren't qualified or weren't ready to buy.",
    solution:
      'AI voice agent to run a structured 8-question pre-qualification call before any advisor got involved. Integrated with their CRM to auto-score and route results.',
    results: [
      { value: 55, suffix: '%', label: 'Less time on bad leads' },
      { value: 2.8, suffix: 'x', label: 'Close rate improvement', decimals: 1 },
      { value: 180, suffix: 'hrs', label: 'Advisor hours recovered/mo' },
    ],
    accentColor: '#FF6B35',
  },
]
