import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Planeador Numerología 2026',
  description:
    'Anexos de la agenda numerológica: el Pináculo, las etapas de vida, los desafíos, los binomios energéticos y las energías de tiempo.',
  alternates: { canonical: '/anexos-agenda-numerologia' }
}

// Edita aquí las imágenes, los textos y los enlaces de cada tarjeta.
const tarjetas = [
  {
    titulo: 'El Pináculo',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581805/nume-media/paginas-legado/1-58f9dcd5.png',
    href: '/pinaculo',
    contenido: (
      <>
        Tu Pináculo personal es el mapa donde podrás descifrar todo el rompecabezas del
        camino hacia tu destino basado en tu fecha de nacimiento, este nunca cambiará,
        será el mismo para toda tu vida, ya que se calcula tomando como base tu fecha
        de nacimiento.
      </>
    )
  },
  {
    titulo: 'Las 4 Etapas de Vida',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581805/nume-media/paginas-legado/2-91900214.png',
    href: '/mi-camino-de-vida',
    contenido: (
      <>
        El viaje del ALMA a través de la fecha de nacimiento de la persona determina
        las 4 grandes lecciones que tendremos que conquistar a lo largo de nuestra
        vida para finalmente lograr nuestro propósito o misión.
      </>
    )
  },
  {
    titulo: 'Desafíos a superar',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581805/nume-media/paginas-legado/3-00f7e51b.png',
    href: '/el-pinaculo-y-tus-desafios-a-superar',
    contenido: (
      <>
        La parte inferior del pináculo establece los retos y desafíos que tendrás
        que superar para tu evolución. De la línea horizontal numerológica de tu
        Pináculo hacia abajo, los números te alertan acerca de tus áreas de
        oportunidad, tus puntos débiles…
      </>
    )
  },
  {
    titulo: 'Binomios Energéticos',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581806/nume-media/paginas-legado/4-17071dbc.png',
    href: '/binomios-numerologicos',
    contenido: (
      <>
        Es la <strong>combinación de dos energías numéricas</strong> en vibración de
        tiempo que se fusionan para darnos información más específica acerca de un
        tema que estará…
      </>
    )
  },
  {
    titulo: 'Descripción y Significados de Energías de Tiempo',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581806/nume-media/paginas-legado/7-acfe9d27.png',
    href: '/la-brujula-numerologica',
    contenido: (
      <>
        La Numerología divide el tiempo y lo agrupa en distintos períodos e
        intervalos, en los cuales se generan diferentes vibraciones energéticas
        que influyen…
      </>
    )
  },
  {
    titulo: 'Proyecciones del Año 2026',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581806/nume-media/paginas-legado/5-5b7e3168.png',
    href: '/2026-ano-universal-1',
    contenido: (
      <>
        La <strong>energía 1</strong> culmina un proceso de evolución que resultará
        en una “Graduación” o en el “término de un camino”; anuncia que el
        aprendizaje ha sido dado y que el alumno será examinado para revisar su
        avance en la…
      </>
    )
  },
  {
    titulo: 'Número del Alma',
    imagen: 'https://res.cloudinary.com/du66hxu3k/image/upload/v1791581806/nume-media/paginas-legado/17-511a0e0e.png',
    href: '/significado-numero-del-alma',
    contenido: (
      <>
        La Numerología puede responder por medio de la suma total del valor
        energético de las vocales del nombre completo de una persona:{' '}
        <em>
          ¿Qué es lo que tu <strong>alma</strong> vino a hacer al mundo en esta
          encarnación?, y ¿cuál es tu propósito de vida?…
        </em>
      </>
    )
  }
] as const

function Tarjeta({ tarjeta }: { tarjeta: (typeof tarjetas)[number] }) {
  return (
    <article className="min-w-0 space-y-5">
      <Link href={tarjeta.href} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tarjeta.imagen}
          alt={tarjeta.titulo}
          width={500}
          height={300}
          loading="lazy"
          className="aspect-[5/3] h-auto w-full object-contain"
        />
      </Link>
      <h2 className="font-display text-2xl font-semibold leading-tight text-primary">
        <Link href={tarjeta.href} className="transition hover:underline">
          {tarjeta.titulo}
        </Link>
      </h2>
      <p className="text-base leading-8 text-foreground/80">
        {tarjeta.contenido}{' '}
        <Link
          href={tarjeta.href}
          aria-label={`Leer más sobre ${tarjeta.titulo}`}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          LEER MÁS
        </Link>
      </p>
    </article>
  )
}

// Esta ruta tiene prioridad sobre /[slug]; su contenido ya no depende del JSON.
export default function AnexosAgendaNumerologiaPage() {
  return (
    <div className="mx-auto max-w-[1140px] px-6 py-12">
      <h1 className="mb-8 font-display text-4xl font-semibold">Planeador numerologico</h1>
      <div className="space-y-12">
        <section aria-label="Pináculo, etapas de vida y desafíos" className="grid gap-8 md:grid-cols-3">
          {tarjetas.slice(0, 3).map((tarjeta) => (
            <Tarjeta key={tarjeta.href} tarjeta={tarjeta} />
          ))}
        </section>
        <section aria-label="Binomios, energías de tiempo y proyecciones" className="grid gap-8 md:grid-cols-3">
          {tarjetas.slice(3, 6).map((tarjeta) => (
            <Tarjeta key={tarjeta.href} tarjeta={tarjeta} />
          ))}
        </section>
        <section aria-label="Número del Alma" className="grid gap-8 md:grid-cols-2">
          <Tarjeta tarjeta={tarjetas[6]} />
        </section>
      </div>
    </div>
  )
}
