export default function SocialProof() {
  const testimonials = [
    {
      name: 'Carlos M.',
      role: 'Motorista Uber • SP',
      text: 'Descobri que estava perdendo dinheiro em 40% das corridas. Achava que tirava R$200/dia, mas na verdade era R$80. O LucroReal mudou minha forma de trabalhar.',
      rating: 5,
      initials: 'CM',
      color: 'from-brand-500 to-emerald-500',
    },
    {
      name: 'Ana P.',
      role: 'Motorista 99 • RJ',
      text: 'Já baixei planilha, app, tudo. Nunca mantive por mais de 2 dias. O LucroReal é tão simples que usei desde o primeiro dia. Virei referência no grupo dos motoristas aqui da região.',
      rating: 5,
      initials: 'AP',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Rafael S.',
      role: 'Motorista iFood • MG',
      text: 'O relatório semanal me mostrou que eu trabalhava 60h por semana e ganhava menos que um salário mínimo líquido. Depois que vi os números, mudei completamente minha estratégia.',
      rating: 5,
      initials: 'RS',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-100/30 to-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-1.5 rounded-full mb-4">
            DEPOIMENTOS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            O que os motoristas estão dizendo
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Mais de 1.500 motoristas já descobriram seu lucro real
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-2xl hover:shadow-brand-200/20 hover:border-brand-200 transition-all duration-500 animate-fadeInUp"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} className={`w-5 h-5 ${si < t.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 animate-fadeInUp delay-500">
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${
                  ['from-brand-500 to-emerald-500', 'from-blue-500 to-indigo-500', 'from-purple-500 to-pink-500', 'from-warning to-orange-500'][i-1]
                }`} />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <strong className="text-gray-900">4.9</strong> de média • <strong className="text-gray-900">150+</strong> avaliações
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
