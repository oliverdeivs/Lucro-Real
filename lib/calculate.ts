import { Ride, RideStatus } from './types'

export interface CalcInput {
  amount: number
  kmDriven: number
  fuelCost: number
  fuelPricePerLiter?: number
  carConsumption?: number
}

export interface CalcResult {
  profit: number
  costPerKm: number
  totalCost: number
  status: RideStatus
  percentage: number
  score: string
}

export function calculateProfit(input: CalcInput): CalcResult {
  const { amount, kmDriven, fuelCost } = input

  const totalCost = fuelCost
  const profit = amount - totalCost
  const costPerKm = kmDriven > 0 ? totalCost / kmDriven : 0
  const percentage = amount > 0 ? (profit / amount) * 100 : 0

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

  return { profit, costPerKm, totalCost, status, percentage, score }
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
