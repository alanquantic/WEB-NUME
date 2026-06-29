import type { Route } from 'next'
import Link from 'next/link'

import { CompatibilityCalculator } from '@/components/calculators/compatibility-calculator'
import {
  ArticleCallout,
  ArticleH2,
  ArticleLead,
  ArticleList,
  ArticleP
} from '@/components/content/article-blocks'

// Artículos "ricos": cuerpo en React (permite calculadoras y componentes embebidos).
// Plantilla para los nuevos artículos del sitio. La metadata vive en lib/blog/sample-posts.ts;
// aquí solo el cuerpo, indexado por slug.

type RichArticle = {
  minutes: number
  Body: () => JSX.Element
}

function ArticleLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href as Route} className="font-medium text-primary underline">
      {children}
    </Link>
  )
}

export const RICH_ARTICLES: Record<string, RichArticle> = {
  'que-es-la-numerologia-de-pareja': {
    minutes: 8,
    Body: () => (
      <div>
        <ArticleLead>
          Cuando dos personas se unen no solo se encuentran sus historias: también se encuentran sus
          números. La numerología de pareja estudia esa combinación para ayudarte a entender tu
          relación desde una mirada distinta.
        </ArticleLead>

        <ArticleH2>¿Qué es la numerología de pareja?</ArticleH2>
        <ArticleP>
          La numerología de pareja —también llamada sinastría numerológica— compara los números
          personales de dos personas para revelar la afinidad entre ellas. A partir de la fecha de
          nacimiento (y, en estudios más profundos, del nombre) descubre el tipo de vínculo que
          comparten.
        </ArticleP>
        <ArticleP>
          Su objetivo no es decidir si una relación &ldquo;sirve&rdquo; o no, sino darte un mapa:
          dónde fluye la conexión de forma natural, dónde conviene tener paciencia y qué aprendizaje
          trae cada quien al otro.
        </ArticleP>

        <ArticleH2>¿En qué se basa?</ArticleH2>
        <ArticleP>
          Cada número del 1 al 9 —más los maestros 11 y 22— tiene una energía propia. Tú llevas
          varios de esos números en tu carta; tu pareja, los suyos. La sinastría observa cómo
          dialogan esas energías.
        </ArticleP>
        <ArticleP>
          El número más usado para una primera lectura es el camino de vida, porque resume el
          propósito y la forma de ser de cada persona. Al cruzarlos, aparece el carácter de la
          relación. Esto es lo que suele revelar:
        </ArticleP>
        <ArticleList
          items={[
            'Cómo se comunican y toman decisiones juntos.',
            'Dónde se complementan y dónde pueden chocar.',
            'Qué necesita cada uno para sentirse amado y respetado.',
            'El aprendizaje de fondo que la relación trae para ambos.'
          ]}
        />

        <ArticleH2>Cómo se calcula tu compatibilidad</ArticleH2>
        <ArticleP>
          Hay dos caminos sencillos. El primero compara los caminos de vida: sumas todos los dígitos
          de la fecha de nacimiento de cada persona y los reduces a una cifra (sin reducir el 11 ni
          el 22). Luego se observa la relación entre ambos números.
        </ArticleP>
        <ArticleP>
          El segundo suma los días de nacimiento de las dos personas y reduce el resultado para
          obtener un &ldquo;número de pareja&rdquo;. Por ejemplo: alguien que nació un 16 y alguien
          que nació un 17 suman 33, que se reduce a 6, una pareja con vocación de hogar y cuidado.
        </ArticleP>

        <section className="mt-10 rounded-[1.75rem] border border-primary/15 bg-primary-soft/40 p-6">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Calcula tu compatibilidad ahora
          </h2>
          <p className="mt-2 text-sm leading-7 text-foreground/78">
            Ingresa las dos fechas de nacimiento y descubre su afinidad numerológica al instante.
          </p>
          <div className="mt-5">
            <CompatibilityCalculator />
          </div>
        </section>

        <ArticleH2>Los cuatro tipos de pareja</ArticleH2>
        <ArticleP>
          Toda combinación cae en uno de estos cuatro tipos. Ninguno es mejor que otro: cada uno
          tiene su don y su tarea.
        </ArticleP>
        <ArticleList
          items={[
            <>
              <strong>Pareja natural.</strong> Conexión instantánea y comprensión que fluye sola; se
              entienden casi sin palabras.
            </>,
            <>
              <strong>Pareja complementaria.</strong> Se apoyan y se equilibran; aprenden a negociar
              y a sumar sus diferencias.
            </>,
            <>
              <strong>Pareja de aprendizaje.</strong> Una relación que enseña: pide comunicación y
              paciencia, y a cambio hace crecer a ambos.
            </>,
            <>
              <strong>Pareja de reto.</strong> Un vínculo intenso que pide tolerancia; bien llevado,
              trae mucha pasión.
            </>
          ]}
        />

        <ArticleH2>Cómo usarla para fortalecer tu relación</ArticleH2>
        <ArticleP>
          Conocer tu tipo de pareja es solo el principio. Lo valioso es llevarlo a la práctica:
        </ArticleP>
        <ArticleList
          items={[
            'Habla de los resultados juntos: convierte la lectura en una conversación, no en un veredicto.',
            'Usa las diferencias a favor: lo que a uno le cuesta, al otro suele salirle natural.',
            'Respeta los tiempos de cada quien: revisa también el año personal de ambos para entender el momento que viven.',
            'Vuelve a la numerología en las crisis: ayuda a ver el patrón detrás del conflicto y a salir de él con conciencia.'
          ]}
        />

        <ArticleH2>Qué no es la numerología de pareja</ArticleH2>
        <ArticleP>
          No es un oráculo que predice rupturas ni una sentencia. Dos números &ldquo;de reto&rdquo;
          pueden tener una relación maravillosa, y dos &ldquo;naturales&rdquo; pueden descuidarse. La
          numerología describe energías; lo que hagan con ellas depende de ustedes.
        </ArticleP>

        <ArticleCallout title="Un consejo">
          Antes de leer la compatibilidad, calcula primero tu propio{' '}
          <ArticleLink href="/calculadoras/camino-de-vida">camino de vida</ArticleLink>. Entenderte a
          ti mismo hace que la lectura de pareja tenga mucho más sentido.
        </ArticleCallout>

        <ArticleH2>Preguntas frecuentes</ArticleH2>
        <ArticleP>
          <strong>¿Sirve para relaciones que no son de pareja?</strong> Sí: funciona igual para
          familia, socios y amistades.
        </ArticleP>
        <ArticleP>
          <strong>¿Necesito el nombre de las dos personas?</strong> Para una primera lectura basta la
          fecha de nacimiento; el nombre se usa en estudios más completos.
        </ArticleP>
        <ArticleP>
          <strong>¿Qué pasa si sale &ldquo;pareja de reto&rdquo;?</strong> Que la relación pide más
          conciencia y comunicación, no que esté condenada. Muchos vínculos profundos son de reto.
        </ArticleP>

        <ArticleP>
          La numerología de pareja es una brújula, no un mapa cerrado: te muestra el terreno, pero el
          camino lo eligen ustedes dos. ¿Lista o listo para tu lectura? Prueba la{' '}
          <ArticleLink href="/calculadoras/compatibilidad">calculadora de compatibilidad</ArticleLink>{' '}
          o explora la página de{' '}
          <ArticleLink href="/numerologia-de-pareja">numerología de pareja</ArticleLink>.
        </ArticleP>
      </div>
    )
  }
}
