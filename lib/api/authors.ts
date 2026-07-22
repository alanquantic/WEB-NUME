import type { PostAuthor } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

type AuthorDetailResponse = { item: PostAuthor }

export async function getAuthorById(id: string): Promise<PostAuthor> {
  const response = await serverApiFetch<AuthorDetailResponse>(`/authors/${id}`, {
    next: { tags: [`author:${id}`] }
  })
  return response.item
}
