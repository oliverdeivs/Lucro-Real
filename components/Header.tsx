'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const path = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            LR
          </div>
          <span className="font-bold text-lg text-gray-900">LucroReal</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              path === '/' ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Calculadora
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              path === '/dashboard' ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}
