import type { Metadata } from 'next'

import { ConsentBanner } from '@/components/analytics/consent-banner'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { RouteTracker } from '@/components/analytics/route-tracker'
import { SessionBootstrap } from '@/components/auth/session-bootstrap'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { TopBar } from '@/components/layout/top-bar'
import { PromoProductToast } from '@/components/promo/promo-product-toast'
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
  // './' se resuelve contra la ruta de cada página: todas quedan con canonical
  // y og:url propios (con www y barra final) sin declararlo una por una. Las
  // páginas que definen su propio `alternates` u `openGraph` lo sustituyen.
  alternates: { canonical: './' },
  // Sin título ni descripción aquí: Next los hereda del <title> y la
  // descripción de cada página. Fijarlos en el layout hacía que todo el sitio
  // se compartiera (y se leyera) con los datos de la portada.
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Numerología Cotidiana',
    url: './'
  },
  twitter: {
    card: 'summary_large_image'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`
          }}
        />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SessionBootstrap />
        <RouteTracker />
        <TopBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <PromoProductToast />
        <ConsentBanner />
      </body>
    </html>
  )
}
