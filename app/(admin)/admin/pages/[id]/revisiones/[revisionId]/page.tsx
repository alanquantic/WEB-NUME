export default function AdminPageRevisionDetailPage({
  params
}: {
  params: { id: string; revisionId: string }
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-panel">
      Revisión {params.revisionId} de la page {params.id}
    </div>
  )
}

