'use client'

import { useEffect, useState } from 'react'
import { getRides, getDaySummaries, clearAllRides } from '@/lib/storage'
import { Ride, DaySummary } from '@/lib/types'
import DashboardStats from '@/components/DashboardStats'
import RideHistory from '@/components/RideHistory'
import ExportButton from '@/components/ExportButton'
import WeeklyChart from '@/components/WeeklyChart'

export default function DashboardPage() {
  const [rides, setRides] = useState<Ride[]>([])
  const [summaries, setSummaries] = useState<DaySummary[]>([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const loadData = () => {
    setRides(getRides())
    setSummaries(getDaySummaries())
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleClear = () => {
    clearAllRides()
    loadData()
    setShowClearConfirm(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-400 text-sm">
            {rides.length} corrida{rides.length !== 1 ? 's' : ''} registrada{rides.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-2">
          <ExportButton summaries={summaries} />

          {rides.length > 0 && (
            <>
              {showClearConfirm ? (
                <div className="flex gap-1">
                  <button
                    onClick={handleClear}
                    className="px-3 py-2 text-xs bg-loss text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Limpar Tudo
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-3 py-2 text-xs bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 text-xs text-gray-400 hover:text-loss border border-gray-200 rounded-lg hover:border-loss transition-colors"
                >
                  Limpar Dados
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
          <h2 className="text-lg font-bold text-gray-900 mb-4">Histórico de Corridas</h2>
          <RideHistory rides={rides} onDelete={loadData} />
        </div>
      </div>
    </div>
  )
}
