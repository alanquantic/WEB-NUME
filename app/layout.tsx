import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SessionBootstrap } from '@/components/auth/session-bootstrap'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { TopBar } from '@/components/layout/top-bar'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Nume',
  description: 'Frontend base para numerología, contenidos premium y membresías.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
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

