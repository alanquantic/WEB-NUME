import type { ReactNode } from 'react'

export type ContentTemplateConfig = {
  banner: {
    eyebrow?: string
    title: string
    description?: string
    imageSrc: string
  }
  sidebar: {
    title?: string
  }
  content: ReactNode
}

const DEFAULT_BANNER_IMAGE = '/images/Head-Mes-Personal-750x375.webp'
const DEFAULT_SIDEBAR_TITLE = 'Concepto Numerológico'

function createTemplate(
  title: string,
  description: string,
  content: ReactNode,
  eyebrow = 'Numerología Cotidiana'
): ContentTemplateConfig {
  return {
    banner: {
      eyebrow,
      title,
      description,
      imageSrc: DEFAULT_BANNER_IMAGE
    },
    sidebar: {
      title: DEFAULT_SIDEBAR_TITLE
    },
    content
  }
}

export const CONTENT_PAGE_TEMPLATES: Record<string, ContentTemplateConfig> = {
  labrujulanumerologica: createTemplate(
    'La Brújula Numerológica',
    'Una guía para comprender los ciclos del tiempo y alinear decisiones con la vibración numérica activa.',
    <>
      <h2>¿Cómo funciona la Brújula Numerológica?</h2>
      <p>
        La Brújula Numerológica propone entender el tiempo como una secuencia de vibraciones que
        influyen en el aprendizaje, los cambios y el ritmo con el que se desarrollan los procesos
        personales. La idea central es que el futuro no se vive como algo rígido, sino como un
        trayecto que puede leerse con mayor claridad cuando comprendemos la información codificada
        en la fecha de nacimiento y en el nombre.
      </p>
      <p>
        Desde esta perspectiva, la numerología sirve como una herramienta de orientación. Ayuda a
        reconocer momentos apropiados para iniciar, ordenar, consolidar, soltar o reajustar. También
        permite observar patrones que se repiten en el tiempo y darles un sentido práctico dentro de
        la vida cotidiana.
      </p>

      <h2>Viaje de evolución del alma</h2>
      <p>
        El recorrido personal se entiende como un viaje de evolución donde cada etapa abre aprendizajes
        específicos. La lectura de esos ciclos busca ofrecer visión, ubicación y una referencia útil
        para tomar decisiones con mayor consciencia.
      </p>

      <h2>Vibraciones de tiempo</h2>
      <p>
        Las vibraciones del tiempo se organizan en períodos distintos. Cada uno activa energías
        particulares que afectan la manera en la que se presentan oportunidades, desafíos, cierres y
        procesos de transformación.
      </p>
      <ul>
        <li>Las etapas de vida muestran grandes aprendizajes que se activan por períodos amplios.</li>
        <li>El año personal indica la lección principal que se desarrolla durante doce meses.</li>
        <li>El mes personal señala la prueba o enfoque activo dentro del año.</li>
        <li>La semana personal funciona como herramienta de realización y ajuste.</li>
        <li>El día personal marca el pulso inmediato de la acción cotidiana.</li>
      </ul>

      <p>
        Vista en conjunto, esta brújula se convierte en un mapa para sincronizar metas, decisiones y
        esfuerzos con la energía disponible en cada tramo del camino.
      </p>
    </>,
    'Vibraciones de Tiempo'
  ),
  etapapersonal: createTemplate(
    'Etapa Personal',
    'Las etapas personales muestran el curso de acción y los grandes aprendizajes que se activan en distintos momentos de la vida.',
    <>
      <h2>¿Cuál es el curso de acción que te propone la vida?</h2>
      <p>
        Las etapas personales describen el tipo de aprendizaje que la vida pone al frente durante
        períodos concretos. Se entienden como realizaciones o estaciones del proceso evolutivo, donde
        cada fase invita a integrar cualidades específicas, corregir lo pendiente y desarrollar una
        versión más consciente del propio potencial.
      </p>

      <h2>¿Cómo funcionan las Etapas Personales?</h2>
      <p>
        Dentro del pináculo se establecen cuatro grandes etapas de vida. Las primeras tres pueden
        reaparecer en dos momentos distintos del recorrido personal: una vez para aprender y otra para
        reparar o completar desde un nivel mayor de consciencia aquello que quedó pendiente.
      </p>
      <p>
        Por esa razón, el proyecto evolutivo se vive como una secuencia amplia de estaciones con una
        duración particular y con lecciones muy definidas.
      </p>

      <h2>Las cuatro realizaciones</h2>
      <ul>
        <li>
          <strong>Primera realización:</strong> corresponde al aprendizaje formativo y a la base con la
          que se construyen los primeros años.
        </li>
        <li>
          <strong>Segunda realización:</strong> suele concentrar una etapa intensa de producción,
          decisión y aplicación de lo aprendido.
        </li>
        <li>
          <strong>Tercera realización:</strong> abre un período de culminaciones, redefiniciones y
          ajustes para encaminarse a la realización final.
        </li>
        <li>
          <strong>Cuarta realización:</strong> se vincula con la cosecha de vida, el destino y la
          expresión madura de las metas más profundas.
        </li>
      </ul>

      <p>
        Conocer la etapa activa ayuda a entender por qué ciertos temas se repiten y qué dirección
        conviene tomar para crecer sin oponerse al proceso.
      </p>
    </>,
    'Vibraciones de Tiempo'
  ),
  anopersonal: createTemplate(
    'Año Personal',
    'El Año Personal revela la lección principal que se activa durante los 365 días del ciclo anual.',
    <>
      <h2>¿Qué lección voy a vivir este año?</h2>
      <p>
        El Año Personal muestra la tendencia general del año en curso y permite comprender con mayor
        claridad hacia dónde se está moviendo el proceso individual. No se trata solo de una energía
        aislada, sino de una lección que forma parte del ciclo de nueve años que atraviesa cada persona.
      </p>

      <h2>¿Qué es el Año Personal?</h2>
      <p>
        Es la vibración numerológica que corresponde de forma individual a cada persona a lo largo del
        año. Esa vibración señala el aprendizaje activo, el tipo de experiencias que se intensifican y
        el modo en que se enlazan los acontecimientos con el tema principal del ciclo.
      </p>
      <p>
        Una vez concluido el período anual, la persona avanza a la siguiente lección. La manera en que
        se haya vivido el aprendizaje influye en la forma en que fluye el año posterior.
      </p>

      <h2>Alineación del ciclo anual</h2>
      <p>
        Los años personales avanzan en secuencias de nueve. Eso quiere decir que ciertos temas se
        repiten, pero cada vez en un nivel distinto de profundidad y conciencia. Así, una misma lección
        puede volver más adelante con nuevos matices, nuevas exigencias y una comprensión más madura.
      </p>

      <ul>
        <li>El ciclo anual dura del 1 de enero al 31 de diciembre.</li>
        <li>Marca inicios, cambios, esfuerzos, consolidaciones, cierres y aprendizajes.</li>
        <li>Sirve como referencia para planear acciones con más claridad y realismo.</li>
      </ul>
    </>,
    'Vibraciones de Tiempo'
  ),
  mespersonal: createTemplate(
    'Mes Personal',
    'El Mes Personal muestra la prueba activa y el enfoque que necesita atención durante cada tramo mensual.',
    <>
      <h2>¿Cuál es mi prueba durante el mes?</h2>
      <p>
        El Mes Personal invita a trabajar de manera cíclica las vibraciones del 1 al 9 y los números
        maestros 11 y 22. Ese patrón mensual se calcula a partir del Año Personal, por lo que la
        energía de un mismo mes no es igual para todas las personas.
      </p>
      <p>
        La vibración activa del mes señala el área de la vida que conviene observar, la clase de
        maestros o situaciones que pueden aparecer y el aprendizaje que necesita ser atendido en ese
        momento.
      </p>

      <h2>¿Qué es el Mes Personal?</h2>
      <p>
        Es la energía que vibra de forma personal durante los 30 o 31 días del mes. Se relaciona con
        el tema que cada persona necesita atravesar para avanzar en su proceso anual de evolución.
      </p>

      <h2>Lecciones mensuales</h2>
      <ul>
        <li>El 1 impulsa independencia, liderazgo y poder personal.</li>
        <li>El 2 trabaja integración, equilibrio y relaciones.</li>
        <li>El 3 favorece expresión, creatividad y diversificación.</li>
        <li>El 4 pide orden, estructura y construcción.</li>
        <li>El 5 activa cambios, movimiento y expansión.</li>
        <li>El 6 fortalece cuidado, vínculos y responsabilidad afectiva.</li>
        <li>El 7 profundiza en especialización, introspección y sabiduría.</li>
        <li>El 8 empuja a invertir recursos, asumir autoridad y materializar.</li>
        <li>El 9 abre cierres, culminaciones y visión humanista.</li>
        <li>El 11 inspira creación consciente, guía y expansión interior.</li>
        <li>El 22 se relaciona con propósito, avance y construcción mayor.</li>
      </ul>
    </>,
    'Vibraciones de Tiempo'
  ),
  semanapersonal: createTemplate(
    'Semana Personal',
    'La Semana Personal concentra la herramienta energética más útil para avanzar durante el mes activo.',
    <>
      <h2>La herramienta más potencializada durante la semana</h2>
      <p>
        La energía de la semana personal tiene un carácter individual. Se calcula a partir del año
        personal y actúa como una herramienta concreta para desarrollar la meta anual a través de
        acciones más inmediatas.
      </p>

      <h2>¿Qué es la Semana Personal?</h2>
      <p>
        La Semana Personal resume el tipo de fuerza que se encuentra más disponible en el corto plazo.
        Su función es ayudar a reconocer cómo aprovechar mejor el momento presente dentro del marco del
        mes activo.
      </p>
      <p>
        Aunque a veces se puede coincidir con la energía de otras personas cercanas, lo habitual es que
        cada quien viva un ritmo propio y una herramienta distinta para evolucionar.
      </p>

      <h2>¿Para qué sirve?</h2>
      <ul>
        <li>Para organizar la energía semanal con una intención más precisa.</li>
        <li>Para detectar en qué dirección conviene enfocar decisiones y esfuerzos.</li>
        <li>Para usar con más consciencia talentos que ya están disponibles.</li>
        <li>Para mantener continuidad entre la meta anual y la acción concreta del día a día.</li>
      </ul>
    </>,
    'Vibraciones de Tiempo'
  ),
  vibracionescolectivas: createTemplate(
    'Vibraciones Colectivas',
    'Una lectura del clima numerológico compartido y de las tendencias que afectan al entorno en conjunto.',
    <>
      <h2>¿Qué son las vibraciones colectivas?</h2>
      <p>
        Las vibraciones colectivas describen la energía numérica que se mueve a nivel compartido dentro
        de un día, una semana, un mes o un año. A diferencia de los cálculos personales, este enfoque
        observa el ambiente general y la clase de temas que pueden estar tomando fuerza en el entorno.
      </p>

      <h2>Cómo se interpretan</h2>
      <p>
        Cuando una vibración colectiva cambia, también cambia la manera en la que se manifiestan los
        ritmos sociales, emocionales y organizativos. Hay momentos que favorecen cierres, otros que
        impulsan comienzos, y otros que piden orden, revisión o cooperación.
      </p>
      <p>
        Esta sección se conecta con la lógica general de las vibraciones de tiempo: observar la
        energía disponible para comprender mejor el contexto y actuar con mayor sincronía.
      </p>

      <h2>Aplicación práctica</h2>
      <ul>
        <li>Ayuda a leer el tono general del momento que vive una comunidad o grupo.</li>
        <li>Complementa la interpretación del Año, Mes, Semana y Día Personal.</li>
        <li>Sirve para entender por qué ciertos temas colectivos toman tanta fuerza al mismo tiempo.</li>
      </ul>

      <p>
        Este contenido fue adaptado por inferencia editorial porque la página original estaba protegida
        por una verificación externa al momento de la extracción.
      </p>
    </>,
    'Vibraciones de Tiempo'
  ),
  significadodelosnumeros: createTemplate(
    'Significado de los Números',
    'Una puerta de entrada para explorar cómo la numerología interpreta la fecha de nacimiento y el nombre.',
    <>
      <h2>Fecha de nacimiento y nombre</h2>
      <p>
        Esta página funciona como un índice temático. Reúne los conceptos numerológicos más importantes
        asociados tanto a la fecha de nacimiento como al nombre, mostrando que cada bloque de información
        responde a un aspecto distinto del desarrollo personal.
      </p>

      <h2>Lo que se estudia desde la fecha de nacimiento</h2>
      <ul>
        <li>Número Personal</li>
        <li>Karma</li>
        <li>Vida Pasada</li>
        <li>Personalidad</li>
        <li>Realización</li>
        <li>Reto o Meta</li>
        <li>Destino, Sombra, Ser Inferior y otras claves complementarias</li>
      </ul>

      <h2>Lo que se estudia desde el nombre</h2>
      <ul>
        <li>Significado del nombre</li>
        <li>Número del Alma</li>
        <li>Expresión del Alma</li>
        <li>Número de Madurez</li>
        <li>Número ausente</li>
        <li>Karma del nombre</li>
      </ul>

      <p>
        Más que ofrecer una sola definición, esta sección organiza las rutas de lectura para que cada
        usuario profundice en el aspecto que necesita interpretar dentro de su mapa numerológico.
      </p>
    </>,
    'Numerología Nombre'
  ),
  numerodelalma: createTemplate(
    'Número del Alma',
    'El Número del Alma se vincula con la misión interior, la familia espiritual y la intención profunda del ser.',
    <>
      <h2>Contrato espiritual y sentido interno</h2>
      <p>
        El Número del Alma se relaciona con la misión espiritual y con el tipo de aprendizaje que el
        ser necesita desarrollar desde su centro. No solo habla del proyecto personal, sino de la
        manera en que ese proyecto se enlaza con una red más amplia de propósito y evolución.
      </p>
      <p>
        Desde esta mirada, vivir lejos de la voz del alma genera insatisfacción y una sensación de
        desconexión. Escucharla, en cambio, ayuda a comprender qué necesita expresarse y hacia dónde
        conviene dirigir la energía vital.
      </p>

      <h2>Tendencias por vibración</h2>
      <ul>
        <li>El Alma 1 busca independencia, autoafirmación y fuerza de voluntad.</li>
        <li>El Alma 2 aprende integración, sensibilidad y equilibrio.</li>
        <li>El Alma 3 se expande a través de la expresión, la comunicación y el brillo.</li>
        <li>El Alma 4 tiende al trabajo, la estructura y la estabilidad.</li>
        <li>El Alma 5 necesita libertad, cambio y movimiento.</li>
        <li>El Alma 6 se orienta al cuidado, el hogar y la responsabilidad afectiva.</li>
        <li>El Alma 7 profundiza en perfección, conocimiento y búsqueda interior.</li>
        <li>El Alma 8 activa ambición, construcción y dirección de proyectos.</li>
        <li>El Alma 9 se relaciona con servicio, inspiración y guía.</li>
      </ul>

      <p>
        En todos los casos, la vibración del alma se interpreta como una brújula del propósito interno
        y de la clase de plenitud que la persona viene a construir.
      </p>
    </>,
    'Numerología Nombre'
  ),
  numerodeexpresiondelalma: createTemplate(
    'Número de Expresión del Alma',
    'La expresión del alma muestra cómo se manifiesta hacia afuera la energía interior y de qué manera busca realizarse.',
    <>
      <h2>¿Qué revela la expresión del alma?</h2>
      <p>
        La expresión del alma puede entenderse como la forma visible de la energía interna. Si el alma
        marca la intención profunda, la expresión muestra cómo esa intención busca salir al mundo a
        través de talentos, capacidades, lenguaje y forma de actuar.
      </p>

      <h2>Puente entre interior y acción</h2>
      <p>
        Esta lectura ayuda a reconocer si la persona está expresando con claridad lo que realmente es
        o si existe una distancia entre su impulso interno y la manera en la que se mueve en la vida.
      </p>
      <ul>
        <li>Puede señalar habilidades comunicativas, creativas, prácticas o directivas.</li>
        <li>También muestra retos ligados a la forma de presentarse, decidir y relacionarse.</li>
        <li>Ayuda a convertir el potencial interno en una presencia más coherente y funcional.</li>
      </ul>

      <p>
        Este contenido fue adaptado por inferencia editorial porque la página original estaba protegida
        por una verificación externa al momento de la extracción.
      </p>
    </>,
    'Numerología Nombre'
  ),
  numerodelamadurez: createTemplate(
    'Número de la Madurez',
    'El Número de la Madurez se relaciona con cualidades que florecen con más fuerza en la segunda mitad de la vida.',
    <>
      <h2>La conquista tardía de la propia fuerza</h2>
      <p>
        El Número de la Madurez señala aprendizajes, habilidades o metas que suelen consolidarse más
        adelante en la vida. Se asocia con una etapa donde la persona tiene la oportunidad de conquistar
        con mayor claridad aquello que antes parecía lejano, difícil o insuficientemente desarrollado.
      </p>

      <h2>¿Qué representa?</h2>
      <p>
        Esta vibración se entiende como una recompensa ligada al ejercicio de la voluntad, la fortaleza
        de carácter y la honestidad interior. También marca un momento de revisión profunda: dejar
        excusas, asumir responsabilidad y tomar decisiones alineadas con lo que realmente se desea.
      </p>

      <h2>Temas que puede activar</h2>
      <ul>
        <li>Estabilidad emocional y seguridad económica.</li>
        <li>Libertad, independencia e individualidad.</li>
        <li>Construcción de raíces y cimientos sólidos.</li>
        <li>Reconocimiento, brillo personal y expresión auténtica.</li>
      </ul>

      <p>
        La interpretación práctica consiste en reconocer qué área necesita madurar para que la segunda
        mitad de la vida se viva con mayor sentido, dirección y plenitud.
      </p>
    </>,
    'Numerología Nombre'
  ),
  significadodeletras: createTemplate(
    'Significado de Letras',
    'Cada letra del nombre aporta una vibración que influye en la manera de iniciar, responder y aprender en la vida.',
    <>
      <h2>La fuerza de la primera inicial</h2>
      <p>
        La lectura de letras parte de la idea de que el nombre no solo identifica: también organiza
        una secuencia de aprendizaje. La primera letra tiene un peso especial porque es la vibración
        que más se repite en la escucha cotidiana y, por lo tanto, influye con fuerza en la forma de
        iniciar, reaccionar y asumir los retos.
      </p>

      <h2>Cómo se interpreta</h2>
      <p>
        Cada letra equivale a un valor numérico y a una energía simbólica. Esa vibración puede
        reflejar estilo de acción, sensibilidad, forma de pensar, tipo de impulso o manera de
        relacionarse con el entorno.
      </p>

      <h2>Ejemplos de significado</h2>
      <ul>
        <li>Algunas letras se asocian con independencia, cambio y voluntad.</li>
        <li>Otras hablan de emotividad, vínculos, responsabilidad o intuición.</li>
        <li>También existen letras ligadas a prosperidad, reconocimiento o pruebas exigentes.</li>
      </ul>

      <p>
        Comprender la vibración de las letras ayuda a dirigir mejor el enfoque personal y a reconocer
        qué tipo de energía se activa con más naturalidad en el propio nombre.
      </p>
    </>,
    'Numerología Nombre'
  )
}
