import type { Metadata } from 'next'

import { CompatibilityCalculator } from '@/components/calculators/compatibility-calculator'
import { Breadcrumbs } from '@/components/content/breadcrumbs'
import { KeepExploring } from '@/components/content/keep-exploring'
import { JsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Numerología de pareja: calcula tu compatibilidad',
  description:
    'Descubre tu compatibilidad en el amor con la numerología de pareja. Calcula gratis si son pareja natural, complementaria, de aprendizaje o de reto.',
  alternates: { canonical: '/numerologia-de-pareja' }
}

const PAIR_TYPES = [
  {
    title: 'Pareja natural',
    text: 'Conexión instantánea y comprensión que fluye sola. Se entienden casi sin palabras desde el primer encuentro.'
  },
  {
    title: 'Pareja complementaria',
    text: 'Se complementan y se apoyan. Aprenden a negociar y a crecer juntos, aunque la conexión no sea inmediata.'
  },
  {
    title: 'Pareja de aprendizaje',
    text: 'Una relación que enseña: pide comunicación y paciencia, y a cambio impulsa un gran crecimiento mutuo.'
  },
  {
    title: 'Pareja de reto',
    text: 'Un vínculo desafiante que pide tolerancia. Bien llevado, puede traer mucha pasión e intensidad.'
  }
]

const FAQS = [
  {
    q: '¿Qué es la numerología de pareja?',
    a: 'Es el estudio —también llamado sinastría— de la afinidad entre dos personas a partir de sus números. Revela el tipo de vínculo que comparten y dónde fluye o se tensa la relación.'
  },
  {
    q: '¿Cómo se calcula la compatibilidad?',
    a: 'Una forma sencilla es sumar el día de nacimiento de cada persona, reducir cada resultado a un dígito (excepto 11 y 22) y comparar ambos números. También se comparan los caminos de vida de ambos.'
  },
  {
    q: '¿La numerología de pareja sirve solo para el amor?',
    a: 'No. Aunque se usa mucho en el amor, sirve para cualquier relación: socios, familia, amistades o equipos de trabajo.'
  },
  {
    q: '¿Hay números incompatibles?',
    a: 'Ningún número es incompatible en sí mismo. Hay combinaciones más fáciles y otras de reto, pero todas pueden funcionar con conciencia y comunicación.'
  }
]

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
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
      <Breadcrumbs
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Numerología', path: '/numerologia' },
          { name: 'Numerología de pareja' }
        ]}
      />

      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">
        Numerología de pareja
      </h1>
      <p className="mt-4 text-base leading-8 text-foreground/78">
        La numerología de pareja —o sinastría numerológica— revela la afinidad entre dos personas a
        partir de sus números. Es una de las consultas más buscadas: te ayuda a entender la
        relación, a anticipar fricciones y a potenciar lo que ya funciona. Calcula gratis tu
        compatibilidad a continuación.
      </p>

      <div className="mt-8">
        <CompatibilityCalculator />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Los cuatro tipos de pareja
        </h2>
        <p className="mt-2 text-base leading-8 text-foreground/72">
          Según los números que comparten, dos personas forman uno de estos cuatro tipos de
          vínculo. Ninguno es mejor que otro: cada uno tiene su don y su aprendizaje.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {PAIR_TYPES.map((type) => (
            <div key={type.title} className="rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-panel">
              <h3 className="font-display text-lg font-semibold text-primary">{type.title}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/75">{type.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Cómo se calcula la compatibilidad
        </h2>
        <div className="mt-3 space-y-4 text-base leading-8 text-foreground/78">
          <p>
            La forma más directa es comparar los números de camino de vida de cada persona, que
            resumen su propósito y su forma de ser. Al cruzarlos, la numerología indica si la
            relación es natural, complementaria, de aprendizaje o de reto.
          </p>
          <p>
            Otra técnica suma los días de nacimiento de ambos y reduce el resultado a un dígito para
            obtener un &ldquo;número de pareja&rdquo; que describe la energía que comparten. Lo
            importante no es buscar la pareja perfecta, sino entender las diferencias para
            aprovecharlas.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-primary">Preguntas frecuentes</h2>
        <dl className="mt-5 space-y-5">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-panel">
              <dt className="font-display text-lg font-semibold text-foreground">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-7 text-foreground/75">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <KeepExploring
        links={[
          {
            href: '/calculadoras/compatibilidad',
            title: 'Calculadora de compatibilidad',
            description: 'Compara dos fechas al instante.'
          },
          {
            href: '/blog/como-se-relacionan-los-numeros-en-pareja',
            title: '¿Cómo se relacionan los números en pareja?',
            description: 'La guía completa en el blog.'
          },
          {
            href: '/calculadoras/camino-de-vida',
            title: 'Tu camino de vida',
            description: 'El punto de partida de tu carta.'
          }
        ]}
      />
    </div>
  )
}
