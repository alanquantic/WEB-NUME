import type { OrderItem } from '@/lib/api/contracts'

const CATEGORY_LABELS: Record<string, string> = {
  report: 'Reporte',
  reporte: 'Reporte',
  ai_report: 'Reporte IA',
  report_ai: 'Reporte IA',
  reporte_ia: 'Reporte IA',
  membership: 'Membresía',
  membresia: 'Membresía',
  license: 'Licencia',
  licence: 'Licencia',
  licencia: 'Licencia'
}

export function getOrderItemCategory(item: OrderItem): string {
  const candidates = [
    item.category,
    item.metadata?.category,
    item.metadata?.product_category,
    item.metadata?.product_type
  ]
  for (const candidate of candidates) {
    if (typeof candidate !== 'string' || !candidate.trim()) continue
    const category = candidate.trim()
    const key = category.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[\s-]+/g, '_')
    return CATEGORY_LABELS[key] ?? category
  }
  return item.plan_id ? 'Membresía' : 'Sin categoría'
}
