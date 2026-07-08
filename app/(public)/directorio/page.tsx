import { ConsultantsDirectoryPage } from '@/components/directory/consultants-directory-page'

export default function DirectoryPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return (
    <ConsultantsDirectoryPage
      pathname="/directorio"
      title="Directorio de consultores"
      description="Explora el directorio público completo de consultores certificados con resultados vivos desde la API."
      searchParams={searchParams}
      hrefBase="/directorio"
    />
  )
}
