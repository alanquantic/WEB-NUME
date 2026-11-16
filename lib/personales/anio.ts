// Años que usa el cálculo de Año Personal. Seguro para el cliente.

const MES_INICIO_ANIO_SIGUIENTE = 10 // noviembre (0 = enero)

/**
 * Años para los que conviene mostrar el Año Personal: en noviembre y
 * diciembre la gente ya quiere saber el del año que viene, así que son dos.
 */
export function aniosVigentes(now: Date = new Date()): number[] {
  const anio = now.getFullYear()
  return now.getMonth() >= MES_INICIO_ANIO_SIGUIENTE ? [anio, anio + 1] : [anio]
}

/**
 * 1 de enero al mediodía UTC, para calcular el Año Personal de un año dado.
 * Person lee el año en UTC: con la medianoche local (`new Date(anio, 0, 1)`),
 * al este de Greenwich (España) el año que resultaba era el anterior.
 */
export function inicioDeAnio(anio: number): Date {
  return new Date(Date.UTC(anio, 0, 1, 12))
}
