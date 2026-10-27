import type { OrderItem } from '@/lib/api/contracts'
import { isInternalPath, safeHref } from '@/lib/safe-url'

export function getOrderItemReportUrl(item: OrderItem): string | null {
  const value = item.report_url ?? item.metadata?.report_url
  if (typeof value !== 'string') return null
  const href = safeHref(value)
  return href && (isInternalPath(href) || /^https?:\/\//i.test(href)) ? href : null
}
