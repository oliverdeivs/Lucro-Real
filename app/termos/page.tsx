'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

export default function TermosPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-300 transition-colors mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          {t('termos.voltar')}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('termos.title')}</h1>
        <p className="text-white/50 text-sm mb-2">{t('termos.subtitle')}</p>
        <p className="text-white/30 text-xs mb-10">{t('termos.last_update')}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s1_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s1_text')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s2_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s2_text')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s3_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s3_text')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s4_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s4_text')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s5_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s5_text')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s6_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s6_text')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t('termos.s7_title')}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{t('termos.s7_text')}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-medium transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t('termos.voltar')}
          </Link>
        </div>
      </div>
    </div>
  )
}
