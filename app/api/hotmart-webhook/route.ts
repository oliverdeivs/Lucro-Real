import { NextRequest, NextResponse } from 'next/server'
import { savePurchase } from '@/lib/kv'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const data = body?.data || body
    const email = data?.buyer?.email || body?.buyer?.email || body?.email || ''
    const transaction = data?.purchase?.transaction || body?.transaction || body?.hottok || ''

    if (!email) {
      return NextResponse.json({ received: true, error: 'no email' })
    }

    await savePurchase(email.toLowerCase().trim(), transaction)

    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ received: true })
  }
}
