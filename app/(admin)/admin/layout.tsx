import { redirect } from 'next/navigation'

// El panel admin se unificó bajo /perfil (navegación por rol).
// Todo /admin/* queda deprecado y redirige al panel único.
export default function AdminLayout() {
  redirect('/perfil')
}
