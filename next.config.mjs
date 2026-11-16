// Cabeceras de seguridad para todas las rutas. La CSP solo fija lo que no
// rompe scripts de terceros (GA): impide incrustar el sitio en
// iframes ajenos (clickjacking), plugins y cambiar la base de URLs.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'"
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // El alias de producción en vercel.app sirve una copia completa del
      // sitio: que no se indexe (las vistas previas ya salen con noindex).
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }]
      }
    ]
  },
  experimental: {
    typedRoutes: true
  },
  // Banners y portadas viven en el R2 de la tienda. Next los redimensiona al
  // ancho de la pantalla y los entrega en AVIF/WebP (lib/images.ts).
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.tienda.numerologia-cotidiana.com', pathname: '/webnume/**' }
    ],
    // Las URLs del R2 llevan marca de tiempo: nunca cambian de contenido.
    minimumCacheTTL: 2678400
  },
  // URLs con barra final, igual que el WordPress original (Next redirige
  // /ruta → /ruta/ y genera los <Link> con barra).
  trailingSlash: true,
  async redirects() {
    return [
      // Carpeta de subidas del WordPress original.
      { source: '/wp-content/uploads/', destination: '/binomios-generales.pdf', permanent: true },
      // Vista antigua de Año Personal por número: fallaba con error 500 y
      // duplicaba el contenido (de miembros) de /ano-personal-N-para-2026/.
      // Temporal (307): la URL de destino lleva el año y cambiará.
      {
        source: '/ano-personal/:numero(1|3|4|5|6|7|8|9|11)/',
        destination: '/ano-personal-:numero-para-2026/',
        permanent: false
      },
      { source: '/anopersonalnumbers/', destination: '/ano-personal/', permanent: false }
    ]
  },
  async rewrites() {
    // Paginación del blog con la misma forma que el WordPress original.
    return [
      { source: '/blog/page/:page(\\d+)', destination: '/blog?page=:page' },
      // PDFs descargables en la raíz (/archivo.pdf) -> lib/descargas/archivos.ts
      { source: '/:archivo([a-z0-9-]+\\.pdf)', destination: '/descargas/:archivo' }
    ]
  }
}

export default nextConfig
