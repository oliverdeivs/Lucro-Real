'use client'

import { Ride, DaySummary } from './types'

const STORAGE_KEY = 'lucro-real-rides'
const PREMIUM_KEY = 'lucro-real-premium'

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

  return Object.entries(grouped).map(([date, dayRides]) => ({
    date,
    totalRides: dayRides.length,
    totalAmount: dayRides.reduce((s, r) => s + r.amount, 0),
    totalFuelCost: dayRides.reduce((s, r) => s + r.fuelCost, 0),
    totalKm: dayRides.reduce((s, r) => s + r.kmDriven, 0),
    totalProfit: dayRides.reduce((s, r) => s + r.profit, 0),
    avgCostPerKm: dayRides.reduce((s, r) => s + r.costPerKm, 0) / dayRides.length,
  }))
}

export function isPremium(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(PREMIUM_KEY) === 'true'
}

export function setPremium(): void {
  localStorage.setItem(PREMIUM_KEY, 'true')
}
