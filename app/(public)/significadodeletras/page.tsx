import type { Metadata } from "next";

import { LetterValuesTable } from "@/components/content/letter-values-table";
import { ToolPage } from "@/components/content/tool-page";

const LETTER_MEANINGS = [
  {
    id: "letra-a",
    title: "Letra A",
    value: "Valor numérico 1",
    paragraphs: [
      "Significado: Originalidad, búsqueda de independencia por insatisfacción, atrae cambios y viajes de placer o trabajo.",
      "Vibración que genera en la tabla del destino: Etapa de cambios de actividad, casa, aspecto físico, imagen, etc. Momento en la vida del nativo de gran fuerza de voluntad y empuje.",
    ],
  },
  {
    id: "letra-b",
    title: "Letra B",
    value: "Valor numérico 2",
    paragraphs: [
      "Significado: Gran necesidad de amor, emotividad, timidez y salud reducida, tendencia a relaciones amorosas, matrimonio.",
      "Vibración que genera en la tabla del destino: Etapa donde pueden caer en estados melancólicos o salud reducida, necesidad por mantener buenas relaciones con los demás.",
    ],
  },
  {
    id: "letra-c",
    title: "Letra C",
    value: "Valor numérico 3",
    paragraphs: [
      "Significado: Genera gran sensibilidad, intuición, estados muy emotivos, búsqueda de movimiento y cambios dinámicos.",
      "Vibración que genera en la tabla del destino: Etapa alegre y de gran movimiento, te dejas llevar por tu impulsividad y desafíos, gran energía vital.",
    ],
  },
  {
    id: "letra-d",
    title: "Letra D",
    value: "Valor numérico 4",
    paragraphs: [
      "Significado: Sentido práctico y fatiga física (salud reducida).",
      "Vibración que genera en la tabla del destino: Etapa con gran fuerza para asuntos materiales, por lo que fácilmente pueden descuidar asuntos emocionales y caer en depresión por no tener el equilibrio de ambos.",
    ],
  },
  {
    id: "letra-e",
    title: "Letra E",
    value: "Valor numérico 5",
    paragraphs: [
      "Significado: Intercambios, cambios repentinos y transformaciones en general, tendencia a relaciones amorosas.",
      "Vibración que genera en la tabla del destino: Etapa de transformación en general, lucidez intelectual, tendencia a buscar en otra parte lo que no existe en la propia casa.",
    ],
  },
  {
    id: "letra-f",
    title: "Letra F",
    value: "Valor numérico 6",
    paragraphs: [
      "Significado: Intuición, amor por la vida privada, sentido de la responsabilidad y trabajo duro.",
      "Vibración que genera en la tabla del destino: Etapa donde se marca incremento de responsabilidades, tiempo para trabajar en grupos o periodos de organización en todas las áreas.",
    ],
  },
  {
    id: "letra-g",
    title: "Letra G",
    value: "Valor numérico 7",
    paragraphs: [
      "Significado: Suerte, inteligencia y ganancias financieras.",
      "Vibración que genera en la tabla del destino: Etapa de prosperidad, brillo y reconocimiento social.",
    ],
  },
  {
    id: "letra-h",
    title: "Letra H",
    value: "Valor numérico 8",
    paragraphs: [
      "Significado: Prosperidad o pérdidas, ambición, autosuficiencia y generosidad.",
      "Vibración que genera en la tabla del destino: Etapa donde hay una gran atracción para el éxito y el dinero, pero puede ser mal administrado así que este tiempo se mueve entre los extremos de la riqueza y la pobreza.",
    ],
  },
  {
    id: "letra-i",
    title: "Letra I",
    value: "Valor numérico 9",
    paragraphs: [
      "Significado: Depresión, tensión, incertidumbre, enfermedad, nervios, agotamiento, retrasos, accidentes, hipersensibilidad.",
      "Vibración que genera en la tabla del destino: Etapa donde nos vemos forzados a tomar decisiones importantes, se pueden presentar muchos obstáculos o sacrificios. Se pueden tomar compromisos que no tengamos claro cómo sobrellevarlos.",
    ],
  },
  {
    id: "letra-j",
    title: "Letra J",
    value: "Valor numérico 1",
    paragraphs: [
      "Significado: Deseo de victoria y bienestar, aumento de responsabilidad, necesidad de equilibrio.",
      "Vibración que genera en la tabla del destino: Etapa donde se darán ganancias o ventajas relacionadas con la economía o profesión en general. Gran apego y fidelidad a sus ideas.",
    ],
  },
  {
    id: "letra-k",
    title: "Letra K",
    value: "Valor numérico 11",
    paragraphs: [
      "Significado: Inspiración y nerviosismo, vitalidad reducida.",
      "Vibración que genera en la tabla del destino: Etapa de gran evolución e inspiración creativa, idealismo, llena de una notable fuerza emocional que puede moverse en los extremos tanto en la fortuna como en la salud o lo espiritual.",
      "Momento donde se viven grandes pruebas de vida que generalmente te forzarán a salir de tu zona de confort.",
    ],
  },
  {
    id: "letra-l",
    title: "Letra L",
    value: "Valor numérico 3",
    paragraphs: [
      "Significado: Inteligencia, disposición al servicio, autosacrificio, tendencia a presentarse numerosos viajes de placer o trabajo, capacidad ejecutiva bien dirigida.",
      "Vibración que genera en la tabla del destino: Etapa donde podemos enfocarnos o dirigirnos a un objetivo definido, llegan recompensas a través de las relaciones humanas, se termina lo empezado.",
    ],
  },
  {
    id: "letra-m",
    title: "Letra M",
    value: "Valor numérico 4",
    paragraphs: [
      "Significado: Cimentación, deseo de echar raíces, carácter explosivo o menos tolerante, regeneración, renovación y autoafirmación.",
      "Vibración que genera en la tabla del destino: Etapa donde puede darse matrimonio, o varias relaciones amorosas, se incrementa la percepción, momento para desechar viejas ideas o criterios por mejores.",
    ],
  },
  {
    id: "letra-n",
    title: "Letra N",
    value: "Valor numérico 5",
    paragraphs: [
      "Significado: Amor, amor por el lujo, sexualidad, autoengaño, envidia, celos y separaciones.",
      "Vibración que genera en la tabla del destino: Etapa donde podemos caer en autocomplacencias o placeres vanos o desgastantes, habla de época de vivencia de muchas experiencias dejadas de lado, por lo que es un periodo de pruebas y lecciones.",
    ],
  },
  {
    id: "letra-o",
    title: "Letra O",
    value: "Valor numérico 6",
    paragraphs: [
      "Significado: Deseo de viajar, tristeza y emotividad, aumento de responsabilidades, perseverancia y voluntad.",
      "Vibración que genera en la tabla del destino: Etapa donde se presentan oportunidades de progreso y la capacidad para liberarse de las limitaciones presentes.",
    ],
  },
  {
    id: "letra-p",
    title: "Letra P",
    value: "Valor numérico 7",
    paragraphs: [
      "Significado: Discreción, buenos confidentes, inteligencia notable, tendencia a convertirse en especialistas o sobresalir considerablemente en algún tema.",
      "Vibración que genera en la tabla del destino: Etapa de buena fortuna y mayor poder de expresión hablada o escrita, etapa donde se incrementa el trabajo y las responsabilidades.",
    ],
  },
  {
    id: "letra-q",
    title: "Letra Q",
    value: "Valor numérico 8",
    paragraphs: [
      "Significado: Intuición, riquezas o pérdidas relacionadas directamente con el compromiso y esfuerzo de la persona, agilidad mental, progreso y reconocimiento.",
      "Vibración que genera en la tabla del destino: Etapa de búsqueda de algo más profundo, gran fortaleza interna. Grandes oportunidades de ocupar mejores puestos o distinciones.",
    ],
  },
  {
    id: "letra-r",
    title: "Letra R",
    value: "Valor numérico 9",
    paragraphs: [
      "Significado: Grandes esfuerzos, emotividad, nerviosismo y enfermedades, obstáculos, retrasos, accidentes.",
      "Vibración que genera en la tabla del destino: Etapa de grandes exigencias y demostraciones de nuestras capacidades, hay tendencia a la irritabilidad y pesimismo, marca finales porque proporcionan apertura a nuevos planes e ideas.",
    ],
  },
  {
    id: "letra-s",
    title: "Letra S",
    value: "Valor numérico 1",
    paragraphs: [
      "Significado: Irascibilidad, emotividad exagerada, impulsos incontrolados, resistencia.",
      "Vibración que genera en la tabla del destino: Etapa de gran reflexión, donde se fortalece nuestro espíritu y autoafirmarnos, periodo de indecisiones e inseguridades, aprender a manejar emociones.",
    ],
  },
  {
    id: "letra-t",
    title: "Letra T",
    value: "Valor numérico 2",
    paragraphs: [
      "Significado: Amor, sentido del humor, fortaleza, cambios constantes de casa o actividad, paciencia y tenacidad.",
      "Vibración que genera en la tabla del destino: Etapa donde se puede construir o destruir con facilidad, hay que ejercer control y no dejarse vencer por las dificultades, tendencia a relaciones amorosas.",
    ],
  },
  {
    id: "letra-u",
    title: "Letra U",
    value: "Valor numérico 3",
    paragraphs: [
      "Significado: Liberación, espíritu de conservación, espíritu rebelde, egoísmo personal e hipersensibilidad.",
      "Vibración que genera en la tabla del destino: Etapa donde se muestran nuestros talentos, tiempo de gran tenacidad y voluntad para aferrarnos a lograr nuestras metas. Se debe ser cauteloso para no cancelar oportunidades por errores propios.",
    ],
  },
  {
    id: "letra-v",
    title: "Letra V",
    value: "Valor numérico 22",
    paragraphs: [
      "Significado: Inspiración reveladora, misticismo, inteligencia superior, pérdidas económicas.",
      "Vibración que genera en la tabla del destino: Etapa de construcción a base de grandes esfuerzos, hacer frente a dificultades, disipación y exceso en gastos. Es un periodo de grandes lecciones de vida.",
    ],
  },
  {
    id: "letra-w",
    title: "Letra W",
    value: "Valor numérico 5",
    paragraphs: [
      "Significado: Arrebatos, impulsividad, emotividad, cambios drásticos, viajes y tendencia a relaciones amorosas.",
      "Vibración que genera en la tabla del destino: Etapa donde se darán decisiones por arrebatos e impulsos, debemos enfocarnos en lo empezado para activar nuestro potencial, período de gran magnetismo.",
    ],
  },
  {
    id: "letra-x",
    title: "Letra X",
    value: "Valor numérico 6",
    paragraphs: [
      "Significado: Agitación, sexualidad, viajes de placer, emotivas, hipersensibles, éxito económico.",
      "Vibración que genera en la tabla del destino: Etapa donde se dan avances y logros mentales y espirituales, período donde se dan conexiones con personas influyentes y logros financieros. Época para brillar.",
    ],
  },
  {
    id: "letra-y",
    title: "Letra Y",
    value: "Valor numérico 7",
    paragraphs: [
      "Significado: Misterio, rapidez y seguridad, buenos confidentes, deseo de triunfos y matrimonio.",
      "Vibración que genera en la tabla del destino: Etapa donde sentimos gran necesidad de triunfar, amor por lo bello, la verdad y necesidad de ser originales, este período puede fluctuar entre felicidad y desdicha.",
    ],
  },
  {
    id: "letra-z",
    title: "Letra Z",
    value: "Valor numérico 8",
    paragraphs: [
      "Significado: Comprensión, dinero y secretos, buenos confidentes, tendencia a relaciones amorosas y matrimonio.",
      "Vibración que genera en la tabla del destino: Etapa donde se vive el poder de la realización, se apoya en el poder de la diplomacia y la discreción, reflexionar sobre nuestros aciertos y errores.",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "Significado de Letras",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="significadodeletras"
      wide
      title="Significado de Letras"
      description="El valor numérico de cada letra es la base para calcular los números de tu nombre."
    >
      <div className="space-y-10">
        <LetterValuesTable />
        <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Cómo influye de la primera inicial de tu nombre en tu
            comportamiento?
          </h2>
          <p className="text-base leading-8 text-foreground/72">
            Para la Numerología, la suma del total de las letras en el nombre y
            apellido, determinan el número de ciclos importantes que le tomarán
            a la persona conseguir abrir su consciencia a lo largo de su vida,
            cada letra del nombre equivale a un año de vida, que indicará la
            secuencia que seguirá el proceso de aprendizaje dentro del orden de
            numérico hasta completar el ciclo de vida del nombre, y entonces se
            volverá empezar nuevamente con la primera inicial.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            <strong>La primera letra</strong> de nuestro nombre es la que
            predomina por las demás en cada persona, la que más veces oirá
            durante toda su vida, con la que se sentirá identificado, la que
            está dando a esta persona una energía especial. Con los apellidos
            pasa lo mismo, pero con menor fuerza, ya que no solemos utilizarlos
            al nombrar o llamar a las personas, si el apellido se usa como si
            fuera el nombre, entonces pasaría a tener gran poder, gran energía,
            y esta persona reaccionaría de forma muy diferente.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Cada cambio de ciclo marcará eventos transformadores, evolutivos,
            radicales, etc. Son momentos críticos de mayor madurez y
            responsabilidad vital que la persona atraviesa, lo que hará que la
            primer letra del nombre y apellidos siempre jueguen un papel
            crucial&nbsp; que marca la forma en la que cada persona inicia las
            cosas, cómo se aproxima a los retos, circunstancias y situaciones
            que la vida le va poniendo en su camino, entender el potencial de
            esta energía te ayudará a dirigir tu enfoque, a encontrar lo que
            estás buscando, y a usar el potencial que está a tu alcance para
            lograr lo que quieres mañana.
          </p>
          <p className="text-base leading-8 text-foreground/72">
            Siembra la semilla correcta para que comas del fruto que has
            anhelado para tu futuro.
          </p>
        </section>
        <section className="space-y-6 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          
          <div className="space-y-4">
            {LETTER_MEANINGS.map((item) => (
              <details
                key={item.id}
                id={item.id}
                className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/80 shadow-sm transition-colors open:border-primary/30 open:bg-primary/[0.04]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none sm:px-6">
                  <span className="block font-display text-lg font-semibold text-primary">
                    {item.title}
                  </span>
                  <span className="text-2xl leading-none text-primary transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="space-y-4 border-t border-border/60 px-5 py-5 text-base leading-8 text-foreground/72 sm:px-6">
                  <p className="font-semibold text-foreground/80">{item.value}</p>
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
