'use client'

import { CalcResult, formatCurrency } from '@/lib/calculate'
import { useTranslation } from '@/lib/i18n'
import ShareButton from './ShareButton'

interface Props {
  result: CalcResult
  onSave?: () => void
  saved?: boolean
}

export default function ResultCard({ result, onSave, saved }: Props) {
  const { t, locale } = useTranslation()
  const isPositive = result.profit >= 0

  const scoreStyle: Record<string, { color: string; bg: string; border: string }> = {
    A: { color: 'text-profit', bg: 'bg-profit/10', border: 'border-profit/30' },
    B: { color: 'text-profit', bg: 'bg-profit/10', border: 'border-profit/30' },
    C: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
    D: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
    F: { color: 'text-loss', bg: 'bg-loss/10', border: 'border-loss/30' },
  }

  const cfg = scoreStyle[result.score] || scoreStyle.D

  const scoreLabel = t(`result.score_${result.score.toLowerCase()}`)
  const msgKey = `result.msg_${result.score.toLowerCase()}`

  return (
    <div className={`rounded-2xl border-2 p-6 ${cfg.bg} ${cfg.border} animate-fadeIn`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{t('result.titulo')}</span>
        <span className={`text-2xl font-black ${isPositive ? 'text-profit' : 'text-loss'}`}>
          {isPositive ? '+' : ''}{formatCurrency(result.profit, locale)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">{t('result.valor_bruto')}</span>
          <span className="text-sm font-bold">{formatCurrency(result.totalCost + result.profit, locale)}</span>
        </div>
        <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">{t('result.combustivel')}</span>
          <span className="text-sm font-medium text-warning">{formatCurrency(result.fuelCost, locale)}</span>
        </div>
        {result.otherCosts > 0 && (
          <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">{t('result.outros')}</span>
            <span className="text-sm font-medium text-orange-500">{formatCurrency(result.otherCosts, locale)}</span>
          </div>
        )}
        <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500">{t('result.custo_total')}</span>
          <span className="text-sm font-bold text-gray-900">{formatCurrency(result.totalCost, locale)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/60 rounded-xl p-3">
          <span className="text-xs text-gray-400 block">{t('result.margem')}</span>
          <span className={`text-sm font-bold ${isPositive ? 'text-profit' : 'text-loss'}`}>
            {result.percentage.toFixed(1)}%
          </span>
        </div>
        <div className="bg-white/60 rounded-xl p-3">
          <span className="text-xs text-gray-400 block">{t('result.custo_km')}</span>
          <span className="text-sm font-bold">{formatCurrency(result.costPerKm, locale)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black text-white ${
          result.score === 'F' ? 'bg-loss' : result.score === 'D' || result.score === 'C' ? 'bg-warning' : 'bg-profit'
        }`}>
          {result.score}
        </div>
        <div>
          <div className="font-bold text-gray-900">
            {t('result.nota', { score: result.score, label: scoreLabel })}
          </div>
          <div className="text-xs text-gray-400">
            {t(msgKey)}
          </div>
        </div>
      </div>

      {onSave && (
        <button
          onClick={onSave}
          disabled={saved}
          className="w-full py-2.5 rounded-xl border-2 border-brand-500 text-brand-600 font-semibold hover:bg-brand-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {saved ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {t('result.saved')}
            </span>
          ) : t('result.save')}
        </button>
      )}

      {onSave && <ShareButton result={result} locale={locale} />}
    </div>
  )
}
