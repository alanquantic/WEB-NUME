import { NextRequest, NextResponse } from 'next/server'
import { searchContent } from '@/lib/api/search'

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get('query') ?? '').trim().slice(0, 200)
  if (query.length < 2) return NextResponse.json({ data: [] })
  try {
    // No type filter: include both published posts and pages.
    const results = await searchContent({ query, limit: 6 })
    return NextResponse.json(results, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch {
    return NextResponse.json({ error: 'No se pudo completar la búsqueda.' }, { status: 503 })
  }
}
