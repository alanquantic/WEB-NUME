import type { Metadata } from 'next'

import { SessionBootstrap } from '@/components/auth/session-bootstrap'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { TopBar } from '@/components/layout/top-bar'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Nume',
  description: 'Frontend base para numerologia, contenidos premium y membresias.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionBootstrap />
        <TopBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
