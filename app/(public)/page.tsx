import { OutboundLink } from '@/components/analytics/outbound-link'
import { BirthdaySection } from '@/components/home/birthday-section'
import { CoupleNumerologySection } from '@/components/home/couple-numerology-section'
import { FeaturedToolsSection } from '@/components/home/featured-tools-section'
import { HeroBannerSlider } from '@/components/home/hero-banner-slider'
import { HomeSeoSection } from '@/components/home/home-seo-section'
import { NewsSection } from '@/components/home/news-section'
import { NumerologyMapSection } from '@/components/home/numerology-map-section'
import { StoreHighlightSection } from '@/components/home/store-highlight-section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export default function HomePage() {
  return (
    <div className="pb-4">
      <HeroBannerSlider />
      <ScrollReveal className="home-calculator-reveal">
        <NumerologyMapSection />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <CoupleNumerologySection />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <FeaturedToolsSection />
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <section className="mx-auto max-w-7xl px-6 py-8">
          <OutboundLink
            href="https://tienda.numerologia-cotidiana.com/productos/agenda-numerologica-2027"
            promotionId="home_agenda_2027_banner"
            promotionName="Agenda Numerológica 2027"
            creativeSlot="home_above_store"
            className="block overflow-hidden rounded-[2rem] shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.tienda.numerologia-cotidiana.com/webnume/nume-media/422041df-58e6-4b5d-8cc8-0a47d0fcc7f8/4-1793817719.png"
              alt="Agenda Numerológica 2027"
              className="block h-auto w-full"
            />
          </OutboundLink>
        </section>
      </ScrollReveal>
      <ScrollReveal delay={180}>
        <StoreHighlightSection />
      </ScrollReveal>
      <ScrollReveal delay={180}>
        <NewsSection />
      </ScrollReveal>
      <BirthdaySection />
      <ScrollReveal delay={220}>
        <HomeSeoSection />
      </ScrollReveal>
    </div>
  )
}
