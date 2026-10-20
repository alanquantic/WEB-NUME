import { redirect } from 'next/navigation'

import { PromoProductsManager } from '@/components/admin/promo-products-manager'
import type { PromoProduct } from '@/lib/api/promo-products'
import { serverApiFetch } from '@/lib/api/server'
import { getServerSessionUser } from '@/lib/auth/session'

export default async function PromoProductsAdminPage() {
  const user = await getServerSessionUser()
  if (user?.role !== 'admin') redirect('/perfil/')

  const { data } = await serverApiFetch<{ data: PromoProduct[] }>('/promo-products', {
    cache: 'no-store'
  })

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h1 className="font-display text-3xl font-semibold">Productos promocionados</h1>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
          Elige productos de la tienda para mostrarlos en el aviso flotante con
          mini Laura (esquina inferior derecha del sitio). Los avisos aparecen
          al azar cada cierto tiempo, se cierran solos después de unos segundos
          y al hacer click llevan al producto en la tienda.
        </p>
      </div>
      <PromoProductsManager initialProducts={data} />
    </div>
  )
}
