export default function AdminCategoryDetailPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Categoría {params.id}</div>
}

