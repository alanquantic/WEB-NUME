import type { ExploreLink } from '@/components/content/keep-exploring'

export type ToolContent = {
  seo: string[]
  related: ExploreLink[]
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  'camino-de-vida': {
    seo: [
      'Tu número de camino de vida es el más importante de tu carta: resume el propósito con el que llegaste y el aprendizaje central de tu existencia. Se obtiene sumando todos los dígitos de tu fecha de nacimiento y reduciéndolos a una cifra, salvo los maestros 11 y 22.',
      'No habla de lo que harás, sino de cómo lo harás: tu estilo, tus dones y los retos que se repetirán hasta que los integres. Es la base para entender el resto de tus números.'
    ],
    related: [
      { href: '/significadodelosnumeros', title: 'Significado de los números' },
      { href: '/calculatupinaculo', title: 'Calcula tu pináculo' },
      { href: '/blog/numero-personal-tu-esencia', title: 'El Número Personal: tu esencia' }
    ]
  },
  expresion: {
    seo: [
      'El número de expresión —o destino— se calcula con todas las letras de tu nombre completo y describe tus talentos naturales y la forma en que te muestras al mundo. Junto con el alma (vocales) y la personalidad (consonantes) forma el retrato numerológico de tu nombre.',
      'Cambiar de nombre o firmar distinto modifica esta vibración; por eso muchas personas ajustan su nombre para alinearlo con sus metas.'
    ],
    related: [
      { href: '/numerodelalma', title: 'Número del Alma' },
      { href: '/numerodelnombre', title: 'Número del Nombre' },
      { href: '/blog/como-calcular-el-numero-del-alma', title: 'Cómo calcular tu alma' }
    ]
  },
  compatibilidad: {
    seo: [
      'La compatibilidad numerológica compara los caminos de vida de dos personas para revelar su afinidad. El resultado indica si son una pareja natural, complementaria, de aprendizaje o de reto, y dónde fluye o se tensa el vínculo.',
      'Sirve para el amor, pero también para socios, familia y amistades: en cualquier relación ayuda a entender las diferencias y a aprovecharlas.'
    ],
    related: [
      { href: '/numerologia-de-pareja', title: 'Numerología de pareja' },
      { href: '/blog/como-se-relacionan-los-numeros-en-pareja', title: 'Los números en pareja' },
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida' }
    ]
  },
  anopersonal: {
    seo: [
      'El año personal es la energía que te acompaña del 1 de enero al 31 de diciembre y cambia dentro de un ciclo de nueve años. Conocerlo te permite anticipar el tema de tu año: si toca iniciar, consolidar, soltar o cerrar.',
      'Se calcula sumando tu día y mes de nacimiento con el año en curso. Combinarlo con el año universal te da una lectura aún más precisa.'
    ],
    related: [
      { href: '/mespersonal', title: 'Tu mes personal' },
      { href: '/labrujulanumerologica', title: 'La Brújula Numerológica' },
      { href: '/blog/ano-personal-que-es-y-como-se-calcula', title: 'Año personal: guía' }
    ]
  },
  mespersonal: {
    seo: [
      'El mes personal afina la energía de tu año y te muestra el foco de las próximas semanas. Es ideal para planear: cada mes favorece ciertas acciones más que otras.',
      'Se obtiene combinando tu año personal con el mes en curso. Es la base de tu horóscopo numerológico mensual.'
    ],
    related: [
      { href: '/anopersonal', title: 'Tu año personal' },
      { href: '/diapersonal', title: 'Tu día personal' },
      { href: '/blog/ano-personal-que-es-y-como-se-calcula', title: 'Cómo funcionan los ciclos' }
    ]
  },
  semanapersonal: {
    seo: [
      'La semana personal divide tu mes en cuatro tramos de energía y te ayuda a organizar tus días con más detalle. Es una herramienta práctica para la planeación semanal.',
      'Parte de tu año personal y del momento del mes en que te encuentras.'
    ],
    related: [
      { href: '/diapersonal', title: 'Tu día personal' },
      { href: '/mespersonal', title: 'Tu mes personal' },
      { href: '/labrujulanumerologica', title: 'Todas tus vibraciones' }
    ]
  },
  diapersonal: {
    seo: [
      'El día personal revela la vibración de tu jornada de hoy: qué energía predomina y cómo aprovecharla. Es la vibración de tiempo más cercana y cambiante.',
      'Se calcula con tu año personal, el día y el mes actuales. Consúltalo a diario para fluir con la energía del momento.'
    ],
    related: [
      { href: '/semanapersonal', title: 'Tu semana personal' },
      { href: '/vibracionescolectivas', title: 'Energía colectiva de hoy' },
      { href: '/labrujulanumerologica', title: 'La Brújula Numerológica' }
    ]
  },
  etapapersonal: {
    seo: [
      'Las etapas personales son los grandes ciclos de tu vida —de varios años, no anuales— que marcan los aprendizajes mayores de cada periodo. Saber en cuál estás te da perspectiva sobre el momento que vives.',
      'Se derivan de tu fecha de nacimiento y se relacionan con los ciclos de vida de tu pináculo.'
    ],
    related: [
      { href: '/calculatupinaculo', title: 'Tu pináculo' },
      { href: '/anopersonal', title: 'Tu año personal' },
      { href: '/labrujulanumerologica', title: 'La Brújula Numerológica' }
    ]
  },
  labrujulanumerologica: {
    seo: [
      'La Brújula Numerológica reúne todas tus vibraciones de tiempo en una sola vista: etapa, año, mes, semana y día personal. Es la forma más rápida de ubicarte en tus ciclos.',
      'Ideal para planear con sentido: combina la mirada amplia de la etapa con el detalle del día a día.'
    ],
    related: [
      { href: '/anopersonal', title: 'Tu año personal' },
      { href: '/calculatupinaculo', title: 'Tu pináculo' },
      { href: '/vibracionescolectivas', title: 'Energía colectiva' }
    ]
  },
  vibracionescolectivas: {
    seo: [
      'Las vibraciones colectivas son las energías que compartimos todos en una misma fecha, sin importar el nombre o la fecha de nacimiento. Incluyen el año, el mes, la semana y el día universal.',
      'Te ayudan a entender el clima energético general de un periodo: ese trasfondo común sobre el que se mueven tus vibraciones personales.'
    ],
    related: [
      { href: '/anopersonal', title: 'Tu año personal' },
      { href: '/blog/2026-ano-universal-1', title: '2026: Año Universal 1' },
      { href: '/diapersonal', title: 'Tu día personal' }
    ]
  },
  calculatupinaculo: {
    seo: [
      'El pináculo es el estudio más completo de tu numerología: reúne tus números base, tus cuatro ciclos de vida, tus metas y tus lecciones a partir de tu fecha de nacimiento. Es el mapa de tu vida en números.',
      'Te muestra cómo evoluciona tu energía por etapas y qué desafíos y dones marcan cada periodo.'
    ],
    related: [
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida' },
      { href: '/significadodelosnumeros', title: 'Significado de los números' },
      { href: '/blog/numero-personal-tu-esencia', title: 'El número personal' }
    ]
  },
  numerodelnombre: {
    seo: [
      'El número del nombre —o expresión— se obtiene de todas las letras de tu nombre completo y describe tus talentos y tu destino. Es uno de los pilares de tu carta, junto al camino de vida.',
      'Cada letra tiene un valor numérico; al sumarlos y reducirlos obtienes esta vibración.'
    ],
    related: [
      { href: '/numerodelalma', title: 'Número del Alma' },
      { href: '/numerodeexpresiondelalma', title: 'Expresión del Alma' },
      { href: '/significadodeletras', title: 'Significado de Letras' }
    ]
  },
  numerodelalma: {
    seo: [
      'El número del alma surge de las vocales de tu nombre y revela tu anhelo más íntimo: lo que tu corazón realmente desea. Por eso también se le llama el deseo del corazón.',
      'Trabajar este número te acerca a lo que de verdad te llena, más allá de lo que muestras hacia afuera.'
    ],
    related: [
      { href: '/numerodelnombre', title: 'Número del Nombre' },
      { href: '/numerodeexpresiondelalma', title: 'Expresión del Alma' },
      { href: '/blog/como-calcular-el-numero-del-alma', title: 'Cómo calcular tu alma' }
    ]
  },
  numerodeexpresiondelalma: {
    seo: [
      'Este número surge de las consonantes de tu nombre y refleja la imagen que proyectas: cómo te perciben los demás antes de conocerte a fondo. Complementa al número del alma, que nace de las vocales.',
      'Juntos, alma y expresión muestran el contraste entre tu mundo interior y tu fachada.'
    ],
    related: [
      { href: '/numerodelalma', title: 'Número del Alma' },
      { href: '/numerodelnombre', title: 'Número del Nombre' },
      { href: '/significadodeletras', title: 'Significado de Letras' }
    ]
  },
  nombreactivo: {
    seo: [
      'El nombre activo es la energía de tu primer nombre, el que usas a diario y con el que te identificas. Marca cómo te presentas y la vibración que activas al ser nombrado.',
      'Si usas un apodo o un segundo nombre, su vibración también influye en tu día a día.'
    ],
    related: [
      { href: '/nombrehereditario', title: 'Nombre Hereditario' },
      { href: '/numerodelnombre', title: 'Número del Nombre' },
      { href: '/significadodeletras', title: 'Significado de Letras' }
    ]
  },
  nombrehereditario: {
    seo: [
      'El nombre hereditario es la vibración de tus apellidos: la herencia familiar que traes contigo y que conecta con tu linaje. Habla de la energía que recibes de tu árbol familiar.',
      'Combinado con tu nombre activo, completa el retrato de tu identidad.'
    ],
    related: [
      { href: '/nombreactivo', title: 'Nombre Activo' },
      { href: '/numerodelnombre', title: 'Número del Nombre' },
      { href: '/significadodeletras', title: 'Significado de Letras' }
    ]
  },
  numerodelamadurez: {
    seo: [
      'El número de la madurez combina tu camino de vida y tu número de expresión para mostrar hacia dónde madura tu propósito, sobre todo a partir de la segunda mitad de la vida. Es la meta que se revela con los años.',
      'Indica el regalo que la vida te prepara cuando integras tu esencia y tu destino.'
    ],
    related: [
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida' },
      { href: '/numerodelnombre', title: 'Tu número del nombre' },
      { href: '/calculatupinaculo', title: 'Tu pináculo' }
    ]
  },
  significadodelosnumeros: {
    seo: [
      'Cada número, del 1 al 9 —más los maestros 11, 22 y 33—, tiene una vibración propia que se repite en toda tu carta. Conocer su significado te ayuda a interpretar cualquier resultado numerológico.',
      'Aquí encuentras la esencia, la luz y el reto de cada número para que tus cálculos cobren sentido.'
    ],
    related: [
      { href: '/explora', title: 'Explora por número' },
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida' },
      { href: '/significadodeletras', title: 'Significado de Letras' }
    ]
  },
  significadodeletras: {
    seo: [
      'Cada letra del alfabeto vibra con un número, y esa equivalencia es la base para calcular los números de tu nombre. Las letras K (11) y V (22) conservan su valor maestro.',
      'Con esta tabla puedes entender cómo se obtienen tu número del nombre, del alma y de la expresión.'
    ],
    related: [
      { href: '/numerodelnombre', title: 'Número del Nombre' },
      { href: '/numerodelalma', title: 'Número del Alma' },
      { href: '/significadodelosnumeros', title: 'Significado de los números' }
    ]
  }
}
