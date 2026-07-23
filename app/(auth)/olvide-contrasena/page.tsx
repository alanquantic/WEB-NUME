import type { Metadata } from 'next'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Recuperar contraseña'
}

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <ForgotPasswordForm />
    </div>
  )
}
