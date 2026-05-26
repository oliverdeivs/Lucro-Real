'use client'

import { useTranslation, localeConfig } from '@/lib/i18n'

export default function PhonePreview() {
  const { t, locale } = useTranslation()
  const cfg = localeConfig[locale]

  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[280px] mx-auto lg:scale-110 origin-center">
      <div className="absolute -inset-8 lg:-inset-12 bg-gradient-to-b from-white/[0.12] to-transparent rounded-full blur-3xl" />

      <div className="relative bg-neutral-950 rounded-[3rem] border-[3px] border-neutral-800 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-neutral-950 rounded-b-2xl z-20 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-700" />
          <div className="w-14 h-1.5 rounded-full bg-neutral-800" />
        </div>

        <div className="pt-10 px-3 sm:px-4 pb-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/20">
            <div className="bg-gradient-to-r from-brand-600 to-emerald-500 px-4 py-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)]" />
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-[9px] shadow-inner">
                  LR
                </div>
                <span className="text-white text-xs font-bold tracking-wide">LucroReal</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 space-y-2.5">
              <div>
                <label className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">{t('form.valor', { symbol: cfg.symbol })}</label>
                <div className="mt-1 h-9 bg-gray-50 rounded-xl border border-gray-100 flex items-center px-3 text-sm font-bold text-gray-900 shadow-sm">
                  {cfg.symbol}35,00
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">{t('form.km')}</label>
                  <div className="mt-1 h-9 bg-gray-50 rounded-xl border border-gray-100 flex items-center px-3 text-sm font-bold text-gray-900 shadow-sm">
                    15 km
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">{t('form.comb', { symbol: cfg.symbol })}</label>
                  <div className="mt-1 h-9 bg-gray-50 rounded-xl border border-gray-100 flex items-center px-3 text-sm font-bold text-gray-900 shadow-sm">
                    {cfg.symbol}8,00
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-emerald-500 dark:from-brand-700 dark:to-brand-800 text-white text-[11px] font-bold rounded-xl text-center shadow-lg shadow-brand-500/30 dark:shadow-black/30 hover:shadow-brand-500/40 dark:hover:shadow-black/40 transition-shadow">
                {t('form.calcular')}
              </button>

              <div className="bg-gradient-to-br from-brand-50 via-white to-emerald-50 rounded-xl border border-brand-100/80 shadow-sm overflow-hidden">
                <div className="px-3 py-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">{t('chart.tooltip')}</span>
                    <span className="text-sm font-black text-profit">+{cfg.symbol}27,00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">{t('result.custo_km')}</span>
                    <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">{cfg.symbol}0,53/km</span>
                  </div>
                  <div className="pt-1.5 border-t border-brand-100/60">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[10px] font-semibold text-emerald-600">{t('result.msg_a')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 border border-brand-300 text-brand-600 text-[10px] font-bold rounded-xl text-center hover:bg-brand-50 transition-colors">
                {t('result.save')}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-9 h-1 bg-neutral-800 rounded-full" />
      </div>
    </div>
  )
}
