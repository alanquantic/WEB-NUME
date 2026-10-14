import type { Metadata } from 'next'

import { HoroscopoAnualPersonal } from '@/components/calculators/horoscopo-anual-personal'
import horoscopoData from '@/components/jsons/horoscopo-mensual-2027.json'
import { ToolPage } from '@/components/content/tool-page'
import { HoroscopoMensualExplorer } from '@/components/horoscopos/horoscopo-mensual-explorer'

export const metadata: Metadata = {
  title: 'Horóscopo para tu Año Personal del 2027',
  description: 'Descubre cuál será tu lección este año y consulta el horóscopo mensual de tu Año Personal en 2027.',
  alternates: { canonical: '/horoscopo-personal-2027/' }
}

const data = horoscopoData

export default function Page() {
  return (
      <ToolPage
        wide
        title={`Horóscopo para tu Año Personal del ${data.anio}`}
        containerClassName="max-w-[1200px]"
        breadcrumbs={[{ name: 'Inicio', path: '/' }, { name: `Horóscopo personal ${data.anio}` }]}
      >
        <div className="space-y-8">
         
            <section className="space-y-5">
              <h2 className="text-2xl font-extrabold leading-7 text-primary">Año Personal</h2>
              <h3 className="text-lg font-extrabold leading-7">¿Cuál será mi lección este año?</h3>

              <div className="grid min-h-[330px] items-center gap-6 bg-[rgb(236_190_143_/_50%)] p-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-4">
                <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/mini-laura.png"
                    alt="Mini Laura explica la lección del Año Personal"
                    className="max-h-[300px] w-auto max-w-full object-contain"
                  />
                </div>
                <div className="space-y-4 py-5 sm:pr-4">
                  <h4 className="font-display text-3xl font-bold leading-tight text-primary">Año Personal</h4>
                  <p className="text-lg leading-7 text-foreground/80">
                    Esta lección dura 365 días, comenzando el Primero de Enero y terminando el 31 de Diciembre.
                    Una vez terminada pasarás a la siguiente. El que hayas aprobado o no, determinará como
                    fluye tu siguiente año o lección.
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-lg leading-7 text-foreground/80">
                  <p>Cada año aparecen nuevas influencias que determinan nuestra vida, que provocan inicios, liberaciones, consolidaciones, esfuerzos, cambios, uniones, aprendizajes, logros, éxitos, crisis, confrontaciones y cierres entre muchas otras lecciones. Es el número de año que nos corresponde en forma individual a cada uno de los seres humanos y que varía en cada año desde el primero de nuestras vidas. El año personal nos habla del proceso o lección de vida que tendremos que enfrentar o aprender en el tiempo comprendido del 1° de Enero al 31 de Diciembre de cada año, cada uno de ellos tiene sus propios poderes vibratorios, donde nos será más fácil realizar aquello que esté en concordancia con la energía del mismo.</p>
                  <p>Dicen por ahí que hay personas que “viven la vida” pero otros a los que “la vida los vive”. ¿Tú a cuál grupo perteneces? La Numerología nos da una clave que nos permite tener una idea general de la tendencia que seguirá el año que nos interesa, para que podamos organizar nuestra vida de manera que siguiendo la corriente vibratoria, actuemos en consecuencia.</p>
                  <p>Los años personales se mueven en grupos cíclicos de 9 años que generalmente son acumulativos y que vienen tratando sobre el mismo tema (control, emociones, desapego, autoafirmación, evolución, responsabilidad, liberación, etc.) ciclo tras ciclo, hasta finalmente convertirnos en másteres de nuestra propia lección o misión. Esto quiere decir que cada 9 años estaremos en proceso de aprender algo diferente en nuestra vida (pero con el mismo matiz o mismo tema de algo vivido 9 años atrás en el mismo año personal de tu ciclo pasado), con el propósito de llevarnos lo más cerca posible de cumplir con nuestra misión de vida para este tiempo, el tomar estas lecciones con sabiduría y responsabilidad es lo que finalmente nos convertirá en personas realizadas, completas y más evolucionadas desde el punto espiritual; es aprender a ser “Como el rio que fluye” en lugar de estar luchando contra corriente todo el tiempo.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="bg-[url('/images/horoscopo-title-bg.svg')] bg-contain bg-center bg-no-repeat px-6 py-10 text-2xl font-black italic text-primary sm:px-10">
                Si no conoces tu Año Personal utiliza la calculadora de arriba para descubrirlo
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-lg font-bold leading-7 text-foreground/80">
                <li>Da clic en la imagen del año y descifra tu lección anual.</li>
                <li>Da clic en cualquier mes y averigua el aprendizaje de esos días.</li>
              </ul>
            </section>

            <HoroscopoMensualExplorer anio={data.anio} numeros={data.numeros} meses={data.meses} />
        </div>
      </ToolPage>
  )
}
