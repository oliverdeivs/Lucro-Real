'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import RideForm from '@/components/RideForm'
import ResultCard from '@/components/ResultCard'
import WeeklyChart from '@/components/WeeklyChart'
import DashboardStats from '@/components/DashboardStats'
import RideHistory from '@/components/RideHistory'
import SettingsPanel from '@/components/SettingsPanel'
import { calculateProfit, CalcInput, CalcResult, formatCurrency } from '@/lib/calculate'
import { saveRide, getRides, getDaySummaries, canCalculate, getCalcCount, incrementCalcCount, getRemainingFreeCalcs, isPremium, isTutorialSeen } from '@/lib/storage'
import Tutorial from '@/components/Tutorial'
import { useTranslation, localeConfig } from '@/lib/i18n'
import { Ride, DaySummary } from '@/lib/types'

export default function CalcularPage() {
  const { t, locale } = useTranslation()
  const router = useRouter()
  const [result, setResult] = useState<CalcResult | null>(null)
  const [lastInput, setLastInput] = useState<CalcInput | null>(null)
  const [saved, setSaved] = useState(false)
  const [rides, setRides] = useState<Ride[]>([])
  const [summaries, setSummaries] = useState<DaySummary[]>([])
  const [calcCount, setCalcCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isTutorialSeen()) {
      setShowTutorial(true)
    }
  }, [])

  const loadData = useCallback(() => {
    setRides(getRides())
    setSummaries(getDaySummaries())
    setCalcCount(getCalcCount())
  }, [])

  useEffect(() => {
    loadData()

    const onFocus = () => loadData()
    const onVisibility = () => { if (!document.hidden) loadData() }
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) loadData() }

    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [loadData])

  const handleCalculate = (input: CalcInput) => {
    setLastInput(input)
    setResult(calculateProfit(input))
    setSaved(false)
  }

  const handleSave = () => {
    if (!result || !lastInput) return
    if (saved) return

    if (!canCalculate()) {
      return
    }

    const ride: Ride = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      amount: lastInput.amount,
      kmDriven: lastInput.kmDriven,
      fuelCost: lastInput.fuelCost,
      profit: result.profit,
      costPerKm: result.costPerKm,
      status: result.status,
    }

    saveRide(ride)
    incrementCalcCount()
    setSaved(true)
    loadData()
  }

  const remaining = getRemainingFreeCalcs()
  const _freeLeft = isPremium() ? Infinity : remaining
  const freeLeft = mounted ? _freeLeft : 4
  const _blocked = !isPremium() && getCalcCount() >= 4
  const blocked = mounted ? _blocked : false
  const _premium = isPremium()
  const premium = mounted ? _premium : false

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-600 transition-colors mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('hero.como')}
            </a>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              {t('page.calc_title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">{t('page.calc_title2')}</span> {t('page.calc_title3')}
            </h1>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 hover:text-brand-600 border border-gray-200 rounded-lg hover:border-brand-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('settings.titulo')}
            </button>
            <div className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              !mounted ? 'bg-brand-50 text-brand-600 border-brand-100' :
              premium
                ? 'bg-profit/10 text-profit border-profit/30'
                : freeLeft <= 1
                ? 'bg-warning/10 text-warning border-warning/30'
                : 'bg-brand-50 text-brand-600 border-brand-100'
            }`}>
              {!mounted
                ? '...'
                : premium
                ? t('calc.remaining_premium')
                : t('calc.remaining', { count: freeLeft })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <RideForm onCalculate={handleCalculate} />
            </div>

            {result && (
              <div className="mt-4 space-y-3">
                <ResultCard result={result} onSave={handleSave} saved={saved} />
                {saved && (
                  <p className="text-xs text-center text-profit font-medium">
                    {t('calc.saved')}
                  </p>
                )}
                {saved && !blocked && (
                  <button
                    onClick={() => { setResult(null); setLastInput(null); setSaved(false) }}
                    className="w-full py-2.5 text-sm text-brand-600 font-semibold border-2 border-brand-200 rounded-xl hover:bg-brand-50 transition-all"
                  >
                    {t('calc.try_again')}
                  </button>
                )}
              </div>
            )}

            {blocked && (
              <div className="mt-6 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-xl text-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-2">{t('calc.limit_title')}</h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">
                  {t('calc.limit_desc', { max: 4 })}
                </p>
                <a
                  href="https://pay.hotmart.com/Q105978279A"
                  className="inline-block px-8 py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                >
                  {t('calc.limit_cta')}
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 space-y-4">
            {summaries.length === 0 && !result ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('calc.preview_title')}</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                  {t('calc.preview_desc')}
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{t('stats.lucro_total')}</h3>
                    <span className={`text-2xl font-black ${summaries.reduce((s, d) => s + d.totalProfit, 0) >= 0 ? 'text-profit' : 'text-loss'}`}>
                      {formatCurrency(summaries.reduce((s, d) => s + d.totalProfit, 0), locale)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-400">{t('calc.rides_total')}</div>
                      <div className="text-lg font-bold text-gray-900">{rides.length}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-400">{t('stats.km')}</div>
                      <div className="text-lg font-bold text-gray-900">{summaries.reduce((s, d) => s + d.totalKm, 0).toFixed(1)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-400">{t('calc.avg_per_ride')}</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(
                          rides.length > 0
                            ? summaries.reduce((s, d) => s + d.totalProfit, 0) / rides.length
                            : 0,
                          locale
                        )}
                      </div>
                    </div>
                  </div>
                  <WeeklyChart summaries={summaries} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t('calc.recent')}</h3>
                  <RideHistory rides={rides} onDelete={loadData} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  )
}
