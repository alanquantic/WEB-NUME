import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { STORE_URL } from '@/lib/site-config'

export function StoreSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="overflow-hidden rounded-[2rem] p-6 shadow-panel md:p-8">
        <ScrollReveal>
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[1.75rem] transition hover:opacity-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/HORIZONTAL-BANNER-AGENDAS.png"
              alt="Conoce nuestra tienda"
              className="mx-auto w-full object-cover object-center"
            />
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
