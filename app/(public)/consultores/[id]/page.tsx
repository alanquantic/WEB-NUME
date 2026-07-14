import { ConsultantDetailPage } from '@/components/directory/consultant-detail-page'

export default async function ConsultantProfilePage({ params }: { params: { id: string } }) {
  return <ConsultantDetailPage id={params.id} backHref="/consultores" />
}
