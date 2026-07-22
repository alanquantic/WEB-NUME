import type { Metadata } from "next";

import { CollectiveVibrations } from "@/components/calculators/collective-vibrations";
import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "Vibraciones Colectivas",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="vibracionescolectivas"
      wide
      title="Vibraciones Colectivas"
      description="La energía universal que todos compartimos en una misma fecha: año, mes, semana y día universal."
    >
      <div className="space-y-10">
        <CollectiveVibrations />

        <section className="space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Vibraciones Colectivas
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            Las proyecciones numerológicas para el año en curso son el resultado
            de la observación de las frecuencias numéricas que estarán activas a
            nivel <strong>colectivo</strong> (como vibra el planeta) a lo largo
            de ese mismo año y la influencia de su impacto en la{" "}
            <strong>energía personal</strong> numerológica de cada individuo.
            &nbsp;La interpretación de la interacción entre ambas energías:{" "}
            <strong>la colectiva y la personal</strong> se le conoce como
            tránsito numerológico, que es básicamente el dialogo energético que
            define el rumbo en el que acontecen las situaciones por un período
            de tiempo determinado.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Algunos tránsitos numerológicos son más poderosas que otros y pueden
            tener un impacto confrontador, deconstructivo y transformador en
            cambio otros serán más retadores, empoderadores y marcarán grandes
            avances, no importa la naturaleza del tránsito numerológico, este
            siempre obedece a un propósito evolutivo en nuestra vida diaria.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Al principio, los tránsitos numerológicos trabajan ayudándote a
            desprogramar conductas y patrones obsoletos, es decir, te muestran
            lo que aún no has podido armonizar de esa frecuencia numerológica
            activa, invitándote a ver y comprender a través de situaciones y
            maestros lo que no funciona o ya no es adecuado para ti. El objetivo
            es habilitarte a redireccionar tu rumbo a una frecuencia superior de
            mayor armonía que traerá cambios muy favorables en tu vida.
          </p>
        </section>

        <section className="">
          <div className="space-y-4 p-6 sm:p-8">
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
              </section>
            </div>
          </div>
        </section>

        <section className="space-y-4 p-6 sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            Por ejemplo, el año 2022, Año Numerológico 6, se encargó de mostrar
            a cada uno de nosotros esos patrones obsoletos que aún conservamos
            en temas del <strong>6</strong> (Familia, relaciones, sentimientos,
            amor), invitándonos a ver esas áreas de nuestra vida donde dejamos
            de amarnos: poniendo las necesidades de los demás por encima de las
            nuestras, sacrificándonos por amor, permitiendo la falta de
            consideración, dulzura y amor hacia nosotros, olvidándonos de
            nutrirnos, cuidarnos, etc. El año 6 nos mostró donde era necesario
            hacer un auto-rescate, pero{" "}
            <em>
              <strong>¿Cómo fue que te diste cuenta?</strong>{" "}
            </em>
            &nbsp;Pues a través de una situación y claro de un maestro: pudiste
            ver donde era necesario poner límites y trabajar tu amor propio,
            valía y merecimiento y sobre todo decir, <strong>¡YA BASTA!</strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Así es que no importa que clase de maestro fue el protagonista de tu
            historia durante el 2022; un maestro amoroso que te mostró toda tu
            valía y te conecto con tu belleza diciéndote lo importante que eres
            y recordándote como amar<strong>te</strong> o un maestro
            confrontador que te hizo sentir usado, abusado e incluso pisoteado,
            hasta el punto de decir, ¡Ya basta!, ambos hicieron su trabajo,
            porque de ambas experiencias tu aprendizaje fue: Yo soy un ser
            valioso, <strong>“merezco esto”</strong> o{" "}
            <strong>“no me merezco esto”.</strong>
          </p>
          <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
            <span>
              <strong>Tránsitos numerológicos</strong>
            </span>
          </h3>
          <p className="text-base leading-8 text-foreground/72">
            Las vibraciones numerológicas de tiempo se dividen en dos:{" "}
            <strong>vibraciones colectivas o universales</strong> y{" "}
            <strong>vibraciones personales</strong>, la conjunción energética
            que se produce de la unión de estas fuerzas define y propone el
            curso de la acción por períodos de tiempo determinados, ya sea un
            año, un mes, una semana o un día; durante este tiempo, es posible
            notar la importancia de los cambios y situaciones que ocurren bajo
            la influencia del tránsito numerológico activo, y así mismo, actuar
            en consecuencia aprovechando las tendencias disponibles para ti.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Aún y cuando las <strong>vibraciones personales</strong> serán las
            que determinan la lección a desarrollar, y serán{" "}
            <strong>la brújula</strong> a seguir dentro de tu proyecto de
            evolución, serán las <strong>vibraciones colectivas</strong> las que
            indiquen el área de tu vida que será impactada bajo esas condiciones
            activas, e influyen directamente en el pensamiento y estado de ánimo
            colectivo, estas influencias universales favorecen o desfavorecen a
            ciertos aspectos y a ciertas temáticas específicas.
          </p>
        </section>

        <section className="space-y-4 rounded-[2rem]  p-6 sm:p-8 text-center meaning">
          <h3>
            “Los números en tu entorno te están dando indicaciones que sería
            bueno no ignorar”.
          </h3>
        </section>

        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] p-6 shadow-panel sm:p-8">
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p>
              Todos los{" "}
              <strong>
                <em>años, meses, semanas y días</em>
              </strong>
              , tienen una vibración que puede mostrarse por medio de la
              numerología. Esta vibración cambia a medida que cambia el tiempo,
              así que el identificarlas nos sirve para atraer y potencializar
              todas las cosas que vibran y se generan bajo esa energía numérica
              como:
            </p>
            <p>
              📌 Ayudarte a obtener logros materiales.
              <br />
              📌 Iniciar nuevas empresas o proyectos.
              <br />
              📌 Reforzar tus relaciones existentes o formar nuevas uniones.
              <br />
              📌 Estar alerta para aprovechar las oportunidades que se te
              presenten.
              <br />
              📌 No tener miedo de expresar tus ideas o pensamientos.
              <br />
              📌 Aceptar las oportunidades para acumular conocimiento y
              aprendizajes.
              <br />
              📌&nbsp;No perder el tiempo en cosas que te desgastan, afligen o
              confrontan.
              <br />
              📌 Formalizar o comprometerse seriamente en proyectos o
              actividades.
              <br />
              📌 Aceptar que es el momento de cerrar ciclos.
              <br />
              📌 Actuar en forma rápida y práctica.
            </p>
            <p>
              El poder conocer tu energía así como la de la gente a tu
              alrededor, te da la posibilidad de establecer conexiones
              armoniosas y beneficiosas para atraer a tu vida el éxito y la
              prosperidad.
            </p>
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
