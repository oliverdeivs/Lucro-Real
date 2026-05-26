import { Ride, RideStatus, AppSettings } from './types'
import { Locale, localeConfig } from './i18n'

export interface CalcInput {
  amount: number
  kmDriven: number
  fuelCost: number
  otherCosts?: number
  durationMinutes?: number
}

export interface CalcResult {
  profit: number
  costPerKm: number
  totalCost: number
  fuelCost: number
  otherCosts: number
  status: RideStatus
  percentage: number
  score: string
  durationMinutes?: number
  profitPerHour?: number
}

export function calculateProfit(input: CalcInput): CalcResult {
  const { amount, kmDriven, fuelCost } = input
  const otherCosts = input.otherCosts ?? 0
  const durationMinutes = input.durationMinutes

  const totalCost = fuelCost + otherCosts
  const profit = amount - totalCost
  const costPerKm = kmDriven > 0 ? totalCost / kmDriven : 0
  const percentage = amount > 0 ? (profit / amount) * 100 : 0
  const profitPerHour = durationMinutes && durationMinutes > 0
    ? (profit / durationMinutes) * 60
    : undefined

  let status: RideStatus = 'break_even'
  if (profit > 0) status = 'profit'
  if (profit < 0) status = 'loss'

  let score = 'D'
  const margin = amount > 0 ? profit / amount : 0
  if (margin >= 0.5) score = 'A'
  else if (margin >= 0.3) score = 'B'
  else if (margin >= 0.1) score = 'C'
  else if (margin >= 0) score = 'D'
  else score = 'F'

  return { profit, costPerKm, totalCost, fuelCost, otherCosts, status, percentage, score, durationMinutes, profitPerHour }
}

export function calculateDailyFixedCost(settings: AppSettings): number {
  const { monthlyMaintenance, monthlyInsurance, monthlyTax, daysWorkingPerMonth } = settings
  if (daysWorkingPerMonth <= 0) return 0
  return (monthlyMaintenance + monthlyInsurance + monthlyTax) / daysWorkingPerMonth
}

export function formatCurrency(value: number, locale: Locale = 'pt'): string {
  const cfg = localeConfig[locale]
  return value.toLocaleString(cfg.locale, { style: 'currency', currency: cfg.currency })
}
