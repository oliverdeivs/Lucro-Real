export default function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Resultado em Segundos',
      desc: 'Informe valor, KM e combustível. O cálculo aparece na hora. Sem planilhas, sem complicação.',
      color: 'from-brand-500 to-emerald-500',
      bg: 'bg-brand-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Dashboard Completo',
      desc: 'Veja seu lucro por dia, semana e mês. Gráficos bonitos e dados claros sobre sua performance.',
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: '100% Offline',
      desc: 'Seus dados ficam salvos no celular. Pode usar sem internet, sem cadastro, sem complicação.',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Score A até F',
      desc: 'Cada corrida ganha uma nota. Saiba na hora se foi boa, mediana ou prejuízo. Sem achismos.',
      color: 'from-warning to-orange-500',
      bg: 'bg-amber-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Custo por KM Real',
      desc: 'Descubra exatamente quanto cada quilômetro rodado está custando. Base para decisões inteligentes.',
      color: 'from-cyan-500 to-teal-500',
      bg: 'bg-cyan-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Relatório Exportável',
      desc: 'Gere relatórios profissionais em PDF com todos os seus dados. Perfeito para planejar metas.',
      color: 'from-rose-500 to-red-500',
      bg: 'bg-rose-50',
    },
  ]

  return (
    <section id="como-funciona" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-1.5 rounded-full mb-4">
            FUNCIONALIDADES
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Por que todo motorista precisa disso?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Você pode estar trabalhando de graça e nem sabe. 
            O LucroReal te mostra a verdade em segundos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-2xl hover:shadow-brand-200/20 hover:border-brand-200 transition-all duration-500 animate-fadeInUp"
              style={{ animationDelay: `${(i % 6) * 100}ms` }}
            >
              <div className={`w-12 h-12 ${b.bg} rounded-2xl flex items-center justify-center text-brand-600 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {b.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
