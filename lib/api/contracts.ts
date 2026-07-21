export type Role = 'admin' | 'subscriber' | 'reader'

export type MembershipTier = 'none' | 'membresia_180' | 'membresia_365'

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending'

export type ContentType = 'post' | 'page'

export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived'

export type ConsultantCategory =
  | 'Numerólogo Master'
  | 'Consultores'
  | 'Consultores Practicantes'
  | 'Instructores'

export type PaymentProvider = 'stripe' | 'paypal' | 'mercadopago' | 'manual'

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded'

export type PaymentStatus =
  | 'pending'
  | 'requires_action'
  | 'authorized'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded'

export type ConsultantTier = { slug: string; label: string }

export type ConsultantProfile = {
  description: string | null
  specialization: string | null
  public_email: string | null
  phone: string | null
  city: string | null
  photo: string | null
  languages: string | null
  website: string | null
  facebook: string | null
  instagram: string | null
  tiers: ConsultantTier[]
}

export type UserProfileMeta = {
  first_name?: string
  last_name?: string
  nickname?: string
  display_name?: string
  bio?: string
}

export type SafeUser = {
  id: string
  email: string
  role: Role
  is_consultant: boolean
  consultant_category: ConsultantCategory | null
  nationality: string | null
  next_course: string | null
  profile_picture_url: string | null
  current_membership: MembershipTier
  membership_expires_at: string | null
  has_active_membership: boolean
  metadata?: Record<string, unknown>
  consultant_profile?: ConsultantProfile | null
  created_at: string
  updated_at: string
}

export type AuthSession = {
  access_token: string
  refresh_token: string
  token_type: 'Bearer'
  user: SafeUser
}

export type Pagination = {
  page: number
  limit: number
  total: number
}

export type Category = {
  type: 'category'
  id: number
  name: string
  slug: string
}

export type Tag = {
  type: 'tag'
  id: number
  name: string
  slug: string
}

export type ConsultantDirectoryItem = {
  id: string
  name: string | null
  consultant_category: ConsultantCategory | null
  tiers: ConsultantTier[]
  nationality: string | null
  city: string | null
  next_course: string | null
  photo: string | null
  description: string | null
  specialization: string | null
  languages: string | null
  contact: { email: string | null; phone: string | null; website: string | null }
  socials: { facebook: string | null; instagram: string | null }
  created_at: string
}

export type ContentAuthor = {
  id: string
  email: string
  profile_picture_url: string | null
}

export type ContentItem = {
  id: string
  type: ContentType
  status: PostStatus
  title: string
  slug: string
  featured_image_url: string | null
  content_json: unknown | null
  content_html: string | null
  requires_membership: boolean
  comment_count: number
  published_at: string | null
  created_at: string
  updated_at: string
  category: Category | null
  tags: Tag[]
  author: ContentAuthor | null
}

// Admin content shapes — reflejan la respuesta REAL de la API para posts/pages.
// La lista (`GET /posts`) devuelve category_id + tag_ids (no anidados) y el
// detalle (`GET /posts/:id`) llega envuelto en `{ item }` con content_json/html.
export type AdminContentListItem = {
  id: string
  type: ContentType
  title: string
  slug: string
  featured_image_url: string | null
  content_html: string | null
  category_id: number | null
  tag_ids: number[]
  status: PostStatus
  requires_membership: boolean
  comment_count: number
  published_at: string | null
  created_at: string
  updated_at: string
}

export type AdminContentDetail = {
  id: string
  author_id: string | null
  last_editor_id: string | null
  category_id: number | null
  category?: Category | null
  author?: PostAuthor | null
  tag_ids: number[]
  title: string
  slug: string
  featured_image_url: string | null
  content_json: unknown | null
  content_html: string | null
  type: ContentType
  status: PostStatus
  requires_membership: boolean
  comment_count: number
  published_at: string | null
  created_at: string
  updated_at: string
}

export type PostAuthor = {
  id: string
  email: string
  profile_picture_url: string | null
  name: string
  bio: string | null
}

export type ContentDetailResponse = {
  item: AdminContentDetail
}

// Payload aceptado por `POST`/`PATCH` de /posts y /pages (ver content.schemas.ts).
export type ContentMutationInput = {
  title?: string
  slug?: string
  featured_image_url?: string | null
  content_json?: unknown | null
  content_html?: string | null
  category_id?: number | null
  tag_ids?: number[]
  status?: PostStatus
  requires_membership?: boolean
  published_at?: string | null
}

export type MediaImageItem = {
  id: string
  public_id: string
  url: string
  width: number | null
  height: number | null
  bytes: number | null
  format: string | null
  original_filename: string | null
  created_at: string | null
}

export type MediaLibraryResponse = {
  items: MediaImageItem[]
  next_cursor: string | null
  folder: string
}

export type MediaUploadSignatureResponse = {
  api_key: string
  cloud_name: string
  folder: string
  public_id: string
  signature: string
  tags: string
  timestamp: number
  upload_url: string
}

export type CommentItem = {
  id: string
  post_id: string
  user: ContentAuthor | null
  content: string
  parent_id: string | null
  created_at: string
}

export type RevisionItem = {
  id: string
  post_id: string
  editor_id: string | null
  content_json: unknown
  created_at: string
}

export type MembershipPlan = {
  id: string
  code: string
  name: string
  description: string | null
  tier: MembershipTier
  billing_interval_days: number
  price: string
  currency: string
  is_active: boolean
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type Subscription = {
  id: string
  user_id: string
  plan_id: string | null
  tier: MembershipTier
  amount: string
  starts_at: string
  ends_at: string
  status: SubscriptionStatus
  provider: PaymentProvider | null
  payment_id: string | null
  external_subscription_id: string | null
  external_customer_id: string | null
  auto_renew: boolean
  cancelled_at: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  plan_id: string | null
  sku: string | null
  name: string
  description: string | null
  quantity: number
  unit_amount: string
  total_amount: string
  metadata: Record<string, unknown>
  created_at: string
}

export type Order = {
  id: string
  user_id: string | null
  subscription_id: string | null
  plan_id: string | null
  status: OrderStatus
  provider: PaymentProvider
  currency: string
  subtotal_amount: string
  tax_amount: string
  discount_amount: string
  total_amount: string
  customer_email: string
  external_checkout_id: string | null
  external_order_id: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
  paid_at: string | null
  cancelled_at: string | null
  items?: OrderItem[]
}

export type ApiListResponse<T> = {
  data: T[]
  pagination: Pagination
}

export type ApiDetailResponse<T> = {
  data: T
}

export type ProblemDetails = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  request_id: string | null
  timestamp: string
}

export type RegisterInput = {
  email: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type RefreshInput = {
  refresh_token: string
}

export type ConsultantProfileInput = {
  description?: string | null
  specialization?: string | null
  public_email?: string | null
  phone?: string | null
  city?: string | null
  photo?: string | null
  languages?: string | null
  website?: string | null
  facebook?: string | null
  instagram?: string | null
  tiers?: string[]
}

export type UpdateUserInput = {
  email?: string
  nationality?: string | null
  next_course?: string | null
  profile_picture_url?: string | null
  metadata?: Record<string, unknown>
  is_consultant?: boolean
  consultant_category?: ConsultantCategory | null
  consultant_profile?: ConsultantProfileInput | null
  current_membership?: MembershipTier
  membership_expires_at?: string | null
  role?: Role
}

// Catálogo de tiers de consultor (slug -> etiqueta legible).
export const CONSULTANT_TIERS: ConsultantTier[] = [
  { slug: 'master', label: 'Numerólogo Master' },
  { slug: 'mentor', label: 'Mentor' },
  { slug: 'consultor_certificado', label: 'Consultor Certificado' },
  { slug: 'consultor_practicante_1', label: 'Consultor Practicante 1' },
  { slug: 'consultor_practicante_2', label: 'Consultor Practicante 2' },
  { slug: 'consultor_practicante_3', label: 'Consultor Practicante 3' },
  { slug: 'consultor_practicante_4', label: 'Consultor Practicante 4' },
  { slug: 'consultor_practicante_5', label: 'Consultor Practicante 5' },
  { slug: 'instructor_certificado', label: 'Instructor Certificado' },
  { slug: 'instructor_1', label: 'Instructor 1' },
  { slug: 'instructor_2', label: 'Instructor 2' },
  { slug: 'instructor_3', label: 'Instructor 3' },
  { slug: 'instructor_4', label: 'Instructor 4' },
  { slug: 'instructor_5', label: 'Instructor 5' }
]

export type UpsertTaxonomyInput = {
  name: string
  slug: string
}

export type CreateOrUpdateContentInput = {
  title?: string
  slug?: string
  featured_image_url?: string | null
  content_json?: unknown | null
  content_html?: string | null
  category_id?: number | null
  tag_ids?: number[]
  status?: PostStatus
  requires_membership?: boolean
  published_at?: string | null
}

export type CreateCommentInput = {
  content: string
  parent_id?: string
}

export type UpdateCommentInput = {
  content: string
}

export type CreateCheckoutInput = {
  plan_id: string
  provider: PaymentProvider
  success_url: string
  cancel_url: string
}

export type CheckoutSessionResponse = Record<string, unknown>
