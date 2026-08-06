'use client'

import { startTransition, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignificadoModal, type ModalTarget } from '@/components/pinaculo/significado-modal'
import { cn } from '@/lib/utils'
import Pinnacle from '@/resources/pinnacle'
import { useNumerologyMapStore } from '@/stores/numerology-map-store'
import { useUserDefaults } from '@/stores/user-defaults'

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

const RESULT_GROUPS: Record<
  NodeColor,
  { label: string; title: string; description: string; keys: string[] }
> = {
  purple: {
    label: 'Identidad',
    title: 'Tu identidad',
    description: 'Las posiciones que describen quién eres y lo que proyectas.',
    keys: ['A', 'B', 'C', 'D'],
  },
  green: {
    label: 'Evolución',
    title: 'Tus ciclos de evolución',
    description: 'Las energías que se activan durante las distintas etapas de tu vida.',
    keys: ['E', 'F', 'G', 'H', 'I', 'J'],
  },
  red: {
    label: 'Retos',
    title: 'Tus retos y aprendizajes',
    description: 'Los patrones y desafíos que te invitan a crecer y transformarte.',
    keys: ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'W'],
  },
}

const FEATURED_RESULTS: Array<{
  key: 'B' | 'H' | 'K'
  eyebrow: string
  title: string
  description: string
  group: NodeColor
  className: string
}> = [
  {
    key: 'B',
    eyebrow: 'Mi esencia',
    title: 'Número personal',
    description: 'La vibración que habla de quién eres.',
    group: 'purple',
    className: 'border-[#693061]/15 bg-[hsl(var(--primary-soft))] text-[#693061]',
  },
  {
    key: 'H',
    eyebrow: 'Mi destino',
    title: 'Realización de vida',
    description: 'La energía hacia la que dirige tu camino.',
    group: 'green',
    className: 'border-[#693061] bg-[#693061] text-white',
  },
  {
    key: 'K',
    eyebrow: 'Mi aprendizaje',
    title: 'Primer reto',
    description: 'El desafío que impulsa tu evolución inicial.',
    group: 'red',
    className: 'border-[#693061]/20 bg-white text-[#693061]',
  },
]

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
  const [activeGroup, setActiveGroup] = useState<NodeColor>('purple')

  // Si el usuario ya calculó su mapa en el home, llega con la fecha lista:
  // se precarga y se muestra el pináculo calculado. Solo una vez por visita
  // para no pisar interacciones posteriores (p. ej. tras "Borrar").
  const calculated = useNumerologyMapStore((state) => state.calculated)
  const defaults = useUserDefaults()
  const prefilledRef = useRef(false)

  useEffect(() => {
    if (prefilledRef.current || submitted || birthDate) return
    if (!calculated?.birthDate) return

    prefilledRef.current = true
    startTransition(() => {
      setBirthDate(calculated.birthDate)
      setValues(computeAll(calculated.birthDate))
      setSubmitted(true)
    })
  }, [calculated, submitted, birthDate])

  // Fallback: si no vino nada del mapa del home pero el usuario está
  // logueado y tiene fecha de nacimiento en su perfil, la precargamos sin
  // calcular automáticamente (deja que confirme con "Calcular").
  useEffect(() => {
    if (birthDate || submitted) return
    if (!defaults.birthDate) return
    setBirthDate(defaults.birthDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaults.birthDate])

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
      setActiveGroup('purple')
    })
  }

  function openModal(key: string) {
    if (!values) return
    const meta = LETTERS[key]
    setActiveGroup(meta.color)
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
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-panel">
      <div className="p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-[#693061]">
          ¡Descubre tus números!
        </h2>

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
            <Button type="submit" className="flex-1 bg-[#693061] px-7 sm:flex-none">
              Calcular
            </Button>
            {submitted ? (
              <Button type="button" variant="ghost" onClick={handleClear} className="sm:w-auto">
                Borrar
              </Button>
            ) : null}
          </div>
        </form>
      </div>

      {submitted && values ? (
        <div className="animate-result-pop border-t border-border/60 p-6 sm:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Tu resultado
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold">Tu Pináculo personal</h3>
              <p className="mt-1 text-sm text-foreground/60">
                Toca cualquier número para conocer su interpretación.
              </p>
            </div>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {FEATURED_RESULTS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setActiveGroup(item.group)
                  openModal(item.key)
                }}
                className={`group flex min-h-48 flex-col rounded-[1.5rem] border p-5 text-left shadow-[0_14px_35px_hsl(var(--primary)/0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_42px_hsl(var(--primary)/0.13)] ${item.className}`}
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-75">
                  {item.eyebrow}
                </span>
                <span className="mt-4 font-display text-5xl font-semibold leading-none">
                  {values[item.key]}
                </span>
                <strong className="mt-4 font-display text-base font-semibold">{item.title}</strong>
                <span className="mt-1 text-xs leading-5 opacity-70">{item.description}</span>
                <span className="mt-auto pt-4 text-xs font-semibold underline-offset-4 group-hover:underline">
                  Ver interpretación
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          {/* Diagrama con los números del pináculo */}
          <figure className="rounded-[1.5rem] border border-border/60 bg-white p-4 sm:p-6">
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
                      active ? 'z-10 scale-110 bg-[#693061] ring-white' : 'ring-white/70',
                    )}
                  >
                    {values[node.key]}
                  </button>
                )
              })}
            </div>
            <figcaption className="mt-4 border-t border-border/50 pt-4 text-center text-sm font-medium text-foreground/55">
              El mapa reúne las distintas fuerzas que acompañan tu camino de vida.
            </figcaption>
          </figure>

          {/* Lista de letras con su valor y descripción */}
          <div className="min-w-0">
            <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Categorías del pináculo">
              {(Object.keys(RESULT_GROUPS) as NodeColor[]).map((group) => {
                const item = RESULT_GROUPS[group]
                const active = activeGroup === group
                return (
                  <button
                    key={group}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveGroup(group)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition',
                      active
                        ? 'border-transparent text-white shadow-sm'
                        : 'border-border/60 bg-white text-foreground/65 hover:border-primary/30',
                    )}
                    style={active ? { backgroundColor: NODE_COLORS[group] } : undefined}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: active ? 'white' : NODE_COLORS[group] }}
                    />
                    {item.label}
                  </button>
                )
              })}
            </div>
            <div className="mt-4">
              <h4 className="font-display text-lg font-semibold text-primary">
                {RESULT_GROUPS[activeGroup].title}
              </h4>
              <p className="mt-1 text-sm leading-6 text-foreground/58">
                {RESULT_GROUPS[activeGroup].description}
              </p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {RESULT_GROUPS[activeGroup].keys.map((key) => {
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
                        'group flex w-full items-center gap-3 rounded-[1.1rem] border px-4 py-2.5 text-left transition hover:-translate-y-0.5',
                        active
                          ? 'border-transparent bg-[#693061] text-white shadow-glow'
                          : 'border-border/60 bg-secondary/20 hover:border-primary/30 hover:bg-primary-soft/70',
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
          </div>
        </div>
      ) : (
        <p className="border-t border-border/60 px-6 py-4 text-sm text-foreground/60 sm:px-8">
          Ingresa tu fecha de nacimiento para revelar los números de tu pináculo personal.
        </p>
      )}

      <SignificadoModal target={modalTarget} isMember={isMember} onClose={() => setModalTarget(null)} />
    </div>
  )
}
