'use client'

import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import ProfitCalculator from '@/components/ProfitCalculator'
import SocialProof from '@/components/SocialProof'
import PricingSection from '@/components/PricingSection'
import FAQ from '@/components/FAQ'
import { useTranslation } from '@/lib/i18n'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-brand-50/20 pointer-events-none" />
        <div id="calculadora" className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 scroll-mt-20">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-1.5 rounded-full mb-4">
              {t('page.calc_badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              {t('page.calc_title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">{t('page.calc_title2')}</span> {t('page.calc_title3')}
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              {t('page.calc_sub')}
            </p>
          </div>
          <ProfitCalculator />
        </div>
      </div>

      <BenefitsSection />
      <SocialProof />
      <PricingSection />
      <FAQ />
    </>
  )
}
