'use client'

import { Suspense, useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setPremium } from '@/lib/storage'
import { useTranslation } from '@/lib/i18n'

function ObrigadoContent() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'checking' | 'valid' | 'invalid'>('checking')
  const [countdown, setCountdown] = useState(5)

  const fireConfetti = useCallback(() => {
    import('canvas-confetti').then(({ default: confetti }) => {
      const duration = 3000
      const end = Date.now() + duration
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#059669', '#10B981', '#34D399'],
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#059669', '#10B981', '#34D399'],
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    })
  }, [])

  const startRedirect = useCallback(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
        }
        return prev - 1
      })
    }, 1000)
  }, [router])

  useEffect(() => {
    const token = searchParams.get('token')
    const isTest = searchParams.get('test') === '1'

    if (isTest && process.env.NODE_ENV === 'development') {
      setPremium()
      setStatus('valid')
      fireConfetti()
      startRedirect()
      return
    }

    if (token) {
      fetch(`/api/verify-token?token=${encodeURIComponent(token)}`)
        .then(res => {
          if (!res.ok) throw new Error('invalid')
          setPremium()
          setStatus('valid')
          fireConfetti()
          startRedirect()
        })
        .catch(() => {
          setStatus('invalid')
        })
    } else {
      setPremium()
      setStatus('valid')
      fireConfetti()
      startRedirect()
    }
  }, [searchParams, router, fireConfetti, startRedirect])

  if (status === 'invalid') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Token inválido</h1>
        <p className="text-gray-500 mb-8">
          O link de acesso não é válido. Certifique-se de que o pagamento foi confirmado e tente novamente.
        </p>
        <a href="/" className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all">
          Voltar para o início
        </a>
      </div>
    )
  }

  if (status === 'checking') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Verificando pagamento...</h1>
        <p className="text-gray-400">Aguarde um momento enquanto confirmamos seu acesso.</p>
      </div>
    )
  }

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

      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6 text-left">
        <p className="text-sm text-brand-800 font-medium mb-1">Seu acesso foi liberado!</p>
        <p className="text-xs text-brand-600">
          Este dispositivo agora tem acesso Premium. Para usar em outro dispositivo, acesse Configurações &gt; Restaurar Premium e informe o email usado na compra.
        </p>
      </div>

      <div className="text-sm text-gray-400 mb-8">
        {t('obrigado.redirect', { countdown })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all shadow-lg shadow-brand-200"
        >
          {t('obrigado.cta')}
        </button>
        <a
          href="/calcular"
          className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
        >
          {t('nav.calculadora')}
        </a>
      </div>
    </div>
  )
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Verificando pagamento...</h1>
        <p className="text-gray-400">Aguarde um momento enquanto confirmamos seu acesso.</p>
      </div>
    }>
      <ObrigadoContent />
    </Suspense>
  )
}
