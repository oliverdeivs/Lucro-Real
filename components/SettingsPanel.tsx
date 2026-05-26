'use client'

import { useState, useEffect } from 'react'
import { getSettings, saveSettings, isPremium, setPremium, getVehicles, saveVehicle, deleteVehicle, getActiveVehicleId, setActiveVehicleId } from '@/lib/storage'
import { AppSettings, VehicleProfile } from '@/lib/types'
import { useTranslation } from '@/lib/i18n'
import { calculateDailyFixedCost, formatCurrency } from '@/lib/calculate'

interface Props {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: Props) {
  const { t, locale } = useTranslation()
  const [settings, setSettings] = useState<AppSettings>(getSettings)

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const update = (key: keyof AppSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: Math.max(0, value) }))
  }

  const dailyCost = calculateDailyFixedCost(settings)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-brand-950 to-brand-900 rounded-2xl border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">{t('settings.titulo')}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">{t('settings.metas')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <label className="block text-xs text-white/50 mb-1">{t('settings.meta_dia')}</label>
                <input
                  type="number"
                  min="0"
                  value={settings.dailyGoal || ''}
                  onChange={e => update('dailyGoal', parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-white font-bold text-lg outline-none"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <label className="block text-xs text-white/50 mb-1">{t('settings.meta_semana')}</label>
                <input
                  type="number"
                  min="0"
                  value={settings.weeklyGoal || ''}
                  onChange={e => update('weeklyGoal', parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-white font-bold text-lg outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">{t('settings.custos_fixos')}</h3>
            <p className="text-xs text-white/40 mb-3">{t('settings.custos_fixos_desc')}</p>

            <div className="space-y-2">
              {[
                { key: 'monthlyMaintenance' as const, label: t('settings.manutencao'), placeholder: '300' },
                { key: 'monthlyInsurance' as const, label: t('settings.seguro'), placeholder: '250' },
                { key: 'monthlyTax' as const, label: t('settings.ipva'), placeholder: '80' },
                { key: 'daysWorkingPerMonth' as const, label: t('settings.dias_trab'), placeholder: '22' },
              ].map(field => (
                <div key={field.key} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <label className="text-sm text-white/70">{field.label}</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      value={settings[field.key] || ''}
                      onChange={e => update(field.key, parseFloat(e.target.value) || 0)}
                      className="w-20 bg-transparent text-white font-semibold text-right outline-none"
                    />
                    {field.key !== 'daysWorkingPerMonth' && (
                      <span className="text-xs text-white/40">{locale === 'pt' ? 'R$' : 'MX$'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {settings.daysWorkingPerMonth > 0 && (
              <div className="mt-3 bg-brand-500/10 rounded-xl px-4 py-3 border border-brand-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-300 font-medium">{t('settings.custo_dia')}</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(dailyCost, locale)}</span>
                </div>
                <p className="text-xs text-white/40 mt-1">
                  {t('settings.custo_dia_desc', { dias: settings.daysWorkingPerMonth })}
                </p>
              </div>
            )}
          </div>

          <VehicleManager />
          <PremiumRestore />
        </div>

        <div className="p-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white text-brand-900 font-bold rounded-xl hover:bg-white/90 transition-all"
          >
            {t('settings.salvar')}
          </button>
        </div>
      </div>
    </div>
  )
}

function VehicleManager() {
  const { t, locale } = useTranslation()
  const [vehicles, setVehicles] = useState<VehicleProfile[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [type, setType] = useState<'car' | 'motorcycle'>('car')
  const [mm, setMm] = useState(300)
  const [mi, setMi] = useState(250)
  const [mt, setMt] = useState(80)
  const [dpm, setDpm] = useState(22)
  const [cons, setCons] = useState(12)

  useEffect(() => {
    setVehicles(getVehicles())
    setActiveId(getActiveVehicleId())
  }, [])

  const refresh = () => {
    setVehicles(getVehicles())
    setActiveId(getActiveVehicleId())
  }

  const resetForm = () => {
    setName('')
    setType('car')
    setMm(300)
    setMi(250)
    setMt(80)
    setDpm(22)
    setCons(12)
    setEditId(null)
    setShowForm(false)
  }

  const handleSaveVehicle = () => {
    if (!name.trim()) return
    const v: VehicleProfile = {
      id: editId || crypto.randomUUID(),
      name: name.trim(),
      type,
      monthlyMaintenance: mm,
      monthlyInsurance: mi,
      monthlyTax: mt,
      daysWorkingPerMonth: dpm,
      carConsumptionKmPerLiter: cons,
    }
    saveVehicle(v)
    refresh()
    resetForm()
  }

  const handleEdit = (v: VehicleProfile) => {
    setEditId(v.id)
    setName(v.name)
    setType(v.type)
    setMm(v.monthlyMaintenance)
    setMi(v.monthlyInsurance)
    setMt(v.monthlyTax)
    setDpm(v.daysWorkingPerMonth)
    setCons(v.carConsumptionKmPerLiter)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    deleteVehicle(id)
    if (activeId === id) {
      setActiveVehicleId('')
    }
    refresh()
  }

  const handleActivate = (id: string) => {
    setActiveVehicleId(id)
    setActiveId(id)
  }

  return (
    <div className="pt-5 border-t border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">{t('vehicle.titulo')}</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs text-brand-300 hover:text-brand-200 font-medium flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {locale === 'pt' ? t('vehicle.add') : t('vehicle.add_es')}
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-3 mb-3 space-y-2">
          <div>
            <label className="block text-xs text-white/50 mb-1">{t('vehicle.nome')}</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('vehicle.nome_ph')}
              className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setType('car')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                type === 'car' ? 'bg-brand-600 border-brand-500 text-white' : 'border-white/20 text-white/50 hover:text-white'
              }`}
            >
              {t('vehicle.carro')}
            </button>
            <button
              onClick={() => setType('motorcycle')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                type === 'motorcycle' ? 'bg-brand-600 border-brand-500 text-white' : 'border-white/20 text-white/50 hover:text-white'
              }`}
            >
              {t('vehicle.moto')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: t('settings.manutencao'), val: mm, set: setMm },
              { label: t('settings.seguro'), val: mi, set: setMi },
              { label: t('settings.ipva'), val: mt, set: setMt },
              { label: t('settings.dias_trab'), val: dpm, set: setDpm },
            ].map(f => (
              <div key={f.label} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                <label className="text-[10px] text-white/50">{f.label}</label>
                <input
                  type="number"
                  min="0"
                  value={f.val || ''}
                  onChange={e => f.set(parseFloat(e.target.value) || 0)}
                  className="w-16 bg-transparent text-white font-semibold text-right text-sm outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
            <label className="text-[10px] text-white/50">Consumo (km/L)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={cons || ''}
              onChange={e => setCons(parseFloat(e.target.value) || 0)}
              className="w-16 bg-transparent text-white font-semibold text-right text-sm outline-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={resetForm}
              className="flex-1 py-2 text-xs text-white/50 border border-white/20 rounded-lg hover:text-white transition-all"
            >
              {t('dash.cancelar')}
            </button>
            <button
              onClick={handleSaveVehicle}
              disabled={!name.trim()}
              className="flex-1 py-2 text-xs bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:opacity-50 transition-all"
            >
              {t('settings.salvar')}
            </button>
          </div>
        </div>
      )}

      {vehicles.length === 0 && !showForm ? (
        <p className="text-xs text-white/40 text-center py-3">{t('vehicle.sem_veiculos')}</p>
      ) : (
        <div className="space-y-2">
          {vehicles.map(v => {
            const isActive = v.id === activeId
            return (
              <div key={v.id} className={`flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border transition-all ${
                isActive ? 'border-brand-500/50' : 'border-white/10'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{v.name}</span>
                    {isActive && (
                      <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full font-medium">
                        {t('vehicle.ativo')}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-white/40 mt-0.5">
                    {v.type === 'car' ? '🚗' : '🏍️'} {v.type === 'car' ? t('vehicle.carro') : t('vehicle.moto')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {!isActive && (
                    <button
                      onClick={() => handleActivate(v.id)}
                      className="px-2 py-1 text-[10px] text-brand-300 hover:text-brand-200 font-medium"
                    >
                      {t('vehicle.usar')}
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(v)}
                    className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-loss rounded-lg hover:bg-white/10 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function PremiumRestore() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'token' | 'email'>('token')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const alreadyPremium = isPremium()

  const handleRestoreToken = async () => {
    if (!token.trim()) return
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/verify-token?token=${encodeURIComponent(token.trim())}`)
      if (!res.ok) throw new Error('invalid')
      setPremium()
      setMsg({ type: 'success', text: t('settings.premium_restore_success') })
      setToken('')
    } catch {
      setMsg({ type: 'error', text: t('settings.premium_restore_error') })
    } finally {
      setLoading(false)
    }
  }

  const handleRestoreEmail = async () => {
    if (!email.trim() || !email.includes('@')) return
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/verify-purchase?email=${encodeURIComponent(email.trim().toLowerCase())}`)
      const data = await res.json()
      if (data.valid) {
        setPremium()
        setMsg({ type: 'success', text: t('settings.premium_restore_success') })
        setEmail('')
      } else {
        setMsg({ type: 'error', text: 'Email não encontrado. Verifique se usou o mesmo email da compra na Hotmart.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao verificar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-5 border-t border-white/10">
      <h3 className="text-sm font-semibold text-white mb-1">{t('settings.premium_restore')}</h3>
      <p className="text-xs text-white/40 mb-3">{t('settings.premium_restore_desc')}</p>

      {alreadyPremium ? (
        <p className="text-xs text-profit flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {t('settings.premium_restore_already')}
        </p>
      ) : (
        <>
          <div className="flex gap-1 mb-3 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setTab('token')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                tab === 'token' ? 'bg-brand-600 text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              Código de Acesso
            </button>
            <button
              onClick={() => setTab('email')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                tab === 'email' ? 'bg-brand-600 text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              Email da Compra
            </button>
          </div>

          {tab === 'token' ? (
            <>
              <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 mb-3">
                <p className="text-xs text-white/60">
                  Após a compra, a Hotmart envia um email com seu <strong>código de acesso</strong>.
                  Verifique sua caixa de entrada e o spam. Copie o código e cole abaixo.
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="Cole seu código de acesso"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  onClick={handleRestoreToken}
                  disabled={loading || !token.trim()}
                  className="px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all disabled:opacity-50"
                >
                  {loading ? '...' : 'Ativar'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 mb-3">
                <p className="text-xs text-white/60">
                  Digite o <strong>mesmo email</strong> que você usou para comprar na Hotmart.
                  Verificaremos se há uma compra registrada com este email.
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  onClick={handleRestoreEmail}
                  disabled={loading || !email.trim() || !email.includes('@')}
                  className="px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 transition-all disabled:opacity-50"
                >
                  {loading ? '...' : 'Verificar'}
                </button>
              </div>
            </>
          )}

          {msg && (
            <p className={`text-xs mt-2 ${msg.type === 'success' ? 'text-profit' : msg.type === 'error' ? 'text-red-400' : 'text-white/60'}`}>
              {msg.text}
            </p>
          )}

          <p className="text-xs text-white/30 mt-3 text-center">
            Se você perdeu o código de acesso, use a opção &quot;Email da Compra&quot; acima.
          </p>
        </>
      )}
    </div>
  )
}
