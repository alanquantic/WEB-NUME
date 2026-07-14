import type { Metadata } from "next";

import { LifePathCalculator } from "@/components/calculators/life-path-calculator";
import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "Camino de vida",
};

export default function LifePathPage() {
  return (
    <ToolPage
      toolKey="camino-de-vida"
      title="Camino de vida"
      wide
      description="Tu número de camino de vida revela tu propósito esencial. Se calcula a partir de tu fecha de nacimiento."
    >
      <div className="space-y-10">
        <section className="rounded-[2rem] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex justify-center">
              <img
                src="/images/Pinaculo-EFGH-sin-fondo.png"
                alt="Diagrama del pináculo"
                className="h-auto max-w-full object-contain"
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Mi Camino de Vida
              </h2>
              <h2 className="font-display text-2xl font-semibold">
                El Viaje de Regreso al Alma
              </h2>
              <p className="text-base leading-8 text-foreground/72">
                ¿Cuál es el curso de acción que te porpone la vida? Las
                <strong>realizaciones o etapas</strong>, de vida dentro del
                Pináculo Numerológico, nos describen en forma específica y
                clara, el curso de acción que nos propone la vida durante un
                período determinado de tiempo.
              </p>
              <div>
                <strong>El viaje del ALMA</strong> a través de la fecha de
                nacimiento de la persona determina las 4 grandes lecciones que
                tendremos que conquistar a lo largo de nuestra vida para
                finalmente lograr nuestro propósito o misión. Cada una de las
                realizaciones se irán activando en diferentes períodos de tiempo
                y nos invitarán a integrar, desarrollar y armonizar las
                cualidades y características esenciales de esa energía.
              </div>
              <div>&nbsp;</div>
              <div>
                Dentro del Pináculo se establecen
                <strong>4 etapas de vida</strong>, sin embargo, la 1ª, 2ª, y 3ª
                etapa se transitarán en 2 períodos de tiempo diferentes a lo
                largo de nuestro camino, la primera vez para aprender y la
                segunda vez para reparar desde la evolución de nuestra
                consciencia lo que quedó pendiente, por lo que tendremos en
                total 7 estaciones de tiempo en nuestro proyecto evolutivo.
                <br />
                <br />
                <span className="text-primary">
                  <strong>
                    ¿Cuál es la diferencia entre Realización y Etapa de vida?
                  </strong>
                </span>
              </div>
              <div>
                Ambos términos son correctos y se refieren a los periodos de
                tiempo establecidos dentro del pináculo durante los cuales
                cierta energía estará activa.
              </div>
            </div>
          </div>
        </section>
        <LifePathCalculator />
        <section className="space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            Las 4 realizaciones de vida
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            La Numerología nos enseña a ser “Como el rio que fluye” en lugar de
            estar luchando contra corriente todo el tiempo.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>1a ETAPA DE VIDA - El llamado</strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Es la etapa de aprendizaje, donde desarrollamos la conducta
            adquirida necesaria para poder pertenecer a nuestro clan. Nos
            permite encajar, sin embargo, nos condiciona a esconder nuestra
            propia esencia. Podríamos definirla como un proceso de domesticación
            al cual llamaremos el PROGRAMA ADQUIRIDO puede durar entre los 0
            hasta los primeros 35 años de vida según la fecha de nacimiento.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>2a ETAPA DE VIDA - El Encuentro con el maestro</strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Es la etapa de desarrollo y aplicación, se enfoca en aplicar lo que
            hemos aprendido, así que en este período de tiempo nos damos cuenta
            de que muchos de los patrones que veníamos haciendo, no son del todo
            correctos o afines a nuestra identidad, que hay cosas que todavía
            hay que madurar o volver a aprender para definir hacia dónde
            queremos dirigirnos realmente.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>3a ETAPA DE VIDA - El Antídoto</strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            En esta etapa, empezamos a tener la necesidad de revisar nuestra
            vida desde una nueva perspectiva, ya se han cumplido metas en la 2a
            Etapa así que el gran cuestionamiento es ¿Qué más hacemos con
            nuestra vida?, durante estos nueve años se tiende a reevaluar
            nuestro camino como si no hubiéramos logrado nada, es un período
            donde queremos RECONOCIMIENTO y VALORACIÓN sobre lo que hemos hecho
            en la vida.
          </p>

          <p className="text-base leading-8 text-foreground/72">
            4a ETAPA DE VIDA - El Destino
          </p>
          <p className="text-base leading-8 text-foreground/72">
            La última y 4ta Realización de tu vida, se dirige directamente a las
            decisiones que tomarás en relación a tu compromiso de colaboración
            con el Mundo exterior. Implica compromisos con la sociedad (Mundo
            externo) y todas las expectativas que esta sociedad tiene sobre ti.
            Por lo que muchos de tus esfuerzos en este momento de tu vida se
            enfocaran hacia las demandas de esa sociedad.
          </p>
        </section>
        <section
          className="space-y-6 p-6 sm:p-8"
          id="representaion-etapa"
        >
          <h2 className="font-display text-2xl font-semibold text-primary">
            Cada Etapa representará entonces:​
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <section className="rounded-[1.5rem] border border-border/70 bg-secondary/40 p-6">
              <h3 className="font-display text-l font-semibold text-primary">
                Una Desprogramación:
              </h3>
              <p className="text-base leading-8 text-foreground/72">
                Soltarás creencias erróneas, miedos heredados, pensamientos
                limitantes.
              </p>
            </section>
            <section className="rounded-[1.5rem] border border-border/70 bg-secondary/40 p-6">
              <h3 className="font-display text-l font-semibold text-primary">
                Un Aprendizaje:
              </h3>
              <p className="text-base leading-8 text-foreground/72">
                Integrarás conocimientos, cualidades, herramientas, habilidades
                y capacidades relacionadas a lo que representa esa Vibración
                Numérica.
              </p>
            </section>
            <section className="rounded-[1.5rem] border border-border/70 bg-secondary/40 p-6">
              <h3 className="font-display text-l font-semibold text-primary">
                Un Escenario:
              </h3>
              <p className="text-base leading-8 text-foreground/72">
                Situaciones y Maestros que llegarán a tu vida durante este
                tiempo para que el aprendizaje y la desprogramación se cumplan.
              </p>
            </section>
          </div>
        </section>
        <section className="space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            ¿Cuánto dura una Etapa?
          </h2>
          <p>
            La duración de la <strong>Primer Etapa</strong> de vida varía según
            la fecha de nacimiento de la persona y puede durar de 14 a 35 años,
            según sea el caso.{" "}
            <strong>Las etapas 2 a 7 duran siempre 9 años.</strong>
          </p>
          <p>
            <strong>Fórmula para el cálculo de la Primer Etapa:</strong>
            <br />
            36 (Dato fijo) – Número de Personalidad (Posición D del Pináculo) D
            (Número de Personalidad) = A (Mes) + B (Día) + C (Año)
          </p>
        </section>
      </div>
    </ToolPage>
  );
}
