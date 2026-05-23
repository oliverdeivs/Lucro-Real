'use client'

import { useTranslation } from '@/lib/i18n'

const testimonials = [
  {
    key: '1',
    initials: 'CM',
    color: 'from-brand-500 to-emerald-500',
  },
  {
    key: '2',
    initials: 'AP',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    key: '3',
    initials: 'RS',
    color: 'from-purple-500 to-pink-500',
  },
]

export default function SocialProof() {
  const { t } = useTranslation()

  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-brand-50/50 via-emerald-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            <span className="w-1 h-1 bg-brand-500 rounded-full" />
            {t('social.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-5 leading-[1.05]">
            {t('social.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            {t('social.sub')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((tItem, i) => (
            <div
              key={tItem.key}
              className="bg-white rounded-2xl border border-gray-100 p-7 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/30 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t(`social.test${tItem.key}.text`)}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tItem.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {tItem.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{t(`social.test${tItem.key}.name`)}</div>
                  <div className="text-xs text-gray-400">{t(`social.test${tItem.key}.role`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-gray-100 max-w-5xl mx-auto">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br ${
                ['from-brand-500 to-emerald-500', 'from-blue-500 to-indigo-500', 'from-purple-500 to-pink-500', 'from-amber-500 to-orange-500'][i-1]
              }`} />
            ))}
          </div>
          <div className="text-sm text-gray-400">
            {t('social.rating', { rating: '4.9', count: '150' })}
          </div>
        </div>
      </div>
    </section>
  )
}
