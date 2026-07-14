import type { Metadata } from "next";

import { NameNumberCalculator } from "@/components/calculators/name-number-calculator";
import { ToolPage } from "@/components/content/tool-page";

const SOUL_NUMBER_ACCORDION = [
  {
    id: "alma-1",
    title: "Alma 1",
    text: "Esta vibración nos habla de un Alma 1 bastante inquieta, que vino a trabajar por su independencia e individualidad. Marca un destino lleno de gran pasión e impulso vital para hacer las cosas por sí mismo y conseguir su autoafirmación.",
  },
  {
    id: "alma-2",
    title: "Alma 2",
    text: "El Alma 2 viene a aprender a entender la dualidad y a trabajar por la integración y el equilibrio en su vida. Necesitará sentirse parte de algo o de alguien, y su destino probará sus capacidades para vivir la unión, la solidaridad, el servicio y el compartir.",
  },
  {
    id: "alma-3",
    title: "Alma 3",
    text: "El Alma 3 es multifacética. Vino a brillar y desempeñarse por medio de la expresión o la comunicación en diferentes formas, como la hablada, la escrita o las artes. Es sumamente inquieta, por lo que marca un destino lleno de oportunidades, popularidad y brillo.",
  },
  {
    id: "alma-4",
    title: "Alma 4",
    text: "El Alma 4 es práctica, realista y proactiva. Vino a trabajar para conseguir su propia estabilidad y dar resultados en lo que se involucre. Es experta en hacer que las cosas funcionen mejor y tenderá a cargar con más actividades de las que debería.",
  },
  {
    id: "alma-5",
    title: "Alma 5",
    text: "El Alma 5 es emprendedora, energética, rápida, ágil, incansable y revolucionaria. Quiere libertad a cualquier precio; sin embargo, la piedra que rueda raras veces forma un sólido cimiento.",
  },
  {
    id: "alma-6",
    title: "Alma 6",
    text: "El Alma 6 es protectora y entregada. Vino a buscar su estabilidad emocional, construir su propio hogar y generar un grupo de personas a las que pueda llamar familia. Su vida estará marcada por asumir responsabilidades de la comunidad o del hogar, olvidándose a veces de sus propias necesidades.",
  },
  {
    id: "alma-7",
    title: "Alma 7",
    text: "El Alma 7 vino a perseguir la búsqueda de la calidad y la perfección, y a conseguir poder a través del conocimiento y reconocimiento del 'YO SÉ'. Viene a descubrir, perfeccionar y descifrar actividades, métodos y teorías.",
  },
  {
    id: "alma-8",
    title: "Alma 8",
    text: "El Alma 8 es emprendedora, ambiciosa y competitiva. Vino a trabajar a gran escala y construir grandes proyectos. Deberá aventurarse a conseguir su autoafirmación y éxito. Marca una niñez y juventud donde puede percibirse inestabilidad emocional o económica, lo que la capacita para perseguir la construcción de su destino.",
  },
  {
    id: "alma-9",
    title: "Alma 9",
    text: "El Alma 9 es solidaria, idealista y desinteresada, llena de oportunidades grandiosas para destacarse. Viene a brillar, servir de guía y motivación a los demás, y marca un destino que ofrece incontables oportunidades para obtener reconocimiento y fama.",
  },
  {
    id: "alma-11",
    title: "Alma 11",
    text: "El Alma 11 está relacionada con la sabiduría y la enseñanza. Tiene una luz muy especial, un gran potencial de realización y revelación. Viene a descifrar la conexión con la consciencia cósmica.",
  },
  {
    id: "alma-22",
    title: "Alma 22",
    text: "El Alma 22 es un alma vieja que viene a buscar la perfección suprema. Son idealistas prácticos, y quienes la poseen tienen una vida marcada por grandes lecciones de responsabilidad, trabajo y esfuerzo.",
  },
] as const;

export const metadata: Metadata = {
  title: "Número del Alma",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="numerodelalma"
      title="Número del Alma"
      wide
      description="Surge de las vocales de tu nombre y revela lo que tu corazón realmente anhela."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="soul" />

        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            La Numerología puede responder&nbsp; por medio de la suma total del
            valor energético de las vocales del nombre completo de una persona:{" "}
            <i>¿Qué es lo que tu </i>
            <b>
              <i>alma </i>
            </b>
            <i>
              vino a hacer al mundo en esta encarnación?, y ¿Cuál es tu
              propósito de vida?,{" "}
            </i>
            al responder estas preguntas, se comprende que existe ya una ruta
            escrita, que deberá ser desarrollada a través de la evolución de la
            conciencia. El sincronizarte con tu verdadera vocación y dirigir tus
            pasos hacia ese destino contratado, será la clave para sentirte
            reconocido, realizado y plenamente feliz.&nbsp;&nbsp;
            <br />
            <br />
            Aun y&nbsp; cuando para muchos este deseo no sea del todo consciente
            o completamente&nbsp; reconocido; el <b>Número del Alma</b> te
            conecta directamente con el contrato que firmaste antes de llegar a
            esta encarnación, determina tu <b>Misión de Vida</b>, tu gran
            búsqueda, el propósito para el cual estás aquí. A través de la
            vibración del <b>Número de Alma</b> podrás identificar el compromiso
            que realizas con tu clan. Define lo que viniste a resolver y
            corregir para la evolución y transmutación de la consciencia de tu
            grupo familiar (árbol genealógico), así como tu proyecto de
            evolución en el servicio que viniste a dar al colectivo.&nbsp;&nbsp;
          </p>
        </section>
        <section className="space-y-4 rounded-[2rem]  p-6 sm:p-8 text-center meaning">
          <h3>
            Nos conecta directamente con el contrato que firmamos
            <br />
            antes de llegar a esta encarnación
          </h3>
        </section>
        <section
          id="ultimo"
          className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8"
        >
          <p className="text-base leading-8 text-foreground/72">
            En la vibración del número de Alma está encriptada no solo tu
            proyecto de evolución personal, sino también tu{" "}
            <b>Misión Espiritual.</b> Es el contrato ligado a tu familia
            espiritual, compuesta por los grupos de almas que están unificadas
            por misiones específicas necesarias para la existencia y desarrollo
            espiritual de la humanidad; o sea que trasciende lo que es
            estrictamente el proyecto del clan biológico.
            <br />
            Las misiones de las familias espirituales pueden ser muy variadas y
            se muestran como arquetipos: maestros, canales de luz, guerreros,
            apoyos, líderes, seguidores, protectores, arquitectos de la
            realidad, puentes o conectores, conservadores de conocimiento,
            creadores y destructores de estructuras, comunicadores.&nbsp;
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Las personas que no son capaces de entender o descifrar lo que su{" "}
            <b>ALMA</b> quiere decirles; vivirán una existencia llena de
            insatisfacción. Porque todo crecimiento del <b>alma </b>proviene del
            centro&nbsp; de nuestro <b>ser </b>y se traduce a encontrar
            él:&nbsp; ¿qué?, y él ¿cómo? Hacer lo que debes para conseguir la
            realización de tu vida.
          </p>
        </section>

        <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Significado de cada Número del Alma
          </h2>
          <div className="mt-6 space-y-4">
            {SOUL_NUMBER_ACCORDION.map((item) => (
              <details
                key={item.id}
                id={item.id}
                className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.72),hsl(var(--card)))]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-display text-lg font-semibold text-primary">
                    {item.title}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-border/60 px-5 py-5">
                  <p className="text-base leading-8 text-foreground/72">
                    {item.text}
                  </p>
                </div>
              </details>
            ))}
          </div>
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
                  ¿Cómo se calcula el Número del Alma?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Número del Alma
                </h3>
                <p className="text-base leading-8 text-foreground/72">
                  Es la suma de todas las vocales de tu nombre, incluyendo tus
                  apellidos. <br />
                  <br />
                  <strong>A</strong> = 1 <br />
                  <strong>E</strong> = 5 <br />
                  <strong>I</strong> = 9 <br />
                  <strong>O</strong> = 6<br />
                  <strong>U</strong> = 3
                </p>
              </section>
            </div>
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
