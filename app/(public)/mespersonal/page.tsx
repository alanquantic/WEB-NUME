import type { Metadata } from "next";
import Link from "next/link";

import { PersonalCycleCalculator } from "@/components/calculators/personal-cycle-calculator";
import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "Mes personal",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="mespersonal"
      title="Mes personal"
      wide
      description="El mes personal afina la energía de tu año y te muestra en qué enfocarte este mes."
    >
      <PersonalCycleCalculator kind="month" />

      <div className="space-y-10">
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Cuál es mi prueba durante el mes?
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            <br />
            La prueba del <strong>Mes Personal</strong> te invita a trabajar una
            a una las vibraciones del 1 al 9 y las vibraciones maestras 11 y 22
            de forma cíclica, en un patrón progresivo y predecible, que empieza
            con la energía correspondiente por fórmula numerológica al mes de
            enero y termina con la energía calculada para el mes de diciembre,
            dicho patrón se calcula a través del año personal de cada uno, por
            lo que la energía de los meses personales del año no es igual para
            todos.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            La energía activa del <strong>Mes Personal</strong> te dice en que
            área de tu vida te debes enfocar durante cada mes y define los
            procesos que estarás trabajando de acuerdo con ese tema, por lo que
            deberás esperar situaciones y maestros relacionados con el objetivo
            central de la vibración que se encuentre activa. Estas situaciones y
            maestros tienen el objetivo de impulsarte a desprogramar conductas
            erróneas en relación con ese asunto, para generar vacío y poder así
            aprender nuevos conceptos más evolucionados y congruentes con el
            nivel de evolución y consciencia que has ido desarrollando a través
            del tiempo.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>Cada año, mes, semana y día</strong> somos invitados a
            crecer y mejorar a través de corregir y resignificar ideas erróneas,
            miedos heredados, patrones equivocados, o simplemente a avanzar a
            niveles de conocimiento más profundo en cada uno de nuestros temas,
            del mismo modo que un estudiante universitario avanza a través de un
            plan de estudio donde cursa varios niveles de una misma materia para
            alcanzar el grado máximo de conocimiento y sabiduría (matemáticas 1,
            matemáticas 2, matemáticas 3, etc.) &nbsp;
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
                  ¿Qué es el Mes Personal?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Mes Personal
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-9 text-foreground/72">
                  Indica la energía activa que estará vibrando de forma
                  personal, durante los 30/31 días del mes, y corresponde
                  directamente al tema que cada uno de nosotros de forma
                  individual tendrá que transitar para lograr su meta de
                  evolución anual.
                </p>
                <Link
                  href="/horoscopoanopersonal"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_hsl(var(--primary)/0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_44px_hsl(var(--primary)/0.24)]"
                >
                  Calcula tu Mes Personal
                </Link>
              </section>
            </div>
          </div>
        </section>
        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            Lecciones mensuales
          </h2>
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p className="text-base leading-8 text-foreground/72">
              Así pues, cada vez que vivamos otra prueba mensual avanzaremos un
              paso más en temas específicos:
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 1:&nbsp;</strong> Poder personal,
              independencia, liderazgo, individualidad
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes personal 2:&nbsp;</strong> Integración, vinculación,
              certeza en decisiones, equilibrio entre dar y recibir.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes personal 3:&nbsp;</strong> Elecciones propias,
              expresar tus ideas, diversificar, comercializar, notoriedad.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes personal 4:&nbsp;</strong> Ponerte en orden, activarte
              y ser constructivo, establecerte, arraigarte.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes personal 5:&nbsp;</strong> Moverte, expandirte, salir
              al mundo, socializar, hacer cambios.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 6:</strong>&nbsp; Cuidar de ti, ser fértil,
              formar familia o tribu, responsabilidades amorosas.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 7:&nbsp;</strong> Especializarte, organizar y
              administrar, conexión espiritual, dar enseñanzas.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 8:&nbsp;</strong> Invertir recursos, volverte
              una autoridad, emprendimientos, aplicar tu potencial y talentos,
              salir de bajo de la influencia de una autoridad.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 9:&nbsp;</strong> Culminaciones,
              graduaciones, buscar autonomía y autosuficiencia, conectar con tu
              sentido humanista y de servicio.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 11:</strong> Inspiración, autoridad y
              especialización, creación y desarrollo, enseñanza, guía, salirte
              de tus fronteras.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Mes Personal 22:</strong> Conexión con tu propósito de
              vida, creación magistral, superación de obstáculos, salir del
              estancamiento, progreso y avance en lo material.
            </p>
          </div>
        </section>
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            El curso de la acción que dicte el <strong>Mes Personal</strong>{" "}
            dependerá directamente de la energía que lo dirija, en este caso
            sería el número de Año Personal que este activo en el período para
            cada uno
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Un mapa numerológico de proyecciones de tiempo muestra el proceso de
            evolución y aprendizaje de un individuo en correspondencia con su
            fecha de nacimiento, algo así como el plan de estudio que contrató
            al bajar a este plano con un calendario de cursos y materias
            incluido que le sirva como referencia específica de lo que tendrá
            que aprender por un período de tiempo determinado; a través de la
            fecha de nacimiento se calcula de forma personal: la energía activa
            para cada etapa de 9 años, año, mes, semana y día las cuales se usan
            para establecer los patrones progresivos predecibles de información
            que nos sirvan de brújula y guía alcanzar nuestra plena realización
            y propósito de vida.
          </p>
        </section>
      </div>
    </ToolPage>
  );
}
