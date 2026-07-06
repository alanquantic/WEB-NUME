import { BirthdaySection } from '@/components/home/birthday-section'
import { CoupleNumerologySection } from '@/components/home/couple-numerology-section'
import { FeaturedToolsSection } from '@/components/home/featured-tools-section'
import { HomeSeoSection } from '@/components/home/home-seo-section'
import { NewsSection } from '@/components/home/news-section'
import { NumerologyMapSection } from '@/components/home/numerology-map-section'
import { StoreHighlightSection } from '@/components/home/store-highlight-section'
import { StoreSection } from '@/components/home/store-section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export default function HomePage() {
  return (
    <div className="pb-4">
      <ScrollReveal>
        <NumerologyMapSection />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <CoupleNumerologySection />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <FeaturedToolsSection />
      </ScrollReveal>
      <ScrollReveal delay={140}>
        <StoreSection />
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <StoreHighlightSection />
      </ScrollReveal>
      <ScrollReveal delay={180}>
        <NewsSection />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <BirthdaySection />
      </ScrollReveal>
      <ScrollReveal delay={220}>
        <HomeSeoSection />
      </ScrollReveal>
    </div>
  )
}
