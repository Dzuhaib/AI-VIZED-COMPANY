'use client'

import { useState, useRef } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import anime from 'animejs'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

const serviceOptions = [
  'AI Services',
  'Automation Workflows',
  'Voice Calling Agents',
  'AI Chatbots',
  'Multiple / Not sure yet',
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Your name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Your email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Tell us a bit about your project'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const label = e.target.closest('.field-wrapper')?.querySelector('label')
    if (!label) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    anime({
      targets: label,
      color: ['#F0F4FF80', '#00D4FF'],
      duration: 250,
      easing: 'easeOutCubic',
    })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const label = e.target.closest('.field-wrapper')?.querySelector('label')
    if (!label) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    anime({
      targets: label,
      color: ['#00D4FF', '#F0F4FF80'],
      duration: 250,
      easing: 'easeOutCubic',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    try {
      // Replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-card rounded-2xl p-12 text-center" role="alert">
        <CheckCircle
          size={48}
          className="text-teal mx-auto mb-4"
          aria-hidden="true"
        />
        <h3 className="font-heading font-bold text-2xl text-soft-white mb-3">
          Message received!
        </h3>
        <p className="font-body text-soft-white/60">
          We'll be in touch within one business day. If you need something
          urgent, email us directly at{' '}
          <a
            href="mailto:zuhaibahmed3213951@gmail.com"
            className="text-teal hover:underline"
          >
            zuhaibahmed3213951@gmail.com
          </a>
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 btn-secondary text-sm"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Contact form"
      noValidate
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="field-wrapper">
          <label
            htmlFor="name"
            className="block font-body text-sm font-medium text-soft-white/50 mb-2 transition-colors duration-200"
          >
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Jane Smith"
            className={`form-input ${errors.name ? 'border-red-500/60' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-400 font-body" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field-wrapper">
          <label
            htmlFor="email"
            className="block font-body text-sm font-medium text-soft-white/50 mb-2 transition-colors duration-200"
          >
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="jane@company.com"
            className={`form-input ${errors.email ? 'border-red-500/60' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400 font-body" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Company + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="field-wrapper">
          <label
            htmlFor="company"
            className="block font-body text-sm font-medium text-soft-white/50 mb-2 transition-colors duration-200"
          >
            Company / Project
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Acme Corp"
            className="form-input"
          />
        </div>

        <div className="field-wrapper">
          <label
            htmlFor="service"
            className="block font-body text-sm font-medium text-soft-white/50 mb-2 transition-colors duration-200"
          >
            What do you need?
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="form-input"
            aria-label="Service type"
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="field-wrapper">
        <label
          htmlFor="message"
          className="block font-body text-sm font-medium text-soft-white/50 mb-2 transition-colors duration-200"
        >
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="What's the biggest thing slowing your team down right now? Give us the honest version."
          className={`form-input resize-none ${errors.message ? 'border-red-500/60' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-400 font-body" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm font-body" role="alert">
          <AlertCircle size={16} aria-hidden="true" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-disabled={status === 'submitting'}
      >
        <span className="relative z-10 flex items-center gap-2">
          {status === 'submitting' ? (
            <>
              <span
                className="w-4 h-4 rounded-full border-2 border-navy/30 border-t-navy animate-spin"
                aria-hidden="true"
              />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={16} aria-hidden="true" />
            </>
          )}
        </span>
      </button>
    </form>
  )
}
