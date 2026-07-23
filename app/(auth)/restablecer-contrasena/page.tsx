import type { Metadata } from 'next'
import Link from 'next/link'

import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Restablecer contraseña'
}

type ResetPasswordPageProps = {
  searchParams: { token?: string }
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Card className="mx-auto max-w-md">
          <CardTitle>Enlace inválido</CardTitle>
          <CardDescription>
            Falta el token de restablecimiento. Abre el enlace exactamente como llegó a tu correo
            o solicita uno nuevo.
          </CardDescription>
          <CardContent>
            <Link
              href="/olvide-contrasena"
              className="font-semibold text-[hsl(var(--primary))] underline-offset-2 hover:underline"
            >
              Solicitar un enlace nuevo
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <ResetPasswordForm token={token} />
    </div>
  )
}
