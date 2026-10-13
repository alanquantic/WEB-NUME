/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  // URLs con barra final, igual que el WordPress original (Next redirige
  // /ruta → /ruta/ y genera los <Link> con barra).
  trailingSlash: true,
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
