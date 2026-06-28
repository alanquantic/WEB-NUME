import { BirthdaySection } from '@/components/home/birthday-section'
import { NewsSection } from '@/components/home/news-section'
import { NumerologyMapSection } from '@/components/home/numerology-map-section'
import { SchoolSection } from '@/components/home/school-section'
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
        <SchoolSection />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <StoreSection />
      </ScrollReveal>
      <ScrollReveal delay={140}>
        <StoreHighlightSection />
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <NewsSection />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <BirthdaySection />
      </ScrollReveal>
    </div>
  )
}
