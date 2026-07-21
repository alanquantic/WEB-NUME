import type { ReactNode } from 'react'

// Contenido informativo de la página de Pináculo, adaptado del sitio de referencia
// (numerologia-cotidiana.com/pinaculo) al sistema de diseño del proyecto.
// La calculadora vive aparte (components/calculators/pinnacle-calculator) y no se toca aquí.

const PREGUNTAS = [
  '¿Quién fuiste?',
  '¿Quién aparentas ser?',
  '¿Quién realmente eres?',
  '¿Cuál es la misión de tu vida?',
]

const BENEFICIOS = [
  'Establece claramente tus capacidades y habilidades, y aprende a potencializarlas.',
  'Identifica tus 4 realizaciones de vida y las 4 metas que tendrás que superar para llegar a tu destino.',
  'Reconoce tu herida de la infancia para poder sanarla.',
  'Descubre por qué te sientes atraído a cierto tipo de personas.',
  'Reconoce tus debilidades y obstáculos a vencer para poder concientizarlos.',
  'Define el camino y las pruebas de vida que enfrentarás para poder transitarlas exitosamente.',
  'Descubre cuál es la sombra que más te obstaculiza para llegar a tus metas.',
]

const REALIZACIONES = [
  { n: '1ª', t: 'El llamado' },
  { n: '2ª', t: 'El Encuentro con el maestro' },
  { n: '3ª', t: 'El Antídoto' },
  { n: '4ª', t: 'El Destino' },
]

const REPRESENTA = [
  {
    t: 'Una Desprogramación',
    d: 'Soltarás creencias erróneas, miedos heredados y pensamientos limitantes.',
  },
  {
    t: 'Un Aprendizaje',
    d: 'Integrarás conocimientos, cualidades, herramientas, habilidades y capacidades relacionadas con lo que representa esa vibración numérica.',
  },
  {
    t: 'Un Escenario',
    d: 'Situaciones y maestros que llegarán a tu vida durante este tiempo para que el aprendizaje y la desprogramación se cumplan.',
  },
]

const DESAFIOS = [
  {
    l: 'K',
    t: 'El contrato heredado de tu clan para reparar y corregir',
    parrafos: [
      'Infancia y juventud temprana: hay cuatro retos u obstáculos que se activan en correspondencia con las cuatro realizaciones de tu ciclo de vida. El primer desafío es el de más larga duración y se activa en los primeros años de vida del nativo; acompaña el ciclo de aprendizaje y formación (1ª realización de vida) y funciona como la gran batalla a vencer para poder liberarte de condicionamientos obsoletos de obediencia al clan que necesitan ser reformados.',
      'Los contratos heredados del clan son órdenes y prohibiciones que asumimos desde la gestación para ser fieles a la familia. Generalmente, la energía de la primera meta/reto de vida (K) representa los temas reprimidos o no vividos plenamente por tus antepasados y que te han sido encargados para que tú los sanes, repares e integres, en lealtad a ti mismo y a tus deseos.',
    ],
  },
  {
    l: 'L',
    t: 'La confrontación de los mandatos establecidos',
    parrafos: [
      'Adulto maduro: activa la determinación de asumir tu derecho a construir una vida autónoma del clan. Su duración es de 9 años y establece tu período de culminaciones y de desapego a la necesidad de buscar aprobación y validación. Este desafío está marcado por el impulso de tomar la dirección correcta, redirigiendo tus pasos hacia una vida con mayor sentido y propósito. Es el punto clave para reconectarte con tu «YO» y alcanzar una mayor conciencia de tu verdadero propósito. Vencerlo te otorga la libertad de construir tu propia vida a tu manera.',
    ],
  },
  {
    l: 'M',
    t: 'La búsqueda de tu individuación',
    parrafos: [
      'Adultez: es el período de afirmación de tu individualidad frente a lo aprendido en el hogar. Su duración es de 9 años y te impulsa a distinguir lo que verdaderamente es tuyo de aquello que asumiste por lealtad al clan, consolidando una identidad propia y una dirección de vida elegida conscientemente.',
    ],
  },
  {
    l: 'N',
    t: 'La conquista de las oposiciones a la realización de tu sueño',
    parrafos: [
      'Adulto mayor: será el mayor reto a conquistar para lograr tu destino y plena realización. Las energías que estarán vibrando representan tus miedos más profundos y la mayor resistencia a asumir la responsabilidad plena de tu vida. Su duración es de 9 años y está asociada al momento en que alcanzarás tus metas más anheladas. Vencer este desafío te otorga el poder de renunciar a condicionamientos y expectativas determinadas por tu clan, la sociedad y tu entorno; conectar con tu sabiduría de vida y ofrecerla a los demás para definir tu verdadera vocación.',
      'Las personas que realmente tienen definida su vocación permanecen haciendo lo que hacían y siguen productivas y con responsabilidades, mejorándose y especializándose cada vez más; pero el compromiso cambia: ya no es con el mundo, sino consigo mismas.',
    ],
  },
]

const PERSONALIDADES = [
  { n: '1', d: 'Siempre quiere ser el número UNO.' },
  { n: '2', d: 'El poder detrás del trono.' },
  { n: '3', d: 'El centro de atracción.' },
  { n: '4', d: 'Los pies bien puestos en la tierra.' },
  { n: '5', d: 'El inagotable rebelde.' },
  { n: '6', d: 'El ángel guardián.' },
  { n: '7', d: 'El especialista, gran buscador del conocimiento.' },
  { n: '8', d: 'El gran triunfador.' },
  { n: '9', d: 'La manifestación de la grandeza.' },
  { n: '11', d: 'El maestro inspirador.' },
  { n: '22', d: 'El poder creador y generador.' },
]

const FORMULA_TITULO = 'Fórmula de la primera etapa/desafío'
const FORMULA_LINEAS = [
  '36 (dato fijo) − Número de Personalidad (posición D del Pináculo)',
  'D (Número de Personalidad) = A (mes) + B (día) + C (año)',
]

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-5 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-4 text-base leading-8 text-foreground/78">{children}</div>
}

function Quote({ children, autor }: { children: ReactNode; autor: string }) {
  return (
    <figure className="rounded-[1.5rem] border-l-4 border-primary bg-primary-soft/60 px-6 py-5">
      <blockquote className="font-display text-lg italic leading-8 text-foreground/85 sm:text-xl">
        “{children}”
      </blockquote>
      <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
        — {autor}
      </figcaption>
    </figure>
  )
}

function Diagrama({
  src,
  alt,
  w,
  h,
  caption,
}: {
  src: string
  alt: string
  w: number
  h: number
  caption?: string
}) {
  return (
    <figure className="rounded-[1.5rem] border border-border/60 bg-white p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        className="mx-auto h-auto w-full max-w-[300px]"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm font-medium text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function DuracionYFormula({ duracion }: { duracion: string }) {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-border/60 bg-secondary/40 p-5 sm:p-6">
      <div>
        <h3 className="font-display text-lg font-semibold text-primary">¿Cuánto dura?</h3>
        <p className="mt-2 text-base leading-8 text-foreground/78">{duracion}</p>
      </div>
      <div className="rounded-[1rem] border border-primary/20 bg-background/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {FORMULA_TITULO}
        </p>
        <div className="mt-2 space-y-1 font-display text-sm text-foreground/85 sm:text-base">
          {FORMULA_LINEAS.map((linea) => (
            <p key={linea}>{linea}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PinaculoGuia() {
  return (
    <div className="space-y-8">
      {/* Introducción */}
      <Section eyebrow="Tu mapa de vida" title="Tu Pináculo personal">
        <Prose>
          <p>
            Tu Pináculo personal es el mapa donde podrás descifrar todo el rompecabezas del camino
            hacia tu destino a partir de tu fecha de nacimiento. Este nunca cambiará: será el mismo
            durante toda tu vida, ya que se calcula tomando como base tu fecha de nacimiento.
          </p>
          <p>
            Sin embargo, a medida que transcurran los años se irán potencializando diferentes áreas
            del mismo, donde algunos números serán más importantes que otros e irán marcando las
            energías y pruebas que enfrentarás en cada uno de tus ciclos de vida. Esto equivale a
            madurar y evolucionar hacia un mejor ser humano como resultado de las lecciones
            aprendidas.
          </p>
        </Prose>
      </Section>

      {/* Pináculo Numerológico + Pitágoras + diagrama */}
      <Section eyebrow="El origen" title="Pináculo Numerológico">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <Diagrama
            src="/images/pinaculo/pinnacle.png"
            alt="Diagrama del Pináculo Numerológico con las posiciones A a S"
            w={565}
            h={671}
            caption="Estructura del Pináculo (posiciones A–S)"
          />
          <div className="space-y-5">
            <Quote autor="Pitágoras">
              El alma viene a trascender y transmutarse en un viaje que está descrito en la fecha de
              nacimiento, y esta establece el grado de evolución que cada alma posee.
            </Quote>
            <Prose>
              <p>
                El primer código que guarda información acerca de{' '}
                <strong>¿quién viniste a ser?</strong> y <strong>¿cuál es tu camino de vida?</strong>{' '}
                es tu fecha de nacimiento: la zona enclaustrada donde entendemos qué vine a hacer
                «YO» para evolucionar todos los aprendizajes con los vínculos donde exista afecto de
                por medio, y cuáles son las realizaciones de vida que tendré que transitar para
                terminar ese aprendizaje de forma exitosa. De esto nos habla el Pináculo
                Numerológico.
              </p>
              <p>
                Entender de manera objetiva e individual los procesos a los que te has venido
                enfrentando durante tu camino de vida ayuda a darle sentido y una dirección más
                clara a las situaciones del día a día. Con esta herramienta podrás descubrir las
                lecciones que necesitas superar en todo lo relacionado con tu familia de origen y
                los lazos que irás creando a lo largo de tu vida (pareja, hijos, amigos, etc.). El
                desafío será conquistar aquello que es contrario a los mandatos enseñados en el
                hogar donde naciste; es decir, aquello que te lleve a construir la unicidad de tu
                ser.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* Descifra tu fecha: preguntas + beneficios */}
      <Section eyebrow="Una brújula para guiar tu vida" title="Descifra lo que significa tu fecha de nacimiento">
        <div className="flex flex-wrap gap-2.5">
          {PREGUNTAS.map((q) => (
            <span
              key={q}
              className="inline-flex items-center rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary"
            >
              {q}
            </span>
          ))}
        </div>
        <ul className="space-y-2.5 text-base leading-7 text-foreground/78">
          {BENEFICIOS.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="mt-1 text-primary">
                📌
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="rounded-[1.5rem] border border-dashed border-primary/30 bg-secondary/40 px-6 py-5 text-base leading-8 text-foreground/78">
          Descubre el significado de tus <strong>Etapas de Vida</strong> (posiciones E, F, G, H) y
          entiende el curso de acción que te propone la vida; es decir, tu camino de vida: el viaje
          de regreso al alma.
        </p>
      </Section>

      {/* Mi Camino de Vida */}
      <Section eyebrow="Mi Camino de Vida" title="El viaje de regreso al alma">
        <Prose>
          <p>
            ¿Cuál es el curso de acción que te propone la vida? Las realizaciones o etapas de vida
            dentro del Pináculo Numerológico nos describen de forma específica y clara el curso de
            acción que nos propone la vida durante un período determinado de tiempo.
          </p>
        </Prose>
      </Section>

      {/* Las 4 realizaciones + diagrama EFGH */}
      <Section eyebrow="El curso de acción" title="Las 4 realizaciones de vida">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <Diagrama
            src="/images/pinaculo/pinaculo-efgh.png"
            alt="Diagrama del Pináculo resaltando las etapas de vida en las posiciones E, F, G y H"
            w={555}
            h={674}
            caption="Etapas de vida: posiciones E, F, G y H"
          />
          <div className="grid gap-4">
            {REALIZACIONES.map((etapa) => (
              <div
                key={etapa.n}
                className="flex items-center gap-4 rounded-[1.5rem] border border-border/60 bg-secondary/40 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-lg font-semibold text-white shadow-glow">
                  {etapa.n}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {etapa.n} etapa de vida
                  </p>
                  <p className="font-display text-lg font-semibold text-foreground">{etapa.t}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Cada etapa representará */}
      <Section title="Cada etapa representará entonces:">
        <div className="grid gap-4 sm:grid-cols-3">
          {REPRESENTA.map((item) => (
            <div key={item.t} className="rounded-[1.5rem] border border-border/60 bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-primary">{item.t}</h3>
              <p className="mt-2 text-base leading-7 text-foreground/78">{item.d}</p>
            </div>
          ))}
        </div>
        <DuracionYFormula duracion="La duración de la primera etapa de vida varía según la fecha de nacimiento de la persona y puede durar de 14 a 35 años, según el caso. Las etapas 2 a 7 duran siempre 9 años." />
      </Section>

      {/* La conquista de tus desafíos */}
      <Section eyebrow="La parte inferior del pináculo" title="La conquista de tus desafíos de vida">
        <Prose>
          <p>
            La parte inferior del pináculo establece los retos y desafíos que tendrás que superar
            para tu evolución. De la línea horizontal numerológica de tu Pináculo (fecha de
            nacimiento) hacia abajo, los números te alertan acerca de tus áreas de oportunidad, tus
            puntos débiles, los errores que constantemente cometes y los miedos más profundos que te
            mantienen atado a una realidad que no deseas o que impiden que las cosas sucedan como se
            planean. La verdad es que ninguno de los números que componen el pináculo puede ser
            eliminado o borrado de ese mapa. La única manera de controlarlos es comprenderlos,
            reconocerlos, integrarlos y aceptar que forman parte de nuestra personalidad.
          </p>
          <p>
            La numerología, sin embargo, no puede tomar decisiones por nadie. Es como un mapa de
            carreteras que no puede, por voluntad propia, decidir la ruta de un viaje; en cambio, es
            una guía que muestra las mayores posibilidades a nuestro alcance.
          </p>
        </Prose>
        <Quote autor="Carl Jung">
          Nadie se ilumina fantaseando figuras de luz, sino haciendo consciente su oscuridad.
        </Quote>
      </Section>

      {/* Los 4 desafíos K L M N + diagrama KLMN */}
      <Section eyebrow="Los 4 desafíos a superar" title="Tus desafíos de vida">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <Diagrama
            src="/images/pinaculo/pinaculo-klmn.png"
            alt="Diagrama del Pináculo resaltando los desafíos en las posiciones K, L, M y N"
            w={555}
            h={674}
            caption="Desafíos de vida: posiciones K, L, M y N"
          />
          <Prose>
            <p>
              La numerología nos hace conscientes de que todo lo que sucede en nuestro entorno
              obedece a un plan perfecto ya escrito y contratado; desarrollar ese plan será lo que
              nos lleve a conectar por voluntad propia con nuestro propósito de vida, en un proceso
              de comprensión y entendimiento llamado «iluminación».
            </p>
          </Prose>
        </div>
        <div className="space-y-4">
          {DESAFIOS.map((d) => (
            <div key={d.l} className="rounded-[1.5rem] border border-border/60 bg-secondary/40 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-lg font-semibold text-white shadow-glow">
                  {d.l}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                  {d.t}
                </h3>
              </div>
              <div className="mt-3 space-y-3 text-base leading-8 text-foreground/78">
                {d.parrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cada desafío representará */}
      <Section title="Cada desafío representará entonces:">
        <div className="grid gap-4 sm:grid-cols-3">
          {REPRESENTA.map((item) => (
            <div key={item.t} className="rounded-[1.5rem] border border-border/60 bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-primary">{item.t}</h3>
              <p className="mt-2 text-base leading-7 text-foreground/78">{item.d}</p>
            </div>
          ))}
        </div>
        <DuracionYFormula duracion="La duración del primer desafío de vida varía según la fecha de nacimiento de la persona y puede durar de 14 a 35 años, según el caso. Los desafíos 2 a 7 duran siempre 9 años." />
      </Section>

      {/* La máscara */}
      <Section eyebrow="El número de la personalidad" title="¿Qué máscara utilizas para enfrentar al mundo?">
        <Prose>
          <p>
            Este número es muy importante, ya que en muchos casos las personas terminan viviendo más
            este número que su verdadera esencia (número personal), lo que impide que la comprensión
            y autoafirmación de su propia identidad se realice. Para ellas será más fácil quedarse en
            su zona de confort que enfrentar la misión que escogieron para esta vida, provocando que
            nunca se sientan completamente felices consigo mismas, que estén insatisfechas o sientan
            que algo les falta. En astrología, este número representaría en parte lo que se conoce
            como el ascendente.
          </p>
          <p>
            Lo ideal sería vivir tu verdadera esencia o número personal y utilizar tu personalidad
            como una herramienta para el logro de tu identidad.
          </p>
          <p>
            El número de la personalidad siempre es positivo, excepto si da como resultado un número
            maestro 11 o 22; en ese caso tendrá ambas polaridades, positiva y negativa.
          </p>
        </Prose>
      </Section>

      {/* Número de la Personalidad + lista */}
      <Section eyebrow="Tu máscara ante el mundo" title="Número de la Personalidad">
        <Prose>
          <p>
            El número de la personalidad es la parte de la persona que está a la luz para todos; es
            lo primero que notamos de alguien y que, aún sin conocerlo profundamente, define para
            nosotros su forma de ser, de actuar y de presentarse ante el mundo. En otras palabras, es
            el disfraz o armadura con que la persona interactúa con los demás para tratar de alcanzar
            su verdadera identidad (número personal) sin sentirse vulnerable o expuesta.
          </p>
        </Prose>
        <div className="grid gap-3 sm:grid-cols-2">
          {PERSONALIDADES.map((p) => (
            <div
              key={p.n}
              className="flex items-center gap-4 rounded-[1.25rem] border border-border/60 bg-card p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary-soft font-display text-base font-semibold text-primary">
                {p.n}
              </span>
              <p className="text-base leading-7 text-foreground/80">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
