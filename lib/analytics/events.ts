// Contrato de eventos GA4 usado en todo el sitio.
// Un archivo único para que el naming sea consistente entre calculadoras,
// tienda, funnel y contenido.

export type CalculatorId =
  | 'life-path'
  | 'expression'
  | 'soul-urge'
  | 'personality'
  | 'maturity'
  | 'pinnacle'
  | 'challenges'
  | 'compatibility'
  | 'personal-year'
  | 'personal-month'
  | 'personal-week'
  | 'personal-day'
  | 'personal-stage'
  | 'name-number'
  | 'active-name'
  | 'hereditary-name'
  | 'numerological-map'
  | 'personal-compass'
  | 'collective-vibrations'
  | 'annual-horoscope'
  | 'couple-numerology'
  | 'letter-meaning'
  | 'number-meaning'

export type EcommerceItem = {
  item_id: string
  item_name: string
  item_category?: string
  item_variant?: string
  price?: number
  quantity?: number
  currency?: string
}

export type AnalyticsEventMap = {
  // Navegación
  page_view: { page_path: string; page_title?: string; page_location?: string }
  scroll_depth: { percent: 25 | 50 | 75 | 90 }

  // Calculadoras
  calculator_view: { calculator_id: CalculatorId; calculator_name: string }
  calculator_submit: {
    calculator_id: CalculatorId
    calculator_name: string
    input_date?: string // YYYY-MM-DD
    input_year?: number
    input_month?: number // 1-12
    input_day?: number // 1-31
    input_name_hash?: string // nunca el nombre en claro
    has_name_input?: boolean
  }
  calculator_result_view: {
    calculator_id: CalculatorId
    calculator_name: string
    result_value?: number | string
  }
  calculator_result_save: { calculator_id: CalculatorId; calculator_name: string }
  calculator_share: {
    calculator_id: CalculatorId
    calculator_name: string
    method?: 'copy' | 'whatsapp' | 'facebook' | 'twitter' | 'native'
  }

  // Autenticación
  sign_up: { method: 'password' | 'google' | 'facebook' }
  login: { method: 'password' | 'google' | 'facebook' }

  // Membresías (checkout de suscripción)
  view_membership: { membership_id: string; membership_name: string; price?: number }
  select_plan: { membership_id: string; membership_name: string; price?: number }
  begin_subscription: { membership_id: string; membership_name: string; value: number; currency: string }
  subscribe: {
    membership_id: string
    membership_name: string
    transaction_id: string
    value: number
    currency: string
  }

  // Contacto / lead
  lead: { source: string; value?: number }
  contact_submit: { form_id: string }

  // Ecommerce estándar GA4 — para la tienda separada y para cursos/reportes
  view_item_list: { item_list_id?: string; item_list_name?: string; items: EcommerceItem[] }
  view_item: { currency: string; value: number; items: EcommerceItem[] }
  select_item: { item_list_id?: string; item_list_name?: string; items: EcommerceItem[] }
  add_to_cart: { currency: string; value: number; items: EcommerceItem[] }
  remove_from_cart: { currency: string; value: number; items: EcommerceItem[] }
  view_cart: { currency: string; value: number; items: EcommerceItem[] }
  begin_checkout: { currency: string; value: number; items: EcommerceItem[]; coupon?: string }
  add_shipping_info: {
    currency: string
    value: number
    items: EcommerceItem[]
    shipping_tier?: string
  }
  add_payment_info: {
    currency: string
    value: number
    items: EcommerceItem[]
    payment_type?: string
  }
  purchase: {
    transaction_id: string
    currency: string
    value: number
    items: EcommerceItem[]
    tax?: number
    shipping?: number
    coupon?: string
  }

  // Salidas / promociones (la tienda es un sitio externo)
  select_promotion: {
    promotion_id?: string
    promotion_name?: string
    creative_name?: string
    creative_slot?: string
    location_id?: string
  }
  outbound_click: { link_url: string; link_domain: string; link_text?: string }
}

export type AnalyticsEventName = keyof AnalyticsEventMap
