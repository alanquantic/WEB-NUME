import Link from 'next/link'

import { SocialLinks } from '@/components/ui/social-links'

export function SiteFooter() {
  return (
    <footer className="mt-8 bg-foreground text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold">
            <img src="/images/logo_favicon.png" alt="Logo" className="h-9 w-9" />
            <span>
              Numerología
              <span className="block text-xs font-medium text-white/60">cotidiana®</span>
            </span>
          </Link>
          <p className="text-sm font-medium text-white/80">¡Una brújula para guiar tu vida!</p>
          <Link href="/paginas/aviso-de-privacidad" className="text-sm text-white/60 transition hover:text-white">
            Aviso de Privacidad Integral
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-sm font-medium text-white/80">Nuevo León, México</p>
          <SocialLinks
            className="flex gap-3"
            itemClassName="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          />
        </div>
      </div>
    </footer>
  )
}
