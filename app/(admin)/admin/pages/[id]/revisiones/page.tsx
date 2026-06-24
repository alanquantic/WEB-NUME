export default function AdminPageRevisionsPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Revisiones de la page {params.id}</div>
}

