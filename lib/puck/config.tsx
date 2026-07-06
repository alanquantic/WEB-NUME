import type { Config, Data } from '@puckeditor/core'

// ── Tipos de props por bloque ──────────────────────────────────────────────
type HeadingProps = { text: string; level: '2' | '3' }
type TextProps = { text: string }
type ImageProps = { src: string; alt: string }
type ListProps = { items: Array<{ text: string }> }
type QuoteProps = { text: string }
type ButtonProps = { label: string; href: string }

// Clases Tailwind compartidas entre el canvas del editor y el HTML público,
// para que se vea igual en ambos lados.
const cls = {
  h2: 'font-display text-3xl font-semibold mt-6 mb-3',
  h3: 'font-display text-2xl font-semibold mt-5 mb-2',
  p: 'my-3 leading-8 whitespace-pre-wrap',
  img: 'my-4 max-w-full rounded-2xl',
  ul: 'my-3 ml-6 list-disc space-y-1',
  quote: 'my-4 border-l-4 border-[hsl(var(--primary))/0.4] pl-4 italic text-[hsl(var(--foreground))/0.75]',
  hr: 'my-6 border-[hsl(var(--border))]',
  btn: 'inline-flex items-center rounded-full bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-white no-underline'
}

// ── Configuración del editor (canvas) ───────────────────────────────────────
export const puckConfig: Config = {
  // Sin campos en la raíz: el título/slug se gestionan fuera del canvas, así
  // el panel derecho no muestra un campo "title" redundante.
  root: {
    fields: {},
    render: ({ children }: Record<string, any>) => <>{children}</>
  },
  // Agrupa los bloques del panel izquierdo para una navegación más clara.
  categories: {
    texto: { title: 'Texto', components: ['Titulo', 'Parrafo', 'Cita', 'Lista'] },
    medios: { title: 'Medios', components: ['Imagen'] },
    elementos: { title: 'Elementos', components: ['Separador', 'Boton'] }
  },
  components: {
    Titulo: {
      label: 'Título',
      fields: {
        text: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H2', value: '2' },
            { label: 'H3', value: '3' }
          ]
        }
      },
      defaultProps: { text: 'Nuevo título', level: '2' },
      render: ({ text, level }: Record<string, any>) =>
        level === '3' ? <h3 className={cls.h3}>{text}</h3> : <h2 className={cls.h2}>{text}</h2>
    },
    Parrafo: {
      label: 'Párrafo',
      fields: { text: { type: 'textarea' } },
      defaultProps: { text: 'Escribe aquí…' },
      render: ({ text }: Record<string, any>) => <p className={cls.p}>{text}</p>
    },
    Imagen: {
      label: 'Imagen',
      fields: { src: { type: 'text' }, alt: { type: 'text' } },
      defaultProps: { src: '', alt: '' },
      render: ({ src, alt }: Record<string, any>) =>
        src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className={cls.img} />
        ) : (
          <div className="my-4 rounded-2xl border border-dashed border-[hsl(var(--border))] p-6 text-center text-sm text-[hsl(var(--foreground))/0.5]">
            Define la URL de la imagen
          </div>
        )
    },
    Lista: {
      label: 'Lista',
      fields: {
        items: {
          type: 'array',
          arrayFields: { text: { type: 'text' } },
          defaultItemProps: { text: 'Elemento' },
          getItemSummary: (item: { text: string }) => item.text || 'Elemento'
        }
      },
      defaultProps: { items: [{ text: 'Elemento' }] },
      render: ({ items }: Record<string, any>) => (
        <ul className={cls.ul}>
          {((items ?? []) as Array<{ text: string }>).map((item, index: number) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      )
    },
    Cita: {
      label: 'Cita',
      fields: { text: { type: 'textarea' } },
      defaultProps: { text: 'Cita destacada' },
      render: ({ text }: Record<string, any>) => <blockquote className={cls.quote}>{text}</blockquote>
    },
    Separador: {
      label: 'Separador',
      fields: {},
      render: () => <hr className={cls.hr} />
    },
    Boton: {
      label: 'Botón',
      fields: { label: { type: 'text' }, href: { type: 'text' } },
      defaultProps: { label: 'Ver más', href: '#' },
      render: ({ label, href }: Record<string, any>) => (
        <a href={href} className={cls.btn}>
          {label}
        </a>
      )
    }
  }
}

// ── Utilidades de datos ─────────────────────────────────────────────────────
export const emptyPuckData: Data = { content: [], root: {} } as Data

// Detecta si un JSON tiene forma de datos de Puck (para editar contenido previo).
export function isPuckData(value: unknown): value is Data {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray((value as { content?: unknown }).content)
  )
}

// ── Serializador determinista a HTML (para content_html) ────────────────────
// Escapamos todo el texto del usuario: el HTML resultante es seguro por
// construcción (defensa en profundidad junto con la sanitización al render).
function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Solo permitimos http/https/mailto en enlaces e imágenes (bloquea javascript:).
function safeUrl(value: string): string {
  const url = String(value ?? '').trim()
  return /^(https?:|mailto:|\/)/i.test(url) ? escapeHtml(url) : '#'
}

function blockToHtml(item: { type: string; props?: Record<string, unknown> }): string {
  const p = item.props ?? {}
  switch (item.type) {
    case 'Titulo': {
      const level = p.level === '3' ? '3' : '2'
      const klass = level === '3' ? cls.h3 : cls.h2
      return `<h${level} class="${klass}">${escapeHtml(String(p.text ?? ''))}</h${level}>`
    }
    case 'Parrafo':
      return `<p class="${cls.p}">${escapeHtml(String(p.text ?? ''))}</p>`
    case 'Imagen': {
      const src = String(p.src ?? '').trim()
      if (!src) return ''
      return `<img src="${safeUrl(src)}" alt="${escapeHtml(String(p.alt ?? ''))}" class="${cls.img}" />`
    }
    case 'Lista': {
      const items = Array.isArray(p.items) ? (p.items as Array<{ text?: string }>) : []
      const lis = items.map((i) => `<li>${escapeHtml(String(i.text ?? ''))}</li>`).join('')
      return `<ul class="${cls.ul}">${lis}</ul>`
    }
    case 'Cita':
      return `<blockquote class="${cls.quote}">${escapeHtml(String(p.text ?? ''))}</blockquote>`
    case 'Separador':
      return `<hr class="${cls.hr}" />`
    case 'Boton':
      return `<a href="${safeUrl(String(p.href ?? '#'))}" class="${cls.btn}">${escapeHtml(
        String(p.label ?? '')
      )}</a>`
    default:
      return ''
  }
}

export function renderPuckDataToHtml(data: Data): string {
  const content = Array.isArray(data?.content) ? data.content : []
  return content.map((item) => blockToHtml(item as { type: string; props?: Record<string, unknown> })).join('\n')
}
