import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import ProfitCalculator from '@/components/ProfitCalculator'
import SocialProof from '@/components/SocialProof'
import PricingSection from '@/components/PricingSection'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-brand-50/20 pointer-events-none" />
        <div id="calculadora" className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 scroll-mt-20">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-1.5 rounded-full mb-4">
              CALCULADORA
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Quanto você <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">realmente ganhou</span> hoje?
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Preencha os dados da sua última corrida e veja o resultado na hora
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
