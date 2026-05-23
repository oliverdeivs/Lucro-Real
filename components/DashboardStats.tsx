'use client'

import { DaySummary } from '@/lib/types'
import { formatCurrency } from '@/lib/calculate'

interface Props {
  summaries: DaySummary[]
}

export default function DashboardStats({ summaries }: Props) {
  if (summaries.length === 0) return null

  const totalProfit = summaries.reduce((s, d) => s + d.totalProfit, 0)
  const totalKm = summaries.reduce((s, d) => s + d.totalKm, 0)
  const totalRides = summaries.reduce((s, d) => s + d.totalRides, 0)
  const totalAmount = summaries.reduce((s, d) => s + d.totalAmount, 0)
  const totalFuel = summaries.reduce((s, d) => s + d.totalFuelCost, 0)
  const avgProfitPerRide = totalRides > 0 ? totalProfit / totalRides : 0
  const avgProfitPerDay = summaries.length > 0 ? totalProfit / summaries.length : 0

  const stats = [
    { label: 'Corridas', value: totalRides.toString(), color: 'text-brand-600' },
    { label: 'Lucro Total', value: formatCurrency(totalProfit), color: totalProfit >= 0 ? 'text-profit' : 'text-loss' },
    { label: 'Faturamento', value: formatCurrency(totalAmount), color: 'text-gray-900' },
    { label: 'Combustível', value: formatCurrency(totalFuel), color: 'text-warning' },
    { label: 'KM Rodados', value: `${totalKm.toFixed(1)} km`, color: 'text-brand-600' },
    { label: 'Média/Corrida', value: formatCurrency(avgProfitPerRide), color: 'text-gray-600' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
