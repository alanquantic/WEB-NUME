import { NextResponse } from 'next/server'

import { getServerSessionUser } from '@/lib/auth/session'

export async function GET() {
  const user = await getServerSessionUser()

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(user)
}

