export default function SocialProof() {
  const testimonials = [
    {
      name: 'Carlos M.',
      role: 'Motorista Uber, SP',
      text: 'Descobri que estava perdendo dinheiro em 40% das corridas. Agora sei quais aceitar. Lucro aumentou 25% no primeiro mês!',
      rating: 5,
    },
    {
      name: 'Ana P.',
      role: 'Motorista 99, RJ',
      text: 'Usava planilha no Excel mas sempre esquecia de preencher. O LucroReal é tão simples que uso toda corrida. Virou vício!',
      rating: 5,
    },
    {
      name: 'Rafael S.',
      role: 'Motorista iFood, MG',
      text: 'O relatório semanal me mostrou que eu trabalhava 60h por semana e ganhava menos que um salário mínimo líquido. Mudei minha estratégia.',
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-brand-50/50 to-white">
      <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
        O que os motoristas estão dizendo
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
        Mais de 1.500 motoristas já descobriram seu lucro real
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map(t => (
          <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < t.rating ? 'text-yellow-400' : 'text-gray-200'}>★</span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-4">&ldquo;{t.text}&rdquo;</p>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
              <div className="text-xs text-gray-400">{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-2 text-sm text-gray-500">
          ⭐⭐⭐⭐⭐ Média de <strong className="text-gray-900">4.9</strong> estrelas nas avaliações
        </div>
      </div>
    </section>
  )
}
