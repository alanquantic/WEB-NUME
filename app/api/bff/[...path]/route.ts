import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_COOKIE } from '@/lib/auth/cookies'
import { API_BASE_URL } from '@/lib/auth/session'

async function proxy(request: NextRequest, path: string[]) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value
  const search = request.nextUrl.search || ''
  const url = `${API_BASE_URL}/${path.join('/')}${search}`
  const rawBody =
    request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text()

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    },
    body: rawBody
  })

  const text = await response.text()

  return new NextResponse(text, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'application/json'
    }
  })
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path)
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path)
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path)
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path)
}
