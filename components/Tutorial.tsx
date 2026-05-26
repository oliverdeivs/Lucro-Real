'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { markTutorialSeen } from '@/lib/storage'

export default function Tutorial({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)

  const handleFinish = () => {
    markTutorialSeen()
    onClose()
  }

  const steps = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: t('tutorial.step1_title'),
      desc: t('tutorial.step1_desc'),
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      title: t('tutorial.step2_title'),
      desc: t('tutorial.step2_desc'),
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('tutorial.step3_title'),
      desc: t('tutorial.step3_desc'),
    },
  ]

  const current = steps[step - 1]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
          {current.icon}
        </div>

        <h2 className="text-xl font-black text-gray-900 mb-2">{step === 1 ? t('tutorial.titulo') : ''}</h2>
        <p className="text-sm text-gray-500 mb-1">{step === 1 ? t('tutorial.desc') : ''}</p>

        <div className="my-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{current.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{current.desc}</p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-2.5 h-2.5 rounded-full transition-all ${s === step ? 'bg-brand-500 w-6' : 'bg-gray-300'}`} />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleFinish}
            className="flex-1 py-2.5 text-sm text-gray-400 font-medium rounded-xl hover:bg-gray-50 transition-all"
          >
            {t('tutorial.pular')}
          </button>
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleFinish()}
            className="flex-[2] py-2.5 bg-gradient-to-r from-brand-600 to-emerald-500 text-white text-sm font-bold rounded-xl hover:from-brand-700 hover:to-emerald-600 transition-all shadow-lg shadow-brand-200/40"
          >
            {step < 3 ? 'Próximo' : t('tutorial.cta')}
          </button>
        </div>
      </div>
    </div>
  )
}
