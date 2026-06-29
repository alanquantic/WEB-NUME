export type ExploreTool = {
  href: string
  title: string
  description?: string
}

export type SamplePost = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  category: string
  tags: string[]
  html: string
  relatedSlugs: string[]
  relatedTools: ExploreTool[]
  sourceUrl: string
}

export const SAMPLE_POSTS: SamplePost[] = [
  {
    slug: 'que-es-la-numerologia-de-pareja',
    title: 'Qué es la numerología de pareja y cómo puede ayudar a tu relación',
    excerpt:
      'Guía completa de numerología de pareja: qué es, en qué se basa, cómo se calcula y cómo usarla para entender y fortalecer tu relación. Incluye calculadora gratis.',
    date: '2026-06-20',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Nombre-750x375.webp',
    category: 'Amor',
    tags: ['numerología de pareja', 'compatibilidad', 'amor', 'relaciones'],
    relatedSlugs: [
      'como-se-relacionan-los-numeros-en-pareja',
      'ano-personal-que-es-y-como-se-calcula'
    ],
    relatedTools: [
      {
        href: '/calculadoras/compatibilidad',
        title: 'Calculadora de compatibilidad',
        description: 'Compara dos fechas al instante.'
      },
      {
        href: '/numerologia-de-pareja',
        title: 'Numerología de pareja',
        description: 'La página dedicada con todo el detalle.'
      }
    ],
    sourceUrl: 'https://www.numerologia-cotidiana.com/numerologia-de-pareja',
    html: `
<p>La numerología de pareja —o sinastría numerológica— compara los números de dos personas para revelar su afinidad: qué energías comparten, dónde fluye la relación y dónde conviene poner conciencia.</p>
<p>No se trata de saber si una relación va a "funcionar" o no, sino de entenderla mejor: conocer las fortalezas del vínculo y los retos que pide trabajar. Es una de las consultas más buscadas en numerología.</p>
<p>En esta guía verás qué es, en qué se basa, cómo se calcula y, sobre todo, cómo usarla para mejorar tu relación día a día. Incluye una calculadora gratuita para que obtengas tu resultado al instante.</p>
`
  },
  {
    slug: 'para-que-sirve-la-numerologia',
    title: '¿Para qué sirve la Numerología?',
    excerpt:
      'La numerología te da un marco propio para descifrar las claves de tu desarrollo personal y encontrar dirección en los momentos de indecisión.',
    date: '2026-06-28',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Mes-Personal-750x375.webp',
    category: 'El Blog de la Numerología',
    tags: ['numerología', 'autoconocimiento'],
    relatedSlugs: ['como-calcular-el-numero-del-alma', 'ano-personal-que-es-y-como-se-calcula'],
    relatedTools: [
      { href: '/calculadoras/camino-de-vida', title: 'Calcula tu camino de vida', description: 'El propósito con el que llegaste.' },
      { href: '/numerologia', title: 'Explora la numerología', description: 'Todas las herramientas en un lugar.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/para-que-sirve-la-numerologia/',
    html: `
<p>La numerología es como un mapa de carreteras: te muestra los caminos posibles, pero nunca decide por ti. Es una herramienta para redescubrir las claves que rigen tu desarrollo personal y darte un marco de referencia propio.</p>
<h2>Una brújula para reconectar contigo</h2>
<p>Así como un manzano sabe, por naturaleza, cuál es su propósito, los seres humanos solemos perder contacto con ese conocimiento innato. La numerología ofrece respuestas en los momentos de indecisión, sin la presión de los esquemas sociales ni del "deber ser".</p>
<h2>Qué revela un estudio numerológico</h2>
<p>Un análisis numerológico habla de tu carácter, tu vocación, tus posibilidades económicas, el amor y tus afinidades. Muestra tus metas, tus ciclos de vida y tu destino, y te permite diagnosticar con inteligencia el momento que atraviesas.</p>
<h2>Conocerte es ganar libertad</h2>
<p>Cuando entiendes cómo las energías influyen en tus decisiones y emociones, ganas seguridad. Y ese conocimiento profundo se traduce en libertad —y, en consecuencia, en bienestar.</p>
<h2>Los números al servicio de tu conciencia</h2>
<p>Los números son símbolos al servicio de tu conciencia, nunca al revés. Llevarlos contigo te permite activarlos a través del diálogo entre tu intelecto y tu intuición.</p>
<p>La gran pregunta que propone la numerología es simple y poderosa: ¿por qué no ser, por fin, eso que solo tú puedes ser?</p>
<p>¿Quieres empezar? Calcula tu <a href="/calculadoras/camino-de-vida">número de camino de vida</a> y descubre el propósito con el que llegaste a esta vida.</p>
`
  },
  {
    slug: 'como-calcular-el-numero-del-alma',
    title: '¿Cómo calcular el Número del Alma?',
    excerpt:
      'Las vocales de tu nombre revelan lo que tu alma vino a experimentar. Aprende a calcular tu Anhelo del Alma paso a paso.',
    date: '2026-05-12',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Nombre-750x375.webp',
    category: 'Significado de los Números',
    tags: ['número del alma', 'nombre', 'vocales'],
    relatedSlugs: ['para-que-sirve-la-numerologia', 'nacer-un-dia-11-o-29'],
    relatedTools: [
      { href: '/numerodelalma', title: 'Calcula tu Número del Alma', description: 'Lo que tu corazón anhela.' },
      { href: '/calculadoras/expresion', title: 'Tus números del nombre', description: 'Expresión, alma y personalidad.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/como-calcular-el-numero-de-nuestra-alma/',
    html: `
<p>Las vocales de tu nombre guardan una de las informaciones más valiosas de tu numerología: revelan lo que tu alma vino a experimentar en esta vida. El número que resulta de sumarlas se conoce como el Anhelo del Alma.</p>
<h2>Qué es el Número del Alma</h2>
<p>Es la suma de las vocales de tu nombre y tus apellidos. Representa tu fuerza interior y la manera en que piensas, sientes y actúas desde lo más profundo de ti.</p>
<h2>Cómo se calcula</h2>
<p>A cada letra se le asigna un valor del 1 al 9, con los números maestros 11 y 22 como excepción. Para el Número del Alma se suman únicamente las vocales de tu nombre completo y se reduce el total a un solo dígito, salvo que el resultado sea 11 o 22.</p>
<h2>Un ejemplo</h2>
<p>En un nombre como "Luis Carlos", se toman las vocales (U, I, O…) y se suman sus valores. Si el total fuera 42, se reduce: 4 + 2 = 6. Estaríamos ante un Alma 6, protectora y entregada a la familia.</p>
<h2>Los Números del Alma</h2>
<p>Cada número describe un anhelo distinto: del Alma 1 (independencia) al Alma 9 (solidaridad), pasando por la sabiduría del 11 y la maestría del 22. Ninguno es mejor que otro: cada uno es una forma de buscar la plenitud.</p>
<p>Hazlo automático: usa la <a href="/numerodelalma">calculadora del Número del Alma</a> o explora todos tus <a href="/calculadoras/expresion">números del nombre</a> de una sola vez.</p>
`
  },
  {
    slug: 'ano-personal-que-es-y-como-se-calcula',
    title: 'Año Personal: qué es y cómo se calcula',
    excerpt:
      'Tu Año Personal es la energía que te acompaña todo el año. Saber cuál es te permite anticipar decisiones y avanzar con dirección.',
    date: '2026-01-08',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Mes-Personal-750x375.webp',
    category: 'Horóscopo para tu Año Personal',
    tags: ['año personal', 'ciclos'],
    relatedSlugs: ['para-que-sirve-la-numerologia', 'como-calcular-el-numero-del-alma'],
    relatedTools: [
      { href: '/anopersonal', title: 'Calcula tu Año Personal', description: 'El tema central de tu año.' },
      { href: '/labrujulanumerologica', title: 'La Brújula Numerológica', description: 'Tu año, mes, semana y día.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/numerologia-cotidiana-horoscopo-ano-personal/',
    html: `
<p>El Año Personal es la vibración numerológica que te acompaña durante todo un año, del 1 de enero al 31 de diciembre. Saber cuál es te permite anticipar tus decisiones y avanzar con dirección, en lugar de ser "vivido por la vida".</p>
<h2>Qué es el Año Personal</h2>
<p>Es la energía individual que cambia cada año dentro de un ciclo de nueve. Cada año trae una lección distinta que, al vivirla con conciencia, te acerca a dominar tu propia historia.</p>
<h2>Ciclos de nueve años</h2>
<p>La vida se mueve en ciclos de 9 años. Cada ciclo retoma los mismos temas con mayor profundidad, hasta que te conviertes en maestro de tu propia lección.</p>
<h2>Cómo se calcula</h2>
<p>Suma el día y el mes de tu nacimiento con el año en curso y reduce el resultado a un dígito. Ese número es tu Año Personal para ese año.</p>
<h2>De la iniciación al cierre</h2>
<p>Cada número marca una etapa: el 1 inicia, el 5 libera, el 8 materializa y el 9 cierra el ciclo. Conocer tu año te da una hoja de ruta emocional y práctica para tomar mejores decisiones.</p>
<p>Descubre el tuyo ahora con la <a href="/anopersonal">calculadora de Año Personal</a> o míralo junto a tu mes y tu día en <a href="/labrujulanumerologica">La Brújula Numerológica</a>.</p>
`
  },
  {
    slug: 'nacer-un-dia-11-o-29',
    title: 'La diferencia de nacer un día 11 o 29',
    excerpt:
      'Aunque ambos reducen a 2, nacer un día 11 o un día 29 no es lo mismo. Te explicamos la diferencia entre estas vibraciones.',
    date: '2026-03-20',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Casas-750x375.webp',
    category: 'Secretos Revelados',
    tags: ['números maestros', 'día de nacimiento'],
    relatedSlugs: ['ano-personal-que-es-y-como-se-calcula', 'como-calcular-el-numero-del-alma'],
    relatedTools: [
      { href: '/significadodelosnumeros', title: 'Significado de los números', description: 'La esencia de cada vibración.' },
      { href: '/calculatupinaculo', title: 'Calcula tu pináculo', description: 'Tu mapa numerológico completo.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/la-diferencia-de-nacer-un-dia-11-o-29/',
    html: `
<p>Nacer un día 11 o un día 29 no es lo mismo, aunque ambos reduzcan al número 2. La diferencia está en la energía que cada uno carga y en la forma en que la expresas.</p>
<h2>El número 11: inteligencia y sensibilidad</h2>
<p>Es un número maestro. Habla de una gran capacidad intelectual y emocional, de la facultad de inspirar a otros y de crear conciencia colectiva. Su reto son las oscilaciones emocionales, que conviene aprender a equilibrar.</p>
<h2>El número 29: inspiración desde adentro</h2>
<p>Se compone de un 2 y un 9. El 2 aporta diplomacia, paz y cualidades conciliadoras; el 9 suma carisma y espíritu aventurero. Es una vibración profundamente espiritual e inspiradora, a menudo malinterpretada, con un equilibrio emocional mayor gracias a la influencia del 2.</p>
<h2>Dos caminos hacia el 2</h2>
<p>Mientras el 11 busca la maestría y la especialización, el 29 combina diplomacia con autonomía. El 11 inspira de forma directa; el 29 lo hace desde su mundo interior, con más serenidad.</p>
<p>Explora qué significan tus números maestros en el <a href="/significadodelosnumeros">significado de los números</a> o revela tu mapa completo en <a href="/calculatupinaculo">tu pináculo personal</a>.</p>
`
  },
  {
    slug: 'como-se-relacionan-los-numeros-en-pareja',
    title: '¿Cómo se relacionan los números en pareja?',
    excerpt:
      'La sinastría numerológica te muestra dónde habrá armonía y dónde fricción en una relación, y cómo aprovecharlo.',
    date: '2026-02-14',
    author: 'Laura L. Rodríguez',
    image: '/images/feliz-cumpleanos.png',
    category: 'Amor',
    tags: ['pareja', 'compatibilidad', 'amor'],
    relatedSlugs: ['ano-personal-que-es-y-como-se-calcula', 'para-que-sirve-la-numerologia'],
    relatedTools: [
      { href: '/calculadoras/compatibilidad', title: 'Calcula tu compatibilidad', description: 'La afinidad entre dos personas.' },
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida', description: 'El punto de partida de tu carta.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/como-se-relacionan-los-numeros-en-pareja/',
    html: `
<p>La sinastría numerológica estudia la compatibilidad entre dos personas. Aunque se usa sobre todo en el amor, sirve para cualquier vínculo: padres e hijos, socios, jefe y colaborador o amistades.</p>
<h2>Cómo se calcula el número de pareja</h2>
<p>Suma el día de nacimiento de ambas personas y reduce el resultado a un dígito (excepto 11 y 22). Por ejemplo, alguien que nace el 16 y alguien que nace el 17 suman 33, que se reduce a 6: ese es el número de la pareja.</p>
<h2>Pareja natural</h2>
<p>Hay una conexión instantánea y una comprensión que fluye sola. Suelen entenderse casi sin palabras desde el primer encuentro.</p>
<h2>Pareja compatible</h2>
<p>Se complementan y se apoyan. Aprenden a negociar y a estar de acuerdo incluso en los desacuerdos, aunque la conexión no sea inmediata.</p>
<h2>Pareja de desafío y pareja neutral</h2>
<p>La pareja de desafío es un gran reto: pide tolerancia y paciencia, y a cambio puede traer mucha pasión. La pareja neutral (como el 8 con el 1 o el 5) funciona bien al inicio, pero necesita pactos claros para no volverse volátil.</p>
<p>Descubre tu afinidad en la <a href="/calculadoras/compatibilidad">calculadora de compatibilidad</a> y conoce primero tu <a href="/calculadoras/camino-de-vida">camino de vida</a>.</p>
`
  },
  {
    slug: 'numerologia-para-el-exito-de-tu-negocio',
    title: 'Numerología para el éxito de tu negocio',
    excerpt:
      'El nombre y la fecha de tu empresa cargan una vibración. Alinéalos con la numerología para abrir el camino al éxito.',
    date: '2026-04-02',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Casas-750x375.webp',
    category: 'El Blog de la Numerología',
    tags: ['negocios', 'éxito', 'nombre'],
    relatedSlugs: ['para-que-sirve-la-numerologia', 'numero-personal-tu-esencia'],
    relatedTools: [
      { href: '/numerodelnombre', title: 'Número del nombre', description: 'La vibración de un nombre.' },
      { href: '/calculatupinaculo', title: 'Calcula tu pináculo', description: 'Tu mapa de fortalezas.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/como-volver-tu-negocio-un-exito/',
    html: `
<p>Hay personas que trabajan sin descanso, con inteligencia y disciplina, y aun así no alcanzan la estabilidad que buscan. ¿Qué falta para que el esfuerzo se convierta en resultados?</p>
<h2>La numerología como herramienta de negocio</h2>
<p>Desde hace siglos, la numerología se usa para armonizar las energías de empresas, proyectos y eventos. Hoy muchas organizaciones eligen el nombre y la fecha de lanzamiento de sus negocios con esta herramienta para favorecer el éxito.</p>
<h2>Analiza a tu equipo y a tus socios</h2>
<p>Un análisis numerológico revela fortalezas y debilidades de una sociedad, si es buen momento para iniciar y cómo repartir responsabilidades según las capacidades de cada integrante.</p>
<h2>El poder del nombre y la fecha</h2>
<p>Un nombre y una fecha con una vibración armoniosa abren mejores oportunidades. Al elegir o ajustar el nombre conviene pensar en la meta del negocio, qué aporta, qué vende y a quién.</p>
<h2>La energía del nacimiento de tu empresa</h2>
<p>Como las personas, toda empresa nace con energías propias el día de su creación. Elegir la mejor fecha de lanzamiento ayuda a que el proyecto avance con fluidez y menos obstáculos.</p>
<p>Empieza por la vibración de tu marca con el <a href="/numerodelnombre">número del nombre</a> y revela tus fortalezas en <a href="/calculatupinaculo">tu pináculo</a>.</p>
`
  },
  {
    slug: '2026-ano-universal-1',
    title: '2026: Año Universal 1, el inicio de un nuevo ciclo',
    excerpt:
      'El 2026 es un Año Universal 1: la energía mundial de los nuevos comienzos, la independencia y la iniciativa.',
    date: '2026-01-02',
    author: 'Laura L. Rodríguez',
    image: '/images/pinnacle-pre.webp',
    category: 'Horóscopos Numerológicos',
    tags: ['año universal', '2026', 'ciclos'],
    relatedSlugs: ['ano-personal-que-es-y-como-se-calcula', 'para-que-sirve-la-numerologia'],
    relatedTools: [
      { href: '/vibracionescolectivas', title: 'Vibraciones colectivas', description: 'La energía universal de hoy.' },
      { href: '/anopersonal', title: 'Tu año personal', description: 'Tu energía dentro del año.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/2026-ano-universal-1/',
    html: `
<p>Además de tu Año Personal, existe una energía que vivimos todos a la vez: el Año Universal. En 2026 es un 1, el número de los comienzos.</p>
<h2>Qué es un Año Universal</h2>
<p>Es la energía que comparte todo el planeta durante un año. Se calcula sumando los dígitos del año: 2 + 0 + 2 + 6 = 10, y 1 + 0 = 1.</p>
<h2>2026: empieza un nuevo ciclo</h2>
<p>El Año Universal 1 abre un ciclo mundial de nueve años. Su energía se centra en la independencia, la iniciativa, el logro y la creatividad individual. El arranque puede ser lento, pero el cambio se vuelve tangible poco a poco.</p>
<h2>Cinco claves para aprovecharlo</h2>
<p>Piensa a largo plazo (lo que decidas marcará nueve años), fortalece tu independencia sin caer en el egoísmo, cierra la transición que venías arrastrando, responde con liderazgo y atrévete a experimentar.</p>
<h2>El reto del 1</h2>
<p>La energía del 1 también puede traer egoísmo, baja autoestima o victimización. Recuerda que incluso los tropiezos sirven para descubrir tu mejor camino.</p>
<p>Mira la energía colectiva de hoy en <a href="/vibracionescolectivas">vibraciones colectivas</a> y compárala con tu <a href="/anopersonal">año personal</a>.</p>
`
  },
  {
    slug: 'numero-personal-tu-esencia',
    title: 'El Número Personal: tu esencia sin máscaras',
    excerpt:
      'El número personal es el director de orquesta de tu carta: revela tu identidad más íntima y matiza todos tus demás números.',
    date: '2026-05-28',
    author: 'Laura L. Rodríguez',
    image: '/images/pinnacle.png',
    category: 'Significado de los Números',
    tags: ['número personal', 'día de nacimiento', 'esencia'],
    relatedSlugs: ['como-calcular-el-numero-del-alma', 'nacer-un-dia-11-o-29'],
    relatedTools: [
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida', description: 'Tu propósito esencial.' },
      { href: '/labrujulanumerologica', title: 'La Brújula Numerológica', description: 'Tus vibraciones de tiempo.' }
    ],
    sourceUrl: 'https://numerologia-cotidiana.com/numerologia-personal/',
    html: `
<p>El número personal revela tu verdadera esencia: esas características que solo conocen quienes están muy cerca de ti, tu identidad sin máscaras. Es el director de orquesta de todos los números de tu carta.</p>
<h2>Qué es el número personal</h2>
<p>Es la vibración central de tu personalidad. Igual que el Sol en el centro del sistema, matiza y da color a todos los demás números de tu cuadro numerológico.</p>
<h2>Cómo se calcula</h2>
<p>Suma los dígitos de tu día de nacimiento hasta reducirlo a una cifra, del 1 al 9. La excepción son el 11 y el 22, números maestros que conservan sus dos dígitos.</p>
<h2>Por qué es tan importante</h2>
<p>Trabajar este número en su polaridad positiva te acerca, poco a poco, a tu felicidad y a tu misión de vida. Es el factor central de tu conciencia.</p>
<h2>Reinventarte</h2>
<p>Llegar a tu realización implica revisar creencias que adquiriste en la infancia. Conocer tu número personal es el primer paso para construir tu identidad con intención.</p>
<p>Calcula la base de tu carta con tu <a href="/calculadoras/camino-de-vida">camino de vida</a> y ve todas tus energías en <a href="/labrujulanumerologica">La Brújula Numerológica</a>.</p>
`
  },
  {
    slug: 'numeros-maestros-11-22-33',
    title: 'Números maestros 11, 22 y 33: significado y misión',
    excerpt:
      'Qué son los números maestros, qué representa cada uno (11, 22 y 33) y cómo se viven en la práctica, con su potencial y su lado de reto.',
    date: '2026-05-02',
    author: 'Laura L. Rodríguez',
    image: '/images/pinnacle-pre.webp',
    category: 'Significado de los Números',
    tags: ['números maestros', '11', '22', '33'],
    relatedSlugs: ['nacer-un-dia-11-o-29', 'numero-personal-tu-esencia'],
    relatedTools: [
      { href: '/explora', title: 'Explora por número', description: 'Descubre cada número a fondo.' },
      { href: '/significadodelosnumeros', title: 'Significado de los números', description: 'La esencia del 1 al 33.' }
    ],
    sourceUrl: '',
    html: `
<p>Los números maestros —11, 22 y 33— son los más poderosos de la numerología. No se reducen a un solo dígito porque vibran en una frecuencia más alta, con un potencial y una exigencia mayores.</p>
<h2>El 11: el inspirador</h2>
<p>El 11 es la intuición del 2 elevada al máximo. Trae sensibilidad, visión espiritual y la misión de iluminar a otros. Su reto es la tensión nerviosa y el exceso de idealismo.</p>
<h2>El 22: el constructor</h2>
<p>El 22 une la visión del 11 con la estructura del 4. Puede convertir grandes sueños en realidades concretas que benefician a muchos. Su misión es construir un legado.</p>
<h2>El 33: el maestro del amor</h2>
<p>El 33 combina la creatividad del 3 con la entrega del 6. Es el maestro del amor incondicional, la enseñanza y la sanación a gran escala.</p>
<h2>Vivir un número maestro</h2>
<p>Tener un número maestro no garantiza nada: es un potencial que se conquista. Mientras no se desarrolla, suele expresarse en su versión reducida (el 11 como 2, el 22 como 4, el 33 como 6).</p>
<p>¿Tienes números maestros en tu carta? Descúbrelo en <a href="/explora">Explora por número</a> o calcula tu <a href="/calculadoras/camino-de-vida">camino de vida</a>.</p>
`
  },
  {
    slug: 'como-calcular-numero-del-nombre',
    title: 'Cómo calcular el número de tu nombre paso a paso',
    excerpt:
      'El número del nombre (o de expresión) revela tus talentos y tu destino. Aprende a calcularlo paso a paso, con calculadora incluida.',
    date: '2026-04-18',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Nombre-750x375.webp',
    category: 'Significado de los Números',
    tags: ['número del nombre', 'expresión', 'nombre'],
    relatedSlugs: ['como-calcular-el-numero-del-alma', 'que-es-el-pinaculo-numerologico'],
    relatedTools: [
      { href: '/numerodelnombre', title: 'Calcula tu número del nombre', description: 'Hazlo al instante.' },
      { href: '/calculadoras/expresion', title: 'Tus números del nombre', description: 'Expresión, alma y personalidad.' }
    ],
    sourceUrl: '',
    html: `
<p>El número del nombre —también llamado número de expresión o de destino— resume tus talentos naturales y la forma en que te muestras al mundo. Se obtiene de todas las letras de tu nombre completo.</p>
<p>Aquí aprenderás a calcularlo paso a paso y podrás obtenerlo al instante con la calculadora incluida.</p>
`
  },
  {
    slug: 'que-es-el-pinaculo-numerologico',
    title: 'Qué es el pináculo numerológico y cómo leerlo',
    excerpt:
      'El pináculo es el mapa más completo de tu numerología: ciclos de vida, metas y lecciones. Te explicamos qué es y cómo interpretarlo, con calculadora.',
    date: '2026-03-05',
    author: 'Laura L. Rodríguez',
    image: '/images/pinnacle.png',
    category: 'El Blog de la Numerología',
    tags: ['pináculo', 'mapa numerológico', 'ciclos'],
    relatedSlugs: ['numero-personal-tu-esencia', 'numero-de-la-madurez'],
    relatedTools: [
      { href: '/calculatupinaculo', title: 'Calcula tu pináculo', description: 'Tu mapa completo en números.' },
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida', description: 'La base de tu carta.' }
    ],
    sourceUrl: '',
    html: `
<p>El pináculo es el estudio más completo de tu numerología: reúne tus números base, tus cuatro ciclos de vida, tus metas y tus lecciones a partir de tu fecha de nacimiento.</p>
<p>En esta guía verás qué significa cada parte y cómo leer tu pináculo, con una calculadora para obtener el tuyo.</p>
`
  },
  {
    slug: 'numero-de-la-madurez',
    title: 'El número de la madurez: tu propósito en la segunda mitad de la vida',
    excerpt:
      'El número de la madurez combina tu camino de vida y tu expresión para mostrar hacia dónde madura tu propósito. Calcúlalo y descubre tu meta de fondo.',
    date: '2026-02-26',
    author: 'Laura L. Rodríguez',
    image: '/images/Head-Mes-Personal-750x375.webp',
    category: 'Significado de los Números',
    tags: ['número de la madurez', 'propósito'],
    relatedSlugs: ['que-es-el-pinaculo-numerologico', 'para-que-sirve-la-numerologia'],
    relatedTools: [
      { href: '/numerodelamadurez', title: 'Calcula tu madurez', description: 'Nombre + fecha de nacimiento.' },
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida', description: 'Uno de sus ingredientes.' }
    ],
    sourceUrl: '',
    html: `
<p>El número de la madurez combina tu camino de vida y tu número de expresión para mostrar hacia dónde madura tu propósito, sobre todo a partir de la segunda mitad de la vida.</p>
<p>Es la meta que se va revelando con los años. Aquí te explicamos cómo se calcula y qué significa, con calculadora incluida.</p>
`
  },
  {
    slug: 'numerologia-y-abundancia',
    title: 'Numerología y abundancia: el número 8 y el dinero',
    excerpt:
      'Tu relación con el dinero también tiene numerología. Descubre la energía del 8, cómo prospera cada número y el papel del nombre y la fecha en los negocios.',
    date: '2026-01-22',
    author: 'Laura L. Rodríguez',
    image: '/images/feliz-cumpleanos.png',
    category: 'El Blog de la Numerología',
    tags: ['abundancia', 'dinero', 'número 8', 'negocios'],
    relatedSlugs: ['numerologia-para-el-exito-de-tu-negocio', 'para-que-sirve-la-numerologia'],
    relatedTools: [
      { href: '/calculadoras/camino-de-vida', title: 'Tu camino de vida', description: 'Tu forma natural de prosperar.' },
      { href: '/significadodelosnumeros', title: 'Significado de los números', description: 'La energía de cada cifra.' }
    ],
    sourceUrl: '',
    html: `
<p>El dinero también tiene numerología. Más allá del esfuerzo, tu relación con la abundancia está teñida por tus números —y el 8 es la energía que mejor la representa.</p>
<h2>El 8: la energía del poder y la abundancia</h2>
<p>El 8 rige el mundo material: los negocios, la organización, el logro y el dinero. Quien lo trabaja bien tiene visión para generar riqueza; su sombra es la obsesión por el control o el estatus.</p>
<h2>No necesitas ser un 8 para prosperar</h2>
<p>Cada número tiene su camino hacia la abundancia: el 1 emprende, el 3 crea, el 6 sirve, el 9 da. Lo importante es alinear tu forma de generar dinero con tu energía natural.</p>
<h2>El nombre y la fecha de tu negocio</h2>
<p>En numerología, el nombre y la fecha de inicio de un proyecto cargan una vibración que puede favorecer o frenar su éxito. Por eso muchas empresas eligen ambos con cuidado.</p>
<h2>Tu año personal y el dinero</h2>
<p>Hay años para sembrar y años para cosechar. Conocer tu año personal te ayuda a saber cuándo invertir, cuándo consolidar y cuándo esperar.</p>
<p>Empieza por tu <a href="/calculadoras/camino-de-vida">camino de vida</a> y revisa el <a href="/significadodelosnumeros">significado de los números</a> para entender tu relación con la abundancia.</p>
`
  }
]

export function getSamplePosts(): SamplePost[] {
  return SAMPLE_POSTS
}

export function getSamplePost(slug: string): SamplePost | undefined {
  return SAMPLE_POSTS.find((post) => post.slug === slug)
}

export function getRelatedSamplePosts(slug: string): SamplePost[] {
  const post = getSamplePost(slug)
  if (!post) return []
  return post.relatedSlugs
    .map((relatedSlug) => getSamplePost(relatedSlug))
    .filter((value): value is SamplePost => Boolean(value))
}
