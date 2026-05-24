'use client'

import { DaySummary } from '@/lib/types'
import { formatCurrency, calculateDailyFixedCost } from '@/lib/calculate'
import { useTranslation } from '@/lib/i18n'
import { getSettings } from '@/lib/storage'
import { useMemo } from 'react'

interface Props {
  summaries: DaySummary[]
}

export default function DashboardStats({ summaries }: Props) {
  const { t, locale } = useTranslation()
  const settings = useMemo(() => getSettings(), [])

  if (summaries.length === 0) return null

  const totalProfit = summaries.reduce((s, d) => s + d.totalProfit, 0)
  const totalKm = summaries.reduce((s, d) => s + d.totalKm, 0)
  const totalRides = summaries.reduce((s, d) => s + d.totalRides, 0)
  const totalAmount = summaries.reduce((s, d) => s + d.totalAmount, 0)
  const totalFuel = summaries.reduce((s, d) => s + d.totalFuelCost, 0)
  const avgProfitPerRide = totalRides > 0 ? totalProfit / totalRides : 0

  const dailyFixedCost = calculateDailyFixedCost(settings)
  const daysInData = summaries.length
  const totalFixedCost = dailyFixedCost * daysInData
  const realProfit = totalProfit - totalFixedCost

  const today = summaries[summaries.length - 1]
  const todayProfit = today?.totalProfit ?? 0
  const goalProgress = settings.dailyGoal > 0 ? Math.min(100, (todayProfit / settings.dailyGoal) * 100) : 0

  const stats = [
    { key: 'corridas', value: totalRides.toString(), color: 'text-brand-300' },
    { key: 'lucro_total', value: formatCurrency(totalProfit, locale), color: totalProfit >= 0 ? 'text-profit' : 'text-loss' },
    { key: 'faturamento', value: formatCurrency(totalAmount, locale), color: 'text-white' },
    { key: 'combustivel', value: formatCurrency(totalFuel, locale), color: 'text-warning' },
    { key: 'km', value: `${totalKm.toFixed(1)} km`, color: 'text-brand-300' },
    { key: 'media', value: formatCurrency(avgProfitPerRide, locale), color: 'text-white/70' },
  ]

  return (
    <div className="space-y-4">
      {settings.dailyGoal > 0 && todayProfit > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">{t('settings.meta_dia')}</span>
            <span className="text-sm font-bold text-white">
              {formatCurrency(todayProfit, locale)} / {formatCurrency(settings.dailyGoal, locale)}
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                goalProgress >= 100 ? 'bg-profit' : 'bg-brand-500'
              }`}
              style={{ width: `${Math.min(goalProgress, 100)}%` }}
            />
          </div>
          {goalProgress >= 100 && (
            <p className="text-xs text-profit mt-1 font-medium">{t('dash.meta_atingida')}</p>
          )}
        </div>
      )}

      {totalFixedCost > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-white/70">{t('dash.custo_fixo_periodo')}</span>
            <span className="text-sm font-medium text-white/50">{formatCurrency(totalFixedCost, locale)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">{t('dash.lucro_real')}</span>
            <span className={`text-lg font-black ${realProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
              {realProfit >= 0 ? '+' : ''}{formatCurrency(realProfit, locale)}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map(stat => (
          <div key={stat.key} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div className="text-xs text-white/40 mb-1">{t(`stats.${stat.key}`)}</div>
            <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
