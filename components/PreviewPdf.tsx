'use client'

import { useTranslation, localeConfig } from '@/lib/i18n'

export default function PreviewPdf() {
  const { t, locale } = useTranslation()
  const cfg = localeConfig[locale]

  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            <span className="w-1 h-1 bg-brand-300 rounded-full" />
            {t('preview.pdf_badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-[1.05]">
            {t('preview.pdf_title')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t('preview.pdf_desc')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/20 border border-gray-200 dark:border-gray-700 overflow-hidden rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500">
            <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">{t('preview.pdf_info')}</span>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 dark:from-brand-600 dark:to-brand-800 rounded-xl flex items-center justify-center text-white font-bold text-sm">LR</div>
                <div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">{t('export.relatorio')}</h3>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {t('export.periodo', { days: 3, date: new Date().toLocaleDateString(cfg.locale) })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                {[
                  { label: t('export.corridas'), value: '12' },
                  { label: t('export.lucro_total'), value: `${cfg.symbol}83,70`, color: 'text-profit' },
                  { label: t('export.faturamento'), value: `${cfg.symbol}370,00` },
                  { label: t('export.km_rodados'), value: '244,0 km' },
                  { label: t('export.combustivel'), value: `${cfg.symbol}108,50` },
                  { label: t('export.dias'), value: '3' },
                ].map(s => (
                  <div key={s.label} className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{s.label}</div>
                    <div className={`text-sm font-bold ${s.color || 'text-gray-900 dark:text-white'}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-brand-600">
                    <th className="text-left text-white font-semibold px-3 py-2 rounded-l-lg">{t('export.data')}</th>
                    <th className="text-center text-white font-semibold px-3 py-2">{t('export.corridas')}</th>
                    <th className="text-right text-white font-semibold px-3 py-2">{t('export.faturamento')}</th>
                    <th className="text-right text-white font-semibold px-3 py-2">{t('export.combustivel')}</th>
                    <th className="text-right text-white font-semibold px-3 py-2">{t('export.km')}</th>
                    <th className="text-right text-white font-semibold px-3 py-2 rounded-r-lg">{t('export.lucro')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '20/05', rides: 5, amount: 155.00, fuel: 42.30, km: 97, profit: 38.70 },
                    { date: '21/05', rides: 4, amount: 118.00, fuel: 35.80, km: 82, profit: 28.20 },
                    { date: '22/05', rides: 3, amount: 97.00, fuel: 30.40, km: 65, profit: 16.80 },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium">{row.date}</td>
                      <td className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{row.rides}</td>
                      <td className={`px-3 py-2 text-right font-medium`}>{cfg.symbol}{row.amount.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">{cfg.symbol}{row.fuel.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">{row.km} km</td>
                      <td className={`px-3 py-2 text-right font-bold ${row.profit >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {cfg.symbol}{row.profit.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center text-[10px] text-gray-400 dark:text-gray-500">
                {t('export.rodape')}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://pay.hotmart.com/Q105978279A"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-900 font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl shadow-black/20"
            >
              {t('pricing.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
