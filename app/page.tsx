'use client'

import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import SocialProof from '@/components/SocialProof'
import PricingSection from '@/components/PricingSection'
import FAQ from '@/components/FAQ'
import PreviewDashboard from '@/components/PreviewDashboard'
import PreviewPdf from '@/components/PreviewPdf'
import { useTranslation } from '@/lib/i18n'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <PreviewDashboard />
      <PreviewPdf />
      <SocialProof />
      <PricingSection />
      <FAQ />
    </>
  )
}
