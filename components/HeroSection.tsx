'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/calculate'
import { useTranslation, Locale, locales, localeConfig } from '@/lib/i18n'

const demoResults = [
  { amount: 32.50, km: 18, fuel: 14.80, profit: 17.70, score: 'B' },
  { amount: 18.00, km: 12, fuel: 9.60, profit: 8.40, score: 'C' },
  { amount: 45.00, km: 35, fuel: 28.00, profit: 17.00, score: 'D' },
  { amount: 27.00, km: 22, fuel: 30.80, profit: -3.80, score: 'F' },
]

export default function HeroSection() {
  const { t, locale, setLocale } = useTranslation()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % demoResults.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const r = demoResults[current]

  const toggleLang = () => {
    const idx = locales.indexOf(locale)
    const next = locales[(idx + 1) % locales.length] as Locale
    setLocale(next)
  }

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-28 md:pb-36">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-100/60 via-emerald-50/40 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between pt-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md shadow-brand-200/40">
              LR
            </div>
            <span className="text-base font-bold text-gray-900">LucroReal</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#calculadora" className="hidden sm:inline-flex text-sm text-gray-400 hover:text-gray-900 transition-colors">
              {t('hero.nav_calc')}
            </a>
            <a href="#depoimentos" className="hidden sm:inline-flex text-sm text-gray-400 hover:text-gray-900 transition-colors">
              {t('hero.nav_dep')}
            </a>
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-brand-600 border border-gray-200 rounded-xl hover:border-brand-300 transition-all uppercase tracking-widest"
            >
              {locale === 'pt' ? 'ES' : 'PT'}
            </button>
            <a
              href="#preco"
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10"
            >
              {t('hero.comprar_btn')}
            </a>
          </div>
        </nav>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[calc(100vh-8rem)]">
          <div className="pt-16 lg:pt-24 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
              {t('hero.badge')}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.95] tracking-tighter mb-6">
              {t('hero.title1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-500">
                {t('hero.title2')}
              </span>
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{t('hero.title3')}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-lg mb-10 leading-relaxed">
              {t('hero.text1')} <strong className="text-gray-900">{t('hero.text2')}</strong>,{' '}
              {t('hero.text3')}{' '}
              <strong className="text-red-500">{t('hero.text4')}</strong> {t('hero.text5')}
              <br />
              {t('hero.text6')} <strong className="text-brand-600">{t('hero.text7')}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#calculadora"
                className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/20 text-lg inline-flex items-center gap-2"
              >
                {t('hero.cta')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="px-8 py-4 bg-gray-50 text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-300 text-lg"
              >
                {t('hero.como')}
              </a>
            </div>

            <div className="flex items-center gap-10 mt-12 pt-8 border-t border-gray-100">
              {[
                { value: '1.5M+', label: t('hero.stat1') },
                { value: '67%', label: t('hero.stat2') },
                { value: '9h+', label: t('hero.stat3') },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center animate-fadeInUp delay-200 pt-16 lg:pt-24">
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-r from-brand-500/15 via-emerald-500/15 to-blue-500/15 rounded-full blur-3xl" />

              <div className="relative w-[300px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-gray-900/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
                  <div className="w-20 h-1.5 bg-gray-700 rounded-full" />
                </div>

                <div className="w-[276px] h-[598px] bg-white rounded-[2.25rem] overflow-hidden relative">
                  <div className="h-12 bg-gray-900 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">9:41</span>
                  </div>

                  <div className="px-4 pt-3 pb-2 bg-white">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                        LR
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">LucroReal</div>
                        <div className="text-[10px] text-gray-400">{t('hero.demo.live')}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                        <span className="text-[11px] text-gray-500">{t('hero.demo.valor')}</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(r.amount, locale)}</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                        <span className="text-[11px] text-gray-500">{t('hero.demo.km')}</span>
                        <span className="text-sm font-bold text-gray-900">{r.km} km</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                        <span className="text-[11px] text-gray-500">{t('hero.demo.comb')}</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(r.fuel, locale)}</span>
                      </div>
                    </div>

                    <div className={`rounded-xl p-3 ${r.profit >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-medium text-gray-500">{t('hero.demo.lucro')}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-black ${r.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {r.profit >= 0 ? '+' : ''}{formatCurrency(r.profit, locale)}
                          </span>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${
                            r.score === 'F' ? 'bg-red-500' : r.score >= 'D' ? 'bg-yellow-500' : 'bg-emerald-500'
                          }`}>
                            {r.score}
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-400 leading-tight">
                        {r.score === 'F'
                          ? t('hero.demo.f_msg')
                          : r.score === 'D'
                          ? t('hero.demo.d_msg')
                          : r.score === 'C'
                          ? t('hero.demo.c_msg')
                          : t('hero.demo.b_msg')}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      {demoResults.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-500 w-4' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-14 bg-white flex items-center justify-around px-6 border-t border-gray-100">
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  <div className="w-[100px] h-[3px] bg-gray-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
