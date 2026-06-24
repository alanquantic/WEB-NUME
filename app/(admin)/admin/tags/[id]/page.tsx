export default function AdminTagDetailPage({ params }: { params: { id: string } }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-panel">Tag {params.id}</div>
}

