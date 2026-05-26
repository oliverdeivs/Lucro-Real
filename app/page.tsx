'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import SocialProof from '@/components/SocialProof'
import PricingSection from '@/components/PricingSection'
import FAQ from '@/components/FAQ'
import PreviewDashboard from '@/components/PreviewDashboard'
import PreviewPdf from '@/components/PreviewPdf'
import Tutorial from '@/components/Tutorial'
import { isPremium, isTutorialSeen } from '@/lib/storage'
import { useTranslation } from '@/lib/i18n'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    if (isPremium()) {
      router.replace('/calcular')
      return
    }
    if (!isTutorialSeen()) {
      setShowTutorial(true)
    }
  }, [router])

  return (
    <>
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
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
