export default function PricingSection() {
  return (
    <section id="preco" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/40 to-white pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-1.5 rounded-full mb-4">
            PREÇO ÚNICO
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Menos que um tanque de gasolina
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Mais que um mês de prejuízo. Invista em informação e pare de perder dinheiro.
          </p>
        </div>

        <div className="max-w-md mx-auto animate-fadeInScale">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 via-emerald-400 to-brand-500 rounded-3xl blur-xl opacity-60 animate-pulseGlow" />

            <div className="relative bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-emerald-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg shadow-brand-200/50">
                🔥 MAIS VENDIDO
              </div>

              <div className="text-center mb-8 mt-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl text-gray-400 font-medium">R$</span>
                  <span className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight">37</span>
                </div>
                <div className="text-gray-400 text-sm mt-2">pagamento único • acesso vitalício</div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Calculadora de lucro ilimitada',
                  'Dashboard com gráficos e históricos',
                  'Score por corrida (A até F)',
                  'Custo por KM automático',
                  'Relatório semanal completo',
                  'Exportação em PDF profissional',
                  'Dicas personalizadas de economia',
                  'Atualizações vitalícias grátis',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-brand-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://hotmart.com/SEU-LINK-AQUI"
                className="group block w-full py-4 bg-gradient-to-r from-brand-600 to-emerald-500 text-white font-bold text-center rounded-2xl hover:from-brand-700 hover:to-emerald-600 transition-all duration-300 shadow-xl shadow-brand-200/50 hover:shadow-2xl hover:shadow-brand-300/50 text-lg"
              >
                QUERO MEU LUCRO REAL
                <span className="block text-xs font-normal text-brand-100 mt-0.5 opacity-80 group-hover:opacity-100">Compra segura • Acesso imediato</span>
              </a>

              <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-profit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Compra Segura
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-profit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Garantia 7 Dias
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-profit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Suporte WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
