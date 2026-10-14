import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/descargas/archivos', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/descargas/archivos')>()
  original.DESCARGAS['guia-prueba'] = {
    publicId: 'nume-media/descargas/guia-prueba',
    nombreArchivo: 'guia-prueba'
  }
  return original
})

const { GET } = await import('@/app/descargas/[archivo]/route')

function get(archivo: string) {
  return GET(new Request(`http://localhost/descargas/${archivo}`), { params: { archivo } })
}

describe('GET /descargas/[archivo]', () => {
  it('redirige (302, sin caché) al PDF vigente en Cloudinary sin versión', () => {
    const response = get('guia-prueba.pdf')

    expect(response.status).toBe(302)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.get('Location')).toBe(
      'https://res.cloudinary.com/du66hxu3k/image/upload/fl_attachment:guia-prueba/nume-media/descargas/guia-prueba.pdf'
    )
  })

  it('responde 404 para slugs desconocidos o sin .pdf', () => {
    expect(get('no-existe.pdf').status).toBe(404)
    expect(get('guia-prueba').status).toBe(404)
    expect(get('constructor.pdf').status).toBe(404)
  })
})
