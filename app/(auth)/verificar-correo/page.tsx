import type { Metadata } from 'next'
import Link from 'next/link'

import { VerifyEmailCard } from '@/components/auth/verify-email-card'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Confirmar correo',
  robots: { index: false, follow: false }
}

type VerifyEmailPageProps = {
  searchParams: { token?: string }
}

export default function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Card className="mx-auto max-w-md">
          <CardTitle>Enlace inválido</CardTitle>
          <CardDescription>
            Falta el token de confirmación. Abre el enlace exactamente como llegó a tu correo o
            pide uno nuevo desde tu perfil.
          </CardDescription>
          <CardContent>
            <Link
              href="/perfil"
              className="font-semibold text-[hsl(var(--primary))] underline-offset-2 hover:underline"
            >
              Ir a mi perfil
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <VerifyEmailCard token={token} />
    </div>
  )
}
