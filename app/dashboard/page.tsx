'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { getRides, getDaySummaries, clearAllRides } from '@/lib/storage'
import { Ride, DaySummary } from '@/lib/types'
import DashboardStats from '@/components/DashboardStats'
import RideHistory from '@/components/RideHistory'
import ExportButton from '@/components/ExportButton'
import WeeklyChart from '@/components/WeeklyChart'
import SettingsPanel from '@/components/SettingsPanel'
import TipsWidget from '@/components/TipsWidget'
import { useTranslation, formatDate, localeConfig } from '@/lib/i18n'

export default function DashboardPage() {
  const { t, plural, locale } = useTranslation()
  const [rides, setRides] = useState<Ride[]>([])
  const [summaries, setSummaries] = useState<DaySummary[]>([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [monthFilter, setMonthFilter] = useState('all')

  const months = useMemo(() => {
    const set = new Set<string>()
    summaries.forEach(s => {
      const m = s.date.substring(0, 7)
      set.add(m)
    })
    return Array.from(set).sort().reverse()
  }, [summaries])

  const filteredSummaries = useMemo(() => {
    if (monthFilter === 'all') return summaries
    return summaries.filter(s => s.date.startsWith(monthFilter))
  }, [summaries, monthFilter])

  const filteredRides = useMemo(() => {
    if (monthFilter === 'all') return rides
    return rides.filter(r => r.date.startsWith(monthFilter))
  }, [rides, monthFilter])

  const prevMonth = useMemo(() => {
    if (monthFilter === 'all' || months.indexOf(monthFilter) < 0) return null
    const idx = months.indexOf(monthFilter)
    if (idx >= months.length - 1) return null
    return months[idx + 1]
  }, [monthFilter, months])

  const prevSummaries = useMemo(() => {
    if (!prevMonth) return []
    return summaries.filter(s => s.date.startsWith(prevMonth))
  }, [prevMonth, summaries])

  const currentTotal = filteredSummaries.reduce((s, d) => s + d.totalProfit, 0)
  const prevTotal = prevSummaries.reduce((s, d) => s + d.totalProfit, 0)
  const variation = prevTotal !== 0 ? ((currentTotal - prevTotal) / Math.abs(prevTotal)) * 100 : 0

  const loadData = useCallback(() => {
    setRides(getRides())
    setSummaries(getDaySummaries())
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

  const handleClear = () => {
    clearAllRides()
    loadData()
    setShowClearConfirm(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{t('dash.title')}</h1>
          <p className="text-gray-400 text-sm">
            {plural('dash.corridas_count', filteredRides.length)} {plural('dash.registered', filteredRides.length)}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {months.length > 0 && (
            <div className="relative">
              <select
                value={monthFilter}
                onChange={e => setMonthFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 pr-8 outline-none focus:border-brand-300 cursor-pointer"
              >
                <option value="all">{t('month.todos')}</option>
                {months.map(m => {
                  const d = new Date(m + '-01')
                  return (
                    <option key={m} value={m}>
                      {formatDate(locale, d, { month: 'long', year: 'numeric' })}
                    </option>
                  )
                })}
              </select>
              <svg className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 hover:text-brand-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">{t('settings.titulo')}</span>
          </button>
          <ExportButton summaries={filteredSummaries} />

          {filteredRides.length > 0 && (
            <>
              {showClearConfirm ? (
                <div className="flex gap-1">
                  <button
                    onClick={handleClear}
                    className="px-3 py-2 text-xs bg-loss text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {t('dash.limpar_tudo')}
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-3 py-2 text-xs bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {t('dash.cancelar')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 text-xs text-gray-400 hover:text-loss border border-gray-200 dark:border-gray-700 rounded-lg hover:border-loss transition-colors"
                >
                  {t('dash.limpar_dados')}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {prevMonth && variation !== 0 && (
        <div className={`mb-6 rounded-xl px-4 py-3 text-sm flex items-center gap-2 ${
          variation >= 0 ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'
        }`}>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {variation >= 0 ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            )}
          </svg>
          {t('month.variacao', {
            dir: variation >= 0 ? t('month.positivo') : t('month.negativo'),
            pct: Math.abs(variation).toFixed(1),
          })}
        </div>
      )}

      <div className="space-y-6">
        <DashboardStats summaries={filteredSummaries} />
        <WeeklyChart summaries={filteredSummaries} />
        <TipsWidget />
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('dash.historico')}</h2>
          <RideHistory rides={filteredRides} onDelete={loadData} />
        </div>
      </div>

      {showSettings && <SettingsPanel onClose={() => { setShowSettings(false); loadData() }} />}
    </div>
  )
}
