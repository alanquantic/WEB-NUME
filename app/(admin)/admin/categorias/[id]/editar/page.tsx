export default function AdminEditCategoryPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Editar categoría {params.id}</div>
}

