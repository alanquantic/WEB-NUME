'use client'

import { useEffect, useRef } from 'react'

import { CALCULATOR_LABEL } from './index'
import type { CalculatorId } from './events'
import { hashInput, track } from './gtag'

// Parte una fecha YYYY-MM-DD en year/month/day numéricos para poder agregarlos
// en GA4 y ver qué fechas se insertan más en cada calculadora.
function splitDate(input?: string) {
  if (!input) return {}
  const [y, m, d] = input.split('-').map((n) => Number.parseInt(n, 10))
  if (!y || !m || !d) return {}
  return { input_date: input, input_year: y, input_month: m, input_day: d }
}

export type CalculatorSubmitPayload = {
  birthDate?: string
  birthDateSecondary?: string // p.ej. compatibilidad segunda persona
  fullName?: string
}

// Reporta calculator_submit con la fecha parseada y (si aplica) el nombre hasheado.
// Es async por el hash, pero se puede llamar sin await — GA4 no bloquea la UI.
export async function trackCalculatorSubmit(
  calculatorId: CalculatorId,
  payload: CalculatorSubmitPayload = {}
) {
  const dateParts = splitDate(payload.birthDate)
  const hasName = Boolean(payload.fullName && payload.fullName.trim())
  const nameHash = hasName ? await hashInput(payload.fullName as string) : undefined

  track('calculator_submit', {
    calculator_id: calculatorId,
    calculator_name: CALCULATOR_LABEL[calculatorId],
    ...dateParts,
    has_name_input: hasName,
    input_name_hash: nameHash
  })

  if (payload.birthDateSecondary) {
    // Reportamos la segunda fecha como un evento separado para poder cruzarla.
    const partsB = splitDate(payload.birthDateSecondary)
    track('calculator_submit', {
      calculator_id: calculatorId,
      calculator_name: CALCULATOR_LABEL[calculatorId],
      ...partsB
    })
  }
}

export function trackCalculatorResultView(
  calculatorId: CalculatorId,
  resultValue?: number | string
) {
  track('calculator_result_view', {
    calculator_id: calculatorId,
    calculator_name: CALCULATOR_LABEL[calculatorId],
    result_value: resultValue
  })
}

export function trackCalculatorResultSave(calculatorId: CalculatorId) {
  track('calculator_result_save', {
    calculator_id: calculatorId,
    calculator_name: CALCULATOR_LABEL[calculatorId]
  })
}

// Reporta calculator_view una sola vez al montar el componente.
// Ubicar en cada calculadora: useCalculatorView('life-path').
export function useCalculatorView(calculatorId: CalculatorId) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track('calculator_view', {
      calculator_id: calculatorId,
      calculator_name: CALCULATOR_LABEL[calculatorId]
    })
  }, [calculatorId])
}
