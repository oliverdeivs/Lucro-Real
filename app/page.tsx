import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import ProfitCalculator from '@/components/ProfitCalculator'
import SocialProof from '@/components/SocialProof'
import PricingSection from '@/components/PricingSection'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <HeroSection />

      <div id="calculadora" className="scroll-mt-20 py-8">
        <ProfitCalculator />
      </div>

      <BenefitsSection />
      <SocialProof />
      <PricingSection />
      <FAQ />
    </div>
  )
}
