'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import RideForm from '@/components/RideForm'
import ResultCard from '@/components/ResultCard'
import WeeklyChart from '@/components/WeeklyChart'
import DashboardStats from '@/components/DashboardStats'
import RideHistory from '@/components/RideHistory'
import { calculateProfit, CalcInput, CalcResult, formatCurrency } from '@/lib/calculate'
import { saveRide, getRides, getDaySummaries, canCalculate, getCalcCount, incrementCalcCount, getRemainingFreeCalcs, isPremium } from '@/lib/storage'
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

  const loadData = useCallback(() => {
    setRides(getRides())
    setSummaries(getDaySummaries())
    setCalcCount(getCalcCount())
  }, [])

  useEffect(() => {
    loadData()
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
  const freeLeft = isPremium() ? Infinity : remaining
  const blocked = !isPremium() && getCalcCount() >= 4

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-600 transition-colors mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('hero.como')}
            </a>
            <h1 className="text-3xl font-black text-gray-900">
              {t('page.calc_title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">{t('page.calc_title2')}</span> {t('page.calc_title3')}
            </h1>
          </div>
          <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${
            isPremium()
              ? 'bg-profit/10 text-profit border-profit/30'
              : freeLeft <= 1
              ? 'bg-warning/10 text-warning border-warning/30'
              : 'bg-brand-50 text-brand-600 border-brand-100'
          }`}>
            {isPremium()
              ? t('calc.remaining_premium')
              : t('calc.remaining', { count: freeLeft })}
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
                  href="#preco"
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
                <div className="text-5xl mb-4">📊</div>
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
    </div>
  )
}
