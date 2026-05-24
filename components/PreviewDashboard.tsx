'use client'

import { useTranslation, localeConfig } from '@/lib/i18n'

const sampleRides = [
  { amount: 32.50, km: 18, profit: 17.70, score: 'B', type: 'profit' },
  { amount: 18.00, km: 12, profit: 8.40, score: 'C', type: 'profit' },
  { amount: 45.00, km: 35, profit: -3.80, score: 'F', type: 'loss' },
  { amount: 27.00, km: 22, profit: 5.20, score: 'C', type: 'profit' },
  { amount: 51.00, km: 28, profit: 22.30, score: 'A', type: 'profit' },
  { amount: 15.00, km: 14, profit: -5.10, score: 'F', type: 'loss' },
  { amount: 38.00, km: 20, profit: 14.50, score: 'B', type: 'profit' },
  { amount: 22.00, km: 16, profit: -1.80, score: 'D', type: 'loss' },
  { amount: 29.00, km: 19, profit: 9.20, score: 'C', type: 'profit' },
  { amount: 42.00, km: 24, profit: 18.60, score: 'A', type: 'profit' },
  { amount: 31.00, km: 21, profit: 6.10, score: 'C', type: 'profit' },
  { amount: 19.00, km: 15, profit: -7.40, score: 'F', type: 'loss' },
]

export default function PreviewDashboard() {
  const { t, locale } = useTranslation()
  const cfg = localeConfig[locale]

  const totalProfit = sampleRides.reduce((s, r) => s + r.profit, 0)
  const totalKm = sampleRides.reduce((s, r) => s + r.km, 0)

  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            <span className="w-1 h-1 bg-brand-300 rounded-full" />
            {t('preview.dash_badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-[1.05]">
            {t('preview.dash_title')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t('preview.dash_sub')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg shadow-black/20 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white font-bold text-xs">LR</div>
                  <span className="font-bold text-gray-900">Dashboard</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: t('stats.corridas'), value: '12', color: 'text-brand-600' },
                  { label: 'Lucro', value: `${cfg.symbol}${totalProfit.toFixed(0)}`, color: totalProfit >= 0 ? 'text-profit' : 'text-loss' },
                  { label: t('stats.faturamento'), value: `${cfg.symbol}${sampleRides.reduce((s, r) => s + r.amount, 0).toFixed(0)}`, color: 'text-gray-900' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-[10px] text-gray-400 mb-0.5">{s.label}</div>
                    <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="h-32 flex items-end gap-1.5 mb-3">
                {sampleRides.slice(-7).map((r, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t ${r.profit >= 0 ? 'bg-profit' : 'bg-loss'} transition-all`}
                      style={{ height: `${Math.max(8, Math.abs(r.profit) * 2)}px` }}
                    />
                    <span className="text-[9px] text-gray-400">D{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg shadow-black/20 p-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3">{t('calc.recent')}</h4>
              <div className="space-y-2">
                {sampleRides.slice(0, 4).map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${r.type === 'profit' ? 'bg-profit' : 'bg-loss'}`} />
                      <span className="text-xs font-medium text-gray-900">{cfg.symbol}{r.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400">{r.km} km</span>
                      <span className={`text-xs font-bold ${r.type === 'profit' ? 'text-profit' : 'text-loss'}`}>
                        {r.profit >= 0 ? '+' : ''}{cfg.symbol}{Math.abs(r.profit).toFixed(2)}
                      </span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white ${
                        r.score === 'F' ? 'bg-loss' : r.score === 'D' ? 'bg-warning' : r.score === 'C' || r.score === 'B' ? 'bg-profit/70' : 'bg-profit'
                      }`}>{r.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white border border-white/10 shadow-xl">
              <h4 className="font-bold text-lg mb-4">{t('preview.include')}</h4>
              <ul className="space-y-3">
                {[
                  'preview.include1', 'preview.include2', 'preview.include3',
                  'preview.include4', 'preview.include5', 'preview.include6',
                ].map(key => (
                  <li key={key} className="flex items-center gap-3 text-sm text-white/70">
                    <svg className="w-5 h-5 text-brand-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(key)}
                  </li>
                ))}
              </ul>
              <a
                href="/calcular"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-900 font-bold rounded-xl hover:bg-white/90 transition-all"
              >
                {t('hero.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
