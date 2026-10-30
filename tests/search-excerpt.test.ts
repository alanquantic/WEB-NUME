import { describe, expect, it, vi } from 'vitest'
vi.mock('server-only', () => ({}))
import { searchExcerpt } from '@/lib/search/excerpt'

describe('descripciones de búsqueda', () => {
  it('limpia HTML, separa párrafos y descodifica entidades', () => {
    expect(searchExcerpt('<p>Tu n&uacute;mero &amp; energ&iacute;a.</p><p>Conoce&nbsp;tu destino.</p>'))
      .toBe('Tu número & energía. Conoce tu destino.')
  })
  it('elimina etiquetas de imagen truncadas por el servidor', () => {
    expect(searchExcerpt('<h2>Tu Pináculo</h2><img src="https://cdn.example.com/image/upload/archivo'))
      .toBe('Tu Pináculo')
  })
  it('elimina código, imágenes, enlaces en bruto y shortcodes', () => {
    expect(searchExcerpt('<style>body {color:red}</style><script>alert(1)</script><pre>const x = 1</pre>Tu energía https://cdn.test/foto.webp [gallery ids="3"] ![foto](/foto.png)'))
      .toBe('Tu energía')
  })
  it('limpia HTML escapado y atributos incompletos', () => {
    expect(searchExcerpt('&lt;p&gt;Tu destino&lt;/p&gt;&lt;img src=&quot;https://cdn.test/foto.png&quot;&gt;'))
      .toBe('Tu destino')
    expect(searchExcerpt('Tu destino src="https://cdn.test/foto.png')).toBe('Tu destino')
  })
  it('produce una descripción breve y maneja fragmentos sin texto', () => {
    expect(searchExcerpt('<img src="/foto.png">')).toBe('')
    expect(searchExcerpt(null)).toBe('')
    const text = searchExcerpt('Descubre tu energía personal y conoce tus números. '.repeat(10))
    expect(text.length).toBeLessThanOrEqual(160)
    expect(text.endsWith('…')).toBe(true)
  })
})
