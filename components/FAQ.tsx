'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Como funciona o cálculo de lucro?',
    a: 'Você informa o valor que recebeu na corrida, quantos KM rodou e quanto gastou de combustível. O sistema calcula automaticamente seu lucro real, custo por KM e dá uma nota de A a F para a corrida.',
  },
  {
    q: 'Preciso baixar algum aplicativo?',
    a: 'Não! O LucroReal funciona direto no navegador do seu celular. Acesse, use e salve seus dados. Sem instalação, sem ocupar espaço no celular.',
  },
  {
    q: 'Funciona para Uber, 99, iFood?',
    a: 'Sim! Funciona para qualquer aplicativo de transporte ou entrega. O cálculo é baseado no valor recebido, KM rodado e combustível gasto — independente da plataforma.',
  },
  {
    q: 'Precisa de internet para usar?',
    a: 'Só precisa de internet para acessar pela primeira vez. Depois que carregar, você pode usar offline que seus dados ficam salvos no próprio celular.',
  },
  {
    q: 'O que é o relatório em PDF?',
    a: 'O relatório em PDF é um resumo profissional com todos os seus dados: lucro total, média por corrida, custo por KM, e tabela detalhada dia a dia. Perfeito para acompanhar sua evolução.',
  },
  {
    q: 'Como funciona a garantia?',
    a: 'Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro. Sem burocracia.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
        Perguntas Frequentes
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
        Tire suas dúvidas sobre o LucroReal
      </p>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {faq.q}
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  open === i ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
