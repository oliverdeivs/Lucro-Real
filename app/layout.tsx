import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'LucroReal — Descubra quanto você realmente lucra por corrida',
  description:
    'Calculadora de lucro real para motoristas de aplicativo. Uber, 99, iFood. Descubra em segundos se vale a pena cada corrida.',
  openGraph: {
    title: 'LucroReal — Calculadora de Lucro para Motoristas',
    description: 'Descubra quanto você realmente lucra por corrida. Grátis para usar.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
