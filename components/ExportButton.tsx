'use client'

import { isPremium } from '@/lib/storage'
import { DaySummary } from '@/lib/types'
import { formatCurrency } from '@/lib/calculate'

interface Props {
  summaries: DaySummary[]
}

export default function ExportButton({ summaries }: Props) {
  const premium = isPremium()
  const hasData = summaries.length > 0

  const handleExport = () => {
    if (!premium) {
      window.open('https://hotmart.com/SEU-LINK-AQUI', '_blank')
      return
    }
    generatePDF(summaries)
  }

  if (!hasData) return null

  return (
    <button
      onClick={handleExport}
      className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all shadow-lg shadow-brand-200 flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {premium ? 'Exportar Relatório em PDF' : '🔒 Desbloquear Exportação PDF'}
    </button>
  )
}

function generatePDF(summaries: DaySummary[]) {
  const totalProfit = summaries.reduce((s, d) => s + d.totalProfit, 0)
  const totalKm = summaries.reduce((s, d) => s + d.totalKm, 0)
  const totalRides = summaries.reduce((s, d) => s + d.totalRides, 0)
  const totalAmount = summaries.reduce((s, d) => s + d.totalAmount, 0)
  const totalFuel = summaries.reduce((s, d) => s + d.totalFuelCost, 0)
  const days = summaries.length

  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  const rows = summaries.map(d => `
    <tr>
      <td style="padding:8px;border:1px solid #ddd">${new Date(d.date).toLocaleDateString('pt-BR')}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center">${d.totalRides}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right">${formatCurrency(d.totalAmount)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right">${formatCurrency(d.totalFuelCost)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right">${d.totalKm.toFixed(1)} km</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;color:${d.totalProfit >= 0 ? '#10B981' : '#EF4444'};font-weight:bold">${formatCurrency(d.totalProfit)}</td>
    </tr>
  `).join('')

  printWindow.document.write(`
    <html>
    <head>
      <title>Relatório LucroReal</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        h1 { color: #059669; font-size: 24px; margin-bottom: 4px; }
        .sub { color: #888; font-size: 14px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th { background: #059669; color: white; padding: 10px 8px; text-align: left; font-size: 13px; }
        tr:nth-child(even) { background: #f9f9f9; }
        .resumo { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; }
        .card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 20px; flex: 1; min-width: 120px; }
        .card label { font-size: 11px; color: #888; display: block; }
        .card value { font-size: 18px; font-weight: bold; color: #059669; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <h1>📊 Relatório LucroReal</h1>
      <div class="sub">Período: ${summaries.length} dia(s) — Gerado em ${new Date().toLocaleDateString('pt-BR')}</div>

      <div class="resumo">
        <div class="card"><label>Corridas</label><value>${totalRides}</value></div>
        <div class="card"><label>Lucro Total</label><value>${formatCurrency(totalProfit)}</value></div>
        <div class="card"><label>Faturamento</label><value>${formatCurrency(totalAmount)}</value></div>
        <div class="card"><label>KM Rodados</label><value>${totalKm.toFixed(1)} km</value></div>
        <div class="card"><label>Combustível</label><value>${formatCurrency(totalFuel)}</value></div>
        <div class="card"><label>Dias</label><value>${days}</value></div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Corridas</th>
            <th>Faturamento</th>
            <th>Combustível</th>
            <th>KM</th>
            <th>Lucro</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div style="text-align:center;color:#aaa;font-size:12px;margin-top:32px">
        Relatório gerado por LucroReal — lucroreal.app
      </div>

      <script>
        window.onload = function() { window.print() }
      <\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
}
