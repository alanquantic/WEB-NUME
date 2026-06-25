import type { ReactNode } from 'react'

import type { SidebarWidgetGroup } from '@/components/content/page-sidebar-widget'

export type ContentTemplateConfig = {
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
  content: ReactNode
}

const numerologyTimeGroups: SidebarWidgetGroup[] = [
  {
    id: 'navegacion',
    title: 'Navegación',
    items: [
      { href: '#introduccion', label: 'Introducción' },
      { href: '#como-funciona', label: 'Cómo funciona' },
      { href: '#viaje-del-alma', label: 'Viaje del Alma' },
      { href: '#vibraciones', label: 'Vibraciones de Tiempo' }
    ]
  },
  {
    id: 'relacionadas',
    title: 'Páginas relacionadas',
    items: [
      { href: '/etapapersonal', label: 'Etapa Personal' },
      { href: '/anopersonal', label: 'Año Personal' },
      { href: '/mespersonal', label: 'Mes Personal' },
      { href: '/semanapersonal', label: 'Semana Personal' },
      { href: '/diapersonal', label: 'Día Personal' }
    ]
  }
]

export const CONTENT_PAGE_TEMPLATES: Record<string, ContentTemplateConfig> = {
  labrujulanumerologica: {
    banner: {
      eyebrow: 'Vibraciones de Tiempo',
      title: 'La Brújula Numerológica',
      description:
        'Template base para páginas editoriales con banner superior, sidebar modular y contenido principal editable.',
      imageSrc: '/images/Head-Mes-Personal-750x375.webp'
    },
    sidebar: {
      groups: numerologyTimeGroups,
      note:
        'Este sidebar está pensado como widget reutilizable. Podemos agregar más grupos, enlaces internos, llamadas a la acción o calculadoras relacionadas según cada página.'
    },
    content: (
      <>
        <h2 id="introduccion">Introducción</h2>
        <p>
          Esta plantilla toma como referencia la estructura observada en la página de La Brújula
          Numerológica: un bloque visual fuerte al inicio, navegación lateral persistente y un área
          amplia para desarrollar el contenido.
        </p>

        <h2 id="como-funciona">Cómo funciona</h2>
        <p>
          La idea es que cada página futura solo necesite cambiar tres cosas: la imagen y textos
          del banner, los grupos del sidebar y el contenido central. La estructura visual se
          mantiene consistente para todo el sitio.
        </p>

        <ul>
          <li>El banner funciona como widget y acepta imagen, título, subtítulo y descripción.</li>
          <li>El sidebar funciona como widget y acepta grupos de enlaces o módulos informativos.</li>
          <li>El contenido derecho queda libre para texto, imágenes, tablas, embeds o formularios.</li>
        </ul>

        <h2 id="viaje-del-alma">Viaje del Alma</h2>
        <p>
          En páginas de numerología con enfoque editorial, esta columna principal puede organizarse
          en bloques temáticos, con títulos claros, párrafos amplios y secciones ancla para ayudar
          a la lectura.
        </p>

        <h2 id="vibraciones">Vibraciones de Tiempo</h2>
        <p>
          También podemos reutilizar esta plantilla para Año Personal, Mes Personal, Semana
          Personal, Día Personal y otras páginas relacionadas, manteniendo una misma familia visual
          y cambiando solo el contenido de cada tema.
        </p>
      </>
    )
  }
}
