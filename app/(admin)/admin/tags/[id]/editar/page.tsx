export default function AdminEditTagPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Editar tag {params.id}</div>
}

