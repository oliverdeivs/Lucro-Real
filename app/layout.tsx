import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
