import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getMyOrders } from '@/lib/api/orders'

export default async function OrdersPage() {
  const orders = await getMyOrders()

  return (
    <Card>
      <CardTitle>Órdenes</CardTitle>
      <CardDescription>Consumo directo de `GET /orders/me`.</CardDescription>
      <CardContent className="grid gap-4">
        {orders.data.map((order) => (
          <div key={order.id} className="rounded-3xl bg-[hsl(var(--secondary))] p-4 text-sm">
            <p className="font-semibold">{order.id}</p>
            <p>Estado: {order.status}</p>
            <p>Total: {order.total_amount} {order.currency}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

