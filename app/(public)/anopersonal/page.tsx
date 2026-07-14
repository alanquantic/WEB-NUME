import type { Metadata } from "next";
import Link from "next/link";

import { PersonalCycleCalculator } from "@/components/calculators/personal-cycle-calculator";
import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "Año personal",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="anopersonal"
      wide
      title="Año personal"
      description="Tu año personal marca el tema y las oportunidades de tu ciclo anual. Se calcula con tu fecha de nacimiento y el año en curso."
    >
      <div className="space-y-10">
        <PersonalCycleCalculator kind="year" />
        <section className="space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Qué lección voy a vivir este año?
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            <br />
            La{" "}
            <span className="text-primary">
              <strong>Numerología</strong>
            </span>{" "}
            nos da una clave que nos permite tener una idea general de las{" "}
            <span className="text-primary">
              <strong>
                tendencias que seguirá el año que vivimos actualmente
              </strong>
            </span>
            , así como la posibilidad de dar un vistazo a nuestro pasado y así
            poder tener una más clara visión del rumbo que se vislumbra hacia
            nuestro futuro. Esto, para poder aprender a:
          </p>
        </section>
        <section className="space-y-4 rounded-[2rem]  p-6 sm:p-8 text-center meaning">
          <h3>“Ama tu ritmo y ritmar tus acciones bajo su ley.” — R. Darío</h3>
        </section>
        <section className="space-y-4 p-6 sm:p-8">
          <p className="text-base leading-8 text-foreground/72">
            Es muy importante observar los procesos de cada uno de nuestros{" "}
            <span className="text-primary">
              <strong>Años Personales</strong>
            </span>
            , ya que estos van formando nuestro muy personal{" "}
            <span className="text-primary">
              <strong>Ciclo de vida</strong>
            </span>
            . Los años personales se mueven en
            <span className="text-primary">
              <strong> grupos cíclicos de 9 años</strong>
            </span>{" "}
            que generalmente son acumulativos y que establecen un hilo
            conductual sobre un mismo tema (amor propio, sobre exigencia,
            control, emociones, desapego, autoafirmación, evolución,
            responsabilidad, liberación, etc.) de la misma manera que un
            programa de estudios, cada vez que volvemos a tocar un de estos
            temas, la lección aumenta su grado de dificultad, buscando así
            convertirnos en una mejor versión de nosotros mismos.
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
                  ¿Qué es el Año Personal?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Año Personal
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-9 text-foreground/72">
                  Es la vibración numerológica que nos corresponde en forma
                  individual a cada persona a lo largo de un año; establece una
                  lección específica dentro del ciclo de 9 años que se encuentra
                  dentro de cada una de las etapas de vida. &nbsp;El{" "}
                  <strong>año personal </strong>será entonces el aprendizaje
                  para transitar que nos corresponde a cada persona en manera
                  individual durante los 365 días del año. Una vez terminado
                  este tiempo y tomada la lección pasaremos a la siguiente; el
                  que hayas aprobado o no, determinará como fluyen los
                  acontecimientos para tu siguiente año.
                </p>
                <Link
                  href="/horoscopoanopersonal"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_hsl(var(--primary)/0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_44px_hsl(var(--primary)/0.24)]"
                >
                  Calcula tu Año Personal
                </Link>
              </section>
            </div>
          </div>
        </section>
        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            Alineación de temporalidad del Año Personal
          </h2>
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p className="text-base leading-8 text-foreground/72">
              Esto quiere decir que cada <strong>año personal</strong> tendrá su
              propia alineación de temporalidad y su raíz conectada por{" "}
              <strong>intervalos de 9 años</strong> (2022-9, 2013-9, 2004-9,
              1995-9, 1986, etc.), cada uno de estos años dentro del ciclo
              estaremos en proceso de elevar a un mayor nivel nuestra
              comprensión sobre un mismo tema o eje central (el que el año
              personal proponga) en busca de una mayor consciencia, con el
              propósito de acercarnos al cumplimiento de nuestro proyecto
              evolutivo para ese tema en particular;{" "}
              <strong>
                tomar estas lecciones con sabiduría y responsabilidad es lo que
                finalmente nos convertirá en personas realizadas
              </strong>
              , completas y más evolucionadas desde el punto de vista
              espiritual; es aprender a ser{" "}
              <strong>
                <em>“Como el río que fluye”</em>
              </strong>{" "}
              en lugar de estar luchando contra corriente todo el tiempo.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <p>
                La duración del <strong>año personal</strong> será del{" "}
                <strong>1° de enero al 31 de diciembre</strong>. Mientras estén
                activos sus poderes vibratorios atraeremos influencia en
                concordancia con la energía disponible por el tiempo
                establecido, que se volverán determinantes en nuestra vida,
                provocando inicios, liberaciones, consolidaciones, esfuerzos,
                cambios, uniones, aprendizajes, logros, éxitos, crisis,
                confrontaciones y cierres entre muchas otras lecciones. El uso
                adecuado de <strong>esta información te sirve de guía</strong>{" "}
                para diseñar un año donde los logros y el éxito en los remas
                propuestos sean alcanzables con mayor.
              </p>
            </p>
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
