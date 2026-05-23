export default function BenefitsSection() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Resultado em Segundos',
      desc: 'Informe valor, KM e combustível. O cálculo aparece na hora. Sem planilhas, sem complicação.',
    },
    {
      icon: '📊',
      title: 'Dashboard Completo',
      desc: 'Veja seu lucro por dia, semana e mês. Saiba exatamente quanto está ganhando de verdade.',
    },
    {
      icon: '📱',
      title: 'Funciona Offline',
      desc: 'Seus dados ficam salvos no celular. Pode usar sem internet, sem precisar de cadastro.',
    },
    {
      icon: '🎯',
      title: 'Score por Corrida',
      desc: 'Cada corrida recebe uma nota de A a F. Saiba na hora se vale a pena ou se é prejuízo.',
    },
    {
      icon: '💰',
      title: 'Custo por KM Real',
      desc: 'Descubra exatamente quanto cada quilômetro rodado está custando para você.',
    },
    {
      icon: '📄',
      title: 'Relatório Exportável',
      desc: 'Gere relatórios profissionais para acompanhar sua evolução e planejar suas metas.',
    },
  ]

  return (
    <section id="como-funciona" className="py-16">
      <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
        Por que todo motorista precisa disso?
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
        Você pode estar trabalhando de graça e nem sabe. Veja o que o LucroReal faz por você:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {benefits.map(b => (
          <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{b.icon}</div>
            <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
            <p className="text-sm text-gray-500">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
