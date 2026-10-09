import Image from 'next/image'

import { OutboundLink } from '@/components/analytics/outbound-link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { STORE_URL } from '@/lib/site-config'
import storeBanner from '@/public/images/main-banner/conoce-nuestra-tienda.png'

export function StoreSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="overflow-hidden rounded-[2rem] p-6 shadow-panel md:p-8">
        <ScrollReveal>
          <OutboundLink
            href={STORE_URL}
            promotionId="home_store_banner"
            promotionName="Conoce nuestra tienda"
            creativeSlot="home_store_banner"
            className="block overflow-hidden rounded-[1.75rem] transition hover:opacity-95"
          >
            <Image
              src={storeBanner}
              alt="Conoce nuestra tienda: agendas, membresías, software de numerología, reportes numerológicos, cursos online y grabados. Compras seguras en línea."
              sizes="(min-width: 1280px) 1168px, 100vw"
              className="mx-auto h-auto w-full"
            />
          </OutboundLink>
        </ScrollReveal>
      </div>
    </section>
  )
}
