export default function AdminPageDetailPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Page {params.id}</div>
}

