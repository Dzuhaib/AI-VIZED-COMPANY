'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SplineScene from '@/components/SplineScene'
import { ArrowRight, Zap, Target, Heart } from 'lucide-react'
import FAQSection, { type FAQItem } from '@/components/shared/FAQSection'
import CTASection from '@/components/home/CTASection'

const aboutFaqs: FAQItem[] = [
  {
    q: "How big is the AIVIZED team?",
    a: "Small and intentional. We have a core team of AI engineers, an automation specialist, and a client success lead. We bring in trusted specialists for specific project needs rather than hiring generalists to fill headcount.",
  },
  {
    q: "Are you a software product company or a services company?",
    a: "Services. We build custom systems for your specific business — we don't sell a platform and expect you to configure it yourself. Everything we deliver is built and maintained by us.",
  },
  {
    q: "Do you take on long-term retainer clients?",
    a: "Yes, and most of our relationships work this way. AI systems get meaningfully better with real-world data and iteration. Clients on retainer see the most improvement over time because we keep tuning based on what's actually happening.",
  },
  {
    q: "Where is AIVIZED based?",
    a: "We're fully remote and work with clients globally. Our team is spread across time zones which means faster turnaround and flexible availability for clients in different regions.",
  },
  {
    q: "Do you only work in specific industries?",
    a: "No. We've built systems for hospitality, healthcare, e-commerce, real estate, and professional services. The specific industry matters less than the type of problem — repetitive manual tasks, high call volume, slow lead follow-up. Those patterns appear everywhere.",
  },
]

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Target,
    title: 'Results over activity',
    body: 'We don\'t count hours. We count what changed. If the automation doesn\'t save your team time or the chatbot doesn\'t reduce tickets, we keep working.',
  },
  {
    icon: Zap,
    title: 'Simple that works beats complex that doesn\'t',
    body: 'We build the simplest thing that solves your actual problem. We\'ve seen too many AI projects fail because they were overengineered from day one.',
  },
  {
    icon: Heart,
    title: 'We\'re partners, not vendors',
    body: 'We stay involved after launch. We answer questions. We iterate. Most of our clients have been with us for years — that doesn\'t happen with one-and-done project shops.',
  },
]

const timeline = [
  {
    year: '2020',
    title: 'Started with a problem',
    body: 'Our founder was watching businesses struggle with software that promised automation and delivered headaches. He started taking on individual projects — fixing the broken parts.',
  },
  {
    year: '2021',
    title: 'First real AI project',
    body: 'A real estate client needed AI to qualify leads at scale. We built it, it worked, and the referrals started coming. Word of mouth is a powerful thing.',
  },
  {
    year: '2022',
    title: 'The voice agent pivot',
    body: 'Voice AI matured enough to actually sound human. We saw the opening and built our first commercial voice calling agent for a healthcare client. 40,000 calls in the first month.',
  },
  {
    year: '2023',
    title: 'Team expansion',
    body: 'Brought on AI engineers, a dedicated automation specialist, and a client success lead. We stopped being a one-person shop and became something more deliberate.',
  },
  {
    year: '2024',
    title: 'AIVIZED officially launched',
    body: 'We formalized the brand, the process, and the offer. Still the same ethos — just a cleaner way of doing things. 80+ clients and counting.',
  },
]

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & AI Architect',
    bio: 'Former software engineer turned AI obsessive. Built his first automation when he was tired of doing repetitive dev tasks. Never stopped.',
    avatar: 'AR',
    color: '#00D4FF',
  },
  {
    name: 'Sam Chen',
    role: 'Head of Automation',
    bio: 'Has mapped and automated workflows for everyone from solo founders to 200-person teams. Says the process is always the same — the context is different.',
    avatar: 'SC',
    color: '#FF6B35',
  },
  {
    name: 'Jordan Patel',
    role: 'Voice AI Engineer',
    bio: 'Obsessed with making AI sound like a thoughtful person, not a phone menu. Responsible for the voice systems that have handled millions of calls.',
    avatar: 'JP',
    color: '#00D4FF',
  },
]

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero entrance
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

      // Timeline — scrub animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item')
      if (timelineItems) {
        timelineItems.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true,
              },
            }
          )
        })
      }

      // Values stagger
      gsap.fromTo(
        valuesRef.current?.querySelectorAll('.value-card') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Team stagger
      gsap.fromTo(
        teamRef.current?.querySelectorAll('.team-card') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="about-heading"
      >
        {/* Spline background */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none hidden lg:block" aria-hidden="true">
          <SplineScene
            scene={process.env.NEXT_PUBLIC_SPLINE_ABOUT || ''}
            className="w-full h-full"
          />
        </div>

        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10">
          <div className="hero-text">
            <span className="tag mb-6 inline-flex">About AIVIZED</span>
          </div>
          <h1
            id="about-heading"
            className="hero-text font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-soft-white mb-6 max-w-2xl"
          >
            We started because{' '}
            <span className="text-coral">the gap was obvious</span>
          </h1>
          <p className="hero-text font-body text-soft-white/50 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
            Great AI tools exist. Most businesses can't connect them to their actual
            operations. We built AIVIZED to close that gap — with real
            implementations, not demos.
          </p>
          <div className="hero-text flex items-center gap-4">
            <Link href="/contact" className="btn-primary">
              <span className="relative z-10 flex items-center gap-2">
                Work with us <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Values */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="values-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="values-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl text-soft-white mb-4"
          >
            How we think
          </h2>
          <p className="font-body text-soft-white/40 mb-12 max-w-lg">
            Three principles that shape every project we take on.
          </p>

          <div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((val, i) => {
              const Icon = val.icon
              return (
                <div key={i} className="value-card glass-card rounded-2xl p-8">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-6" aria-hidden="true">
                    <Icon size={20} className="text-teal" />
                  </div>
                  <h3 className="font-heading font-bold text-soft-white text-lg mb-3">
                    {val.title}
                  </h3>
                  <p className="font-body text-soft-white/50 text-sm leading-relaxed">
                    {val.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Timeline */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="timeline-heading"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            id="timeline-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl text-soft-white mb-4"
          >
            How we got here
          </h2>
          <p className="font-body text-soft-white/40 mb-16 max-w-md">
            The short version. Every milestone was earned by shipping something
            that actually worked.
          </p>

          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, #00D4FF40, #00D4FF40, transparent)',
              }}
              aria-hidden="true"
            />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`timeline-item relative flex gap-8 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Content side */}
                  <div className="sm:w-1/2 flex flex-col justify-center">
                    <div
                      className={`glass-card rounded-2xl p-6 ${
                        i % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'
                      }`}
                    >
                      <span className="font-heading font-extrabold text-4xl text-teal/20 block mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-heading font-bold text-soft-white text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-soft-white/50 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-teal bg-navy items-center justify-center z-10"
                    aria-hidden="true"
                  />

                  {/* Spacer side */}
                  <div className="sm:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Team */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="team-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="team-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl text-soft-white mb-4"
          >
            The people behind it
          </h2>
          <p className="font-body text-soft-white/40 mb-12 max-w-md">
            Small team, sharp focus. Every person here has built things that
            are in production today.
          </p>

          <div
            ref={teamRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="team-card glass-card rounded-2xl p-8"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-bold text-lg mb-6"
                  style={{
                    background: `${member.color}15`,
                    color: member.color,
                    border: `1px solid ${member.color}30`,
                  }}
                  aria-hidden="true"
                >
                  {member.avatar}
                </div>
                <h3 className="font-heading font-bold text-soft-white text-xl mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-sm mb-4" style={{ color: member.color }}>
                  {member.role}
                </p>
                <p className="font-body text-soft-white/50 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQs */}
      <FAQSection
        faqs={aboutFaqs}
        heading="Questions about AIVIZED"
        subheading="Anything else? We're easy to reach."
      />

      <CTASection />
    </div>
  )
}
