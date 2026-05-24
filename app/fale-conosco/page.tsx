'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

export default function FaleConoscoPage() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formsubmit.co/ajax/seu-email@exemplo.com', {
        method: 'POST',
        body: data,
      })
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-300 transition-colors mb-8 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          {t('fale.voltar')}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('fale.title')}</h1>
        <p className="text-white/50 mb-10">{t('fale.subtitle')}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <h3 className="font-semibold text-white mb-1">{t('fale.whatsapp')}</h3>
            <p className="text-sm text-white/40 mb-4">{t('fale.whatsapp_desc')}</p>
            <span className="text-sm text-brand-300 group-hover:text-brand-200 transition-colors">{t('fale.falar')} →</span>
          </a>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-semibold text-white mb-1">{t('fale.email')}</h3>
            <p className="text-sm text-white/40 mb-4">{t('fale.email_desc')}</p>
            <p className="text-sm text-brand-300">contato@lucroreal.app</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-lg font-semibold mb-6">{t('fale.title')}</h3>

          {sent && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-3 rounded-xl text-sm mb-6">
              {t('fale.enviado')}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl text-sm mb-6">
              {t('fale.erro')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('fale.nome')}</label>
              <input
                type="text"
                name="name"
                required
                placeholder={t('fale.nome_ph')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('fale.email_input')}</label>
              <input
                type="email"
                name="email"
                required
                placeholder={t('fale.email_ph')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('fale.assunto')}</label>
              <input
                type="text"
                name="_subject"
                required
                placeholder={t('fale.assunto_ph')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('fale.msg')}</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t('fale.msg_ph')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-brand-500 transition-colors resize-none"
              />
            </div>

            <input type="hidden" name="_captcha" value="false" />

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3.5 rounded-xl transition-colors text-sm"
            >
              {t('fale.enviar')}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-300 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t('fale.voltar')}
          </Link>
        </div>
      </div>
    </div>
  )
}
