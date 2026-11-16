import type { Metadata } from 'next'

// Inicio de sesión, registro y recuperación de contraseña no aportan nada en
// buscadores y generaban decenas de URLs duplicadas (?next=…) en Search Console.
export const metadata: Metadata = {
  robots: { index: false, follow: true }
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
