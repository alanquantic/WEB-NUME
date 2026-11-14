import { redirect } from 'next/navigation'

import { BannersManager } from '@/components/admin/banners-manager'
import { listBanners } from '@/lib/api/banners'
import { getServerSessionUser } from '@/lib/auth/session'

export default async function BannersAdminPage() {
  const user = await getServerSessionUser()
  if (user?.role !== 'admin') redirect('/perfil/')

  const { data } = await listBanners()

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h1 className="font-display text-3xl font-semibold">Banners de página</h1>
        <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
          Administra los banners del sitio: el slider y el banner arriba de
          Tienda en el home, y los banners superior y lateral de artículos y
          páginas. Cualquier admin puede crear, editar o eliminar. Puedes
          programar cada banner con fecha de inicio y de fin (hora de México)
          y agregarle un texto alternativo.
        </p>
      </div>
      <BannersManager initialBanners={data} />
    </div>
  )
}
