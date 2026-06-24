import { Card, CardDescription, CardTitle } from '@/components/ui/card'

export default function AdminPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>Gestión basada en `GET /users`, `PATCH /users/:id` y soft delete.</CardDescription>
      </Card>
      <Card>
        <CardTitle>Contenido</CardTitle>
        <CardDescription>Posts, pages, categorías, tags y revisiones bajo un solo árbol admin.</CardDescription>
      </Card>
      <Card>
        <CardTitle>Moderación</CardTitle>
        <CardDescription>Los comentarios y la membresía se habilitan según reglas del handoff.</CardDescription>
      </Card>
      <Card>
        <CardTitle>Ecommerce</CardTitle>
        <CardDescription>Espacio reservado para visibilidad operativa de órdenes y suscripciones.</CardDescription>
      </Card>
    </div>
  )
}

