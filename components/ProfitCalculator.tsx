'use client'

import { useState } from 'react'
import RideForm from './RideForm'
import ResultCard from './ResultCard'
import { CalcInput, CalcResult, calculateProfit } from '@/lib/calculate'
import { Ride } from '@/lib/types'
import { saveRide } from '@/lib/storage'

export default function ProfitCalculator() {
  const [result, setResult] = useState<CalcResult | null>(null)
  const [saved, setSaved] = useState(false)
  const [lastInput, setLastInput] = useState<CalcInput | null>(null)

  const handleCalculate = (input: CalcInput) => {
    const calc = calculateProfit(input)
    setResult(calc)
    setSaved(false)
    setLastInput(input)
  }

  const handleSave = () => {
    if (!result || !lastInput) return
    const ride: Ride = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      amount: lastInput.amount,
      kmDriven: lastInput.kmDriven,
      fuelCost: lastInput.fuelCost,
      profit: result.profit,
      costPerKm: result.costPerKm,
      status: result.status,
    }
    saveRide(ride)
    setSaved(true)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
        <RideForm onCalculate={handleCalculate} />
      </div>

      {result && (
        <div className="mt-4">
          <ResultCard result={result} onSave={handleSave} saved={saved} />
        </div>
      )}
    </div>
  )
}
