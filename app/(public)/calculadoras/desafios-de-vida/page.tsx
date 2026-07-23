import type { Metadata } from "next";

import { LifeStagesCalculator } from "@/components/calculators/life-stages-calculator";
import { ToolPage } from "@/components/content/tool-page";
import { getServerSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Mis desafíos de vida",
};

export default async function DesafiosDeVidaPage() {
  const user = await getServerSessionUser();
  const isMember = Boolean(user?.has_active_membership);

  return (
    <ToolPage
      toolKey="desafios-de-vida"
      title="Mis desafíos de vida"
      wide
      description="La parte inferior de tu pináculo revela los 4 desafíos que tendrás que superar en tu camino de vida. Se calculan a partir de tu fecha de nacimiento."
    >
      <div className="space-y-10">
        <section className="rounded-[2rem] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex justify-center">
              <img
                src="/images/Pinaculo-KLMN-sin-fondo.png"
                alt="Diagrama del pináculo con las posiciones K, L, M y N"
                className="h-auto max-w-full object-contain"
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-primary">
                La conquista de tus desafíos de vida
              </h2>
              <h2 className="font-display text-2xl font-semibold">
                ¿Qué son los desafíos que tendrás que superar en tu camino de
                vida?
              </h2>
              <p className="text-base leading-8 text-foreground/72">
                La <strong>parte inferior del pináculo</strong> establece los
                retos y desafíos que tendrás que superar para tu evolución. De
                la línea horizontal numerológica de tu Pináculo (fecha de
                nacimiento) hacia abajo, los números te alertan acerca de tus{" "}
                <strong>áreas de oportunidad</strong>, tus puntos débiles, los
                errores que constantemente cometes y los miedos más profundos
                que te mantienen atado a una realidad que no deseas o que
                impiden que las cosas sucedan como se planean.
              </p>
              <p className="text-base leading-8 text-foreground/72">
                La verdad es que ninguno de los números que componen el pináculo
                de cada uno puede ser eliminado o borrado de ese mapa. La única
                manera de controlarlos es{" "}
                <strong>
                  comprenderlos, reconocerlos, integrarlos y aceptar
                </strong>{" "}
                que forman parte de nuestra personalidad.
              </p>
              <p className="text-base leading-8 text-foreground/72">
                La numerología, sin embargo, no puede tomar decisiones por
                nadie. Es como un mapa de carreteras que no puede, por voluntad
                propia, decidir la ruta de un viaje. En cambio, es una guía que
                muestra las mayores posibilidades al alcance de nosotros.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-[2rem] p-6 text-center meaning sm:p-8">
          <h3>
            “Nadie se ilumina fantaseando figuras de luz, sino haciendo
            consciente su oscuridad.” — Carl Jung
          </h3>
        </section>

        <LifeStagesCalculator variant="desafios" isMember={isMember} />

        <section className="space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">
            Los 4 desafíos a superar en tu vida
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            La Numerología nos hace conscientes de que todo lo que sucede en
            nuestro entorno obedece a un plan perfecto ya escrito y contratado;
            el desarrollar este plan será lo que nos lleve a conectar por
            voluntad propia con nuestro propósito de vida, en un proceso de
            comprensión y entendimiento llamado “iluminación”.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>
              1er Desafío de Vida (K) - El Contrato heredado de tu clan para
              reparar y corregir
            </strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>Infancia y juventud temprana:</strong> Hay cuatro retos u
            obstáculos que se activan en correspondencia con las cuatro
            realizaciones de tu Ciclo de Vida. El primer desafío es el de más
            larga duración y se activa en los primeros años de la vida del
            nativo, este acompaña el Ciclo de Aprendizaje y Formación (1ª
            realización de vida) y funciona como la gran batalla a vencer para
            poder liberarte de condicionamientos obsoletos de obediencia al
            clan y que necesitan ser reformados.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Los contratos heredados del clan son órdenes y prohibiciones que
            asumimos desde la gestación para ser fieles a la familia.
            Generalmente la energía del primer Reto/Meta de vida (K) representa
            los temas reprimidos o no vividos plenamente por tus antepasados y
            que te han sido encargados para que tú los sanes, repares e
            integres en lealtad a ti mismo y a tus deseos.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>
              2º Desafío de Vida (L) – La confrontación de los mandatos
              establecidos
            </strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>Adulto maduro:</strong> Activa la determinación de asumir tu
            derecho a construir una vida autónoma al clan, su duración es de 9
            años y establece tu período de culminaciones y desapego a la
            necesidad de buscar aprobación y validación en tu vida,
            generalmente este desafío de vida está marcado por el impulso de
            tomar la dirección correcta, redirigiendo tus pasos a una vida con
            mayor sentido y propósito. Es el punto clave para reconectarte con
            tu “YO” y alcanzar una mayor conciencia y comprensión de tu
            verdadero propósito. Vencer este desafío te otorga la liberación de
            construir tu propia vida a tu manera.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>
              3er Desafío de Vida (M) – La búsqueda de tu individuación
            </strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>Adulto maduro:</strong> Activa la determinación de asumir tu
            derecho a construir una vida autónoma al clan, su duración es de 9
            años y establece tu período de culminaciones y desapego a la
            necesidad de buscar aprobación y validación en tu vida,
            generalmente este desafío de vida está marcado por el impulso de
            tomar la dirección correcta, redirigiendo tus pasos a una vida con
            mayor sentido y propósito. Es el punto clave para reconectarte con
            tu “YO” y alcanzar una mayor conciencia y comprensión de tu
            verdadero propósito. Vencer este desafío te otorga la liberación de
            construir tu propia vida a tu manera.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>
              4º Desafío de Vida (N) – La conquista de las oposiciones a la
              realización de tu sueño
            </strong>
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>Adulto mayor:</strong> Será el mayor reto a conquistar para
            lograr tu destino y plena realización, las energías que estarán
            vibrando representan tus miedos más profundos y la mayor
            resistencia a asumir la responsabilidad plena de tu vida. Su
            duración es de 9 años y está asociada al momento donde alcanzarás
            tus metas más anheladas. Vencer este desafío te otorga el poder de
            renunciar a condicionamientos y expectativas determinadas por tu
            clan, la sociedad y tu medio ambiente, conectar con tu sabiduría de
            vida y ofrecerla a los demás para definir tu verdadera vocación, y
            exaltar aquello que va a sostener tu gran culminación de vida.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Las personas que realmente tienen definida su vocación en lo que
            hacen, permanecen haciendo lo que hacían y siguen productivas y con
            responsabilidades, mejorándose y especializándose cada vez más,
            pero el compromiso cambia, ya no es con el mundo sino con ellos
            mismos.
          </p>
        </section>

        <section className="space-y-6 p-6 sm:p-8" id="representacion-desafio">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Cada Desafío representará entonces:​
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
            ¿Cuánto dura un Desafío?
          </h2>
          <p>
            La duración del <strong>Primer Desafío</strong> de vida varía según
            la fecha de nacimiento de la persona y puede durar de 14 a 35 años,
            según sea el caso.{" "}
            <strong>Los desafíos 2 a 7 duran siempre 9 años.</strong>
          </p>
          <p>
            <strong>Fórmula para el cálculo del Primer Desafío:</strong>
            <br />
            36 (Dato fijo) – Número de Personalidad (Posición D del Pináculo) D
            (Número de Personalidad) = A (Mes) + B (Día) + C (Año)
          </p>
        </section>
      </div>
    </ToolPage>
  );
}
