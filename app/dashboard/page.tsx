'use client'

import { useEffect, useState, useCallback } from 'react'
import { getRides, getDaySummaries, clearAllRides } from '@/lib/storage'
import { Ride, DaySummary } from '@/lib/types'
import DashboardStats from '@/components/DashboardStats'
import RideHistory from '@/components/RideHistory'
import ExportButton from '@/components/ExportButton'
import WeeklyChart from '@/components/WeeklyChart'
import SettingsPanel from '@/components/SettingsPanel'
import { useTranslation } from '@/lib/i18n'

export default function DashboardPage() {
  const { t, plural } = useTranslation()
  const [rides, setRides] = useState<Ride[]>([])
  const [summaries, setSummaries] = useState<DaySummary[]>([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const loadData = useCallback(() => {
    setRides(getRides())
    setSummaries(getDaySummaries())
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleClear = () => {
    clearAllRides()
    loadData()
    setShowClearConfirm(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{t('dash.title')}</h1>
          <p className="text-gray-400 text-sm">
            {plural('dash.corridas_count', rides.length)} {plural('dash.registered', rides.length)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="px-3 py-2 text-xs text-white/60 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <ExportButton summaries={summaries} />

          {rides.length > 0 && (
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
                  className="px-3 py-2 text-xs text-gray-400 hover:text-loss border border-gray-200 rounded-lg hover:border-loss transition-colors"
                >
                  {t('dash.limpar_dados')}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <DashboardStats summaries={summaries} />
        <WeeklyChart summaries={summaries} />
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dash.historico')}</h2>
          <RideHistory rides={rides} onDelete={loadData} />
        </div>
      </div>

      {showSettings && <SettingsPanel onClose={() => { setShowSettings(false); loadData() }} />}
    </div>
  )
}
