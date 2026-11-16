// Años que anuncian las páginas de Año Personal. El contenido es el mismo
// cada año; lo que cambia es el año que la gente busca. En noviembre y
// diciembre ya se busca el año siguiente, así que se anuncian los dos.
// Se calcula al servir la página: no hay que tocar nada cada enero.

const MES_INICIO_ANIO_SIGUIENTE = 10 // noviembre (0 = enero)

export function aniosVigentes(now: Date = new Date()): number[] {
  const anio = now.getFullYear()
  return now.getMonth() >= MES_INICIO_ANIO_SIGUIENTE ? [anio, anio + 1] : [anio]
}

/** "2026 y 2027" en noviembre y diciembre; "2027" el resto del año. */
export function etiquetaAnios(now: Date = new Date()): string {
  return aniosVigentes(now).join(' y ')
}

/** Título de la página de un Año Personal: "Año Personal 5 en 2027: …". */
export function tituloAnoPersonal(numero: number, now: Date = new Date()): string {
  return `Año Personal ${numero} en ${etiquetaAnios(now)}: significado y claves`
}

/** Descripción para buscadores a partir del subtítulo del contenido. */
export function descripcionAnoPersonal(
  numero: number,
  subtitulo: string,
  now: Date = new Date()
): string {
  const resumen = subtitulo.trim().replace(/[.\s]+$/, '')
  const cierre = `Conoce la lección y las claves de tu Año Personal ${numero} en ${etiquetaAnios(now)}.`
  return resumen ? `${resumen}. ${cierre}` : cierre
}

/** Frase de la página: a quién aplica el contenido según el año. */
export function vigenciaAnoPersonal(numero: number, now: Date = new Date()): string {
  const [actual, siguiente] = aniosVigentes(now)
  return siguiente
    ? `Aplica si vives tu Año Personal ${numero} en ${actual} o si lo inicias en ${siguiente}.`
    : `Aplica si ${actual} es tu Año Personal ${numero}.`
}

/** Título para buscadores de la guía general de Año Personal. */
export function tituloGuiaAnoPersonal(now: Date = new Date()): string {
  return `Año Personal ${etiquetaAnios(now)}: qué es y significado de cada número`
}

export function descripcionGuiaAnoPersonal(now: Date = new Date()): string {
  return `Qué es el Año Personal, cómo marca tus ciclos de 9 años y el significado de cada número para ${etiquetaAnios(now)}.`
}

/** Título para buscadores de la calculadora de Año Personal. */
export function tituloCalculadoraAnoPersonal(now: Date = new Date()): string {
  return `Calcula tu Año Personal ${etiquetaAnios(now)}`
}

export function descripcionCalculadoraAnoPersonal(now: Date = new Date()): string {
  return `Calcula tu Año Personal ${etiquetaAnios(now)} con tu fecha de nacimiento y descubre la lección, el tema y las oportunidades de tu ciclo.`
}

/**
 * 1 de enero al mediodía UTC, para calcular el Año Personal de un año dado.
 * Person lee el año en UTC: con la medianoche local (`new Date(anio, 0, 1)`),
 * al este de Greenwich (España) el año que resultaba era el anterior.
 */
export function inicioDeAnio(anio: number): Date {
  return new Date(Date.UTC(anio, 0, 1, 12))
}
