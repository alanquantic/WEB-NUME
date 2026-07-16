// ⚠️ BORRADOR PENDIENTE DE REVISIÓN — TODO(revisión-laura)
// Este contenido NO proviene del libro de Laura (que trata solo el Pináculo / fecha
// de nacimiento). Fue redactado con numerología estándar como borrador para las
// páginas de Día Personal y Numerología del Nombre. Debe ser revisado y aprobado
// antes de publicar. Para marcarlo como aprobado, quita el prop `draft` en cada página.

export type DraftNumberEntry = {
  numero: number
  texto: string
}

export type DraftConcept = {
  intro: string[]
  frase?: string
  numerosTitulo: string
  numeros: DraftNumberEntry[]
  calculoTitulo: string
  calculo: string[]
}

export const DIA_PERSONAL: DraftConcept = {
  intro: [
    'El Día Personal es la vibración numerológica que te acompaña durante una sola jornada. Es la energía más cercana y cambiante de todas: cada día trae un tono distinto que puedes aprovechar para decidir qué actividades fluyen mejor.',
    'Conocer tu Día Personal te ayuda a planear con sentido. Alinear tus acciones con la energía disponible hace que el día rinda más y con menos resistencia; consúltalo a diario para fluir con el momento.',
  ],
  frase: 'Cada día tiene su propia energía: aprende a leerla y el día rendirá a tu favor.',
  numerosTitulo: 'Significado de cada Día Personal',
  numeros: [
    { numero: 1, texto: 'Día de inicios. Ideal para arrancar proyectos, tomar la iniciativa y actuar con decisión. Confía en tu criterio y abre camino.' },
    { numero: 2, texto: 'Día de pausa y cooperación. Favorece los acuerdos, la escucha y el trabajo en equipo. Cuida los detalles y ten paciencia.' },
    { numero: 3, texto: 'Día de expresión y disfrute. Comunica, crea y socializa; la energía fluye hacia lo alegre y creativo. Evita dispersarte.' },
    { numero: 4, texto: 'Día de orden y trabajo. Perfecto para organizar, poner cimientos y atender lo práctico. La constancia rinde frutos.' },
    { numero: 5, texto: 'Día de movimiento y cambio. Se abren imprevistos y oportunidades; sé flexible y aprovecha lo nuevo, sin caer en excesos.' },
    { numero: 6, texto: 'Día de responsabilidad y hogar. Atiende a los tuyos, resuelve asuntos familiares y cuida los vínculos y el bienestar.' },
    { numero: 7, texto: 'Día de introspección. Busca silencio, análisis y aprendizaje; conviene reflexionar más que exponerte. Escucha tu intuición.' },
    { numero: 8, texto: 'Día de poder y resultados. Favorece los negocios, las decisiones económicas y el liderazgo. Actúa con justicia y visión.' },
    { numero: 9, texto: 'Día de cierres. Suelta lo que ya cumplió su ciclo, termina pendientes y practica la generosidad. Prepara espacio para lo nuevo.' },
  ],
  calculoTitulo: '¿Cómo se calcula el Día Personal?',
  calculo: [
    'Se obtiene sumando tu Año Personal + el número del mes en curso + el día del mes, y reduciendo el resultado a un solo dígito.',
    'También puedes sumar directamente los dígitos de la fecha completa (día, mes y año en curso) y reducirlos a una sola cifra.',
  ],
}

export const NUMERO_NOMBRE: DraftConcept = {
  intro: [
    'El Número del Nombre —también llamado número de Expresión o Destino— se obtiene de todas las letras de tu nombre completo y describe tus talentos naturales y la forma en que te muestras al mundo. Junto con tu Camino de Vida, es uno de los pilares de tu carta numerológica.',
    'Habla del «cómo» de tu vida: los dones con los que cuentas y el estilo con el que persigues tus metas. Firmar o usar tu nombre de otra manera puede modificar esta vibración.',
  ],
  frase: 'Tu nombre guarda el mapa de tus talentos y de la huella que vienes a dejar.',
  numerosTitulo: 'Significado de cada Número del Nombre',
  numeros: [
    { numero: 1, texto: 'Talento para liderar, iniciar y abrir camino. Te expresas con independencia, originalidad y determinación.' },
    { numero: 2, texto: 'Don para la cooperación, la diplomacia y el detalle. Brillas creando acuerdos, apoyando y tendiendo puentes.' },
    { numero: 3, texto: 'Expresión creativa y comunicativa. Tu talento es inspirar, comunicar y contagiar entusiasmo con tu carisma.' },
    { numero: 4, texto: 'Capacidad de organización y construcción. Te expresas con orden, método y constancia; conviertes las ideas en estructuras.' },
    { numero: 5, texto: 'Versatilidad y adaptación. Tu don es la comunicación dinámica, el cambio y la habilidad para reinventarte.' },
    { numero: 6, texto: 'Talento para cuidar, armonizar y crear belleza. Te expresas desde la responsabilidad, el servicio y el amor.' },
    { numero: 7, texto: 'Mente analítica y profunda. Tu don es investigar, comprender y transmitir conocimiento con criterio.' },
    { numero: 8, texto: 'Visión para los negocios y la organización a gran escala. Te expresas con autoridad, ambición y capacidad ejecutiva.' },
    { numero: 9, texto: 'Sensibilidad humanista y artística. Tu talento es inspirar, servir y trascender con una mirada amplia y generosa.' },
    { numero: 11, texto: 'Número maestro: inspiración e intuición al servicio de los demás. Tu don es iluminar y elevar con tu ejemplo.' },
    { numero: 22, texto: 'Número maestro: el constructor. Talento para materializar grandes proyectos que benefician a muchos.' },
  ],
  calculoTitulo: '¿Cómo se calcula el Número del Nombre?',
  calculo: [
    'Se asigna un valor numérico a cada letra de tu nombre y apellidos, se suman todos y el total se reduce a un dígito.',
    'Los números maestros 11 y 22 no se reducen. Las letras K (11) y V (22) conservan su valor maestro.',
  ],
}

export const NOMBRE_ACTIVO: DraftConcept = {
  intro: [
    'El Nombre Activo es la energía de tu primer nombre, el que usas a diario y con el que te identificas. Marca cómo te presentas y la vibración que activas cada vez que te nombran.',
    'Es la parte más cotidiana de tu identidad. Si usas un apodo o un segundo nombre, su vibración también influye en tu día a día.',
  ],
  frase: 'El nombre con el que te llaman a diario activa una energía que te acompaña siempre.',
  numerosTitulo: 'Significado de cada Nombre Activo',
  numeros: [
    { numero: 1, texto: 'Te presentas con seguridad, iniciativa y un aire de líder. Proyectas independencia y ganas de destacar.' },
    { numero: 2, texto: 'Transmites cercanía, calma y tacto. La gente te percibe amable, conciliador y buen escucha.' },
    { numero: 3, texto: 'Irradias simpatía y expresividad. Se te nota comunicativo, alegre y sociable.' },
    { numero: 4, texto: 'Proyectas seriedad, orden y confianza. Se te percibe estable, trabajador y de fiar.' },
    { numero: 5, texto: 'Transmites dinamismo y frescura. Pareces versátil, curioso y abierto a lo nuevo.' },
    { numero: 6, texto: 'Irradias calidez y responsabilidad. La gente te ve protector, servicial y familiar.' },
    { numero: 7, texto: 'Proyectas reserva y profundidad. Se te percibe analítico, prudente y con un aire reflexivo.' },
    { numero: 8, texto: 'Transmites presencia y autoridad. Pareces ambicioso, capaz y orientado a resultados.' },
    { numero: 9, texto: 'Irradias generosidad y amplitud. Se te percibe empático, idealista y con causa.' },
    { numero: 11, texto: 'Proyectas una energía inspiradora y sensible; despiertas admiración e intuición en los demás.' },
    { numero: 22, texto: 'Transmites una presencia sólida y visionaria; inspiras confianza para grandes empresas.' },
  ],
  calculoTitulo: '¿Cómo se calcula el Nombre Activo?',
  calculo: [
    'Se suma el valor numérico de las letras de tu primer nombre (el que usas habitualmente) y se reduce a un dígito.',
    'Los números maestros 11 y 22 no se reducen.',
  ],
}

export const NOMBRE_HEREDITARIO: DraftConcept = {
  intro: [
    'El Nombre Hereditario es la vibración de tus apellidos: la herencia familiar que traes contigo y que te conecta con tu linaje. Habla de la energía que recibes de tu árbol genealógico.',
    'Combinado con tu Nombre Activo, completa el retrato de tu identidad: lo propio y lo heredado.',
  ],
  frase: 'Tus apellidos guardan la energía del linaje que te precede y te sostiene.',
  numerosTitulo: 'Significado de cada Nombre Hereditario',
  numeros: [
    { numero: 1, texto: 'Heredas una energía de liderazgo e independencia: un linaje que empuja a destacar y abrir camino.' },
    { numero: 2, texto: 'Herencia de unión y cooperación: una familia que valora los vínculos, la paz y el apoyo mutuo.' },
    { numero: 3, texto: 'Legado creativo y expresivo: un linaje sociable, comunicativo y con gusto por el disfrute.' },
    { numero: 4, texto: 'Herencia de trabajo y estructura: una familia de esfuerzo, orden y valores sólidos.' },
    { numero: 5, texto: 'Legado de libertad y cambio: un linaje inquieto, viajero y adaptable.' },
    { numero: 6, texto: 'Herencia de amor y responsabilidad familiar: un linaje entregado al hogar y al cuidado de los suyos.' },
    { numero: 7, texto: 'Legado de sabiduría y búsqueda: una familia reflexiva, espiritual o intelectual.' },
    { numero: 8, texto: 'Herencia de poder y logro material: un linaje ligado al esfuerzo, la ambición y la abundancia.' },
    { numero: 9, texto: 'Legado humanista y generoso: una familia con vocación de servicio y mirada amplia.' },
    { numero: 11, texto: 'Herencia de inspiración espiritual: un linaje con sensibilidad, intuición y misión de guía.' },
    { numero: 22, texto: 'Legado de construcción a gran escala: una familia con capacidad de dejar obra y trascender.' },
  ],
  calculoTitulo: '¿Cómo se calcula el Nombre Hereditario?',
  calculo: [
    'Se suma el valor numérico de las letras de tus apellidos y se reduce a un dígito.',
    'Los números maestros 11 y 22 no se reducen.',
  ],
}
