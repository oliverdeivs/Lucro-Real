'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Como funciona o cálculo de lucro?',
    a: 'Você informa o valor que recebeu na corrida, quantos KM rodou e quanto gastou de combustível. O sistema calcula automaticamente seu lucro real, custo por KM e dá uma nota de A a F para a corrida. Tudo em segundos, sem complicação.',
  },
  {
    q: 'Preciso baixar algum aplicativo?',
    a: 'Não! O LucroReal funciona direto no navegador do seu celular. Acesse pelo link, use e salve seus dados. Sem instalação, sem ocupar espaço, sem precisar de iPhone ou Android específico.',
  },
  {
    q: 'Funciona para Uber, 99, iFood e outros?',
    a: 'Sim! Funciona para qualquer aplicativo de transporte ou entrega. O cálculo é baseado no valor recebido, KM rodado e combustível gasto — independente da plataforma.',
  },
  {
    q: 'Funciona offline?',
    a: 'Sim! Depois que você acessa o site e carrega a página, pode usar offline. Seus dados ficam salvos no próprio celular (localStorage). Perfeito para quem não tem internet estável.',
  },
  {
    q: 'O que vem no relatório em PDF?',
    a: 'Um relatório profissional completo com: total de corridas, lucro total por período, faturamento bruto, gasto com combustível, KM rodados, média de lucro por corrida e tabela detalhada dia a dia. Ideal para imprimir ou enviar.',
  },
  {
    q: 'Tem garantia?',
    a: 'Sim! Você tem 7 dias de garantia incondicional. Se o LucroReal não transformar sua forma de enxergar seus ganhos, devolvemos 100% do seu dinheiro. Sem burocracia, sem perguntas.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Tire suas dúvidas sobre o LucroReal
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 hover:bg-gray-50/50 transition-colors gap-4"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-brand-50 rotate-180' : ''
                  }`}>
                    <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-brand-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
