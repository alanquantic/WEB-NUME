'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignificadoModal, type ModalTarget } from '@/components/pinaculo/significado-modal'
import { cn } from '@/lib/utils'
import Pinnacle from '@/resources/pinnacle'

type Valor = number | string
type Valores = Record<string, Valor>
type NodeColor = 'green' | 'purple' | 'red'

// Colores muestreados del propio diagrama para que los badges se fundan con las líneas.
const NODE_COLORS: Record<NodeColor, string> = {
  green: 'rgb(172, 192, 66)',
  purple: 'rgb(181, 148, 176)',
  red: 'rgb(209, 77, 77)',
}

// Metadatos de cada letra: nombre, subtítulo, concepto (para el significado) y color del nodo.
const LETTERS: Record<
  string,
  { nombre: string; sub?: string; concepto: string; color: NodeColor }
> = {
  A: { nombre: 'Número de Karma', sub: 'Mi tarea pendiente', concepto: 'karma', color: 'purple' },
  B: { nombre: 'Número personal', sub: '¿Quién soy?', concepto: 'numero-personal', color: 'purple' },
  C: { nombre: 'Número de vida pasada', sub: '¿Quién fui?', concepto: 'vida-pasada', color: 'purple' },
  D: { nombre: 'Número de personalidad', sub: 'Mi máscara', concepto: 'personalidad', color: 'purple' },
  E: { nombre: '1ª Etapa de vida', concepto: 'realizacion', color: 'green' },
  F: { nombre: '2ª Etapa de vida', concepto: 'realizacion', color: 'green' },
  G: { nombre: '3ª Etapa de vida', concepto: 'realizacion', color: 'green' },
  H: { nombre: 'Número del destino', concepto: 'destino', color: 'green' },
  I: { nombre: 'Número del subconsciente', sub: 'La guía a mi destino', concepto: 'subconsciente-positivo', color: 'green' },
  J: { nombre: 'Número del inconsciente', sub: 'Mi espejo', concepto: 'pareja', color: 'green' },
  K: { nombre: '1ª Meta / Desafío', concepto: 'reto-meta', color: 'red' },
  L: { nombre: '2ª Meta / Desafío', concepto: 'reto-meta', color: 'red' },
  M: { nombre: '3ª Meta / Desafío', concepto: 'reto-meta', color: 'red' },
  N: { nombre: '4ª Meta / Desafío', concepto: 'reto-meta', color: 'red' },
  O: { nombre: 'Número de inconsciente negativo', concepto: 'subconsciente-negativo', color: 'red' },
  P: { nombre: 'Número de sombra', concepto: 'sombra', color: 'red' },
  Q: { nombre: 'Ser inferior heredado por la familia', concepto: 'ser-inferior', color: 'red' },
  R: { nombre: 'Ser inferior consciente', concepto: 'ser-inferior', color: 'red' },
  S: { nombre: 'Ser inferior latente', concepto: 'ser-inferior', color: 'red' },
  W: { nombre: 'Número de triplicidad', concepto: 'triplicidad', color: 'red' },
}

// Posición de cada letra sobre pinnacle.png (% del ancho/alto). Coordenadas
// detectadas por análisis de píxeles de la imagen.
const NODES: { key: string; x: number; y: number }[] = [
  { key: 'H', x: 38.1, y: 11.9 },
  { key: 'G', x: 38.1, y: 28.5 },
  { key: 'J', x: 74.3, y: 31.2 },
  { key: 'E', x: 24.1, y: 37.0 },
  { key: 'I', x: 38.1, y: 39.4 },
  { key: 'F', x: 52.1, y: 37.1 },
  { key: 'A', x: 9.9, y: 48.5 },
  { key: 'B', x: 38.1, y: 48.2 },
  { key: 'C', x: 66.0, y: 48.1 },
  { key: 'D', x: 93.6, y: 47.8 },
  { key: 'K', x: 23.9, y: 60.0 },
  { key: 'O', x: 38.1, y: 60.0 },
  { key: 'L', x: 52.4, y: 60.0 },
  { key: 'W', x: 6.2, y: 70.5 },
  { key: 'M', x: 38.2, y: 70.6 },
  { key: 'P', x: 15.0, y: 79.4 },
  { key: 'N', x: 38.1, y: 79.3 },
  { key: 'Q', x: 23.9, y: 87.9 },
  { key: 'R', x: 38.1, y: 87.9 },
  { key: 'S', x: 52.3, y: 87.9 },
]

// Letras que se listan a la derecha (posiciones de identidad y psique).
const DETALLE_KEYS = ['A', 'B', 'C', 'D', 'I', 'J', 'P', 'O', 'Q', 'R', 'S']

function computeAll(birthDate: string): Valores | null {
  if (!birthDate) return null
  try {
    const p = new Pinnacle(birthDate)
    const w = p.calcW()
    return {
      A: p.calcKarma(),
      B: p.calcPersonalNumber(),
      C: p.calcPastLife(),
      D: p.calcPersonalityNumber(),
      E: p.calcLifeCycle(1) ?? '—',
      F: p.calcLifeCycle(2) ?? '—',
      G: p.calcLifeCycle(3) ?? '—',
      H: p.calcLifeCycle(4) ?? '—',
      I: p.calcSubconsciousNumber(),
      J: p.calcUnconsciousNumber(),
      K: p.calcFirstGoal(),
      L: p.calcSecGoal(),
      M: p.calcThiGoal(),
      N: p.calcFourGoal(),
      O: p.calcNegativeUnconsciousNumber(),
      P: p.calcShadeNumber(),
      Q: p.calcFamilysLowerSelfNumber(),
      R: p.calcConsciousLowerSelfNumber(),
      S: p.calcLatentLowerSelfNumber(),
      W: w === '' ? '?' : w,
    }
  } catch {
    return null
  }
}

export function PinnacleCalculator({ isMember = false }: { isMember?: boolean }) {
  const [birthDate, setBirthDate] = useState('')
  const [values, setValues] = useState<Valores | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [hoverKey, setHoverKey] = useState<string | null>(null)
  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null)

  function handleSubmit(formData: FormData) {
    const next = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setValues(computeAll(next))
      setSubmitted(true)
    })
  }

  function handleClear() {
    startTransition(() => {
      setBirthDate('')
      setValues(null)
      setSubmitted(false)
    })
  }

  function openModal(key: string) {
    if (!values) return
    const meta = LETTERS[key]
    setModalTarget({
      key,
      nombre: meta.nombre,
      concepto: meta.concepto,
      value: values[key],
      color: NODE_COLORS[meta.color],
    })
  }

  const enter = (key: string) => () => setHoverKey(key)
  const leave = (key: string) => () => setHoverKey((current) => (current === key ? null : current))

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form action={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1 text-sm font-medium text-foreground/80">
          Fecha de nacimiento
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
            Calcular pináculo
          </Button>
          {submitted ? (
            <Button type="button" variant="ghost" onClick={handleClear} className="sm:w-auto">
              Borrar
            </Button>
          ) : null}
        </div>
      </form>

      {submitted && values ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Diagrama con los números del pináculo */}
          <figure className="rounded-[1.5rem] border border-border/60 bg-white p-4 sm:p-5">
            <div className="relative mx-auto w-full max-w-[380px] [container-type:inline-size]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pinaculo/pinnacle.png"
                alt="Diagrama de tu Pináculo Personal con tus números"
                width={565}
                height={671}
                className="block h-auto w-full"
              />
              {NODES.map((node) => {
                const active = hoverKey === node.key
                return (
                  <button
                    key={node.key}
                    type="button"
                    onMouseEnter={enter(node.key)}
                    onMouseLeave={leave(node.key)}
                    onFocus={enter(node.key)}
                    onBlur={leave(node.key)}
                    onClick={() => openModal(node.key)}
                    aria-label={`${LETTERS[node.key].nombre}: ${values[node.key]}`}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      backgroundColor: active ? undefined : NODE_COLORS[LETTERS[node.key].color],
                      fontSize: '3.7cqw',
                    }}
                    className={cn(
                      'absolute flex aspect-square w-[9%] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full font-display font-semibold leading-none text-white ring-2 transition',
                      active ? 'z-10 scale-110 bg-gradient-brand ring-white' : 'ring-white/70',
                    )}
                  >
                    {values[node.key]}
                  </button>
                )
              })}
            </div>
            <figcaption className="mt-3 text-center text-sm font-medium text-slate-500">
              Tu Pináculo Personal · toca un número para su interpretación
            </figcaption>
          </figure>

          {/* Lista de letras con su valor y descripción */}
          <ul className="space-y-2.5">
            {DETALLE_KEYS.map((key) => {
              const meta = LETTERS[key]
              const active = hoverKey === key
              return (
                <li key={key}>
                  <button
                    type="button"
                    onMouseEnter={enter(key)}
                    onMouseLeave={leave(key)}
                    onFocus={enter(key)}
                    onBlur={leave(key)}
                    onClick={() => openModal(key)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-[1.1rem] border px-4 py-2.5 text-left transition',
                      active
                        ? 'border-transparent bg-gradient-brand text-white shadow-glow'
                        : 'border-border/60 bg-secondary/40 hover:border-primary/30',
                    )}
                  >
                    <span
                      style={{ backgroundColor: active ? undefined : NODE_COLORS[meta.color] }}
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold',
                        active ? 'bg-white text-primary' : 'text-white',
                      )}
                    >
                      {values[key]}
                    </span>
                    <p className="text-sm leading-tight">
                      <span className={cn('font-semibold', active ? 'text-white' : 'text-foreground')}>
                        {key}. {meta.nombre}
                      </span>
                      {meta.sub ? (
                        <span className={active ? 'text-white/80' : 'text-foreground/55'}>
                          {' '}
                          — {meta.sub}
                        </span>
                      ) : null}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para revelar los números de tu pináculo personal.
        </p>
      )}

      <SignificadoModal target={modalTarget} isMember={isMember} onClose={() => setModalTarget(null)} />
    </div>
  )
}
