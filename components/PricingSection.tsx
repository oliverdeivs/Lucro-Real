'use client'

import { useTranslation, localeConfig } from '@/lib/i18n'

export default function PricingSection() {
  const { t, locale } = useTranslation()
  const cfg = localeConfig[locale]

  const features = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <section id="preco" className="relative py-28 md:py-36 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,150,84,0.15)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            <span className="w-1 h-1 bg-brand-300 rounded-full" />
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-5 leading-[1.05]">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            {t('pricing.sub')}
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 p-8 md:p-10 shadow-xl shadow-black/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500 rounded-t-[2rem]" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-5 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              {t('pricing.best')}
            </div>

            <div className="text-center mb-8 mt-12">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-lg text-white/60 font-medium">{cfg.symbol}</span>
                <span className="text-6xl font-black text-white tracking-tight">37</span>
              </div>
              <div className="text-white/50 text-sm">{t('pricing.tag')}</div>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map(i => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <div className="w-5 h-5 bg-brand-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t(`pricing.feat${i}`)}
                </li>
              ))}
            </ul>

            <a
              href="https://pay.hotmart.com/Q105978279A"
              className="group block w-full py-4 bg-white text-brand-900 font-bold text-center rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/25 text-base"
            >
              {t('pricing.cta')}
              <span className="block text-xs font-normal text-brand-700/70 mt-0.5">{t('pricing.cta_sub')}</span>
            </a>

            <div className="flex items-center justify-center gap-5 mt-6 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t('pricing.segura')}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {t('pricing.garantia')}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('pricing.suporte')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
