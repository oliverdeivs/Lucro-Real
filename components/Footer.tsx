export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-400">
        <div className="font-bold text-gray-600 mb-1">LucroReal</div>
        <div className="mb-2">© 2026 — Todos os direitos reservados</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-600 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Suporte</a>
        </div>
      </div>
    </footer>
  )
}
