'use client'

import { useState } from 'react'
import { CalcInput } from '@/lib/calculate'
import { useTranslation, localeConfig } from '@/lib/i18n'

interface Props {
  onCalculate: (input: CalcInput) => void
}

export default function RideForm({ onCalculate }: Props) {
  const { t, locale } = useTranslation()
  const [amount, setAmount] = useState('')
  const [kmDriven, setKmDriven] = useState('')
  const [fuelCost, setFuelCost] = useState('')
  const [otherCosts, setOtherCosts] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const a = parseFloat(amount)
    const k = parseFloat(kmDriven)
    const f = parseFloat(fuelCost)
    const o = parseFloat(otherCosts) || 0
    if (!a || !k || !f) return
    onCalculate({ amount: a, kmDriven: k, fuelCost: f, otherCosts: o })
  }

  const isDisabled = !amount || !kmDriven || !fuelCost
  const symbol = localeConfig[locale].symbol

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.valor', { symbol })}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder={t('form.valor_ph')}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-lg transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.km')}
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          placeholder={t('form.km_ph')}
          value={kmDriven}
          onChange={e => setKmDriven(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-lg transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.comb', { symbol })}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder={t('form.comb_ph')}
          value={fuelCost}
          onChange={e => setFuelCost(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-lg transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {t('form.outros')}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder={t('form.outros_ph')}
          value={otherCosts}
          onChange={e => setOtherCosts(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-lg transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-200"
      >
        {t('form.calcular')}
      </button>
    </form>
  )
}
