import type { Metadata } from "next";
import Link from "next/link";

import { ToolPage } from "@/components/content/tool-page";

export const metadata: Metadata = {
  title: "Etapa personal",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="etapapersonal"
      title="Etapa personal"
      wide
      description="Las etapas personales son los grandes ciclos de vida. Descubre en cuál te encuentras y qué energía la rige."
    >
      <div className="space-y-10">
        <section className="space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Cuál es el curso de acción que te propone la vida?
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            Las&nbsp;<strong>Realizaciones o etapas de vida</strong>, dentro del
            Pináculo Numerológico, nos describen en forma específica y clara, el
            curso de acción que nos propone la vida durante un período
            determinado de tiempo.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            El&nbsp;<strong>viaje del ALMA</strong>&nbsp;a través de la fecha de
            nacimiento de la persona, determina&nbsp;
            <strong>las 4 grandes lecciones</strong>&nbsp;que tendremos que
            conquistar a lo largo de nuestra vida para finalmente lograr nuestro
            propósito o misión. Cada una de las realizaciones se irán activando
            en diferentes períodos de tiempo y nos invitarán a integrar,
            desarrollar y armonizar las cualidades y características esenciales
            de esa energía.
          </p>
        </section>

        <section className="space-y-4 rounded-[2rem]  p-6 sm:p-8 text-center meaning">
          <h3>"La Numerología nos enseña a ser "como el río que fluye".</h3>
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
                  ¿Cómo funcionan las Etapas Personales?
                </p>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                  Etapas Personales
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-9 text-foreground/72">
                  Dentro del Pináculo se establecen 4 etapas de vida: la 1ª, 2ª,
                  y 3ª etapa se transitarán en 2 períodos de tiempo diferentes a
                  lo largo de nuestro camino, la primera vez para aprender y la
                  segunda vez para reparar desde la evolución de nuestra
                  consciencia lo que quedó pendiente, por lo que tendremos en
                  total 7 estaciones de tiempo en nuestro proyecto evolutivo.
                </p>
                <Link
                  href="/calculadoras/camino-de-vida"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_hsl(var(--primary)/0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_44px_hsl(var(--primary)/0.24)]"
                >
                  Calcula tus Etapas de Vida
                </Link>
              </section>
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] border border-[hsl(var(--primary)/0.14)] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            Las 4 Realizaciones de vida
          </h2>
          <div className="space-y-4 text-base leading-8 text-foreground/72">
            <p className="text-base leading-8 text-foreground/72">
              <strong>Primera Realización:</strong>&nbsp;Dentro de las cuatro
              realizaciones que corresponden a los 4 grandes aprendizajes del
              <strong> Ciclo de la Vida</strong>, esta etapa será la de más
              larga duración. Se activa desde el momento de nacimiento, marcando
              los aprendizajes formativos más importantes de los primeros años
              de la vida del nativo; se le conoce como el{" "}
              <strong>Ciclo de Aprendizaje y Formación.</strong>
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Segunda Realización:</strong> Su duración es de sólo 9
              años y corresponde al momento más intenso de nuestra vida adulta;
              está marcado por la <strong>aplicación de lo aprendido</strong>
              &nbsp;y el momento de generar y producir cosas en todas las áreas
              de nuestra vida.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Tercera Realización:&nbsp;</strong>Su duración es de 9
              años al igual que la segunda y establece nuestro&nbsp;
              <strong>período de culminaciones.</strong> Generalmente en esta
              etapa de vida, se realizarán los ajustes necesarios para lograr
              nuestra realización final, pues está marcando la necesidad de
              manifestar la energía de nuestro número central, y nos impulsa a
              tomar la dirección correcta si es que estábamos fuera del camino
              al que debíamos dirigirnos. En este Ciclo de vida, podrán darse
              cambios y movimientos de dirección aun y cuando no hayamos
              alcanzado la conciencia por provocarlos nosotros mismos.
            </p>
            <p className="text-base leading-8 text-foreground/72">
              <strong>Cuarta Realización:</strong> Determina nuestro destino y
              las energías que estarán vibrando con mayor intensidad en la
              última etapa de nuestra vida, cabe mencionar que el tiempo de su
              duración es incierto, está asociada con nuestra{" "}
              <strong>cosecha y realización&nbsp;</strong>plena de vida y será
              el momento donde alcanzaremos nuestras metas más anheladas.
            </p>
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
