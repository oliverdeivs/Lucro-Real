export default function PricingSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
        Quanto vale saber seu lucro real?
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
        Menos que um tanque de gasolina. Mais que um mês de prejuízo.
      </p>

      <div className="max-w-sm mx-auto">
        <div className="bg-white rounded-3xl border-2 border-brand-500 p-8 shadow-2xl shadow-brand-200/50 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-bold px-4 py-1 rounded-full">
            MAIS VENDIDO
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl font-black text-gray-900">R$ 37</div>
            <div className="text-gray-400 text-sm mt-1">pagamento único</div>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              'Calculadora de lucro ilimitada',
              'Dashboard com histórico completo',
              'Score por corrida (A a F)',
              'Custo por KM automático',
              'Relatório semanal na tela',
              'Exportação de relatório em PDF',
              'Dicas personalizadas de economia',
              'Atualizações vitalícias',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-profit shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="https://hotmart.com/SEU-LINK-AQUI"
            className="block w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-center rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all shadow-lg shadow-brand-200"
          >
            QUERO MEU LUCRO REAL →
          </a>

          <div className="text-center mt-4 text-xs text-gray-400">
            ✅ Compra segura • Acesso vitalício • Suporte via WhatsApp
          </div>
        </div>
      </div>
    </section>
  )
}
