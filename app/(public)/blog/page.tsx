import Link from 'next/link'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getPosts } from '@/lib/api/posts'

export default async function BlogPage() {
  const posts = await getPosts({ page: 1, limit: 12 })

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Blog</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.data.map((post) => (
          <Card key={post.id}>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.slug}</CardDescription>
            <CardContent>
              <Link href={`/blog/${post.id}`} className="text-sm font-semibold text-[hsl(var(--primary))]">
                Abrir detalle
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

