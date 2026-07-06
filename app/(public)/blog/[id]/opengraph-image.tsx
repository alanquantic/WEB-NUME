import { ImageResponse } from 'next/og'

import { getSamplePost } from '@/lib/blog/sample-posts'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Numerología Cotidiana'

const FONT_URL =
  'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-600-normal.woff'

export default async function Image({ params }: { params: { id: string } }) {
  const post = getSamplePost(params.id)
  const title = post?.title ?? 'Numerología Cotidiana'
  const category = post?.category ?? 'Blog'

  const fontData = await fetch(FONT_URL).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #4A1D95, #AD16B6)',
          color: 'white',
          fontFamily: 'Inter'
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.9 }}>Numerología Cotidiana</div>
        <div style={{ fontSize: 66, lineHeight: 1.1, maxWidth: '900px' }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.85 }}>
          {`${category} · numerologia-cotidiana.com`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: fontData, weight: 600, style: 'normal' }]
    }
  )
}
