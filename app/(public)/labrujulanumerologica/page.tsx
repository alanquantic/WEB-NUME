import type { Metadata } from "next";
import Link from "next/link";

import { PersonalCompass } from "@/components/calculators/personal-compass";
import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "La Brújula Numerológica",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="labrujulanumerologica"
      wide
      title="La Brújula Numerológica"
      description="Tus vibraciones de tiempo en un solo lugar: etapa, año, mes, semana y día personal a partir de tu fecha de nacimiento."
    >
      <div className="space-y-10">
        <PersonalCompass />

        <section className="space-y-4 rounded-[2rem] border-border/70 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Cómo funciona la Brújula Numerológica?
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            <em>
              Aprende a ponerte en sincronía con tu energía y atrae a tu vida
              todo lo que vibre en esa misma sintonía.
            </em>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            De acuerdo con la Numerología el futuro no es simplemente el lugar
            hacia donde vamos; es algo que nosotros creamos con base a un plan
            ya escrito, pero aún no desarrollado, donde se establece un proyecto
            de aprendizaje determinado al grado de evolución espiritual de cada
            uno.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            En el transcurso de nuestra vida nos encontramos indudablemente ante
            un conjunto de retos bastante exigentes. La herramienta de la
            Numerología nos revela una gran cantidad de información encriptada
            en nuestra fecha de nacimiento y nombre completo, dándonos pistas y
            tiempos perfectos para hacer las cosas. Esto sería como tener en
            nuestras manos, el manual de instrucciones de nuestra vida para
            guiarnos, dándonos ubicación y visión hacia el futuro.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            A través de las{" "}
            <strong>proyecciones de tiempo numerológicas</strong> nos
            activaremos como atentos reconocedores del descubrimiento de los
            patrones que establecen nuestros ciclos progresivos de vida y los
            volveremos predecibles, manteniéndonos al tanto de los
            acontecimientos que nos rodean. La extracción de información de
            utilidad nos dará certeza, ya que nos marca el ritmo correcto en el
            que se suceden los cambios. En un mundo cada día más difícil de
            predecir, podremos elaborar estrategias sólidas y fijar el rumbo
            correcto, desarrollar escenarios futuros alternativos y moldear
            nuestro mundo en sincronía con lo que deseamos.
          </p>
        </section>

        <section className="">
          <div className=" rounded-[2rem] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Viaje de evolución del alma
            </h2>

            <blockquote className="rounded-t-[1.5rem] bg-secondary/60 p-5 text-base italic leading-8 text-foreground/80">
              <em>
                <strong>
                  “Somos almas que venimos a transmutarnos y a evolucionar a
                  través de un viaje que está descrito por nuestra fecha de
                  nacimiento, estableciendo el grado de evolución que
                  tenemos.”&nbsp;
                </strong>{" "}
                — Pitágoras
              </em>
            </blockquote>
            <div
              id="dividido-80-20"
              className="grid gap-0 overflow-hidden rounded-b-[1.5rem] border border-[hsl(var(--accent)/0.16)] bg-[linear-gradient(180deg,hsl(var(--accent)/0.18),hsl(var(--background)/0.95))] shadow-[0_24px_60px_hsl(var(--primary)/0.08)] lg:grid-cols-[0.85fr_1.15fr]"
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
                  ¿Qué son las vibraciones de tiempo numerológico?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Vibraciones de Tiempo
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-9 text-foreground/72">
                  La Numerología divide el tiempo y lo agrupa en distintos
                  períodos e intervalos, en los cuales se generan diferentes
                  vibraciones energéticas que influyen directamente en nuestro
                  desarrollo personal y crecimiento espiritual.
                </p>
                <Link
                  href="/vibracionescolectivas"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_hsl(var(--primary)/0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_44px_hsl(var(--primary)/0.24)]"
                >
                  Vibraciones Colectivas
                </Link>
              </section>
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] p-6  sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p>
              Los números en tu entorno te están dando indicaciones que sería
              bueno no ignorar. Los ciclos numerológicos se mueven en{" "}
              <strong>períodos de nueve años</strong>, cada año dentro del ciclo
              aparecen nuevas influencias que determinan tu vida, que provocan
              inicios, liberaciones, consolidaciones, esfuerzos, cambios,
              uniones, aprendizajes, logros, éxitos, crisis, confrontaciones y
              cierres entre muchas otras lecciones.
            </p>
            <p>
              El valor de conocer las vibraciones numerológicas del tiempo te da
              el poder de saber cuándo y cómo buscar las realizaciones que se
              quieren en cualquiera de los diferentes planos de nuestra vida:{" "}
              <strong>
                <em>físico, mental, emocional y espiritual</em>.{" "}
              </strong>
            </p>
            <p>
              Todos los <em>años, cuatrimestres, meses, semanas y días</em>,
              tienen una vibración que puede mostrarse por medio de la
              numerología. Esta vibración cambia a medida que cambia el tiempo,
              así que el identificarlas nos sirve para atraer y potencializar
              todas las cosas que vibran y se generan bajo esa energía numérica.
            </p>
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] p-6 shadow-panel sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p>
              <strong>
                Vibraciones numerológicas para tu desarrollo personal.
              </strong>
            </p>
            <p>
              <Link href="/etapapersonal">
                <strong>Las 4 Etapas: </strong>
              </Link>
              <em>
                ¿Cuál es el gran aprendizaje para conquistar por un determinado
                número de años de tu vida?
              </em>{" "}
              El ciclo de vida numerológico se compone de 4 grandes lecciones
              necesarias para lograr el pleno desarrollo de tu{" "}
              <strong>Ser</strong> en esta encarnación, estas lecciones son
              parte fundamental para poder asimilar y potencializar tu misión de
              vida. Las Etapas se mueven en Ciclos de 9 años marcando un tiempo
              de duración determinado en el cual estará activo ese aprendizaje.
            </p>
            <p>
              <Link href="/anopersonal">
                <strong>Año Personal</strong>
                <strong>:</strong>
              </Link>{" "}
              <em>¿Qué lección te toca vivir dentro de tu Etapa?</em> &nbsp;El
              proceso evolutivo del ciclo de vida se basa en lecciones anuales,
              cada lección dura 365 días, comenzando el 1.º de enero y
              terminando el 31 de diciembre, una vez terminada la lección
              pasarás a la siguiente, el que hayas aprobado o no, determinará
              como fluye tu siguiente año o lección. Cada ciclo dura 9 años,
              comenzando en un<strong> Año Personal&nbsp;1</strong>&nbsp;y
              terminando en el<strong>&nbsp;año.</strong>
            </p>
            <p>
              <strong>Cuatrimestre Personal: </strong>
              <em>¿Qué realización debes buscar? </em>Define el tema central que
              será aprendido en un lapso de 4 meses y determina la energía
              disponible a nuestro favor para dirigir todo nuestro enfoque hacia
              una meta específica. Ayuda a programar las acciones o actividades
              que debemos tomar para obtener beneficios en lugar de vernos
              obstaculizados, ya que esto nos garantiza que en la medida que
              empujemos todo lo relacionado con la vibración numérica de cada
              cuatrimestre, obtendremos los resultados esperados.
            </p>
            <p>
              <Link href="/mespersonal">
                <strong>Mes Personal</strong>
              </Link>
              <strong>: </strong>
              <em>¿Qué prueba tienes que pasar? </em>Indica la energía que
              estará vibrando más fuerte para ti los 30/31 días del mes; la
              prueba se hará presente en péndulo, es decir, puede ser positiva o
              negativa. El <strong>Mes Personal</strong> te dice en que área de
              tu vida te debes enfocar durante cada mes y define los procesos
              que estarás trabajando, por lo que deberás esperar situaciones y
              maestros relacionados con el tema central de la vibración activa
              en cada mes.
            </p>
            <p>
              <Link href="/semanapersonal">
                <strong>Semana Personal:</strong>
              </Link>{" "}
              <em>
                ¿Cuáles son las 4 herramientas de realización activas durante el
                Mes?
              </em>{" "}
              La vibración semanal define la energía más potencializada para ser
              usada a tu favor, te da el poder de manejar y aprender a usar
              diferentes potencias numéricas para entender cómo irlas asimilando
              en tu día a día como talentos personales. Aprender a identificar
              tu energía semanal potencializa talentos latentes dentro de ti que
              desconocías y los vuelve conscientes para tu beneficio.
            </p>
            <p>
              <Link href="/diapersonal">
                <strong>Día Personal</strong>
                <strong>:</strong>{" "}
              </Link>
              <em>¿Qué puedes hacer hoy?</em> Es el timón del barco, marca la
              dirección en la que se&nbsp;irán&nbsp;presentando las cosas día a
              día dentro de tu mes. Convierte tu día en un imán para atraer las
              cosas que vibran en la misma sintonía.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] p-6 sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            Con las previsiones que nos ofrece la información obtenida de las
            vibraciones de nuestro Año, Cuatrimestres, Meses, Semanas y Días
            personales, podemos afrontar con mayores garantías todos los
            momentos decisivos del año. Una vez que comienza, nos ofrece la
            oportunidad de cambiar y evolucionar y aprobar un examen más en la
            escuela de la vida.
          </p>
        </section>
      </div>
    </ToolPage>
  );
}
