import type { ReactNode } from 'react'

import { PageBannerWidget } from '@/components/content/page-banner-widget'
import {
  PageSidebarWidget,
  type SidebarWidgetGroup
} from '@/components/content/page-sidebar-widget'

type ContentPageTemplateProps = {
  banner: {
    eyebrow?: string
    title: string
    description?: string
    imageSrc: string
  }
  sidebar: {
    groups: SidebarWidgetGroup[]
    note?: string
  }
  children: ReactNode
}

export function ContentPageTemplate({
  banner,
  sidebar,
  children
}: ContentPageTemplateProps) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <PageBannerWidget
        eyebrow={banner.eyebrow}
        title={banner.title}
        description={banner.description}
        imageSrc={banner.imageSrc}
      />

      <div className="grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start">
        <div className="lg:sticky lg:top-[11.5rem]">
          <PageSidebarWidget groups={sidebar.groups} note={sidebar.note} />
        </div>

        <article className="rounded-[2rem] border border-border/80 bg-card/94 p-6 shadow-panel sm:p-8">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[hsl(var(--foreground))] prose-p:text-[hsl(var(--foreground))/0.8] prose-li:text-[hsl(var(--foreground))/0.8]">
            {children}
          </div>
        </article>
      </div>
    </section>
  )
}
