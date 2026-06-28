export type NumberMeaning = {
  title: string
  keywords: string[]
  description: string
  light: string
  shadow: string
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    title: 'Liderazgo',
    keywords: ['independencia', 'iniciativa', 'voluntad'],
    description:
      'El 1 es la chispa que inicia todo. Trae independencia, ambición sana y la determinación de abrir camino donde otros ven obstáculos. Naciste para liderar y dejar tu sello propio.',
    light: 'Pionero, valiente, original y autosuficiente; inspira a otros a avanzar.',
    shadow: 'Puede caer en el egoísmo, la terquedad o el miedo a quedarse solo.'
  },
  2: {
    title: 'Cooperación',
    keywords: ['sensibilidad', 'diplomacia', 'unión'],
    description:
      'El 2 es el arte de unir y armonizar. Vibra con la empatía, la intuición y la diplomacia; sabe escuchar y tender puentes. Su fuerza está en la colaboración, no en la imposición.',
    light: 'Conciliador, intuitivo, leal y detallista; crea ambientes de paz.',
    shadow: 'Tiende a la dependencia, la indecisión o a postergarse por los demás.'
  },
  3: {
    title: 'Expresión',
    keywords: ['creatividad', 'comunicación', 'alegría'],
    description:
      'El 3 es pura expresión creativa. Comunica, inspira y contagia alegría con su imaginación y su carisma. Brilla cuando comparte su voz, su arte y su optimismo con el mundo.',
    light: 'Creativo, sociable, entusiasta y expresivo; levanta el ánimo de cualquiera.',
    shadow: 'Puede dispersarse, exagerar o esconder su sensibilidad tras la superficialidad.'
  },
  4: {
    title: 'Estructura',
    keywords: ['orden', 'trabajo', 'estabilidad'],
    description:
      'El 4 construye sobre cimientos firmes. Aporta orden, disciplina y constancia; convierte las ideas en estructuras sólidas y duraderas. Es el pilar en el que los demás confían.',
    light: 'Trabajador, confiable, organizado y honesto; termina lo que empieza.',
    shadow: 'Puede volverse rígido, terco o resistente al cambio.'
  },
  5: {
    title: 'Libertad',
    keywords: ['cambio', 'aventura', 'versatilidad'],
    description:
      'El 5 es movimiento y libertad. Ama la aventura, el cambio y la experiencia; se adapta con rapidez y necesita espacio para explorar. Su don es vivir con curiosidad y mostrar nuevos horizontes.',
    light: 'Versátil, magnético, valiente y entusiasta; abraza lo nuevo sin miedo.',
    shadow: 'Puede caer en la inconstancia, los excesos o la falta de compromiso.'
  },
  6: {
    title: 'Servicio',
    keywords: ['amor', 'responsabilidad', 'armonía'],
    description:
      'El 6 vibra con el amor y el cuidado. Es responsable, protector y profundamente entregado a su familia y comunidad. Encuentra su plenitud al crear belleza, hogar y armonía a su alrededor.',
    light: 'Amoroso, responsable, generoso y conciliador; sostiene a los suyos.',
    shadow: 'Puede sobreproteger, sacrificarse de más o caer en el control.'
  },
  7: {
    title: 'Sabiduría',
    keywords: ['introspección', 'análisis', 'espiritualidad'],
    description:
      'El 7 busca la verdad detrás de las cosas. Es analítico, introspectivo y espiritual; necesita silencio para pensar y conectar con su mundo interior. Su camino es el del conocimiento y la fe.',
    light: 'Sabio, intuitivo, profundo y observador; ve lo que otros no ven.',
    shadow: 'Puede aislarse, desconfiar o perderse en el exceso de análisis.'
  },
  8: {
    title: 'Poder',
    keywords: ['abundancia', 'logro', 'autoridad'],
    description:
      'El 8 es la energía del poder y la abundancia. Tiene visión para los negocios, capacidad de organización y ambición para alcanzar grandes metas. Su lección es equilibrar lo material con lo espiritual.',
    light: 'Ejecutivo, resiliente, justo y próspero; materializa lo que se propone.',
    shadow: 'Puede obsesionarse con el control, el dinero o el estatus.'
  },
  9: {
    title: 'Compasión',
    keywords: ['humanismo', 'entrega', 'idealismo'],
    description:
      'El 9 es el corazón humanitario. Vibra con la compasión, la generosidad y el servicio desinteresado a la humanidad. Es el número de los finales conscientes y de la sabiduría que se comparte.',
    light: 'Compasivo, idealista, tolerante y generoso; ama sin condiciones.',
    shadow: 'Le cuesta soltar; puede caer en el drama o en el sacrificio amargo.'
  },
  11: {
    title: 'Maestro inspirador',
    keywords: ['intuición', 'inspiración', 'idealismo'],
    description:
      'El 11 es un número maestro: la intuición del 2 llevada a su máxima expresión. Trae inspiración, sensibilidad espiritual y la misión de iluminar a otros con su ejemplo. Vive entre la genialidad y la tensión interior.',
    light: 'Visionario, intuitivo, inspirador y sensible; canaliza ideas elevadas.',
    shadow: 'Puede sufrir ansiedad, idealismo extremo o miedo a su propio potencial.'
  },
  22: {
    title: 'Maestro constructor',
    keywords: ['visión', 'construcción', 'legado'],
    description:
      'El 22 es el más poderoso de los números maestros: une la visión del 11 con la estructura del 4. Convierte grandes sueños en realidades concretas que benefician a muchos. Su misión es construir un legado.',
    light: 'Constructor, práctico, visionario y disciplinado; hace posible lo imposible.',
    shadow: 'Puede abrumarse por la magnitud de su misión o reprimir su potencial.'
  },
  33: {
    title: 'Maestro guía',
    keywords: ['amor', 'servicio', 'sanación'],
    description:
      'El 33 es el maestro del amor incondicional. Combina la creatividad del 3 con la entrega del 6 elevadas a su máxima vibración. Su camino es el servicio amoroso, la enseñanza y la sanación a gran escala.',
    light: 'Compasivo, sanador, generoso y luminoso; eleva a quienes lo rodean.',
    shadow: 'Puede cargar con el peso del mundo o perderse en el sacrificio.'
  }
}

export function getMeaning(value: number): NumberMeaning {
  return (
    NUMBER_MEANINGS[value] ?? {
      title: 'Vibración única',
      keywords: [],
      description: 'Una energía particular dentro de tu mapa numerológico.',
      light: '',
      shadow: ''
    }
  )
}
