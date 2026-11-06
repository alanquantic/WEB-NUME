import { Award, FileText, GraduationCap, NotebookText, type LucideIcon } from 'lucide-react'

import { OutboundLink } from '@/components/analytics/outbound-link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { STORE_URL } from '@/lib/site-config'

type StoreCategory = {
  id: string
  title: string
  description: string
  Icon: LucideIcon
  cardClass: string
  titleClass: string
  descriptionClass: string
  iconBoxClass: string
  ctaClass: string
}

const STORE_CATEGORIES: readonly StoreCategory[] = [
  {
    id: 'agendas',
    title: 'Agendas',
    description: 'Agenda numerológica para planear tu año con propósito.',
    Icon: NotebookText,
    cardClass:
      "border border-[#b89a5a]/25 bg-[url('/images/store-card-agendas.svg')] bg-cover bg-center text-[#4b2976]",
    titleClass: 'text-[#4b2976] group-hover:text-[#2e1a4f]',
    descriptionClass: 'text-[#4b2976]/80',
    iconBoxClass: 'bg-white/70 text-[#4b2976]',
    ctaClass: 'text-[#4b2976]'
  },
  {
    id: 'reportes',
    title: 'Reportes',
    description: 'Reportes personalizados: pareja, nombre y proyección.',
    Icon: FileText,
    cardClass:
      "border border-[#d4b26b]/35 bg-[url('/images/store-card-reportes.svg')] bg-cover bg-center text-white",
    titleClass: 'text-white',
    descriptionClass: 'text-white/80',
    iconBoxClass: 'bg-white/10 text-[#e5c58a]',
    ctaClass: 'text-[#e5c58a]'
  },
  {
    id: 'cursos',
    title: 'Cursos',
    description: 'Aprende numerología paso a paso, a tu ritmo.',
    Icon: GraduationCap,
    cardClass:
      "border border-[#d4b26b]/35 bg-[url('/images/store-card-cursos.svg')] bg-cover bg-center text-white",
    titleClass: 'text-white',
    descriptionClass: 'text-white/80',
    iconBoxClass: 'bg-white/10 text-[#e5c58a]',
    ctaClass: 'text-[#e5c58a]'
  },
  {
    id: 'certificaciones',
    title: 'Certificaciones',
    description: 'Conviértete en Consultor Numerológico certificado.',
    Icon: Award,
    cardClass:
      "border border-[#d4b26b]/35 bg-[url('/images/store-card-certificaciones.svg')] bg-cover bg-center text-white",
    titleClass: 'text-white',
    descriptionClass: 'text-white/80',
    iconBoxClass: 'bg-white/10 text-[#e5c58a]',
    ctaClass: 'text-[#e5c58a]'
  }
]

export function StoreHighlightSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel md:p-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                Tienda
              </h2>
              <p className="mt-1 text-sm text-foreground/70">
                Agendas, reportes, cursos y certificaciones.
              </p>
            </div>
            <OutboundLink
              href={STORE_URL}
              promotionId="home_store_cta"
              promotionName="Ver toda la tienda"
              creativeSlot="home_store_highlight_cta"
              className="header-chip rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <span className="relative z-10">Ver toda la tienda</span>
            </OutboundLink>
          </div>
        </ScrollReveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORE_CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.id} delay={80 + index * 70}>
              <OutboundLink
                href={STORE_URL}
                promotionId={`home_store_category_${category.id}`}
                promotionName={category.title}
                creativeSlot="home_store_categories"
                className={`group flex h-full min-h-[14rem] flex-col rounded-[1.6rem] p-5 transition hover:-translate-y-1 hover:shadow-glow ${category.cardClass}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-sm transition duration-200 ${category.iconBoxClass}`}
                >
                  <category.Icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className={`mt-4 font-display text-lg font-semibold ${category.titleClass}`}>
                  {category.title}
                </h3>
                <p className={`mt-2 flex-1 text-sm leading-6 ${category.descriptionClass}`}>
                  {category.description}
                </p>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${category.ctaClass}`}>
                  Explorar →
                </span>
              </OutboundLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
