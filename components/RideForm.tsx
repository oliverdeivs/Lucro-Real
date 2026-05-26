'use client'

import { useState, useMemo } from 'react'
import { CalcInput, formatCurrency } from '@/lib/calculate'
import { useTranslation, localeConfig } from '@/lib/i18n'
import { getSettings, getActiveVehicleId, getVehicles } from '@/lib/storage'

interface Props {
  onCalculate: (input: CalcInput) => void
}

export default function RideForm({ onCalculate }: Props) {
  const { t, locale } = useTranslation()
  const [amount, setAmount] = useState('')
  const [kmDriven, setKmDriven] = useState('')
  const [fuelCost, setFuelCost] = useState('')
  const [otherCosts, setOtherCosts] = useState('')
  const [durationMinutes, setDurationMinutes] = useState('')
  const [autoFuel, setAutoFuel] = useState(false)

  const settings = useMemo(() => getSettings(), [])
  const consumption = useMemo(() => {
    const activeId = getActiveVehicleId()
    if (activeId) {
      const v = getVehicles().find(v => v.id === activeId)
      if (v) return v.carConsumptionKmPerLiter
    }
    return settings.carConsumptionKmPerLiter
  }, [settings])

  const computedFuelCost = useMemo(() => {
    if (!autoFuel || !kmDriven) return null
    const km = parseFloat(kmDriven)
    if (!km || consumption <= 0) return null
    return (km / consumption) * settings.fuelPricePerLiter
  }, [autoFuel, kmDriven, consumption, settings.fuelPricePerLiter])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const a = parseFloat(amount)
    const k = parseFloat(kmDriven)
    const f = autoFuel && computedFuelCost != null ? computedFuelCost : parseFloat(fuelCost)
    const o = parseFloat(otherCosts) || 0
    const d = parseFloat(durationMinutes) || undefined
    if (!a || !k || (!autoFuel && !f)) return
    onCalculate({ amount: a, kmDriven: k, fuelCost: f, otherCosts: o, durationMinutes: d })
  }

  const isDisabled = !amount || !kmDriven || (!autoFuel && !fuelCost)
  const symbol = localeConfig[locale].symbol

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('form.valor', { symbol })}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder={t('form.valor_ph')}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('form.km')}
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          placeholder={t('form.km_ph')}
          value={kmDriven}
          onChange={e => setKmDriven(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAutoFuel(!autoFuel)}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
            autoFuel
              ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-300 dark:border-brand-700'
              : 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 hover:border-brand-300'
          }`}
        >
          {t('form.auto_fuel')}
        </button>
        {autoFuel && consumption > 0 && (
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {settings.fuelPricePerLiter}/{consumption}km/L
          </span>
        )}
      </div>

      {autoFuel && computedFuelCost != null ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('form.comb', { symbol })}
          </label>
          <div className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-lg text-profit font-bold flex items-center">
            {formatCurrency(computedFuelCost, locale)}
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('form.comb', { symbol })}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder={t('form.comb_ph')}
            value={fuelCost}
            onChange={e => setFuelCost(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            required={!autoFuel}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-400 dark:text-gray-500 mb-1">
            {t('form.outros')}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder={t('form.outros_ph')}
            value={otherCosts}
            onChange={e => setOtherCosts(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 dark:text-gray-500 mb-1">
            {t('form.minutos')}
          </label>
          <input
            type="number"
            step="1"
            min="0"
            placeholder={t('form.minutos_ph')}
            value={durationMinutes}
            onChange={e => setDurationMinutes(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-700 dark:to-brand-800 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 dark:hover:from-brand-800 dark:hover:to-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-200 dark:shadow-black/30"
      >
        {t('form.calcular')}
      </button>
    </form>
  )
}
