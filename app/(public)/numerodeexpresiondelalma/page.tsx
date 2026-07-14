import type { Metadata } from "next";

import { NameNumberCalculator } from "@/components/calculators/name-number-calculator";
import { ToolPage } from "@/components/content/tool-page";

const SOUL_EXPRESSION_ACCORDION = [
  {
    id: "expresion-alma-1",
    title: "Expresión del Alma 1",
    paragraphs: [
      "Acción, actividad, liderazgo, independencia, invención, fuerza, valentía, audacia e innovación.",
      "¿Cómo desarrollarlo? Siendo original, único y diferente a los demás en cada actividad en la que te involucres.",
    ],
  },
  {
    id: "expresion-alma-2",
    title: "Expresión del Alma 2",
    paragraphs: [
      "Trabajo en grupos o equipo, solidaridad, cooperación, diplomacia, minuciosidad, armonía, servicio, ritmo y discreción.",
      "¿Cómo desarrollarlo? Usando tu gran habilidad para hacer lazos importantes y conectar con los demás.",
    ],
  },
  {
    id: "expresion-alma-3",
    title: "Expresión del Alma 3",
    paragraphs: [
      "Por medio de la expresión, utilizando el optimismo, humor, alegría, sociabilidad, auto-expresión, entusiasmo y gran ingenio mental.",
      "¿Cómo desarrollarlo? Eres el gran comunicador, busca canales donde expresar lo que tu Alma viene a hacer, escribiendo, pintando, creando, comunicándote y escuchando a los demás.",
    ],
  },
  {
    id: "expresion-alma-4",
    title: "Expresión del Alma 4",
    paragraphs: [
      "Por medio un método o sistema, que se construya con honestidad, paciencia, economía, practicidad, organización, lealtad, voluntad y solidez.",
      "¿Cómo desarrollarlo? Mejorando las formas ya existentes y volviéndolas más eficientes y prácticas.",
    ],
  },
  {
    id: "expresion-alma-5",
    title: "Expresión del Alma 5",
    paragraphs: [
      "Por medio de la expansión y libertad, buscando nuevas formas de adaptabilidad al progreso, con cambio, viajes, aventuras, impulso, versatilidad y desapego.",
      "¿Cómo desarrollarlo? Cambiando las estructuras y tradiciones que ya no funcionan para el avance de los demás.",
    ],
  },
  {
    id: "expresion-alma-6",
    title: "Expresión del Alma 6",
    paragraphs: [
      "Nutriendo, sanando y protegiendo, con responsabilidad, amor, entrega, sentido hogareño, servicio y productividad.",
      "¿Cómo desarrollarlo? De forma paternal, comprometida y entregada, buscando mecanismos que brinden estabilidad emocional y ayuda a los demás.",
    ],
  },
  {
    id: "expresion-alma-7",
    title: "Expresión del Alma 7",
    paragraphs: [
      "Búsqueda de la sabiduría, la especialización, el detalle y la perfección, con seriedad, justicia, silencio, estudio profundo, introspección y espiritualidad.",
      "¿Cómo desarrollarlo? Volviéndote un especialista o maestro en lo que haces, de forma honesta y justa para poder dejar la semilla en los demás.",
    ],
  },
  {
    id: "expresion-alma-8",
    title: "Expresión del Alma 8",
    paragraphs: [
      "Produciendo seguridad material, con autoridad, dirección, mando, capacidad ejecutiva, alta competencia, fortaleza y auto-control.",
      "¿Cómo desarrollarlo? Por medio de acciones emprendedoras, construcción de sistemas, métodos o estructuras firmes que te soporten con estabilidad y firmeza.",
    ],
  },
  {
    id: "expresion-alma-9",
    title: "Expresión del Alma 9",
    paragraphs: [
      "Defendiendo luchas sociales y civiles, que logren beneficios colectivos para el grupo, de forma compasiva, filantrópica, amorosa, generosa, creativa, de servicio y apoyo.",
      "¿Cómo desarrollarlo? Comprometiéndote con organismos, causas, actividades que promuevan y mejoren el nivel de vida de los demás.",
    ],
  },
  {
    id: "expresion-alma-11",
    title: "Expresión del Alma 11",
    paragraphs: [
      "Actividades de gran inspiración, notoriedad, revelación, idealismo, invención, intuición, enseñanza y maestría de vida.",
      "¿Cómo desarrollarlo? Volviéndote una Autoridad en el desarrollo y divulgación de temas importantes para la apertura de conciencia de los demás, de forma hablada, escrita o en cualquier expresión artística.",
    ],
  },
  {
    id: "expresion-alma-22",
    title: "Expresión del Alma 22",
    paragraphs: [
      "El Gran constructor, el idealista práctico, sentido global, internacional, progresista, desarrollador a gran escala, materializador de planes y procesos de crecimiento social.",
      "¿Cómo desarrollarlo? Volviéndote una Maestro material y desarrollando algo tangible que sirva para impulsar el crecimiento, la conciencia y el esfuerzo de los demás hacia una vida mejor y responsable.",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "Número de Expresión del Alma",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="numerodeexpresiondelalma"
      title="Número de Expresión del Alma"
      wide
      description="Surge de las consonantes de tu nombre y refleja la imagen que proyectas hacia afuera."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="personality" />
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Descubre el significado de las consonantes de tu nombre
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            El <strong>“Yo Silencioso o Latente”</strong>
            .&nbsp;también&nbsp;conocido como{" "}
            <strong>Número de expresión</strong> se obtiene de la suma de las
            consonantes de tu nombre y es la parte de la personalidad
            que&nbsp;se usa para lograr metas, sobre todo cuando esas metas
            están relacionadas con nuestra propia autoafirmación y la búsqueda
            de poder defender nuestros sueños y anhelos.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Las consonantes son el cuerpo, la forma, el molde con que el alma se
            expresa. En el significado numerológico del nombre,{" "}
            <strong>las consonantes</strong>, son la matriz de las actividades
            en las que podemos desempeñarnos para darle expresión a nuestro
            propósito de vida. Es decir, el canal a través del cual, fluye lo
            que nuestra{" "}
            <strong>
              <a
                title="La Numerología te dice lo que vino a hacer tu Alma a esta vida."
                className="text-primary"
                href="http://stage.numerologia-cotidiana.com/blog/la-numerologia-te-dice-lo-que-vino-a-hacer-tu-alma-a-esta-vida/"
              >
                ALMA
              </a>
            </strong>{" "}
            vino a realizar.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            El
            <a
              title="Significado del Nombre"
              href="http://stage.numerologia-cotidiana.com/significado-del-nombre/"
              className="text-primary"
            >
              {" "}
              <strong>significado de tu nombre numerológico</strong>{" "}
            </a>
            representa una esfera sagrada… En su interior cohabitan las tres
            partes de ti, idénticas en tamaño, pero diferentes en naturaleza.
            Cada una de estas partes son” tú mismo” y contiene tu realización,
            tu sendero de evolución y el propósito de tu alma.
          </p>
          <blockquote>
            <p className="text-base leading-8 text-foreground/72">
              El nombre siendo nombre es: una Naturaleza Emotiva, una Naturaleza
              Expresiva y un Talento Natural.
            </p>
          </blockquote>
        </section>
        <section className="laura">
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
                  ¿Qué es el Número de la Expresión del Alma?{" "}
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Expresión del Alma
                </h3>
                <p className="text-base leading-8 text-foreground/72">
                  Es la suma de las consonantes dentro de tu{" "}
                  <strong>Nombre</strong>.<br />
                  <br />
                  La <strong>expresión del Alma</strong> representa nuestro{" "}
                  <strong>
                    mayor talento para movernos en el mundo material
                  </strong>
                  ,&nbsp; es así, la herramienta más efectiva que tenemos para
                  construir lo que nuestra Alma vino a conquistar en esta
                  encarnación.&nbsp;
                </p>
              </section>
            </div>
          </div>
        </section>
        <section className="space-y-6 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
              Guía de interpretación
            </p>
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              Significado de cada Expresión del Alma
            </h2>
            <p className="max-w-3xl text-base leading-8 text-foreground/72">
              Explora la vibración de tu número y descubre la forma en la que tu
              energía se expresa hacia el mundo.
            </p>
          </div>
          <div className="space-y-4">
            {SOUL_EXPRESSION_ACCORDION.map((item) => (
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
