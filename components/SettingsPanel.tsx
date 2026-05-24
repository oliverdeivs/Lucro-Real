'use client'

import { useState, useEffect } from 'react'
import { getSettings, saveSettings } from '@/lib/storage'
import { AppSettings } from '@/lib/types'
import { useTranslation } from '@/lib/i18n'
import { calculateDailyFixedCost, formatCurrency } from '@/lib/calculate'

interface Props {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: Props) {
  const { t, locale } = useTranslation()
  const [settings, setSettings] = useState<AppSettings>(getSettings)

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const update = (key: keyof AppSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: Math.max(0, value) }))
  }

  const dailyCost = calculateDailyFixedCost(settings)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-brand-950 to-brand-900 rounded-2xl border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">{t('settings.titulo')}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">{t('settings.metas')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <label className="block text-xs text-white/50 mb-1">{t('settings.meta_dia')}</label>
                <input
                  type="number"
                  min="0"
                  value={settings.dailyGoal || ''}
                  onChange={e => update('dailyGoal', parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-white font-bold text-lg outline-none"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <label className="block text-xs text-white/50 mb-1">{t('settings.meta_semana')}</label>
                <input
                  type="number"
                  min="0"
                  value={settings.weeklyGoal || ''}
                  onChange={e => update('weeklyGoal', parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-white font-bold text-lg outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">{t('settings.custos_fixos')}</h3>
            <p className="text-xs text-white/40 mb-3">{t('settings.custos_fixos_desc')}</p>

            <div className="space-y-2">
              {[
                { key: 'monthlyMaintenance' as const, label: t('settings.manutencao'), placeholder: '300' },
                { key: 'monthlyInsurance' as const, label: t('settings.seguro'), placeholder: '250' },
                { key: 'monthlyTax' as const, label: t('settings.ipva'), placeholder: '80' },
                { key: 'daysWorkingPerMonth' as const, label: t('settings.dias_trab'), placeholder: '22' },
              ].map(field => (
                <div key={field.key} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <label className="text-sm text-white/70">{field.label}</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      value={settings[field.key] || ''}
                      onChange={e => update(field.key, parseFloat(e.target.value) || 0)}
                      className="w-20 bg-transparent text-white font-semibold text-right outline-none"
                    />
                    {field.key !== 'daysWorkingPerMonth' && (
                      <span className="text-xs text-white/40">{locale === 'pt' ? 'R$' : 'MX$'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {settings.daysWorkingPerMonth > 0 && (
              <div className="mt-3 bg-brand-500/10 rounded-xl px-4 py-3 border border-brand-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-300 font-medium">{t('settings.custo_dia')}</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(dailyCost, locale)}</span>
                </div>
                <p className="text-xs text-white/40 mt-1">
                  {t('settings.custo_dia_desc', { dias: settings.daysWorkingPerMonth })}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white text-brand-900 font-bold rounded-xl hover:bg-white/90 transition-all"
          >
            {t('settings.salvar')}
          </button>
        </div>
      </div>
    </div>
  )
}
