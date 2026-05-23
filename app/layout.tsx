import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PwaSetup from '@/components/PwaSetup'

export const metadata: Metadata = {
  title: 'LucroReal — Descubra quanto você realmente lucra por corrida',
  description:
    'Calculadora de lucro real para motoristas de aplicativo. Uber, 99, iFood. Descubra em segundos se vale a pena cada corrida.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LucroReal',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  openGraph: {
    title: 'LucroReal — Calculadora de Lucro para Motoristas',
    description: 'Descubra quanto você realmente lucra por corrida. Grátis para usar.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon-192.svg" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <PwaSetup />
        </LanguageProvider>
      </body>
    </html>
  )
}
