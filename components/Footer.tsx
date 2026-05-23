export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                LR
              </div>
              <span className="font-bold text-gray-900">LucroReal</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A ferramenta mais simples para motoristas de aplicativo descobrirem seu lucro real por corrida.
            </p>
          </div>

          <div>
            <div className="font-semibold text-gray-900 text-sm mb-3">Produto</div>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#calculadora" className="block hover:text-brand-600 transition-colors">Calculadora</a>
              <a href="#como-funciona" className="block hover:text-brand-600 transition-colors">Funcionalidades</a>
              <a href="#preco" className="block hover:text-brand-600 transition-colors">Preço</a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-gray-900 text-sm mb-3">Suporte</div>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-brand-600 transition-colors">Termos de Uso</a>
              <a href="#" className="block hover:text-brand-600 transition-colors">Privacidade</a>
              <a href="#" className="block hover:text-brand-600 transition-colors">Fale Conosco</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          © 2026 LucroReal. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
