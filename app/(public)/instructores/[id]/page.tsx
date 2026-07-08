import { ConsultantDetailPage } from '@/components/directory/consultant-detail-page'

export default async function InstructorProfilePage({ params }: { params: { id: string } }) {
  return <ConsultantDetailPage id={params.id} backHref="/instructores" />
}
