import { NextRequest, NextResponse } from 'next/server'
import { hasPurchase, isKvAvailable } from '@/lib/kv'

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  if (!isKvAvailable()) {
    return NextResponse.json({
      valid: false,
      error: 'kv_not_configured',
      message: 'Sistema de verificação por email será ativado em breve. Use o código de acesso enviado por email.',
    })
  }

  const found = await hasPurchase(email.toLowerCase().trim())

  if (!found) {
    return NextResponse.json({
      valid: false,
      message: 'Email não encontrado. Verifique se usou o mesmo email da compra na Hotmart.',
    })
  }

  return NextResponse.json({ valid: true })
}
