'use client'

import { Ride, DaySummary, AppSettings, VehicleProfile } from './types'

const STORAGE_KEY = 'lucro-real-rides'
const PREMIUM_KEY = 'lucro-real-premium'
const CALC_COUNT_KEY = 'lucro-real-calc-count'
const SETTINGS_KEY = 'lucro-real-settings'
export const MAX_FREE_CALCS = 4

// Vehicle profiles
const VEHICLES_KEY = 'lucro-real-vehicles'
const ACTIVE_VEHICLE_KEY = 'lucro-real-active-vehicle'

export function getVehicles(): VehicleProfile[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(VEHICLES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveVehicle(v: VehicleProfile): void {
  const list = getVehicles().filter(x => x.id !== v.id)
  list.push(v)
  localStorage.setItem(VEHICLES_KEY, JSON.stringify(list))
}

export function deleteVehicle(id: string): void {
  const list = getVehicles().filter(x => x.id !== id)
  localStorage.setItem(VEHICLES_KEY, JSON.stringify(list))
}

export function getActiveVehicleId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACTIVE_VEHICLE_KEY)
}

export function setActiveVehicleId(id: string): void {
  localStorage.setItem(ACTIVE_VEHICLE_KEY, id)
}

// Dark mode
const THEME_KEY = 'lucro-real-theme'

export function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light'
}

export function setTheme(t: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, t)
}

// Tutorial seen
const TUTORIAL_KEY = 'lucro-real-tutorial'

export function isTutorialSeen(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(TUTORIAL_KEY) === 'true'
}

export function markTutorialSeen(): void {
  localStorage.setItem(TUTORIAL_KEY, 'true')
}

// CSV Export
export function getRidesForExport(): Ride[] {
  return getRides().reverse()
}

export const defaultSettings: AppSettings = {
  fuelPricePerLiter: 6.39,
  carConsumptionKmPerLiter: 12,
  monthlyMaintenance: 300,
  monthlyInsurance: 250,
  monthlyTax: 80,
  daysWorkingPerMonth: 22,
  dailyGoal: 150,
  weeklyGoal: 900,
}

export function getSettings(): AppSettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function getRides(): Ride[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveRide(ride: Ride): void {
  const rides = getRides()
  rides.push(ride)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rides))
}

export function deleteRide(id: string): void {
  const rides = getRides().filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rides))
}

export function clearAllRides(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getDaySummaries(): DaySummary[] {
  const rides = getRides()
  const grouped: Record<string, Ride[]> = {}

  rides.forEach(ride => {
    const day = ride.date.split('T')[0]
    if (!grouped[day]) grouped[day] = []
    grouped[day].push(ride)
  })

  return Object.entries(grouped).map(([date, dayRides]) => {
    const totalKm = dayRides.reduce((s, r) => s + r.kmDriven, 0)
    const totalFuelCost = dayRides.reduce((s, r) => s + r.fuelCost, 0)
    return {
      date,
      totalRides: dayRides.length,
      totalAmount: dayRides.reduce((s, r) => s + r.amount, 0),
      totalFuelCost,
      totalKm,
      totalProfit: dayRides.reduce((s, r) => s + r.profit, 0),
      avgCostPerKm: totalKm > 0 ? totalFuelCost / totalKm : 0,
    }
  })
}

export function isPremium(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(PREMIUM_KEY) === 'true'
}

export function setPremium(): void {
  localStorage.setItem(PREMIUM_KEY, 'true')
}

export function getCalcCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    return parseInt(localStorage.getItem(CALC_COUNT_KEY) || '0', 10)
  } catch {
    return 0
  }
}

export function incrementCalcCount(): number {
  const next = getCalcCount() + 1
  localStorage.setItem(CALC_COUNT_KEY, String(next))
  return next
}

export function canCalculate(): boolean {
  return isPremium() || getCalcCount() < MAX_FREE_CALCS
}

export function getRemainingFreeCalcs(): number {
  if (isPremium()) return Infinity
  return Math.max(0, MAX_FREE_CALCS - getCalcCount())
}
