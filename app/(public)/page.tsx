import { OutboundLink } from '@/components/analytics/outbound-link'
import { BirthdaySection } from '@/components/home/birthday-section'
import { CoupleNumerologySection } from '@/components/home/couple-numerology-section'
import { FeaturedToolsSection } from '@/components/home/featured-tools-section'
import { HeroBannerSlider, type HeroBanner } from '@/components/home/hero-banner-slider'
import { HomeSeoSection } from '@/components/home/home-seo-section'
import { NewsSection } from '@/components/home/news-section'
import { NumerologyMapSection } from '@/components/home/numerology-map-section'
import { StoreHighlightSection } from '@/components/home/store-highlight-section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { listBanners, type Banner } from '@/lib/api/banners'

async function loadActiveBanners(placement: 'home_hero' | 'home_above_store'): Promise<Banner[]> {
  try {
    const { data } = await listBanners({ activeOnly: true, placement })
    return data
  } catch {
    return []
  }
}

function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null
  return items[Math.floor(Math.random() * items.length)] ?? null
}

export default async function HomePage() {
  const [heroBanners, aboveStoreBanners] = await Promise.all([
    loadActiveBanners('home_hero'),
    loadActiveBanners('home_above_store')
  ])

  const heroSlides: HeroBanner[] = heroBanners.map((banner) => ({
    src: banner.image_url,
    href: banner.link_url,
    alt: 'Banner promocional'
  }))

  const aboveStore = pickRandom(aboveStoreBanners)

  return (
    <div className="pb-4">
      <HeroBannerSlider banners={heroSlides} />
      <ScrollReveal className="home-calculator-reveal">
        <NumerologyMapSection />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <CoupleNumerologySection />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <FeaturedToolsSection />
      </ScrollReveal>
      {aboveStore ? (
        <ScrollReveal delay={160}>
          <section className="mx-auto max-w-7xl px-6 py-8">
            {aboveStore.link_url ? (
              <OutboundLink
                href={aboveStore.link_url}
                promotionId={`home_above_store_${aboveStore.id}`}
                promotionName="Banner home arriba de tienda"
                creativeSlot="home_above_store"
                className="relative block aspect-[1920/600] w-full overflow-hidden rounded-[2rem] shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aboveStore.image_url}
                  alt="Banner promocional"
                  className="absolute inset-0 block h-full w-full object-cover object-center"
                />
              </OutboundLink>
            ) : (
              <div className="relative aspect-[1920/600] w-full overflow-hidden rounded-[2rem] shadow-panel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aboveStore.image_url}
                  alt="Banner promocional"
                  className="absolute inset-0 block h-full w-full object-cover object-center"
                />
              </div>
            )}
          </section>
        </ScrollReveal>
      ) : null}
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
