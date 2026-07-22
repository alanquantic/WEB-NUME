import type { Metadata } from "next";
import Link from "next/link";

import { PersonalCycleCalculator } from "@/components/calculators/personal-cycle-calculator";
import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "Semana personal",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="semanapersonal"
      title="Semana personal"
      wide
      description="La semana personal te da un enfoque más cercano para organizar tus próximos días."
    >
      <div className="space-y-10">
        <PersonalCycleCalculator kind="week" />
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            La herramienta más potencializada durante la semana
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            <em>
              En que aspectos cotidianos puedo generar desarrollo y evolución
              consciente.
            </em>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            La energía de tu <strong>semana personal, </strong>como su nombre lo
            indica es para ti, y posee un carácter individual, ya que se calcula
            a partir de la energía de tu año personal, es decir, cumple el
            propósito de entregarte las herramientas necesarias para desarrollar
            tu meta anual; podrás coincidir energéticamente con algunas de las
            personas de tu entorno, sin embargo, lo usual es que cada uno traiga
            su propio ritmo.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            El cambio de <strong>energías</strong> <strong>semanales </strong>es
            el más notorio de los tránsitos numerológicos de tiempo y el que te
            puede servir como una herramienta utilitaria para atraer o
            potencializar todo aquello que resuene con dicha energía, así pues,
            si se activa para ti la <strong>semana personal 1</strong> notarás
            inmediatamente ese deseo de avanzar o de ir a buscar el siguiente
            reto y te sentirás imparable, por el contrario, si se activa tu{" "}
            <strong>semana personal 7</strong>, te invadirá la quietud y la
            necesidad de parar, tu mente necesita 7 días para vaciar su
            contenido y convertirlo en un plan o un proyecto; la{" "}
            <strong>semana 5</strong> no te dejará descansar y te cambiara todos
            tus planes, pero recuerda esta vibración es una herramienta, así que
            al mismo tiempo que te cambia las cosas, te aporta movilidad, poder
            de adaptación, agilidad mental, etc. Nunca te atreverás tanto, a
            tomar riesgos tan fuera de lo común para ti, que bajo la energía de
            la semana 5 personal, te irás de pinta, te arriesgarás a tener un
            romance clandestino o te atreverás a decirle que si a una aventura
            de vida.
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
                  ¿Qué es la Semana Personal?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Semana Personal
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-9 text-foreground/72">
                  Según nuestro calendario anual numerológico, cada mes del año
                  contiene <strong>4 semanas, </strong>con un total de 7 a 10
                  días cada una dependiendo del número de semana que sea (1ª,
                  2ª, 3ª o 4ª), así que, de acuerdo a la Numerología a lo largo
                  de un mes de <strong>30 o</strong>
                  <strong> 31 días</strong> nos veremos influenciados por{" "}
                  <strong>4 </strong>diferentes vibraciones numerológicas de
                  tiempo que determinarán nuestras acciones y propondrán el
                  curso de la acción por un lapso determinado de días, hasta que
                  cambiemos a la siguiente energía semanal.
                </p>
                <Link
                  href="/semana-personal"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_hsl(var(--primary)/0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_44px_hsl(var(--primary)/0.24)]"
                >
                  Leer Más
                </Link>
              </section>
            </div>
          </div>
        </section>
        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] p-6 shadow-panel sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p className="text-base leading-8 text-foreground/72">
              <strong>Herramientas que activa cada semana personal:</strong>
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Semana 1:</strong> Liderazgo, impulso, seguridad personal
              e independencia.
              <br />
              <br />
              <strong>Semana 2:</strong> Conexión personal, buena fortuna, apoyo
              y respaldo de los demás.
              <br />
              <br />
              <strong>Semana 3:</strong> Expresión, magnetismo, audiencia y
              poder de negociación.
              <br />
              <br />
              <strong>Semana 4:</strong> Acción, concreción, enfoque y voluntad.
              <br />
              <br />
              <strong>Semana 5:</strong> Adaptabilidad, movimiento, poder de
              seducción y agilidad mental.
              <br />
              <br />
              <strong>Semana 6:</strong> productividad, equipo, asociaciones y
              solidaridad.
              <br />
              <br />
              <strong>Semana 7:</strong> Análisis, buena administración,
              auditoría de procesos y compromiso.
              <br />
              <br />
              <strong>Semana 8:</strong> Determinación, ambición, visión
              financiera y autoridad.
              <br />
              <br />
              <strong>Semana 9:</strong> Generosidad, público, reflectores,
              notoriedad y culminaciones.
              <br />
              <br />
              <strong>Semana 11:</strong> Jerarquía, realización, aterrizar y
              firmar proyectos e inspiración del grupo.
              <br />
              <br />
              <strong>Semana 22:</strong> Superación de grandes obstáculos,
              progreso, manifestación y creación.
            </p>
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
