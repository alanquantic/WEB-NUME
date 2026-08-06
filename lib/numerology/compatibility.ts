import { calculateLifePath } from '@/lib/numerology/life-path'
import { getCompatibility } from '@/resources/utils'

export type CompatibilityCategoryInfo = {
  label: string
  description: string
  energy: string
  strengths: string[]
  challenges: string[]
  advice: string[]
}

export type CompatibilityResult = {
  numberA: number
  numberB: number
  category: string
  label: string
  description: string
  energy: string
  strengths: string[]
  challenges: string[]
  advice: string[]
}

const CATEGORY_INFO: Record<string, CompatibilityCategoryInfo> = {
  PN: {
    label: 'Pareja Natural',
    description:
      'Máxima afinidad: fluyen con naturalidad y se entienden casi sin esfuerzo desde el primer encuentro.',
    energy:
      'La energía entre ambos vibra en la misma frecuencia. Se reconocen rápido y sienten que llevan años conociéndose incluso cuando acaban de encontrarse.',
    strengths: [
      'Comprensión instantánea y comunicación fluida.',
      'Comparten intereses, valores y forma de ver la vida.',
      'Estabilidad emocional y sensación de estar en casa.',
      'Complicidad natural en lo cotidiano y en los planes a largo plazo.'
    ],
    challenges: [
      'Pueden caer en la comodidad y estancarse por falta de retos.',
      'Evitan las confrontaciones necesarias por no romper la armonía.',
      'Riesgo de rutina si no cultivan la novedad y el asombro.'
    ],
    advice: [
      'No den por sentado el vínculo: agradecer y celebrar lo que fluye.',
      'Introduzcan proyectos y aprendizajes compartidos para seguir creciendo.',
      'Hablen incluso cuando parece que todo se entiende sin palabras.'
    ]
  },
  PC: {
    label: 'Pareja Complementaria',
    description:
      'Sus diferencias suman: se complementan y se apoyan, y aprenden a construir un equipo equilibrado.',
    energy:
      'Cada uno aporta lo que al otro le falta. La relación funciona como un tejido: dos hilos distintos que juntos forman una tela más fuerte.',
    strengths: [
      'Se equilibran mutuamente en fortalezas y debilidades.',
      'Aprendizaje continuo por la diversidad de perspectivas.',
      'Buen equipo para enfrentar la vida y tomar decisiones.',
      'Mayor amplitud de miras y crecimiento conjunto.'
    ],
    challenges: [
      'Requieren negociación constante para llegar a acuerdos.',
      'Los estilos distintos pueden generar malentendidos.',
      'Hay que aprender a valorar la forma del otro sin querer cambiarlo.'
    ],
    advice: [
      'Practiquen la escucha activa antes de responder.',
      'Vean las diferencias como riqueza, no como amenaza.',
      'Establezcan rituales de conexión para no perderse el uno al otro.'
    ]
  },
  PD: {
    label: 'Pareja de Aprendizaje',
    description:
      'Relación de crecimiento: enseña a ambos y pide comunicación y paciencia para dar sus mejores frutos.',
    energy:
      'La chispa es intensa y el aprendizaje acelerado. Se activan zonas profundas del otro, para bien y para mal, y ambos salen transformados de la relación.',
    strengths: [
      'Transformación personal profunda a través del vínculo.',
      'Pasión y química intensa cuando la conexión fluye.',
      'Se motivan mutuamente a evolucionar y salir de la zona de confort.',
      'Descubren aspectos de sí mismos que solos no verían.'
    ],
    challenges: [
      'Tensiones frecuentes por patrones que se repiten.',
      'Desgaste emocional si no hay consciencia del proceso.',
      'Riesgo de discutir por los mismos temas una y otra vez.'
    ],
    advice: [
      'Identifiquen los patrones que se repiten y hablen de ellos con calma.',
      'Cultiven la comunicación abierta y honesta desde el inicio.',
      'Consideren apoyo externo (terapia, guía) si lo necesitan.',
      'Recuerden que están aquí para aprender: la paciencia es clave.'
    ]
  },
  PNE: {
    label: 'Pareja de Reto',
    description:
      'Vínculo desafiante que pide tolerancia y consciencia. Bien llevado, puede traer mucha pasión e intensidad.',
    energy:
      'Se atraen con fuerza pero sus energías tienden a chocar. Es una relación que exige trabajo constante y donde el crecimiento viene del roce.',
    strengths: [
      'Magnetismo intenso y química muy fuerte.',
      'Potencial de crecimiento personal profundo.',
      'Aprendizaje sobre los propios límites y sombras.',
      'Cada uno reta al otro a ser una mejor versión de sí mismo.'
    ],
    challenges: [
      'Choques frecuentes por formas de ser muy distintas.',
      'Riesgo de que uno se sienta invalidado o incomprendido.',
      'Requiere mucho trabajo consciente para sostener el vínculo.',
      'Puede desgastar si no se ponen límites saludables.'
    ],
    advice: [
      'Establezcan límites claros y respétenlos.',
      'Cuiden los espacios individuales: no todo se comparte.',
      'Busquen actividades donde puedan brillar por separado.',
      'Terapia de pareja puede ser un gran aliado.'
    ]
  }
}

const FALLBACK_INFO: CompatibilityCategoryInfo = {
  label: 'Sin clasificación directa',
  description:
    'No encontramos una relación directa en la tabla para estos números, pero toda combinación tiene su propio potencial.',
  energy: 'Cada combinación numérica tiene su propia dinámica única.',
  strengths: [],
  challenges: [],
  advice: []
}

// La tabla solo contempla 1-9, 11 y 22; el 33 se reduce a 6 para la consulta.
function toTableKey(value: number): number {
  return value === 33 ? 6 : value
}

export function calculateCompatibility(
  dateA: string,
  dateB: string
): CompatibilityResult | null {
  if (!dateA || !dateB) return null

  const numberA = calculateLifePath({ birthDate: dateA }).lifePathNumber
  const numberB = calculateLifePath({ birthDate: dateB }).lifePathNumber
  const category = getCompatibility(toTableKey(numberA), toTableKey(numberB))
  const info = CATEGORY_INFO[category] ?? FALLBACK_INFO

  return {
    numberA,
    numberB,
    category,
    label: info.label,
    description: info.description,
    energy: info.energy,
    strengths: info.strengths,
    challenges: info.challenges,
    advice: info.advice
  }
}
