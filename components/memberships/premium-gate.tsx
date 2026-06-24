import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

type PremiumGateProps = {
  title?: string
  detail?: string
  returnTo: string
}

export function PremiumGate({
  title = 'Contenido premium',
  detail = 'Este contenido requiere una membresía activa para verse completo.',
  returnTo
}: PremiumGateProps) {
  const encodedReturnTo = encodeURIComponent(returnTo)

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Card className="bg-[linear-gradient(135deg,#fff7ed,#f2efe7)]">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{detail}</CardDescription>
        <CardContent className="flex flex-wrap gap-3">
          <Link href={`/membresias?next=${encodedReturnTo}`}>
            <Button>Ver planes</Button>
          </Link>
          <Link href={`/login?next=${encodedReturnTo}`}>
            <Button variant="secondary">Iniciar sesión</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

