export default function AdminPostCommentsPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Comentarios del post {params.id}</div>
}

