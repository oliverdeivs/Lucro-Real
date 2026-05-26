import { Redis } from '@upstash/redis'

let redis: Redis | null = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = Redis.fromEnv()
  }
} catch {}

export async function savePurchase(email: string, transaction: string): Promise<void> {
  if (redis) {
    const data = { email, transaction, date: new Date().toISOString() }
    await redis.set(`purchase:${email}`, data)
    if (transaction) {
      await redis.set(`transaction:${transaction}`, email)
    }
    await redis.sadd('purchases', email)
  }
}

export async function hasPurchase(email: string): Promise<boolean> {
  if (redis) {
    const data = await redis.get(`purchase:${email}`)
    return !!data
  }
  return false
}

export async function findPurchaseByTransaction(transaction: string): Promise<string | null> {
  if (!redis) return null

  const email = await redis.get<string>(`transaction:${transaction}`)
  if (email) return email

  const emails = await redis.smembers<string[]>('purchases')
  if (!emails || emails.length === 0) return null

  const pipeline = emails.map(e => redis.get<{ transaction?: string }>(`purchase:${e}`))
  const results = await Promise.all(pipeline)
  for (let i = 0; i < results.length; i++) {
    const data = results[i]
    if (data?.transaction === transaction) {
      return emails[i]
    }
  }

  return null
}

export function isKvAvailable(): boolean {
  return !!redis
}
