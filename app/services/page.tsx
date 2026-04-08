'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, GitBranch, Phone, MessageSquare } from 'lucide-react'
import ServiceBlock from '@/components/services/ServiceBlock'
import FAQSection, { type FAQItem } from '@/components/shared/FAQSection'
import CTASection from '@/components/home/CTASection'

const servicesFaqs: FAQItem[] = [
  {
    q: "What tools and platforms do you actually use?",
    a: "It depends on your stack. For automation: Make, n8n, Zapier, or custom API integrations. For voice agents: Vapi, Retell AI, or custom WebRTC stacks. For chatbots: OpenAI, Anthropic, or open-source models fine-tuned on your data. We pick what fits — not what we're partnered with.",
  },
  {
    q: "Can you automate a workflow that uses software you haven't heard of?",
    a: "Almost certainly yes. If the software has an API or a webhook, we can connect it. If it doesn't, we've built custom scrapers and browser automations for tools that predate modern APIs. We figure it out.",
  },
  {
    q: "How are your voice agents different from a phone menu (IVR)?",
    a: "Night and day. An IVR reads a script and forces callers down a decision tree. Our voice agents have real conversations — they listen, respond in context, handle unexpected questions, and know when to bring in a human. They're trained on your specific business, not generic responses.",
  },
  {
    q: "What makes your chatbots better than just connecting ChatGPT to a website?",
    a: "A generic ChatGPT widget answers based on general knowledge. Ours is trained on your actual documents, policies, products, and past support conversations. It knows the specifics of your business — prices, procedures, edge cases — and it's scoped so it doesn't go off-topic.",
  },
  {
    q: "Do I need to have existing data or a CRM before you can start?",
    a: "Not necessarily. Some clients come to us with organized data and others come with a folder of PDFs and a spreadsheet. We work with what you have and help you structure it properly as part of the build.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We offer monthly retainer packages that include monitoring, updates, and improvements based on real usage data. Most clients stay on retainer because AI systems improve significantly with real-world feedback.",
  },
]

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'ai-services',
    icon: Brain,
    color: '#00D4FF',
    number: '01',
    title: 'AI Services',
    tagline: 'Stop guessing. Start knowing.',
    body: "Most businesses sit on mountains of data and barely use it. We help you change that. Whether it's building a custom model, connecting AI to your existing tools, or training something on your proprietary data — we handle the technical side so you get real business value out of it.",
    features: [
      { title: 'Custom model training', description: '' },
      { title: 'Predictive analytics', description: '' },
      { title: 'AI-powered search', description: '' },
      { title: 'Content generation', description: '' },
      { title: 'Data pipeline setup', description: '' },
    ],
    howItWorks: [
      'We start with a thorough audit of your data, tools, and goals — no assumptions.',
      'Together we identify the highest-impact AI opportunity for your business right now.',
      'We build, test, and refine the model or integration in a controlled environment.',
      'We deploy to production with monitoring in place so you know it\'s working.',
      'You get a handover session — we make sure your team knows how to work with it.',
    ],
  },
  {
    id: 'automation',
    icon: GitBranch,
    color: '#FF6B35',
    number: '02',
    title: 'Automation Workflows',
    tagline: 'Your workflow runs even when you sleep.',
    body: "The tasks that eat three hours a day aren't hard. They're just repetitive. We map the workflows your team keeps doing manually, find the ones that can be automated, and build systems that handle them without anyone having to intervene. More time for the work that actually needs a human.",
    features: [
      { title: 'CRM automation', description: '' },
      { title: 'Lead routing & nurturing', description: '' },
      { title: 'Invoice & billing flows', description: '' },
      { title: 'Multi-tool integrations', description: '' },
      { title: 'Reporting & alerts', description: '' },
    ],
    howItWorks: [
      'We map your current workflows and highlight every manual step that could be automated.',
      'We prioritize by time saved vs. build complexity — fast wins first.',
      'We build the automation using the right tools for your stack (Make, Zapier, custom APIs, n8n, etc.).',
      'We test with real data to make sure edge cases are covered.',
      'Your team gets clear documentation on how everything works and who to call if something breaks.',
    ],
  },
  {
    id: 'voice-agents',
    icon: Phone,
    color: '#00D4FF',
    number: '03',
    title: 'Voice Calling Agents',
    tagline: "We handle the calls so your team doesn't have to.",
    body: "Phone calls don't stop. Leads want follow-up, clients want updates, appointments need confirming. Our AI voice agents handle inbound and outbound calls the way a good team member would — with the right information, a natural tone, and the ability to hand off to a human when the situation calls for it.",
    features: [
      { title: 'Inbound call handling', description: '' },
      { title: 'Outbound follow-up calls', description: '' },
      { title: 'Appointment booking', description: '' },
      { title: 'Lead qualification', description: '' },
      { title: 'After-hours coverage', description: '' },
    ],
    howItWorks: [
      'We learn your call scripts, FAQs, objections, and escalation triggers.',
      'We build a voice persona that fits your brand — not the generic robot voice.',
      'We connect the agent to your CRM, calendar, or whatever system it needs to pull from.',
      'We run test calls with your team to dial in the tone and logic.',
      'We launch, monitor live calls, and refine based on real conversations.',
    ],
  },
  {
    id: 'chatbots',
    icon: MessageSquare,
    color: '#FF6B35',
    number: '04',
    title: 'AI Chatbots',
    tagline: 'Customers get answers in seconds, not hours.',
    body: "Not a FAQ accordion with a chat bubble. A real AI system trained on your docs, policies, products, and common customer situations. It gives accurate answers, handles nuance, and knows when to loop in a human. The result: fewer repetitive support tickets, faster responses, and customers who feel heard.",
    features: [
      { title: 'Knowledge base training', description: '' },
      { title: 'Multi-channel deployment', description: '' },
      { title: 'Human handoff logic', description: '' },
      { title: 'Conversation memory', description: '' },
      { title: 'Analytics dashboard', description: '' },
    ],
    howItWorks: [
      'We collect your documentation, support tickets, and product information to build the knowledge base.',
      'We define the chatbot\'s scope — what it handles and when it escalates.',
      'We train, test, and red-team the bot to catch gaps and wrong answers.',
      'We deploy it to your website, app, or support platform.',
      'We review conversation logs weekly at launch and adjust based on what real users are asking.',
    ],
  },
]

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.hero-text') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      )

      // Service blocks stagger
      const blocks = blocksRef.current?.querySelectorAll('.service-block-wrapper')
      if (blocks) {
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                once: true,
              },
            }
          )
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="services-page-heading"
      >
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <div className="hero-text">
            <span className="tag mb-6 inline-flex">Services</span>
          </div>
          <h1
            id="services-page-heading"
            className="hero-text font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-soft-white mb-6 max-w-3xl"
          >
            AI that does{' '}
            <span className="gradient-text-teal">actual work</span>
          </h1>
          <p className="hero-text font-body text-soft-white/50 text-lg sm:text-xl max-w-2xl leading-relaxed">
            We don't sell software subscriptions or generic plugins. We build
            things that are specific to how your business operates — and we
            stay involved until they're working the way they should.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Service blocks */}
      <section
        ref={blocksRef}
        className="py-20 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto"
        aria-label="Service details"
      >
        {services.map((svc) => (
          <div key={svc.id} className="service-block-wrapper">
            <ServiceBlock {...svc} />
          </div>
        ))}
      </section>

      <div className="section-divider" />

      {/* FAQs */}
      <FAQSection
        faqs={servicesFaqs}
        heading="Questions about our services"
        subheading="More questions? Book a call and ask us directly."
      />

      <CTASection />
    </div>
  )
}
