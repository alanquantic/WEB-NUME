import type { Route } from 'next'
import Link from 'next/link'

import { JsonLd } from '@/components/seo/json-ld'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { SparkleField } from '@/components/ui/sparkle-field'

type Faq = {
  q: string
  a: string
}

const FAQS: readonly Faq[] = [
  {
    q: '¿Qué es la numerología?',
    a: 'Es el estudio del significado de los números y su influencia en la vida. Cada número, del 1 al 9 —más los maestros 11, 22 y 33—, tiene una vibración propia que describe tu carácter, tus ciclos y tu propósito.'
  },
  {
    q: '¿Cómo calculo mi número de camino de vida?',
    a: 'Suma todos los dígitos de tu fecha de nacimiento y redúcelos a una sola cifra (excepto 11 y 22). Puedes hacerlo al instante en la calculadora de camino de vida.'
  },
  {
    q: '¿Qué es el pináculo en numerología?',
    a: 'Es el mapa completo de tu numerología: reúne tus ciclos de vida, metas y lecciones a partir de tu fecha de nacimiento. Es uno de los estudios más profundos de tu carta.'
  },
  {
    q: '¿Qué es la numerología de pareja?',
    a: 'Es el estudio de la afinidad entre dos personas según sus números. Indica si son pareja natural, complementaria, de aprendizaje o de reto, y dónde fluye o se tensa la relación.'
  },
  {
    q: '¿Qué es el año personal?',
    a: 'Es la energía que te acompaña durante un año dentro de un ciclo de nueve. Conocerlo te ayuda a anticipar el tema central de tu año y a tomar mejores decisiones.'
  }
]

export function HomeSeoSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a }
          }))
        }}
      />

      <ScrollReveal className="relative">
        <SparkleField className="text-primary" />
        <h2 className="relative font-display text-2xl font-semibold text-primary sm:text-3xl">
          Qué es Numerología Cotidiana
        </h2>
        <div className="relative mt-4 space-y-4 text-base leading-8 text-foreground/78">
          <p>
            Numerología Cotidiana es el espacio de Laura L. Rodríguez para llevar la numerología a tu
            día a día. Aquí calculas gratis tu mapa numerológico —camino de vida, pináculo, números
            del nombre y vibraciones de tiempo— y aprendes a interpretarlo con guías claras.
          </p>
          <p>
            La numerología parte de una idea sencilla: cada número tiene una energía. Esos números,
            presentes en tu fecha de nacimiento y en tu nombre, describen tu carácter, tus ciclos y
            tu propósito. Conocerlos te da dirección para tomar mejores decisiones.
          </p>
          <p>
            Empieza por tu{' '}
            <Link href={'/calculadoras/camino-de-vida' as Route} className="font-medium text-primary underline">
              camino de vida
            </Link>
            , descubre tu{' '}
            <Link href={'/calculatupinaculo' as Route} className="font-medium text-primary underline">
              pináculo personal
            </Link>
            , revisa tu{' '}
            <Link href={'/anopersonal' as Route} className="font-medium text-primary underline">
              año personal
            </Link>{' '}
            o explora el{' '}
            <Link href={'/significadodelosnumeros' as Route} className="font-medium text-primary underline">
              significado de cada número
            </Link>
            . Y si te interesa el amor, prueba la{' '}
            <Link href={'/calculadoras/compatibilidad' as Route} className="font-medium text-primary underline">
              numerología de pareja
            </Link>
            .
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <h2 className="mt-10 font-display text-2xl font-semibold text-primary sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <dl className="mt-5 space-y-5">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-panel">
              <dt className="font-display text-lg font-semibold text-foreground">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-7 text-foreground/75">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </section>
  )
}
