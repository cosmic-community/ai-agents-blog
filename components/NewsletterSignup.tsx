'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  cta?: string
}

export default function NewsletterSignup({ cta }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative glass-card glow-border rounded-2xl p-8 md:p-12">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 rounded-2xl" />

        <div className="relative max-w-xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full text-xs font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Newsletter
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {cta || 'Stay in the loop on AI agents'}
          </h3>

          <p className="text-gray-500 dark:text-slate-400">
            Get the latest insights on building with AI agents, directly in your inbox. No spam, just practical wisdom.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#0e1224] border border-gray-200 dark:border-violet-500/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 text-sm whitespace-nowrap shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/30"
            >
              Subscribe
            </button>
          </form>

          {status === 'success' && (
            <p className="text-cyan-400 text-sm font-medium animate-fade-in">
              ✓ You&apos;re subscribed! Welcome aboard.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}