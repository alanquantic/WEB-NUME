export { track, pageView, updateConsent, setUserId, hashInput, GA_MEASUREMENT_ID } from './gtag'
export type { AnalyticsEventMap, AnalyticsEventName, CalculatorId, EcommerceItem } from './events'
export {
  CONSENT_COOKIE,
  CONSENT_VERSION,
  DEFAULT_DENIED,
  ALL_GRANTED,
  readConsent,
  writeConsent
} from './consent'
export type { ConsentSettings, ConsentState, StoredConsent } from './consent'

// Mapeo id de calculadora → nombre humano (útil para eventos y reportes en GA4).
import type { CalculatorId } from './events'

export const CALCULATOR_LABEL: Record<CalculatorId, string> = {
  'life-path': 'Camino de vida',
  expression: 'Expresión',
  'soul-urge': 'Número del alma',
  personality: 'Personalidad',
  maturity: 'Madurez',
  pinnacle: 'Pináculo',
  challenges: 'Desafíos de vida',
  compatibility: 'Compatibilidad',
  'personal-year': 'Año personal',
  'personal-month': 'Mes personal',
  'personal-week': 'Semana personal',
  'personal-day': 'Día personal',
  'personal-stage': 'Etapa personal',
  'name-number': 'Número del nombre',
  'active-name': 'Nombre activo',
  'hereditary-name': 'Nombre hereditario',
  'numerological-map': 'Mapa numerológico',
  'personal-compass': 'Brújula personal',
  'collective-vibrations': 'Vibraciones colectivas',
  'annual-horoscope': 'Horóscopo anual',
  'couple-numerology': 'Numerología de pareja',
  'letter-meaning': 'Significado de letras',
  'number-meaning': 'Significado de números'
}
