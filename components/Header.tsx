'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTranslation, localeConfig, Locale, locales } from '@/lib/i18n'
import { getTheme, setTheme as storeTheme } from '@/lib/storage'

export default function Header() {
  const { t, locale, setLocale } = useTranslation()
  const path = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const isHome = path === '/'

  useEffect(() => {
    setDark(getTheme() === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    storeTheme(next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  const toggleLang = () => {
    const idx = locales.indexOf(locale)
    const next = locales[(idx + 1) % locales.length] as Locale
    setLocale(next)
  }

  const cfg = localeConfig[locale]

  if (isHome) return null

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-6xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-200/30 group-hover:shadow-brand-300/50 transition-shadow">
            LR
          </div>
          <span className="font-bold text-lg text-gray-900">LucroReal</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              path === '/' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t('nav.calculadora')}
          </Link>
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              path === '/dashboard' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t('nav.dashboard')}
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-warning border border-gray-200 rounded-xl hover:border-warning/30 transition-all"
            title={dark ? t('theme.claro') : t('theme.escuro')}
          >
            {dark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleLang}
            className="ml-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-brand-600 border border-gray-200 rounded-xl hover:border-brand-300 transition-all uppercase tracking-wider"
            title={`Switch to ${locale === 'pt' ? 'Español' : 'Português'}`}
          >
            {locale === 'pt' ? 'ES' : 'PT'}
          </button>
          <a
            href="https://pay.hotmart.com/Q105978279A"
            className="ml-2 px-5 py-2 bg-gradient-to-r from-brand-600 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:from-brand-700 hover:to-emerald-600 transition-all shadow-lg shadow-brand-200/40"
          >
            {t('nav.comprar', { price: `${cfg.symbol}37` })}
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              path === '/' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t('nav.calculadora')}
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              path === '/dashboard' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t('nav.dashboard')}
          </Link>
          <button
            onClick={() => { toggleTheme(); setMobileOpen(false) }}
            className="block w-full px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl text-center"
          >
            {dark ? '☀️ ' + t('theme.claro') : '🌙 ' + t('theme.escuro')}
          </button>
          <button
            onClick={() => { toggleLang(); setMobileOpen(false) }}
            className="block w-full px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl text-center uppercase tracking-wider"
          >
            {locale === 'pt' ? '🇲🇽 Español' : '🇧🇷 Português'}
          </button>
          <a
            href="https://pay.hotmart.com/Q105978279A"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2.5 bg-gradient-to-r from-brand-600 to-emerald-500 text-white text-sm font-semibold rounded-xl text-center"
          >
            {t('nav.comprar', { price: `${cfg.symbol}37` })}
          </a>
        </div>
      )}
    </header>
  )
}
