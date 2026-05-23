'use client'

import { DaySummary } from '@/lib/types'
import { formatCurrency } from '@/lib/calculate'
import { useTranslation } from '@/lib/i18n'

interface Props {
  summaries: DaySummary[]
}

export default function DashboardStats({ summaries }: Props) {
  const { t, locale } = useTranslation()

  if (summaries.length === 0) return null

  const totalProfit = summaries.reduce((s, d) => s + d.totalProfit, 0)
  const totalKm = summaries.reduce((s, d) => s + d.totalKm, 0)
  const totalRides = summaries.reduce((s, d) => s + d.totalRides, 0)
  const totalAmount = summaries.reduce((s, d) => s + d.totalAmount, 0)
  const totalFuel = summaries.reduce((s, d) => s + d.totalFuelCost, 0)
  const avgProfitPerRide = totalRides > 0 ? totalProfit / totalRides : 0

  const stats = [
    { key: 'corridas', value: totalRides.toString(), color: 'text-brand-600' },
    { key: 'lucro_total', value: formatCurrency(totalProfit, locale), color: totalProfit >= 0 ? 'text-profit' : 'text-loss' },
    { key: 'faturamento', value: formatCurrency(totalAmount, locale), color: 'text-gray-900' },
    { key: 'combustivel', value: formatCurrency(totalFuel, locale), color: 'text-warning' },
    { key: 'km', value: `${totalKm.toFixed(1)} km`, color: 'text-brand-600' },
    { key: 'media', value: formatCurrency(avgProfitPerRide, locale), color: 'text-gray-600' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {stats.map(stat => (
        <div key={stat.key} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-400 mb-1">{t(`stats.${stat.key}`)}</div>
          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
