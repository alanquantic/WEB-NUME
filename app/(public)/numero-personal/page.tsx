import type { Metadata } from 'next'

import { PersonalNumberCalculator } from '@/components/calculators/personal-number-calculator'
import { ShareButtons } from '@/components/content/share-buttons'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Número Personal',
  description: "Tu verdadera personalidad, lo que te define como persona, las características que solo conocen aquellos que están muy cerca de ti, es decir, tu identidad…"
}

// Esta ruta tiene prioridad sobre /[slug]. Edita el contenido y diseño aquí.
export default function NumeroPersonalPage() {
  return (
    <ToolPage
      wide
      title="Número Personal"
      breadcrumbs={[{ name: 'Inicio', path: '/' }, { name: 'Número Personal' }]}
      showRelatedProducts
    >
      <div className="space-y-8">
        <h2 className="font-display text-2xl font-semibold text-primary">
            Descubre tu esencia, tu verdadera identidad sin máscaras.
          </h2>
        <PersonalNumberCalculator />
        
        <section className="space-y-6">
          
          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Qué dice tu Número Personal de tu verdadera esencia? Reconoce la identidad hacia la que debes dirigirte.
          </h2>

          <div className="text-base leading-8 text-foreground/80 [&_p]:mb-4 [&_p:last-child]:mb-0">
            <p>
              Tu verdadera personalidad, lo que te define como persona, las características que solo conocen aquellos que están muy cerca de ti, es decir, tu identidad sin mascaras. En Astrología sería considerado como tu SOL.
            </p>
            <p>
              La energía del número personal va a matizar todos los números que compongan tu cuadro numerológico, es parte fundamental del logro de la misión de vida que tendrás que cumplir, así que el mejor manejo o desempeño de esta vibración en su polaridad positiva te acercará cada vez más al logro de la felicidad que es el fin último de nuestro paso por este mundo.
            </p>
          </div>

          <h2 className="font-display text-2xl font-semibold text-primary">
            ¿Cómo calcular tu Número Personal?
          </h2>

          <div className="text-base leading-8 text-foreground/80 [&_p]:mb-4 [&_p:last-child]:mb-0">
            <p>
              Es el resultado de la suma de tu día de nacimiento hasta convertirlo a un solo dígito, aplica para todos los números del mes del 1 al 31, excepto para el 11 y el 22, estos son los únicos números que dentro de la numerología tendrán 2 dígitos ya que son números maestros.
            </p>
            <p>
              El reconocer y actuar plenamente la energía que compone tú número personal, será una tarea en la que tendrás que trabajar, a lo largo de tu vida y que iras perfeccionando y autoafirmando a través de cada lección que vayas enfrentando año tras año en tus ciclos de vida numerológicos.
            </p>
            <p>
              El número personal o logro de tu propia identidad tiene una relación directa con el significado del mito solar y la interpretación que se le ha venido dando a lo largo de la historia por parte de las diferentes culturas, filosofías y ciencias dedicadas a la búsqueda de la sabiduría y de la conexión energética entre el mundo espiritual y el material.
            </p>
            <p>
              Es por esto que para poder alcanzar la plena realización de tu SER, tendrás que reinventarte y conquistar esta energía construyéndote a ti mismo sin la influencia de un modelo a seguir o al cuál parecerte, es decir, confrontando las estructuras de creencias que nos fueron dadas cuando niños a través de nuestra familia de origen, medio ambiente y acervo cultural.
            </p>
            <p>
              El número personal revela la cualidad básica de nuestra conciencia. Es el factor central de nuestra personalidad, del mismo modo como el Sol es el centro de nuestro sistema solar. Es la energía más íntima y propia, el ser interior o el yo que piensa y siente y que vino a construir su identidad propia. Es el director de orquesta de todos los números que componen el cuadro numerológico. Todo esto forma parte de tu numerología personal
            </p>
          </div>

          <h2 className="font-display text-2xl font-semibold text-primary">
            El Número personal define la esencia de la persona
          </h2>

          <div className="text-base leading-8 text-foreground/80 [&_p]:mb-4 [&_p:last-child]:mb-0">
            <p>
              La energía del número personal va a guiar a todos los demás números que componen el pináculo de cada persona. Por eso es importante que comprendamos como elevar nuestra frecuencia hacia su mejor desempeño, manteniéndolo en una vibración positiva, pues esa es la vía para acercarnos al logro de la felicidad, que es el fin último de nuestro paso por este mundo.
            </p>
            <p>
              Prácticamente todas las personas tenemos problemas para identificar nuestra verdadera esencia, determinada por nuestro número personal, pero si aprendemos a profundizar en nosotros mismos, podremos encontrar nuestra propia fuerza e identidad, y el resultado será el encuentro de nuestro verdadero ser, pero hacerlo nos puede llevar mucho tiempo e implicar un esfuerzo inmenso. Además, entre más elevado sea el *número personal*, más serán las tareas o lecciones de vida que tendremos que integrar, reparar y perfeccionar, y la persona en cuestión requerirá de mayor consciencia, esfuerzo y tenacidad.
            </p>
            <p>
              Pero <strong>¿cuál es tu número personal?</strong> Calcula el tuyo y el de cualquiera de círculo cercano, enseguida aprenderas los significados. Suscribete para que aprendas a realizar el cálculo y recibe información extendida para poder descifrar, entender, alinear y potencializar las cualidades armónicas de tu Número Personal.
            </p>
          </div>
        </section>
        <div className="border-t border-border/70 pt-6">
          <ShareButtons slug="numero-personal" title="Número Personal" />
        </div>
      </div>
    </ToolPage>
  )
}
