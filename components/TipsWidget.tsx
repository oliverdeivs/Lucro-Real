'use client'

import { useState, useMemo } from 'react'
import { useTranslation } from '@/lib/i18n'
import { Tip } from '@/lib/types'

const ALL_TIPS: Tip[] = [
  { id: '1', icon: 'clock', title: 'tips.1.title', description: 'tips.1.desc' },
  { id: '2', icon: 'map', title: 'tips.2.title', description: 'tips.2.desc' },
  { id: '3', icon: 'tool', title: 'tips.3.title', description: 'tips.3.desc' },
  { id: '4', icon: 'target', title: 'tips.4.title', description: 'tips.4.desc' },
  { id: '5', icon: 'chart', title: 'tips.5.title', description: 'tips.5.desc' },
  { id: '6', icon: 'compare', title: 'tips.6.title', description: 'tips.6.desc' },
]

const ICONS: Record<string, React.ReactNode> = {
  clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  map: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  tool: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  target: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  compare: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
}

export default function TipsWidget() {
  const { t } = useTranslation()
  const [dismissed, setDismissed] = useState<string[]>([])

  const tip = useMemo(() => {
    const available = ALL_TIPS.filter(x => !dismissed.includes(x.id))
    if (available.length === 0) return null
    return available[Math.floor(Math.random() * available.length)]
  }, [dismissed])

  if (!tip) return null

  return (
    <div className="bg-gradient-to-br from-brand-50 to-emerald-50 dark:from-brand-950 dark:to-emerald-950 rounded-2xl border border-brand-100 dark:border-brand-800 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-brand-900 shadow-sm flex items-center justify-center text-brand-600 dark:text-brand-300 shrink-0">
          {ICONS[tip.icon]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{t(tip.title)}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t(tip.description)}</p>
        </div>
        <button
          onClick={() => setDismissed(prev => [...prev, tip.id])}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-brand-800 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
