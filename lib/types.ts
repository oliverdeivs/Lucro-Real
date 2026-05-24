export type RideStatus = 'profit' | 'loss' | 'break_even'

export interface Ride {
  id: string
  date: string
  amount: number
  kmDriven: number
  fuelCost: number
  profit: number
  costPerKm: number
  status: RideStatus
  note?: string
}

export interface DaySummary {
  date: string
  totalRides: number
  totalAmount: number
  totalFuelCost: number
  totalKm: number
  totalProfit: number
  avgCostPerKm: number
}

export interface AppSettings {
  fuelPricePerLiter: number
  carConsumptionKmPerLiter: number
  monthlyMaintenance: number
  monthlyInsurance: number
  monthlyTax: number
  daysWorkingPerMonth: number
  dailyGoal: number
  weeklyGoal: number
}
