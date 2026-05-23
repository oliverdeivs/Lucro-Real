# 🚗 LucroReal — MVP Completo

**Calculadora de Lucro Real para Motoristas de Aplicativo (Uber, 99, iFood)**

Produto low ticket (R$37) para Hotmart/Kiwify. Zero backend, 100% front-end com Next.js + localStorage.

---

## ✅ CHECKLIST DE LANÇAMENTO

### 1. Fazer Deploy na Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
cd lucro-real
vercel --prod
```

Ou conecte o repositório GitHub em: https://vercel.com/new

### 2. Criar Produto na Hotmart

**Acesse:** https://hotmart.com/pt-br/meus-produtos

**Dados do produto:**
- Nome: LucroReal — Calculadora de Lucro para Motoristas
- Preço: R$ 37,00
- Categoria: Produtividade / Ferramentas
- Tipo: Produto Digital (acesso vitalício)
- Link de acesso: `https://SEU-DOMINIO.vercel.app/?hotmart=HOTTOKEN`

### 3. Configurar Gatilho de Upsell

No arquivo `components/ExportButton.tsx`, linha 14:
```
window.open('https://hotmart.com/SEU-LINK-AQUI', '_blank')
```
Substitua `SEU-LINK-AQUI` pelo link de checkout da Hotmart.

### 4. Liberar Premium Pós-Compra

**Opção A (Automático via URL):**
Na Hotmart, configure o link de acesso como:
`https://SEU-DOMINIO.vercel.app/?premium=TOKEN_UNICO`

No `app/page.tsx`, adicione no topo:
```tsx
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('premium')) setPremium()
}, [])
```

**Opção B (Manual):**
Envie o link direto: `https://SEU-DOMINIO.vercel.app/dashboard?liberar=sim`
E no `app/dashboard/page.tsx` adicione:
```tsx
useEffect(() => {
  if (new URLSearchParams(window.location.search).get('liberar') === 'sim') {
    setPremium()
  }
}, [])
```

### 5. Criar Página de Obrigado (OFS)

Crie `app/obrigado/page.tsx`:
```tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setPremium } from '@/lib/storage'

export default function Obrigado() {
  const router = useRouter()

  useEffect(() => {
    setPremium()
    setTimeout(() => router.push('/dashboard'), 3000)
  }, [])

  return (
    <div className="text-center py-24">
      <h1 className="text-4xl font-black text-brand-600 mb-4">🎉 Compra Confirmada!</h1>
      <p className="text-gray-500">Redirecionando para seu dashboard...</p>
    </div>
  )
}
```

Na Hotmart, configure o link de redirecionamento pós-compra como:
`https://SEU-DOMINIO.vercel.app/obrigado`

---

## ESTRUTURA DO PROJETO

```
lucro-real/
├── app/
│   ├── layout.tsx          # Layout global com Header + Footer
│   ├── page.tsx            # Landing Page + Calculadora
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard com histórico e gráficos
│   └── globals.css         # Estilos Tailwind + Inter font
├── components/
│   ├── Header.tsx          # Navbar fixa
│   ├── HeroSection.tsx     # Seção principal com CTA
│   ├── ProfitCalculator.tsx# Container da calculadora
│   ├── RideForm.tsx        # Formulário de input
│   ├── ResultCard.tsx      # Resultado com nota A-F
│   ├── DashboardStats.tsx  # Cards de estatísticas
│   ├── RideHistory.tsx     # Lista de corridas
│   ├── WeeklyChart.tsx     # Gráfico de lucro por dia
│   ├── ExportButton.tsx    # Botão de exportar PDF (paywall)
│   ├── BenefitsSection.tsx # Seção de benefícios
│   ├── SocialProof.tsx     # Depoimentos
│   ├── PricingSection.tsx  # Card de preço
│   ├── FAQ.tsx             # Perguntas frequentes
│   └── Footer.tsx          # Rodapé
├── lib/
│   ├── types.ts            # Tipos TypeScript
│   ├── calculate.ts        # Lógica de cálculo de lucro
│   └── storage.ts          # localStorage CRUD
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

---

## ESTRATÉGIA DE TRÁFEGO

### Tráfego Orgânico (Grátis)
- **YouTube**: Grave tutorial "Descubra se você está perdendo dinheiro na Uber" e deixe link na descrição
- **TikTok**: Vídeos curtos mostrando o cálculo chocante (ex: "Corrida de R$30 deu prejuízo de R$5")
- **Grupos WhatsApp**: Entre em grupos de motoristas e compartilhe a ferramenta
- **Reddit**: r/motoristasdeapp, r/uberbrasil

### Tráfego Pago
- **Meta Ads (Facebook/Instagram)**:
  - Público: Homens 25-50, interesse em Uber/99/motorista de aplicativo
  - CPC estimado: R$0,50-1,50
  - Criativo: Mostrar antes/depois do cálculo

### Gatilhos de Conversão
- Calculadora GRÁTIS para gerar confiança
- Resultado chocante (nota F) cria urgência
- Prova social (depoimentos)
- Garantia 7 dias (elimina risco)

---

## PRÓXIMOS PASSOS (PÓS-MVP)

- [ ] Adicionar cálculo de depreciação automática do veículo
- [ ] Adicionar modo escuro
- [ ] Criar versão PWA (instalável no celular)
- [ ] Adicionar autenticação opcional (salvar na nuvem)
- [ ] Criar programa de afiliados
- [ ] Versão em inglês (UberProfitCalc)
