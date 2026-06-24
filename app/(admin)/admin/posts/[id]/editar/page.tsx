export default function AdminEditPostPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Editar post {params.id}</div>
}

