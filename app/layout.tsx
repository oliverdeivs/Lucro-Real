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
  icons: { icon: '/icon-192.svg', apple: '/icon-192.svg' },
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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon-192.svg" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('lucro-real-theme')
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark')
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
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
