import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const manualRedirects = require('./lib/seo/redirects.manual.generated.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  async redirects() {
    // Solo redirects manuales de alto valor viven aquí; los masivos
    // (posts migrados y /tag/*) se resuelven desde el middleware con
    // lookup O(1) para evitar el warning de Next al pasar 1000 custom routes.
    return manualRedirects.redirects
  },
  async rewrites() {
    // Paginación del blog con la misma forma que el WordPress original.
    return [{ source: '/blog/page/:page(\\d+)', destination: '/blog?page=:page' }]
  }
}

export default nextConfig
