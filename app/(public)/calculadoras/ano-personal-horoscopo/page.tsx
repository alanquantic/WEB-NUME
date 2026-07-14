import type { Metadata } from "next";
import Link from "next/link";

import { PersonalCycleCalculator } from "@/components/calculators/personal-cycle-calculator";
import { ToolPage } from "@/components/content/tool-page";

type PersonalYearAccordionItem = {
  id: string;
  title: string;
  url: string | null;
  lead: string;
  paragraphs: string[];
};

const PERSONAL_YEAR_ACCORDION: PersonalYearAccordionItem[] = [
  {
    id: "personal-year-1",
    title: "Año Personal Número 1",
    url: "/anopersonal/1",
    lead: "Año de siembra, inicios, grandes cambios y nueva vida",
    paragraphs: [
      "El año 1 es el año en el que desde sus primeros días podemos sentir latente la energía del cambio, se acaban las restricciones que inmovilizaron y frustraron el año recién pasado, volverás a sentirte motivado, animado, como si te pusieran pilas nuevas. Comienza un nuevo ciclo de vida donde tomaremos decisiones importantes que marcarán nuevas direcciones y metas para los próximos años.",
      "Es uno de los períodos más afortunados ya que se presentarán muchas oportunidades para plantar las bases que sostendrán la construcción del futuro. Es el año que da bienvenida a todo lo nuevo: nuevas personas llegarán en este período, algunas servirán para impulsarte y otras se convertirán en amistades entrañables que durarán por muchos años. El año 1 regala motivación y energía para finalmente ponernos en acción.",
    ],
  },
  {
    id: "personal-year-2",
    title: "Año Personal Número 2",
    url: null,
    lead: "Coopera, fortalece tus lazos, haz relaciones y asociaciones confiables",
    paragraphs: [
      "El año 2 es para consolidar lo que se inició en el año 1, haciendo asociaciones benéficas y colaboraciones asertivas e importantes. Este año generalmente se hacen presentes en nuestra vida personas que nos brindan apoyo o que de alguna manera nos impulsan a dar los pasos que aún no hemos dado para llegar a nuestra meta.",
      "Es tiempo de reforzarte, organizarte, planificar con cuidado y dedicar tiempo a los detalles. La vida nos enseña a aprender a recibir. Habrá tendencia a conseguir una mejoría económica, aumento de contactos sociales y apertura para formar parte de grupos que servirán de escalón para lograr tus metas. La energía del año 2 tiene que ver con la colaboración.",
    ],
  },
  {
    id: "personal-year-3",
    title: "Año Personal Número 3",
    url: "/anopersonal/3",
    lead: "Exprésate con libertad, haz lo que te gusta, viaja, disfruta y socializa",
    paragraphs: [
      "El año 3 personal grita libertad por todos lados. Es para tratar de tomarse vacaciones de relajamiento, descansar, viajar, divertirte con los amigos y hacer las cosas que más disfrutas y que has estado posponiendo últimamente. Es el año para ponerte en el primer lugar de tu lista de prioridades.",
      "Es un año para sanar tu niño interior; para tomar finalmente la decisión de hacer algo que mueva las fichas del tablero y te ponga en primer lugar, para reír, celebrar y festejar. Todo lo que fue sembrado en el año uno comienza a dar sus frutos. Cree en ti mismo y en tu divinidad interior.",
    ],
  },
  {
    id: "personal-year-4",
    title: "Año Personal Número 4",
    url: "/anopersonal/4",
    lead: "Reestructura los cimientos, ponte en acción y construye para el futuro",
    paragraphs: [
      "El año 4 se caracteriza por ser un tiempo de trabajo duro, de grandes esfuerzos, de mucho movimiento y acción. Es especial para organizar pensamientos, ideas y acciones y ser capaces de llevarlas a cabo sin perder de vista los objetivos que quieres lograr.",
      "La vida te empujará a activar las cosas. Sentirás que seguir trabajando en el mismo lugar o haciendo las mismas actividades de siempre ya no te motiva como antes, y que es urgente hacer un cambio. Es tiempo de dar el siguiente paso, evolucionar y fortalecer tu carrera hacia la cima.",
    ],
  },
  {
    id: "personal-year-5",
    title: "Año Personal Número 5",
    url: "/anopersonal/5",
    lead: "Prender el motor, liberación, cambios inesperados y renovación",
    paragraphs: [
      "El año 5 se caracteriza por una gran necesidad de sentirse libre, romper reglas, hacer cambios drásticos, trascendentales, y conectarse de nuevo con el cosmos de alguna manera. La vida te invita a soltar lo conocido, buscar la emoción, reencontrar la pasión por la vida y sacar de tu vida todo lo que represente rutina.",
      "El año 5 viene cargado con grandes posibilidades de cambios importantes en tu vida familiar o profesional. Es un período donde podrás activar cosas totalmente nuevas, fuera de lo común, ingeniosas, creativas y originales. Te sentirás inquieto y lleno de energía.",
    ],
  },
  {
    id: "personal-year-6",
    title: "Año Personal Número 6",
    url: "/anopersonal/6",
    lead: "Año para formalizar relaciones, hacer compromisos y vivir grandes lecciones emocionales",
    paragraphs: [
      "El año 6 viene a probar nuestras emociones, nuestros apegos y nuestro compromiso con el amor. Esta lección tiene que ver con trabajo emocional, así que lo que tendrás que hacer durante el año estará relacionado a tus afectos más íntimos y cercanos.",
      "Es un período para dedicarle tiempo a quienes comparten tu vida. La vibración de este año te empuja a trabajar en fortalecer los vínculos más cercanos, pero a la vez nos invita a definir si es tiempo de dar por terminadas algunas relaciones. La lección es vivir el desapego para evolucionar como ser humano.",
    ],
  },
  {
    id: "personal-year-7",
    title: "Año Personal Número 7",
    url: "/anopersonal/7",
    lead: "Momento de reflexionar, tomar decisiones, aterrizar proyectos y aplicar lo aprendido",
    paragraphs: [
      "El año 7 te empuja a definir y estructurar las cosas que aún no se han concretado. Es un año en el que las ideas, los proyectos y la necesidad de hacer cambios de vida no dejarán de dar vueltas en tu cabeza. La reflexión y observación serán actividades muy presentes a lo largo del año.",
      "Este es un período para evaluar tus últimos seis años, por lo que se vuelve espiritual, de conocimiento interior e introspección. La vida te invita a hacer análisis de estructuras, de pensamiento y de creencias. Este año tu trabajo será hacerte consciente de tus propias necesidades y responsabilidades.",
    ],
  },
  {
    id: "personal-year-8",
    title: "Año Personal Número 8",
    url: "/anopersonal/8",
    lead: "Realizaciones materiales, cosecha y logros",
    paragraphs: [
      "El año 8 es de resultados, beneficios y logro de metas. Sentirás que muchos de tus sueños se empiezan a materializar. Los negocios encuentran su cauce y prosperan como nunca, así que prepárate para vivir uno de los años más prósperos en diferentes sentidos de tu ciclo.",
      "Tu enfoque este año estará marcado por grandes negociaciones, muchos avances en tu profesión, consolidación de proyectos y una forma más dinámica e intrépida de llevar tu trabajo o actividad. Es un año en el que la energía y el movimiento estarán presentes mes tras mes.",
    ],
  },
  {
    id: "personal-year-9",
    title: "Año Personal Número 9",
    url: "/anopersonal/9",
    lead: "Cierres de ciclos, balances y reencuentros",
    paragraphs: [
      "El año 9 trae consigo energía de transformación. Lo viejo es desechado y se prepara el terreno para recibir nuevamente el año 1, es decir, un nuevo ciclo de nueve años. La vida te invita a renovarte, por lo que estarás preguntándote qué es lo que ya no funciona más para ti.",
      "Lo recomendable es aceptar los cambios y dejar ir lo que ya cumplió su ciclo. Este año hay que hacer una limpieza profunda, dar vuelta a la página del pasado y vaciar la mochila donde se acumularon cosas que antes eran de utilidad, pero ahora ya no sirven.",
    ],
  },
  {
    id: "personal-year-11",
    title: "Año Personal Número 11",
    url: "/anopersonal/11",
    lead: "Transmutación, apertura de consciencia y enseñanza",
    paragraphs: [
      "El año 11 te obliga a hacer una profunda introspección sobre cómo se ha desarrollado tu vida hasta este momento. Tendrás la necesidad de buscar un camino diferente, ya sea profesional o espiritualmente. Sentirás que las ideas y pensamientos fluyen constantemente por tu cabeza.",
      "Es tu momento de evolucionar, de dar el siguiente paso y transmitir a los demás tu sabiduría interior. Los cuestionamientos personales estarán presentes en muchos momentos del año, y la vida te empuja no solo a responderlos, sino también a concretar acciones para enfrentarlos y crecer.",
    ],
  },
  {
    id: "personal-year-22",
    title: "Año Personal Número 22",
    url: null,
    lead: "Maestría, realización material y expansión",
    paragraphs: [
      "La energía del año 22 está dirigida a la realización de metas. Se da cuando te encuentras listo para ocupar posiciones de dirección o liderazgo, desarrollar grandes proyectos o planificar a gran escala. El éxito material puede estar muy presente en este año.",
      "Esta vibración permite trascender fronteras, lo cual puede traer viajes o excelentes contactos con personas de otros países relacionadas con la expansión de tus actividades. Es el momento de salir de tus fronteras y jugar en las ligas mayores.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Año personal",
};

export default function Page() {
  return (
    <ToolPage
      toolKey="horoscopoanopersonal"
      wide
      title="Año personal horoscopo"
      description="La vida se mueve en ciclos de 9 años y cada año tenemos que vivir una lección diferente, hasta  cerrar el ciclo."
    >
      <div className="space-y-10">
        <section className="space-y-4 p-6 sm:p-8">
          <p>&nbsp;</p>
          <h4>
            La vida se mueve en ciclos de 9 años y cada año tenemos que vivir
            una lección diferente, hasta&nbsp; cerrar el ciclo.
          </h4>
          <p>
            Cada año aparecen nuevas influencias que determinan nuestra vida,
            que provocan inicios, liberaciones, consolidaciones, esfuerzos,
            cambios, uniones, aprendizajes, logros, éxitos, crisis,
            confrontaciones y cierres entre muchas otras lecciones.
          </p>
          <p>
            El año personal es la vibración numerológica&nbsp;&nbsp;que nos
            corresponde en forma individual a cada uno de los seres humanos,
            esta vibración varía &nbsp;cada año &nbsp;moviéndose&nbsp;dentro de
            un ciclo de nueve años, donde estaremos viviendo una lección o
            aprendizaje &nbsp;específico para lograr la realización de nuestra
            misión de vida.
          </p>
          <p>
            EL año personal nos habla del proceso o lección&nbsp; de vida que
            tendremos que enfrentar o aprender en el tiempo comprendido del{" "}
            <strong>1° de Enero al 31 de Diciembre</strong> de cada año, cada
            uno de ellos tiene sus propios poderes vibratorios, donde nos será
            más fácil realizar aquello que esté en concordancia con la energía
            del mismo.
          </p>
          <p>
            Dicen por ahí que hay personas que <em>“ viven la vida”</em> pero
            otros a los que “<em>la vida los vive”,</em> ¿Tú a cual grupo
            perteneces?…. El poder conocer con anticipación cual va a ser la
            energía o vibración que va a estar más presente en nuestro año, hará
            que seamos capaces de anticipar nuestras decisiones, de subirnos al
            caballo con las espuelas, el sombrero y las botas bien puestas y
            empecemos a cabalgar el día a día con un sentido de dirección
            y&nbsp; seguridad que pocas personas pueden aprovechar …
          </p>
          <p></p>
          <div id="more-24100"></div>
          <p></p>
          <p>
            Es muy importante observar los procesos de cada uno de
            nuestros&nbsp; <strong>Años Personales, </strong>&nbsp;ya que estos
            van formando nuestro muy personal{" "}
            <strong>Ciclo de vida, &nbsp;</strong>se mueven en grupos cíclicos
            de 9 años que generalmente son acumulativos y que vienen tratando
            sobre el mismo tema (control, emociones, desapego, autoafirmación,
            evolución, responsabilidad, liberación, etc.) ciclo tras ciclo,
            hasta finalmente convertirnos en másteres de nuestra propia lección
            o misión. Esto quiere decir que&nbsp; cada 9 años estaremos en
            proceso de aprender algo diferente en nuestra vida{" "}
            <em>
              (pero con el mismo matiz o mismo tema de algo vivido 9 años atrás
              en el mismo año personal de tu ciclo pasado),
            </em>{" "}
            con el propósito de llevarnos lo más cerca posible de cumplir con
            nuestra misión de vida para este tiempo, el tomar estas lecciones
            con sabiduría y responsabilidad es lo que finalmente nos convertirá
            en personas realizadas, completas y más evolucionadas desde el punto
            espiritual; es aprender a ser&nbsp; “Como el rio que fluye” en lugar
            de estar luchando contra corriente todo el tiempo.
          </p>
        </section>
        <PersonalCycleCalculator kind="year" />

        <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Significado de cada Año Personal
          </h2>
          <div className="mt-6 space-y-4">
            {PERSONAL_YEAR_ACCORDION.map((item) => (
              <details
                key={item.id}
                id={item.id}
                className="accordion-active group overflow-hidden rounded-[1.5rem] border border-border/70 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.72),hsl(var(--card)))]"
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
                  <p className="text-base font-semibold leading-7 text-primary">
                    {item.lead}
                  </p>
                  <div className="mt-3 space-y-3 text-base leading-8 text-foreground/72">
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.url ? (
                      <Link
                        href={item.url}
                        className="inline-flex items-center font-semibold text-primary transition hover:opacity-80"
                      >
                        Leer más
                      </Link>
                    ) : null}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
