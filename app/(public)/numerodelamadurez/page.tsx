import type { Metadata } from "next";

import { MaturityCalculator } from "@/components/calculators/maturity-calculator";
import { ToolPage } from "@/components/content/tool-page";

const MATURITY_ACCORDION = [
  {
    id: "madurez-1",
    title: 'Número de Madurez 1: "Yo puedo solo"',
    paragraphs: [
      "El Número de la Madurez 1 necesitará dejar su huella en el mundo por medio de su individualidad.",
      "La vibración 1 se bastará a sí mismo en todo momento gracias a la gran seguridad personal que sentirá y a que logrará sacar de su vida complejos de inseguridad que cargó por mucho tiempo. En este tiempo de madurez la opinión ajena no le quitará el sueño y terminará viviendo su vida prescindiendo a menudo de los demás.",
    ],
  },
  {
    id: "madurez-2",
    title: 'Número de Madurez 2: "Finalmente en pareja"',
    paragraphs: [
      "El Número de Madurez 2 es el Par, el que pertenece y disfruta vivir integrado a algo o a alguien con amor, paz y armonía emocional.",
      "En este tiempo sabrá adaptarse a todas las personas y sabrá que ha logrado finalmente consolidar una familia, grupo, sociedad, etc., estará seguro de haber cumplido con lo que se esperaba de él, o haber contribuido a la felicidad de otras personas. Su etapa de madurez estará llena de situaciones de alegría, compañerismo y disfrute de todo lo bello, pero de una manera tranquila y contemplativa.",
    ],
  },
  {
    id: "madurez-3",
    title: 'Número Madurez 3: "Gozo y disfrute de la vida"',
    paragraphs: [
      "El Número de Madurez 3 simboliza el tiempo de mayor expansión, es la vibración más radiante, espontánea y estimulante de todas.",
      "La vibración 3 brindará la oportunidad de amar la vida de una forma más vívida y jovial hasta alcanzar su madurez; buscarán gozarla y disfrutarla en su máxima expresión. En esta etapa tu visión del mundo será altamente positiva, optimista y adaptable a cualquier situación. Tus talentos se desbordarán llenándote de magnetismo y brillo, logrando atraer miradas y oídos hacia ti. Será tu momento para destacarte sobre el escenario.",
    ],
  },
  {
    id: "madurez-4",
    title: 'Número Madurez 4: "Los cimientos mas sólidos"',
    paragraphs: [
      "Un Número de la Madurez 4 finalmente sentará las bases más sólidas y firmes de su vida al alcanzar su madurez.",
      "La vibración 4 va a acabar manifestándose y acrecentará su fuerza de carácter, voluntad y coraje para defender sus intereses. Ya no se dejará influenciar por otros para hacer algo contrario a sus ideas o propósitos, en este tiempo sabrá defender sus convicciones, reconociendo dentro de sí mismo que ha llegado el tiempo para lograr los sueños que le fueron negados en la primera mitad de su vida.",
    ],
  },
  {
    id: "madurez-5",
    title: 'Número Madurez 5: "Tiempo de Vivir la vida al máximo"',
    paragraphs: [
      'El Número de Madurez 5 comenzará la etapa donde podrá vivir de acuerdo a sus propias ideas, creencias, tiempos y estilo.',
      "Al alcanzar su madurez dejará de sentirse reprimido o sometido por otros y empezará a ejercer una gran libertad como estilo de vida, convirtiendo su vida en una aventura sin límites, fronteras, idiomas, ideologías o tradiciones. Empezarán a vivir la etapa más excitante y emocionante de su vida.",
    ],
  },
  {
    id: "madurez-6",
    title: 'Número Madurez 6: "Viviendo en Familia"',
    paragraphs: [
      "El Número Madurez 6 en los últimos años de su vida finalmente podrá mantener una relación más profunda con amigos, familia e incluso con su comunidad.",
      "Cuando llegue el final de su vida, habrá mucha gente que los quiera y los valore, ya que se tomarán todas las relaciones humanas muy en serio, generalmente lograrán encontrar el gran amor que tanto han buscado y en la vida de hogar encontrarán como recompensa la estabilidad y plenitud emocional que justificará de algún modo su vida.",
    ],
  },
  {
    id: "madurez-7",
    title: 'Número Madurez 7: "Mi propio proyecto de vida"',
    paragraphs: [
      "El Número de la Madurez 7 les animará a confiar finalmente en su inteligencia, distinción y capacidades innatas.",
      "La vibración 7 al llegar a su madurez se distinguirá por sus gustos exquisitos y selectivos buscando siempre lo mejor. Les atraerán los viajes, la vida cómoda y los ambientes cultos y refinados. Tiempo en el que se les reconocerán todos sus talentos, invitando con esto a las personas a su alrededor a seguir sus ideas hasta las últimas consecuencias. En su última etapa vivirán su vida sin importarles la opinión o el juicio de los demás; en este momento habrán logrado el grado de autoridad que tanto habían anhelado.",
    ],
  },
  {
    id: "madurez-8",
    title: 'Número Madurez 8: "El líder de mi propia empresa"',
    paragraphs: [
      "El Número de la Madurez 8 enfrentó luchas en su juventud y etapa adulta para lograr la estabilidad y seguridad económica.",
      "Esta vibración tomará más tiempo de entrenamiento que los otros números para adquirir esa facilidad con el manejo y la adquisición del dinero, que estuvo fluctuante en su juventud y etapa adulta. Sin embargo, el Número de Madurez 8 asegurará la manifestación de una seguridad económica basada en el éxito de sus esfuerzos para la última etapa de la vida. Al alcanzar sus 45 o 50 años, sentirá dentro de su ser esa inquietud inconsciente por ampliar su posición en el mundo y la necesidad de perseguirla con gran persistencia. Poseerán una admirable capacidad de resistencia y recuperación; esta será su etapa de mayores triunfos y brillo personal.",
    ],
  },
  {
    id: "madurez-9",
    title: 'Número Madurez 9: "Yo soy autosuficiente"',
    paragraphs: [
      "El Número de la Madurez 9 se siente llamado a convertir el mundo en un lugar mejor de cómo lo encontró.",
      "Al hacerse mayores, esto se irá volviendo una prioridad cada vez más importante. Este es un número de servicio obligado que se destacará por tener una plenitud espiritual y una intuición muy desarrolladas que utilizarán en pro del bien colectivo. Sensitivos, receptivos y clarividentes, su pensamiento será cada vez más amplio y sin límites, se aumentarán sus facultades psíquicas y sus dotes de premonición, pareciendo hallarse siempre en contacto y comunicación directa con las fuerzas cósmicas y el alma humana. Al hacerse mayores querrán hacer la diferencia y ser reconocidos por sus hechos y sus acciones, comprenderán que todos estamos conectados y se preguntarán a sí mismos cómo pueden dejar una huella positiva en el mundo.",
    ],
  },
  {
    id: "madurez-11",
    title: 'Número Madurez 11: "Yo soy inspiración para otros"',
    paragraphs: [
      "El Número de la Madurez 11 se sentirá llamado a utilizar su gran creatividad e inventiva, buscando expresarla en actividades artísticas, educativas y creativas.",
      "En este tiempo podrán finalmente volcar toda su energía en desarrollar su propio proyecto de vida y dejar de empujar y responsabilizarse de los demás. En su etapa de madurez, podrán destacarse como grandes maestros, políticos, periodistas o líderes religiosos; sin importar el área donde estén, su autoridad será reconocida y admirada por todos. Su palabra, inspirada y llena de contenido conmoverá e impresionará, generando transformación, evolución y apertura de conciencia en las personas. La vibración de Madurez 11 terminará aventajando a las demás energías numéricas en cualquier actividad que elijan.",
    ],
  },
  {
    id: "madurez-22",
    title: 'Número Madurez 22: "Yo soy El Gran Constructor"',
    paragraphs: [
      "El Número de la Madurez 22 se siente llamado a convertirse en un extraordinario investigador y organizador, capaz de ver todo a gran escala y tener la capacidad de concretar importantes obras de concepción nueva y futurista.",
      "Se destacará por su inteligencia superior, que irá enriquecida a través de su vida con la acumulación de conocimientos y experiencias que deberá poner al servicio de los demás. Su intención de participar en operaciones de progreso social y material o movimientos altruistas que trabajan por la evolución del hombre deben constituir la meta de sus ambiciones.",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "Número de la Madurez",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="numerodelamadurez"
      title="Número de la Madurez"
      wide
      description="Combina tu camino de vida y tu número de expresión para mostrar hacia dónde madura tu propósito."
    >
      <div className="space-y-10">
        <MaturityCalculator />
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            Sugiere el tiempo en el que la determinación de nuestra seguridad
            personal tendrá la capacidad de provocar los cambios que se nos
            escaparon en el pasado, impulsándonos para poner en práctica
            finalmente acciones dirigidas a cumplir las metas y objetivos que
            hemos venido anhelado por muchos años.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Este principio nos señala lo que habremos de explorar y conquistar
            después de la primera mitad de nuestra vida, generalmente se activa
            entre los <strong>45</strong> y <strong>50 </strong>años de edad.
          </p>
          <blockquote>
            <p className="text-base leading-8 text-foreground/72">
              <span>
                <em>
                  Conquistar la energía del{" "}
                  <strong>número de la Madurez </strong>será una elección
                  personal, el decidir hacer el esfuerzo que implica alcanzar
                  esta vibración abrirá panoramas nuevos y trascendentales,
                  inspirando en nuestra vida finalmente un profundo sentimiento
                  de logro, seguridad propia y dirección.
                </em>
              </span>
            </p>
          </blockquote>
          <p className="text-base leading-8 text-foreground/72">
            Esta vibración despierta potencialidades aún no ejercitadas, que
            aumentarán nuestro repertorio de habilidades y fortalezas, ya no
            estaremos limitados para enfrentarnos a la vida en esas áreas en
            particular que se nos escaparon de las manos en la primera mitad de
            nuestra vida, como:
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 Estabilidad emocional
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 Seguridad económica
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 El ejercicio de nuestra libertad
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 Independencia e individualidad
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 Cimientos sólidos y echar raíces profundas
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 Luchar por nuestro propio proyecto de vida
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 Reconocimiento y brillo personal
          </p>
          <p className="text-base leading-8 text-foreground/72">
            📌 La capacidad de expresar nuestras ideas sin limitaciones o
            condiciones
          </p>
        </section>
        <section className="">
          <div className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
            <div
              id="dividido-80-20"
              className="grid gap-0 overflow-hidden rounded-[2rem] border border-[hsl(var(--accent)/0.16)] bg-[linear-gradient(180deg,hsl(var(--accent)/0.18),hsl(var(--background)/0.95))] shadow-[0_24px_60px_hsl(var(--primary)/0.08)] lg:grid-cols-[0.85fr_1.15fr]"
            >
              <section className="relative flex min-w-0 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_40%_30%,hsl(var(--primary)/0.2),transparent_32%),linear-gradient(180deg,hsl(var(--secondary)/0.55),hsl(var(--accent)/0.08))] px-6 py-10 lg:px-10">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--fuchsia)/0.16),hsl(var(--primary)/0.2))] blur-[2px]" />
                <img
                  src="/images/mini-laura.png"
                  alt="Ilustración de apoyo sobre vibraciones de tiempo"
                  className="relative z-10 max-h-[360px] w-auto object-contain"
                />
              </section>
              <section className="min-w-0 bg-[linear-gradient(180deg,hsl(var(--accent)/0.12),hsl(var(--card))_18%,hsl(var(--card)))] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                  Pero...
                </p>
                <p className="mt-5 max-w-xl text-sm font-semibold leading-tight text-foreground sm:text-sm">
                  ¿Qué es el Número de la Madurez?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Número de la Madurez
                </h3>
                <p className="text-base leading-8 text-foreground/72">
                  El principio del <b>Número de la Madurez </b>se relaciona con
                  aquellas <strong>cualidades</strong>,{" "}
                  <strong>habilidades</strong> o <strong>metas</strong> que más
                  demoramos en obtener o desarrollar en nuestra vida, se le
                  reconoce como la recompensa que se alcanzará con el ejercicio
                  de nuestra voluntad y fortaleza de carácter. Aquellos que no
                  estén listos o dispuestos a luchar por esta conquista no la
                  obtendrán.
                </p>
              </section>
            </div>
          </div>
        </section>
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            Este período nos trae la gran oportunidad para crecer y dejar de
            mentirnos más a nosotros mismos, y culpar a los otros, por lo que
            nos pasa directamente.
          </p>
          <p>
            Por supuesto, esto puede suponer situaciones difíciles, duras y a
            veces incomprensibles si nos rehusamos a encontrar{" "}
            <strong>“la oportunidad para materializar nuestros sueños”.</strong>
          </p>
          <p>
            Si ya has llegado a la edad de <strong>45 o 50 años</strong> y
            simplemente te encuentras en la situación de no sentirte feliz, ni
            satisfecho, entonces es hora de conectar con tu número de la madurez
            y averiguar de qué se trata.
          </p>
          <p>
            Aprovecha esta energía para investigar en tu interior y conectar con
            tu poder personal dejando de lado las excusas cómo: la crisis, no
            tengo dinero, estoy gorda/o, no tengo pareja, mi pareja no me
            comprende, no le caigo bien a mi jefe, a mis padres jamás les daré
            gusto en nada, etc.
          </p>
          <p>
            Conecta con tu alma y enfócate en contestar las preguntas correctas:{" "}
            <strong>¿Qué quiero? </strong> y ¿
            <strong>Qué necesito “YO”?</strong> ahora en este momento de mi vida
            para estar feliz.
          </p>
        </section>
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            Calcula el Número de la Madurez
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            Para obtener tu <strong>Número de Madurez</strong>, toma tu{" "}
            <strong>
              <a
                title="Número de la Personalidad"
                className="text-primary"
                href="http://stage.numerologia-cotidiana.com/numero-de-la-personalidad/"
              >
                Número de personalidad
              </a>
            </strong>
            , añádelo a tu{" "}
            <strong>
              <a
                title="Significado del Nombre"
                className="text-primary"
                href="http://stage.numerologia-cotidiana.com/significado-del-nombre/"
              >
                Número del Poder del Nombre
              </a>
            </strong>{" "}
            y redúcelo a un dígito.
          </p>
        </section>
        <section className="space-y-6 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <div className="space-y-4">
            {MATURITY_ACCORDION.map((item) => (
              <details
                key={item.id}
                id={item.id}
                className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/80 shadow-sm transition-colors open:border-primary/30 open:bg-primary/[0.04]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none sm:px-6">
                  <span className="font-display text-lg font-semibold text-primary">
                    {item.title}
                  </span>
                  <span className="text-2xl leading-none text-primary transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="space-y-4 border-t border-border/60 px-5 py-5 text-base leading-8 text-foreground/72 sm:px-6">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
