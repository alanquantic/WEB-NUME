import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

const FONT_URL =
  'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-600-normal.woff'

const LABELS = [
  'Camino de vida',
  'Número personal',
  'Madurez',
  'Expresión',
  'Alma',
  'Personalidad',
  'Año personal',
  'Mes personal',
  'Día personal'
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = (searchParams.get('name') || 'tu mapa').slice(0, 32)
  const values = (searchParams.get('n') || '').split(',').slice(0, 9)
  const items = LABELS.map((label, index) => ({ label, value: values[index] || '—' }))

  const fontData = await fetch(FONT_URL).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 64px',
          background: 'linear-gradient(135deg, #4A1D95, #AD16B6)',
          color: 'white',
          fontFamily: 'Inter'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, opacity: 0.85 }}>Mi Mapa Numerológico</div>
          <div style={{ fontSize: 56, marginTop: 2 }}>{name}</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30 }}>
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '300px',
                marginBottom: '4px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 78,
                  height: 78,
                  borderRadius: 9999,
                  background: 'rgba(255,255,255,0.16)',
                  fontSize: 36,
                  fontWeight: 600
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: 22, marginTop: 8, opacity: 0.9 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: '18px', fontSize: 22, opacity: 0.85 }}>
          numerologia-cotidiana.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Inter', data: fontData, weight: 600, style: 'normal' }]
    }
  )
}
