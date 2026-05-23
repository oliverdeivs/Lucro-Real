'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/calculate'

const demoResults = [
  { amount: 32.50, km: 18, fuel: 14.80, profit: 17.70, score: 'B' },
  { amount: 18.00, km: 12, fuel: 9.60, profit: 8.40, score: 'C' },
  { amount: 45.00, km: 35, fuel: 28.00, profit: 17.00, score: 'D' },
  { amount: 27.00, km: 22, fuel: 30.80, profit: -3.80, score: 'F' },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % demoResults.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const r = demoResults[current]

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white pointer-events-none" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-sm font-medium px-5 py-2 rounded-full shadow-sm mb-8">
            <span className="w-2 h-2 bg-profit rounded-full animate-pulse" />
            +1.500 motoristas já usam
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Você sabe quanto{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-400 animate-gradient">
              realmente lucra
            </span>
            <br />
            por corrida?
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            A maioria dos motoristas <strong className="text-gray-700">acha que está lucrando</strong>, 
            mas depois de combustível, manutenção e desgaste,{' '}
            <strong className="text-loss">está perdendo dinheiro</strong> sem saber.
            <br />
            Descubra em <strong className="text-brand-600">5 segundos</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#calculadora"
              className="group px-8 py-4 bg-gradient-to-r from-brand-600 to-emerald-500 text-white font-semibold rounded-2xl hover:from-brand-700 hover:to-emerald-600 transition-all duration-300 shadow-xl shadow-brand-200/50 hover:shadow-2xl hover:shadow-brand-300/50 text-lg inline-flex items-center gap-2"
            >
              Calcular Meu Lucro Agora
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#como-funciona"
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-brand-400 hover:text-brand-600 transition-all duration-300 text-lg shadow-sm"
            >
              Como Funciona
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center animate-fadeInUp delay-200">
          <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl shadow-brand-200/20 animate-fadeInScale">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold">
                  LR
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">Calculadora</div>
                  <div className="text-xs text-gray-400">Ao vivo • Demo</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-loss" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-profit" />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Valor recebido</span>
                <span className="font-bold text-gray-900">{formatCurrency(r.amount)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">KM rodados</span>
                <span className="font-bold text-gray-900">{r.km} km</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Combustível</span>
                <span className="font-bold text-gray-900">{formatCurrency(r.fuel)}</span>
              </div>
            </div>

            <div className={`rounded-2xl p-5 ${r.profit >= 0 ? 'bg-profit/10 border border-profit/20' : 'bg-loss/10 border border-loss/20'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">Lucro real</span>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-black ${r.profit >= 0 ? 'text-profit' : 'text-loss'}`}>
                    {r.profit >= 0 ? '+' : ''}{formatCurrency(r.profit)}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black text-white ${
                    r.score === 'F' ? 'bg-loss' : r.score >= 'D' ? 'bg-warning' : 'bg-profit'
                  }`}>
                    {r.score}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {r.score === 'F'
                  ? 'Prejuízo! Essa corrida está te custando dinheiro.'
                  : r.score === 'D'
                  ? 'Margem muito baixa. Quase no prejuízo.'
                  : r.score === 'C'
                  ? 'Margem razoável. Dá pra melhorar.'
                  : 'Boa corrida! Vale a pena.'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '1.5M+', label: 'Motoristas no Brasil', gradient: 'from-brand-500 to-emerald-500' },
                { value: '67%', label: 'Estão endividados', gradient: 'from-loss to-rose-500' },
                { value: '9h+', label: 'Por dia dirigindo', gradient: 'from-warning to-orange-500' },
                { value: '70%', label: 'Dependem só do app', gradient: 'from-blue-500 to-indigo-500' },
              ].map(stat => (
                <div key={stat.label} className="glass rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
                  <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                💡
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Você sabia?</div>
                <div className="text-sm text-gray-500">70% dos motoristas não controlam seus gastos e 67% estão endividados.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
