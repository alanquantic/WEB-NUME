import { NextResponse } from 'next/server'
import { getServerSessionUser } from '@/lib/auth/session'
import { getAllOrders } from '@/lib/api/orders'
import { getOrdersForExport, parseOrderMonth } from '@/lib/orders/month'
import { ordersToCsv } from '@/lib/orders/csv'

export const dynamic = 'force-dynamic'

function error(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'private, no-store' } })
}

export async function GET(request: Request) {
  try {
    const user = await getServerSessionUser()
    if (!user) return error('Inicia sesión para exportar pedidos.', 401)
    if (user.role !== 'admin') return error('Solo administradores pueden exportar los pedidos.', 403)
    const params = new URL(request.url).searchParams
    const value = params.get('month')
    const month = parseOrderMonth(value)
    if (params.getAll('month').length > 1 || (value && !month)) return error('Selecciona un mes válido.', 400)

    const orders = await getOrdersForExport(getAllOrders, month)
    return new Response(ordersToCsv(orders), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pedidos-${month ?? 'todos'}.csv"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff'
      }
    })
  } catch {
    return error('No se pudo exportar el archivo completo. Intenta de nuevo.', 503)
  }
}
