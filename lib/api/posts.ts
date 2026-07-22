import type {
  ApiDetailResponse,
  ApiListResponse,
  CommentItem,
  ContentDetailResponse,
  ContentItem,
  CreateCommentInput,
  PostStatus
} from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'
import { serverApiFetch } from '@/lib/api/server'

export type GetPostsParams = {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  tag_id?: number
  author_id?: string
  status?: PostStatus
}

function toQueryString(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.set(key, String(value))
    }
  })

  return query.toString()
}

export async function getPosts(params: GetPostsParams = {}) {
  const query = toQueryString(params)
  // Listado público: cacheable, revalida cada 60 s. Invalidable vía tag `posts`.
  return serverApiFetch<ApiListResponse<ContentItem>>(`/posts${query ? `?${query}` : ''}`, {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['posts'] }
  })
}

export async function getPostById(id: string) {
  // La API devuelve el detalle envuelto en `{ item }`; lo desanidamos.
  const response = await serverApiFetch<ContentDetailResponse>(`/posts/${id}`, {
    next: { tags: [`post:${id}`] }
  })
  return response.item
}

export async function getPostComments(id: string, page = 1, limit = 10) {
  return serverApiFetch<ApiListResponse<CommentItem>>(
    `/posts/${id}/comments?page=${page}&limit=${limit}`,
    {
      next: { tags: [`post-comments:${id}`] }
    }
  )
}

export async function createPostComment(postId: string, payload: CreateCommentInput) {
  return clientApiFetch<ApiDetailResponse<CommentItem>>(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

