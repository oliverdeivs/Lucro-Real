'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setPremium } from '@/lib/storage'
import { useTranslation } from '@/lib/i18n'

export default function ObrigadoPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    setPremium()
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-3">
        {t('obrigado.title')}
      </h1>

      <p className="text-gray-500 mb-4">
        {t('obrigado.desc')}
      </p>

      <div className="text-sm text-gray-400 mb-8">
        {t('obrigado.redirect', { countdown })}
      </div>

      <button
        onClick={() => router.push('/dashboard')}
        className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all shadow-lg shadow-brand-200"
      >
        {t('obrigado.cta')}
      </button>
    </div>
  )
}
