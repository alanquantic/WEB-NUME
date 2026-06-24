import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function StoreSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="overflow-hidden rounded-[2rem]  p-6 shadow-panel md:p-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-[1.75rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/HORIZONTAL-BANNER-AGENDAS.png"
              alt="Conoce nuestra tienda"
              className="mx-auto w-full object-cover object-center"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
