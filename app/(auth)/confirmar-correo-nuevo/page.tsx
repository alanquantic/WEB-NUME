import type { Metadata } from 'next'
import Link from 'next/link'

import { ConfirmEmailChangeCard } from '@/components/auth/confirm-email-change-card'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Confirmar nuevo correo',
  robots: { index: false, follow: false }
}

type ConfirmEmailChangePageProps = {
  searchParams: { token?: string }
}

export default function ConfirmEmailChangePage({ searchParams }: ConfirmEmailChangePageProps) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Card className="mx-auto max-w-md">
          <CardTitle>Enlace inválido</CardTitle>
          <CardDescription>
            Falta el token. Abre el enlace exactamente como llegó a tu correo nuevo o pide el
            cambio otra vez desde tu perfil.
          </CardDescription>
          <CardContent>
            <Link
              href="/perfil/datos"
              className="font-semibold text-[hsl(var(--primary))] underline-offset-2 hover:underline"
            >
              Ir a mis datos
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <ConfirmEmailChangeCard token={token} />
    </div>
  )
}
