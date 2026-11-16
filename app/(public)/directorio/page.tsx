import type { Metadata } from 'next'

import { ConsultantsDirectoryPage } from '@/components/directory/consultants-directory-page'

export const metadata: Metadata = {
  title: 'Directorio de consultores',
  description:
    'Encuentra consultores e instructores certificados en Numerología Cotidiana para tu consulta personal o tu próximo curso.'
}

export default function DirectoryPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return (
    <ConsultantsDirectoryPage
      pathname="/directorio"
      title="Directorio de consultores"
      description="Encuentra consultores e instructores certificados en Numerología Cotidiana para tu consulta personal o tu próximo curso."
      searchParams={searchParams}
      hrefBase="/directorio"
    />
  )
}
