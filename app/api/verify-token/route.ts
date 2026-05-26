import { NextRequest, NextResponse } from 'next/server'
import { findPurchaseByTransaction, isKvAvailable } from '@/lib/kv'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('token')

  if (!code) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const trimmed = code.trim()

  const validToken = process.env.PREMIUM_TOKEN

  if (validToken && trimmed === validToken) {
    return NextResponse.json({ valid: true })
  }

  if (isKvAvailable()) {
    const email = await findPurchaseByTransaction(trimmed)
    if (email) {
      return NextResponse.json({ valid: true })
    }
  }

  return NextResponse.json({ valid: false }, { status: 401 })
}
