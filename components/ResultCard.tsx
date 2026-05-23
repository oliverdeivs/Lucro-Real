'use client'

import { CalcResult, formatCurrency } from '@/lib/calculate'

interface Props {
  result: CalcResult
  onSave?: () => void
  saved?: boolean
}

const scoreConfig = {
  A: { label: 'Excelente', color: 'text-profit', bg: 'bg-profit/10', border: 'border-profit/30' },
  B: { label: 'Boa', color: 'text-profit', bg: 'bg-profit/10', border: 'border-profit/30' },
  C: { label: 'Razoável', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  D: { label: 'Baixa', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  F: { label: 'Prejuízo', color: 'text-loss', bg: 'bg-loss/10', border: 'border-loss/30' },
}

export default function ResultCard({ result, onSave, saved }: Props) {
  const cfg = scoreConfig[result.score as keyof typeof scoreConfig] || scoreConfig.D
  const isPositive = result.profit >= 0

  return (
    <div className={`rounded-2xl border-2 p-6 ${cfg.bg} ${cfg.border} animate-fadeIn`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">Resultado</span>
        <span className={`text-2xl font-black ${isPositive ? 'text-profit' : 'text-loss'}`}>
          {isPositive ? '+' : ''}{formatCurrency(result.profit)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/60 rounded-xl p-3">
          <span className="text-xs text-gray-400 block">Valor bruto</span>
          <span className="text-sm font-bold">{formatCurrency(result.totalCost + result.profit)}</span>
        </div>
        <div className="bg-white/60 rounded-xl p-3">
          <span className="text-xs text-gray-400 block">Margem</span>
          <span className={`text-sm font-bold ${isPositive ? 'text-profit' : 'text-loss'}`}>
            {result.percentage.toFixed(1)}%
          </span>
        </div>
        <div className="bg-white/60 rounded-xl p-3">
          <span className="text-xs text-gray-400 block">Custo total</span>
          <span className="text-sm font-bold">{formatCurrency(result.totalCost)}</span>
        </div>
        <div className="bg-white/60 rounded-xl p-3">
          <span className="text-xs text-gray-400 block">Custo por KM</span>
          <span className="text-sm font-bold">{formatCurrency(result.costPerKm)}</span>
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
            Nota {result.score} — {cfg.label}
          </div>
          <div className="text-xs text-gray-400">
            {result.score === 'F'
              ? 'Essa corrida deu prejuízo. Evite corridas assim!'
              : result.score === 'D'
              ? 'Margem muito baixa. Quase no prejuízo.'
              : result.score === 'C'
              ? 'Margem razoável, mas pode melhorar.'
              : result.score === 'B'
              ? 'Boa corrida! Vale a pena.'
              : 'Corrida excelente! Continue assim.'}
          </div>
        </div>
      </div>

      {onSave && (
        <button
          onClick={onSave}
          disabled={saved}
          className="w-full py-2.5 rounded-xl border-2 border-brand-500 text-brand-600 font-semibold hover:bg-brand-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {saved ? '✓ Corrida Salva' : 'Salvar no Histórico'}
        </button>
      )}
    </div>
  )
}
