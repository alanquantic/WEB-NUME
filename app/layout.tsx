import type { Metadata } from 'next'

import { SessionBootstrap } from '@/components/auth/session-bootstrap'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { TopBar } from '@/components/layout/top-bar'
import { JsonLd } from '@/components/seo/json-ld'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.numerologia-cotidiana.com'),
  title: {
    default: 'Numerología Cotidiana — Una brújula para guiar tu vida',
    template: '%s | Numerología Cotidiana'
  },
  description:
    'Descubre tu mapa numerológico, tu pináculo personal y las energías del día con Numerología Cotidiana de Laura L. Rodríguez.',
  applicationName: 'Numerología Cotidiana',
  keywords: [
    'numerología',
    'numerología cotidiana',
    'pináculo',
    'camino de vida',
    'año personal',
    'Laura Rodríguez'
  ],
  authors: [{ name: 'Laura L. Rodríguez' }],
  icons: {
    icon: '/images/logo_favicon.png',
    shortcut: '/images/logo_favicon.png',
    apple: '/images/logo_favicon.png'
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Numerología Cotidiana',
    title: 'Numerología Cotidiana — Una brújula para guiar tu vida',
    description:
      'Tu mapa numerológico, tu pináculo personal y las energías diarias en un solo lugar.',
    url: 'https://www.numerologia-cotidiana.com'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Numerología Cotidiana',
    description: 'Tu mapa numerológico, tu pináculo personal y las energías diarias.'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SessionBootstrap />
        <TopBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
