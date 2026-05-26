'use client'

import { DaySummary } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/calculate'
import { useTranslation, formatDate, localeConfig } from '@/lib/i18n'
import { useEffect, useState } from 'react'

interface Props {
  summaries: DaySummary[]
}

export default function WeeklyChart({ summaries }: Props) {
  const { t, locale } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

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
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t('chart.titulo')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke={isDark ? '#6B7280' : '#999'} />
            <YAxis tick={{ fontSize: 11 }} stroke={isDark ? '#6B7280' : '#999'} tickFormatter={(v) => `${cfg.symbol}${v}`} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value, locale), t('chart.tooltip')]}
              contentStyle={{
                borderRadius: 12,
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                background: isDark ? '#1f2937' : '#fff',
                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)',
              }}
            />
            <Bar dataKey="lucro" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
