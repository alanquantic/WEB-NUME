import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Cursos'
}

export default function Page() {
  redirect('/directorio?has_next_course=true')
}
