'use client'

import { useTranslation } from '@/lib/i18n'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                LR
              </div>
              <span className="font-bold text-gray-900">LucroReal</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <div className="font-semibold text-gray-900 text-sm mb-3">{t('footer.produto')}</div>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#calculadora" className="block hover:text-brand-600 transition-colors">{t('nav.calculadora')}</a>
              <a href="#como-funciona" className="block hover:text-brand-600 transition-colors">{t('footer.funcionalidades')}</a>
              <a href="#preco" className="block hover:text-brand-600 transition-colors">{t('footer.preco')}</a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-gray-900 text-sm mb-3">{t('footer.suporte')}</div>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-brand-600 transition-colors">{t('footer.termos')}</a>
              <a href="#" className="block hover:text-brand-600 transition-colors">{t('footer.privacidade')}</a>
              <a href="#" className="block hover:text-brand-600 transition-colors">{t('footer.fale')}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
