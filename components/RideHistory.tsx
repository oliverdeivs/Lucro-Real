'use client'

import { Ride } from '@/lib/types'
import { formatCurrency } from '@/lib/calculate'
import { deleteRide } from '@/lib/storage'
import { useState } from 'react'
import { useTranslation, formatDate } from '@/lib/i18n'

interface Props {
  rides: Ride[]
  onDelete: () => void
}

export default function RideHistory({ rides, onDelete }: Props) {
  const { t, locale } = useTranslation()
  const [showConfirm, setShowConfirm] = useState<string | null>(null)

  if (rides.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">📋</div>
        <div className="font-medium">{t('history.empty_title')}</div>
        <div className="text-sm">{t('history.empty_desc')}</div>
      </div>
    )
  }

  const handleDelete = (id: string) => {
    deleteRide(id)
    onDelete()
    setShowConfirm(null)
  }

  const sorted = [...rides].reverse().slice(0, 50)

  return (
    <div className="space-y-2">
      {sorted.map(ride => (
        <div
          key={ride.id}
          className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${
                ride.status === 'profit' ? 'bg-profit' : ride.status === 'loss' ? 'bg-loss' : 'bg-warning'
              }`} />
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(ride.amount, locale)}
              </span>
              <span className="text-xs text-gray-400">
                {formatDate(locale, new Date(ride.date), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex gap-3 text-xs text-gray-400">
              <span>{ride.kmDriven} km</span>
              <span>Comb: {formatCurrency(ride.fuelCost, locale)}</span>
              <span>KM: {formatCurrency(ride.costPerKm, locale)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${
              ride.profit >= 0 ? 'text-profit' : 'text-loss'
            }`}>
              {ride.profit >= 0 ? '+' : ''}{formatCurrency(ride.profit, locale)}
            </span>

            {showConfirm === ride.id ? (
              <div className="flex gap-1">
                <button
                  onClick={() => handleDelete(ride.id)}
                  className="px-2 py-1 text-xs bg-loss text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  {t('history.sim')}
                </button>
                <button
                  onClick={() => setShowConfirm(null)}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t('history.nao')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirm(ride.id)}
                className="text-gray-300 hover:text-loss transition-colors"
                title={t('history.excluir')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}

      {rides.length > 50 && (
        <div className="text-center text-sm text-gray-400 py-2">
          {t('history.mostrando', { total: rides.length })}
        </div>
      )}
    </div>
  )
}
