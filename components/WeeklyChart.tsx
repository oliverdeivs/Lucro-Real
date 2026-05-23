'use client'

import { DaySummary } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/calculate'
import { useTranslation, formatDate, localeConfig } from '@/lib/i18n'

interface Props {
  summaries: DaySummary[]
}

export default function WeeklyChart({ summaries }: Props) {
  const { t, locale } = useTranslation()

  if (summaries.length === 0) return null

  const data = [...summaries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14)
    .map(d => ({
      date: formatDate(locale, new Date(d.date), { day: '2-digit', month: '2-digit' }),
      lucro: parseFloat(d.totalProfit.toFixed(2)),
      corridas: d.totalRides,
    }))

  const cfg = localeConfig[locale]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">{t('chart.titulo')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
            <YAxis tick={{ fontSize: 11 }} stroke="#999" tickFormatter={(v) => `${cfg.symbol}${v}`} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value, locale), t('chart.tooltip')]}
              contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            />
            <Bar dataKey="lucro" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
