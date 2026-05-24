'use client'

import { useTranslation, Locale, locales } from '@/lib/i18n'

export default function HeroSection() {
  const { t, locale, setLocale } = useTranslation()

  const toggleLang = () => {
    const idx = locales.indexOf(locale)
    const next = locales[(idx + 1) % locales.length] as Locale
    setLocale(next)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 pt-8 pb-28 md:pb-36">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.08] rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between pt-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-black/10">
              LR
            </div>
            <span className="text-base font-bold text-white">LucroReal</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/calcular" className="hidden sm:inline-flex text-sm text-white/60 hover:text-white transition-colors">
              {t('hero.nav_calc')}
            </a>
            <a href="#depoimentos" className="hidden sm:inline-flex text-sm text-white/60 hover:text-white transition-colors">
              {t('hero.nav_dep')}
            </a>
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-bold text-white/60 hover:text-white border border-white/20 rounded-xl hover:border-white/50 transition-all uppercase tracking-widest"
            >
              {locale === 'pt' ? 'ES' : 'PT'}
            </button>
            <a
              href="#preco"
              className="px-5 py-2.5 bg-white text-brand-900 text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg shadow-black/10"
            >
              {t('hero.comprar_btn')}
            </a>
          </div>
        </nav>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[calc(100vh-8rem)]">
          <div className="pt-16 lg:pt-24 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-brand-300 rounded-full animate-pulse" />
              {t('hero.badge')}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-6">
              {t('hero.title1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 via-brand-300 to-brand-100">
                {t('hero.title2')}
              </span>
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{t('hero.title3')}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-lg mb-10 leading-relaxed">
              {t('hero.text1')} <strong className="text-white">{t('hero.text2')}</strong>,{' '}
              {t('hero.text3')}{' '}
              <strong className="text-red-300">{t('hero.text4')}</strong> {t('hero.text5')}
              <br />
              {t('hero.text6')} <strong className="text-brand-300">{t('hero.text7')}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/calcular"
                className="group px-8 py-4 bg-white text-brand-900 font-semibold rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 text-lg inline-flex items-center gap-2"
              >
                {t('hero.cta')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-lg"
              >
                {t('hero.como')}
              </a>
            </div>

            <div className="flex items-center gap-10 mt-12 pt-8 border-t border-white/10">
              {[
                { value: '1.5M+', label: t('hero.stat1') },
                { value: '67%', label: t('hero.stat2') },
                { value: '9h+', label: t('hero.stat3') },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center animate-fadeInUp delay-200 pt-16 lg:pt-24">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-10 bg-white/10 rounded-full blur-3xl" />
              <img
                src="/public.png.png"
                alt="LucroReal App"
                className="relative w-full h-auto rounded-3xl shadow-2xl shadow-black/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
