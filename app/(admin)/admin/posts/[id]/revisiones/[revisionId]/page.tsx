export default function AdminPostRevisionDetailPage({
  params
}: {
  params: { id: string; revisionId: string }
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-panel">
      Revisión {params.revisionId} del post {params.id}
    </div>
  )
}

