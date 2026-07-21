'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const TIENDA_URL = 'https://tienda.numerologia-cotidiana.com/'

type Bloque = { titulo?: string; tipo: 'parrafos' | 'lista'; contenido: string[] }

type Respuesta = {
  member: boolean
  found?: boolean
  concepto?: { nombre: string; etiqueta?: string; pregunta?: string }
  numero?: { numero: number; titulo?: string; afirmacion?: string; bloques: Bloque[] }
}

export type ModalTarget = {
  key: string
  nombre: string
  concepto: string
  value: number | string
  color?: string
}

function BloqueView({ bloque }: { bloque: Bloque }) {
  return (
    <section className="rounded-[1.25rem] border border-border/60 bg-secondary/30 p-5 sm:p-6">
      {bloque.titulo ? (
        <h3 className="mb-3 font-display text-lg font-semibold text-primary">{bloque.titulo}</h3>
      ) : null}
      {bloque.tipo === 'lista' ? (
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {bloque.contenido.map((item, index) => (
            <li key={index} className="flex gap-2.5 text-base leading-7 text-foreground/80">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-4 text-base leading-8 text-foreground/80">
          {bloque.contenido.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      )}
    </section>
  )
}

function MemberWall({ nombre }: { nombre: string }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-primary/30 bg-secondary/40 px-6 py-8 text-center">
      <h3 className="font-display text-xl font-semibold text-primary">
        Contenido exclusivo para miembros
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-base leading-8 text-foreground/72">
        La interpretación de <strong>{nombre}</strong> es parte del contenido premium. Hazte miembro
        para leer el análisis completo de cada número de tu pináculo.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={TIENDA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
        >
          Ir a la tienda
        </a>
        <Link
          href="/login?next=/calculatupinaculo"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background px-7 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
        >
          Ya soy miembro
        </Link>
      </div>
    </div>
  )
}

function Contenido({ data }: { data: Respuesta }) {
  const concepto = data.concepto
  const numero = data.numero
  if (!numero) return null
  return (
    <div className="space-y-5">
      {numero.titulo ? (
        <p className="font-display text-xl font-semibold text-foreground">{numero.titulo}</p>
      ) : null}
      {concepto?.pregunta ? (
        <p className="rounded-[1.25rem] border-l-4 border-primary bg-primary-soft/50 px-5 py-4 text-base italic leading-8 text-foreground/85">
          {concepto.pregunta}
        </p>
      ) : null}
      {numero.bloques.map((bloque, index) => (
        <BloqueView key={index} bloque={bloque} />
      ))}
      {numero.afirmacion ? (
        <div className="rounded-[1.5rem] bg-gradient-brand p-6 text-center shadow-glow">
          <p className="font-display text-lg italic leading-8 text-white sm:text-xl">
            “{numero.afirmacion}”
          </p>
        </div>
      ) : null}
    </div>
  )
}

export function SignificadoModal({
  target,
  isMember,
  onClose,
}: {
  target: ModalTarget | null
  isMember: boolean
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Respuesta | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const valueNum = target ? Number(target.value) : Number.NaN
  const valueValido = Number.isFinite(valueNum)

  useEffect(() => {
    if (!target) return
    setData(null)
    if (!isMember || !valueValido) return
    let cancel = false
    setLoading(true)
    fetch(
      `/api/pinaculo/significado?concepto=${encodeURIComponent(target.concepto)}&numero=${valueNum}`,
    )
      .then((r) => r.json())
      .then((json: Respuesta) => {
        if (!cancel) setData(json)
      })
      .catch(() => {
        if (!cancel) setData({ member: true, found: false })
      })
      .finally(() => {
        if (!cancel) setLoading(false)
      })
    return () => {
      cancel = true
    }
  }, [target, isMember, valueNum, valueValido])

  useEffect(() => {
    if (!target) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [target, onClose])

  if (!target) return null

  // Los miembros ven contenido enriquecido → panel más ancho.
  const wide = isMember

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={target.nombre}
    >
      <button
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />
      <div
        className={cn(
          'relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-panel',
          wide ? 'max-w-3xl' : 'max-w-lg',
        )}
      >
        {/* Encabezado con banda de color */}
        <div className="relative bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary-soft)))] px-6 py-6 sm:px-8">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-foreground/70 transition hover:bg-white"
          >
            ✕
          </button>
          <div className="flex items-center gap-4 pr-10">
            <span
              style={{ backgroundColor: target.color }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-2xl font-semibold text-white shadow-glow ring-2 ring-white/70"
            >
              {target.value}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Posición {target.key}
              </p>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {target.nombre}
              </h2>
            </div>
          </div>
        </div>

        {/* Cuerpo desplazable */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          {!isMember ? (
            <MemberWall nombre={target.nombre} />
          ) : !valueValido ? (
            <p className="text-base leading-8 text-foreground/72">
              No hay un número que interpretar en esta posición.
            </p>
          ) : loading ? (
            <p className="text-base leading-8 text-foreground/60">Cargando la interpretación…</p>
          ) : data && data.member === false ? (
            <MemberWall nombre={target.nombre} />
          ) : data && data.found && data.numero ? (
            <Contenido data={data} />
          ) : (
            <p className="text-base leading-8 text-foreground/72">
              Aún no tenemos la interpretación de <strong>{target.nombre}</strong> con el número{' '}
              {target.value}.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
