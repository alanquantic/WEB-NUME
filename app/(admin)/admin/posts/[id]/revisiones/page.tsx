export default function AdminPostRevisionsPage({ params }: { params: { id: string } }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-panel">
      Revisiones del post {params.id}
    </div>
  )
}

