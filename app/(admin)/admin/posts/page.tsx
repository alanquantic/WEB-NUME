export default function AdminPostsPage() {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-panel">
      <h1 className="font-display text-3xl font-semibold">Posts</h1>
      <p className="mt-3 text-[hsl(var(--foreground))/0.72]">
        Administra `draft`, `published`, `scheduled` y `archived` con `/posts`.
      </p>
    </div>
  )
}

