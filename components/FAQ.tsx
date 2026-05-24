'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'

export default function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)
  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6']

  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block text-sm font-semibold text-white bg-white/10 px-4 py-1.5 rounded-full mb-4">
            {t('faq.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            {t('faq.sub')}
          </p>
        </div>

        <div className="space-y-3">
          {faqKeys.map((key, i) => {
            const isOpen = open === i
            return (
              <div
                key={key}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-black/20"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-white hover:bg-white/[0.03] transition-colors gap-4"
                >
                  <span className="text-sm md:text-base">{t(`faq.${key}`)}</span>
                  <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-brand-500/30 rotate-180' : ''
                  }`}>
                    <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-brand-300' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/10 pt-4">
                    {t(`faq.a${key[1]}`)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
