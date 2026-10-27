import Image from 'next/image'

import { OutboundLink } from '@/components/analytics/outbound-link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import agendaBanner from '@/public/images/slider/agenda-2027.webp'

const AGENDA_2027_URL = 'https://tienda.numerologia-cotidiana.com/productos/agenda-numerologica-2027'
const AGENDA_2027_ALT =
  'Agenda Numerológica 2027 física en preventa a $890 más gastos de envío, del 10 al 31 de octubre'

export function StoreSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="overflow-hidden rounded-[2rem] p-6 shadow-panel md:p-8">
        <ScrollReveal>
          <OutboundLink
            href={AGENDA_2027_URL}
            aria-label={`${AGENDA_2027_ALT} (abre la tienda en una pestaña nueva)`}
            promotionId="home_agenda_2027_banner"
            promotionName={AGENDA_2027_ALT}
            creativeSlot="home_store_banner"
            className="block overflow-hidden rounded-[1.75rem] transition hover:opacity-95"
          >
            <Image
              src={agendaBanner}
              alt={AGENDA_2027_ALT}
              sizes="(min-width: 1280px) 1168px, 100vw"
              className="mx-auto h-auto w-full"
            />
          </OutboundLink>
        </ScrollReveal>
      </div>
    </section>
  )
}
