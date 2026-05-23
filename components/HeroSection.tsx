'use client'

export default function HeroSection() {
  return (
    <section className="text-center py-16 md:py-24">
      <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        🔥 Usado por 1.500+ motoristas
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
        Você sabe quanto{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
          realmente lucra
        </span>{' '}
        por corrida?
      </h1>

      <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8">
        Descubra em segundos se vale a pena cada corrida. A maioria dos motoristas 
        <strong className="text-gray-700"> acha que lucra</strong>, mas na verdade está 
        <strong className="text-loss"> perdendo dinheiro</strong>.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="#calculadora"
          className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all shadow-lg shadow-brand-200 text-lg"
        >
          Calcular Meu Lucro Agora
        </a>
        <a
          href="#como-funciona"
          className="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-brand-500 hover:text-brand-600 transition-all text-lg"
        >
          Como Funciona
        </a>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[
          { value: '1.5M+', label: 'Motoristas no Brasil' },
          { value: '67%', label: 'Estão endividados' },
          { value: '9h+', label: 'Por dia dirigindo' },
          { value: '70%', label: 'Dependem só do app' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="text-2xl font-black text-brand-600">{item.value}</div>
            <div className="text-xs text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
