'use client'

import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { startTransition, useEffect, useState } from 'react'

import { SignificadoModal, type ModalTarget } from '@/components/pinaculo/significado-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { addSavedResult } from '@/lib/saved-results'
import Pinnacle from '@/resources/pinnacle'

type EtapaLetra = 'E' | 'F' | 'G' | 'H'
type DesafioLetra = 'K' | 'L' | 'M' | 'N'

type Valores = {
  letras: Record<EtapaLetra | DesafioLetra, number | string>
  /** Edades de corte [fin 1ª, fin 2ª, ... fin 6ª]. La 7ª es "en adelante". */
  cortes: number[]
  birthYear: number
}

// Mismos colores que los nodos del diagrama del pináculo.
const VERDE = 'rgb(172, 192, 66)'
const ROJO = 'rgb(209, 77, 77)'

// Las 7 etapas de vida: la 1ª-4ª usan E-H / K-N y la 5ª-7ª espejean G/F/E y M/L/K.
const ETAPAS: {
  n: number
  ordinal: string
  nombre: string
  etapa: EtapaLetra
  desafio: DesafioLetra
}[] = [
  { n: 1, ordinal: '1a', nombre: 'Primera', etapa: 'E', desafio: 'K' },
  { n: 2, ordinal: '2a', nombre: 'Segunda', etapa: 'F', desafio: 'L' },
  { n: 3, ordinal: '3a', nombre: 'Tercera', etapa: 'G', desafio: 'M' },
  { n: 4, ordinal: '4a', nombre: 'Cuarta', etapa: 'H', desafio: 'N' },
  { n: 5, ordinal: '5a', nombre: 'Quinta', etapa: 'G', desafio: 'M' },
  { n: 6, ordinal: '6a', nombre: 'Sexta', etapa: 'F', desafio: 'L' },
  { n: 7, ordinal: '7a', nombre: 'Séptima', etapa: 'E', desafio: 'K' }
]

const ETAPA_CAPTION = ['1era', '2da', '3era', '4ta', '5ta', '6ta', '7ma']

function computeValores(birthDate: string): Valores | null {
  if (!birthDate) return null
  try {
    const p = new Pinnacle(birthDate)
    return {
      letras: {
        E: p.calcLifeCycle(1) ?? '—',
        F: p.calcLifeCycle(2) ?? '—',
        G: p.calcLifeCycle(3) ?? '—',
        H: p.calcLifeCycle(4) ?? '—',
        K: p.calcFirstGoal(),
        L: p.calcSecGoal(),
        M: p.calcThiGoal(),
        N: p.calcFourGoal()
      },
      cortes: [
        p.calcEndFirstLifeCicle(),
        p.calcEndSecLifeCicle(),
        p.calcEndThiLifeCicle(),
        p.calcEndFouLifeCicle(),
        p.calcEndFifLifeCicle(),
        p.calcEndSixLifeCicle()
      ],
      birthYear: parseInt(birthDate.split('-')[0], 10)
    }
  } catch {
    return null
  }
}

/** Etapa (1-7) activa hoy: la primera cuyo año de fin aún no se alcanza. */
function etapaActiva(valores: Valores): number {
  const currentYear = new Date().getFullYear()
  for (let i = 0; i < valores.cortes.length; i++) {
    if (valores.birthYear + valores.cortes[i] >= currentYear) return i + 1
  }
  return 7
}

function formatShortDate(value: string): string {
  const [year, month, day] = value.split('-')
  return day && month && year ? `${day}/${month}/${year}` : value
}

export type LifeStagesVariant = 'etapas' | 'desafios'

/** Curva de las 7 etapas con años, rangos de edad y etapa activa resaltada.
 *  variant 'etapas' → nodos E-H (verde); 'desafios' → nodos K-N (rojo). */
function LifeStagesChart({
  valores,
  activa,
  onSelect,
  variant
}: {
  valores: Valores
  activa: number
  onSelect: (etapaIndex: number) => void
  variant: LifeStagesVariant
}) {
  const W = 760
  const H = 330
  const X0 = 30
  const STEP = (W - 2 * X0) / 7
  const xs = Array.from({ length: 8 }, (_, i) => X0 + i * STEP)
  // Altura de la curva por etapa (E bajo → H cima → espejo).
  const ys = [252, 204, 156, 108, 156, 204, 252]
  const YEAR_Y = 316
  const anos: (number | string)[] = [
    valores.birthYear,
    ...valores.cortes.map((edad) => valores.birthYear + edad),
    'En adelante...'
  ]
  // Rangos de edad entre cortes (etapas 2ª-7ª); alturas escalonadas como la curva.
  const rangos = ETAPAS.slice(1).map(({ n }, i) => ({
    label: n === 7 ? `${valores.cortes[5]} - ...` : `${valores.cortes[i]} - ${valores.cortes[i + 1]}`,
    x: (xs[n - 1] + xs[n]) / 2,
    y: Math.min(ys[n - 2], ys[n - 1]) - 68
  }))

  const path = xs
    .slice(0, 7)
    .map((x, i) => {
      if (i === 0) return `M ${x} ${ys[0]}`
      const prevX = xs[i - 1]
      const dx = (x - prevX) * 0.45
      return `C ${prevX + dx} ${ys[i - 1]}, ${x - dx} ${ys[i]}, ${x} ${ys[i]}`
    })
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Curva de tus 7 etapas de vida con sus vibraciones y años"
      className="w-full"
    >
      {/* Región de la etapa activa */}
      <rect
        x={xs[activa - 1]}
        y={16}
        width={STEP}
        height={280}
        rx={10}
        className="fill-[hsl(var(--accent)/0.2)]"
      />
      {activa === 1 ? (
        <text
          x={xs[0] + STEP / 2}
          y={120}
          textAnchor="middle"
          className="fill-foreground/70 text-[13px] font-medium"
        >
          <tspan x={xs[0] + STEP / 2} dy="0">Del nacimiento</tspan>
          <tspan x={xs[0] + STEP / 2} dy="16">a los {valores.cortes[0]}</tspan>
        </text>
      ) : null}

      {/* Separadores punteados */}
      {xs.slice(1, 7).map((x) => (
        <line
          key={x}
          x1={x}
          y1={20}
          x2={x}
          y2={296}
          strokeDasharray="4 5"
          className="stroke-foreground/25"
        />
      ))}

      {/* Rangos de edad entre etapas */}
      {rangos.map((rango) => (
        <g key={rango.label + rango.x}>
          <text
            x={rango.x}
            y={rango.y}
            textAnchor="middle"
            className="fill-foreground/70 text-[12px] font-semibold"
          >
            {rango.label}
          </text>
          <line
            x1={rango.x - STEP / 2 + 12}
            y1={rango.y + 10}
            x2={rango.x + STEP / 2 - 12}
            y2={rango.y + 10}
            markerStart="url(#flecha-izq)"
            markerEnd="url(#flecha-der)"
            className="stroke-[hsl(var(--royal-blue))]"
            strokeWidth={1.5}
          />
        </g>
      ))}
      <defs>
        <marker id="flecha-der" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" className="fill-[hsl(var(--royal-blue))]" />
        </marker>
        <marker
          id="flecha-izq"
          markerWidth="7"
          markerHeight="7"
          refX="2"
          refY="3.5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" className="fill-[hsl(var(--royal-blue))]" />
        </marker>
      </defs>

      {/* Curva */}
      <path d={path} fill="none" strokeWidth={3} className="stroke-[hsl(var(--royal-blue))]" />

      {/* Nodos: letra, valor y caption; clickeables */}
      {ETAPAS.map((etapa, i) => {
        const x = xs[i]
        const y = ys[i]
        const letra = variant === 'etapas' ? etapa.etapa : etapa.desafio
        const color = variant === 'etapas' ? VERDE : ROJO
        // Tono más oscuro hacia la cima (como el original).
        const shade = [0.55, 0.7, 0.85, 1, 0.85, 0.7, 0.55][i]
        return (
          <g
            key={etapa.n}
            onClick={() => onSelect(i)}
            className="cursor-pointer"
            role="button"
            aria-label={`${etapa.ordinal} ${variant === 'etapas' ? 'Etapa' : 'Meta'}: vibración ${valores.letras[letra]}`}
          >
            <text
              x={x}
              y={y - 26}
              textAnchor="middle"
              style={{ fill: color }}
              className="font-display text-[20px] font-bold"
            >
              {letra}
            </text>
            <rect
              x={x - 17}
              y={y - 17}
              width={34}
              height={34}
              rx={9}
              style={{ fill: color, opacity: shade }}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              className="fill-white font-display text-[16px] font-semibold"
            >
              {valores.letras[letra]}
            </text>
            {variant === 'etapas' ? (
              <text x={x} y={y + 34} textAnchor="middle" className="fill-foreground/60 text-[11px]">
                {ETAPA_CAPTION[i]} Etapa
              </text>
            ) : null}
          </g>
        )
      })}

      {/* Años */}
      {anos.map((ano, i) => (
        <text
          key={i}
          x={i === 7 ? xs[7] - 8 : xs[i]}
          y={YEAR_Y}
          textAnchor="middle"
          className="fill-foreground/75 text-[13px] font-semibold"
        >
          {ano}
        </text>
      ))}
    </svg>
  )
}

export function LifeStagesCalculator({
  isMember = false,
  variant = 'etapas'
}: {
  isMember?: boolean
  /** 'etapas' → curva con E-H (camino de vida); 'desafios' → curva con K-N (metas). */
  variant?: LifeStagesVariant
}) {
  const isDesafios = variant === 'desafios'
  const desafioTitulo = isDesafios ? 'Meta' : 'Desafío'
  const calculadoraPath = isDesafios
    ? '/calculadoras/desafios-de-vida'
    : '/calculadoras/camino-de-vida'

  const [birthDate, setBirthDate] = useState('')
  const [valores, setValores] = useState<Valores | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null)

  // Precarga: /calculadoras/camino-de-vida?nacimiento=YYYY-MM-DD
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nacimiento = params.get('nacimiento')
    if (!nacimiento) return
    setBirthDate(nacimiento)
    startTransition(() => {
      setValores(computeValores(nacimiento))
      setSubmitted(true)
    })
  }, [])

  function handleSubmit(formData: FormData) {
    const next = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setValores(computeValores(next))
      setSubmitted(true)
      setSaved(false)
    })
  }

  function handleClear() {
    startTransition(() => {
      setBirthDate('')
      setValores(null)
      setSubmitted(false)
      setSaved(false)
    })
  }

  function openEtapa(index: number) {
    if (!valores) return
    const etapa = ETAPAS[index]
    setModalTarget({
      key: etapa.etapa,
      nombre: `${etapa.ordinal} Etapa de vida`,
      concepto: 'realizacion',
      value: valores.letras[etapa.etapa],
      color: VERDE
    })
  }

  function openDesafio(index: number) {
    if (!valores) return
    const etapa = ETAPAS[index]
    setModalTarget({
      key: etapa.desafio,
      nombre: `${etapa.ordinal} ${desafioTitulo} de vida`,
      concepto: 'reto-meta',
      value: valores.letras[etapa.desafio],
      color: ROJO
    })
  }

  function handleSave() {
    if (!valores || !birthDate) return
    const detail = `Nacimiento: ${formatShortDate(birthDate)}`
    const href = `${calculadoraPath}?nacimiento=${birthDate}`
    ETAPAS.slice(0, 4).forEach(({ ordinal, etapa, desafio }) => {
      addSavedResult({
        label: isDesafios ? `${ordinal} Meta de vida` : `${ordinal} Etapa de vida`,
        value: String(valores.letras[isDesafios ? desafio : etapa]),
        detail,
        href
      })
    })
    setSaved(true)
  }

  const activa = valores ? etapaActiva(valores) : 0

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-primary">¡Descubre tus números!</h2>
      <form
        action={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <label className="flex-1 text-sm font-medium text-foreground/80">
          Ingresa tu fecha de nacimiento:
          <Input
            name="birthDate"
            type="date"
            required
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            className="mt-2"
          />
        </label>
        <div className="flex gap-2">
          <Button type="submit" className="sm:w-auto">
            Calcular
          </Button>
          {submitted ? (
            <Button type="button" variant="ghost" onClick={handleClear} className="sm:w-auto">
              Borrar
            </Button>
          ) : null}
        </div>
      </form>

      {submitted && valores ? (
        <div className="animate-result-pop mt-8 space-y-8">
          {/* Curva de etapas */}
          <figure className="overflow-x-auto rounded-[1.5rem] border border-border/60 bg-background/60 p-4 sm:p-5">
            <div className="min-w-[560px]">
              <LifeStagesChart
                valores={valores}
                activa={activa}
                onSelect={isDesafios ? openDesafio : openEtapa}
                variant={variant}
              />
            </div>
            <figcaption className="mt-2 border-t border-border/60 pt-3 text-sm font-semibold text-foreground/60">
              Etapas de vida · toca una vibración para su interpretación
            </figcaption>
          </figure>

          {/* Listas de etapas y desafíos */}
          <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
            {[ETAPAS.slice(0, 4), ETAPAS.slice(4)].map((columna, columnaIndex) => (
              <ul key={columnaIndex} className="space-y-3">
                <li className="flex items-center justify-between px-1">
                  <span className="font-display text-lg font-semibold" style={{ color: VERDE }}>
                    Etapas
                  </span>
                  <span className="font-display text-lg font-semibold" style={{ color: ROJO }}>
                    {isDesafios ? 'Metas' : 'Desafíos'}
                  </span>
                </li>
                {columna.map((etapa) => {
                  const index = etapa.n - 1
                  const esActiva = etapa.n === activa
                  const duracion =
                    etapa.n === 1
                      ? `de los 0 a los ${valores.cortes[0]} años`
                      : etapa.n === 7
                        ? `de los ${valores.cortes[5]} en adelante`
                        : `de los ${valores.cortes[etapa.n - 2]} a los ${valores.cortes[etapa.n - 1]} años`
                  return (
                    <li
                      key={etapa.n}
                      className={cn(
                        'space-y-2 rounded-2xl border border-border/60 p-4',
                        esActiva ? 'bg-[hsl(var(--accent)/0.16)]' : 'bg-secondary/30'
                      )}
                    >
                      <p className="text-sm font-semibold text-foreground/75">
                        {etapa.nombre} Etapa de vida: {duracion}
                        {esActiva ? (
                          <span className="ml-2 rounded-full bg-gradient-brand px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                            Actual
                          </span>
                        ) : null}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => openEtapa(index)}
                          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-left text-sm font-semibold text-white transition hover:opacity-90"
                          style={{ backgroundColor: VERDE }}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-semibold" style={{ color: VERDE }}>
                            {valores.letras[etapa.etapa]}
                          </span>
                          {etapa.etapa}. {etapa.ordinal} Etapa
                        </button>
                        <button
                          type="button"
                          onClick={() => openDesafio(index)}
                          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-left text-sm font-semibold text-white transition hover:opacity-90"
                          style={{ backgroundColor: ROJO }}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-semibold" style={{ color: ROJO }}>
                            {valores.letras[etapa.desafio]}
                          </span>
                          {etapa.desafio}. {etapa.ordinal} {desafioTitulo}
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={
                (isDesafios
                  ? `/calculadoras/camino-de-vida?nacimiento=${birthDate}`
                  : `/calculadoras/desafios-de-vida?nacimiento=${birthDate}`) as Route
              }
              className="inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
            >
              {isDesafios ? 'Conoce tus etapas de vida' : 'Leer más sobre tus desafíos de vida'}
            </Link>
            <button
              type="button"
              onClick={handleSave}
              disabled={saved}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft disabled:cursor-default disabled:opacity-70"
            >
              {saved ? (
                <>
                  <BookmarkCheck size={16} aria-hidden /> Guardado en Mi carta
                </>
              ) : (
                <>
                  <BookmarkPlus size={16} aria-hidden /> Guardar resultado
                </>
              )}
            </button>
          </div>
        </div>
      ) : submitted ? (
        <p className="mt-4 text-sm text-foreground/60">
          Revisa la fecha ingresada para poder calcular tus etapas de vida.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para descubrir tus 7 etapas de vida con sus vibraciones y
          desafíos.
        </p>
      )}

      <SignificadoModal target={modalTarget} isMember={isMember} onClose={() => setModalTarget(null)} />
    </div>
  )
}
