// Cabeceras de seguridad para todas las rutas. La CSP solo fija lo que no
// rompe scripts de terceros (GA, Cloudinary): impide incrustar el sitio en
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
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  experimental: {
    typedRoutes: true
  },
  // URLs con barra final, igual que el WordPress original (Next redirige
  // /ruta → /ruta/ y genera los <Link> con barra).
  trailingSlash: true,
  async rewrites() {
    // Paginación del blog con la misma forma que el WordPress original.
    return [{ source: '/blog/page/:page(\\d+)', destination: '/blog?page=:page' }]
  }
}

export default nextConfig
