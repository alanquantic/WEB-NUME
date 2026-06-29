'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { startTransition, useState } from 'react'

import { CountUp } from '@/components/ui/count-up'
import { SparkleField } from '@/components/ui/sparkle-field'
import { getToolIcon } from '@/components/ui/tool-icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { calculateExpression } from '@/lib/numerology/expression'
import { calculateLifePath } from '@/lib/numerology/life-path'
import { calculateMaturity } from '@/lib/numerology/maturity'
import { getMeaning } from '@/lib/numerology/meanings'
import { addSavedResult } from '@/lib/saved-results'
import Person from '@/resources/person'

type MapItem = {
  label: string
  value: number | string
  href: string
}

type MapGroup = {
  title: string
  items: MapItem[]
}

type MapData = {
  name: string
  groups: MapGroup[]
}

function clean(value: number | string | false | null | undefined): number | string {
  if (value === false || value === null || value === undefined || value === '') return '—'
  return value
}

function buildMap(fullName: string, birthDate: string): MapData | null {
  const name = fullName.replace(/\s+/g, ' ').trim()
  if (!name || !birthDate) return null

  try {
    const person = new Person({ birthDate })
    const now = new Date()
    const expression = calculateExpression(name)

    const groups: MapGroup[] = [
      {
        title: 'Tu esencia',
        items: [
          {
            label: 'Camino de vida',
            value: clean(calculateLifePath({ birthDate }).lifePathNumber),
            href: '/calculadoras/camino-de-vida'
          },
          {
            label: 'Número personal',
            value: clean(person.calcPersonalNumber()),
            href: '/explora'
          },
          {
            label: 'Madurez',
            value: clean(calculateMaturity(name, birthDate)),
            href: '/numerodelamadurez'
          }
        ]
      },
      {
        title: 'Tu nombre',
        items: [
          {
            label: 'Expresión',
            value: clean(expression?.expression),
            href: '/numerodelnombre'
          },
          {
            label: 'Alma',
            value: clean(expression?.soul),
            href: '/numerodelalma'
          },
          {
            label: 'Personalidad',
            value: clean(expression?.personality),
            href: '/numerodeexpresiondelalma'
          }
        ]
      },
      {
        title: 'Tu momento (2026)',
        items: [
          {
            label: 'Año personal',
            value: clean(person.calcPersonalYear(new Date(now.getFullYear(), 0, 1))),
            href: '/anopersonal'
          },
          {
            label: 'Mes personal',
            value: clean(person.calcPersonalMonth(now, now)),
            href: '/mespersonal'
          },
          {
            label: 'Día personal',
            value: clean(person.calcPersonalDay(now)),
            href: '/diapersonal'
          }
        ]
      }
    ]

    return { name: name.split(' ')[0] ?? name, groups }
  } catch {
    return null
  }
}

function MapTile({ item }: { item: MapItem }) {
  const Icon = getToolIcon(item.href)
  const meaning = typeof item.value === 'number' ? getMeaning(item.value).title : ''

  return (
    <Link
      href={item.href as Route}
      className="group flex flex-col items-center rounded-[1.5rem] border border-border/80 bg-card p-5 text-center shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative">
        <span
          className="absolute -inset-1.5 rounded-full bg-gradient-brand opacity-25 blur-lg transition group-hover:opacity-45"
          aria-hidden
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
          <CountUp value={item.value} />
        </span>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-foreground group-hover:text-primary">
        <Icon size={15} strokeWidth={1.75} aria-hidden /> {item.label}
      </p>
      {meaning ? <p className="text-xs text-foreground/55">{meaning}</p> : null}
    </Link>
  )
}

export function MapaNumerologico() {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [data, setData] = useState<MapData | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSubmit(formData: FormData) {
    const name = String(formData.get('fullName') ?? '')
    const date = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setData(buildMap(name, date))
      setSubmitted(true)
      setSaved(false)
    })
  }

  function handleSave() {
    if (!data) return
    data.groups.forEach((group) => {
      group.items.forEach((item) => {
        if (typeof item.value === 'number') {
          addSavedResult({ label: item.label, value: String(item.value) })
        }
      })
    })
    setSaved(true)
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form action={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground/80">
          Nombre completo
          <Input
            name="fullName"
            type="text"
            required
            placeholder="Tu nombre completo"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-2"
          />
        </label>
        <label className="text-sm font-medium text-foreground/80">
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
        <div className="sm:col-span-2">
          <Button type="submit">Ver mi mapa</Button>
        </div>
      </form>

      {submitted && data ? (
        <div className="animate-result-pop relative mt-8 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.7),hsl(var(--primary)/0.1))] p-6">
          <SparkleField className="text-primary" />
          <div className="relative">
            <p className="font-display text-xl font-semibold text-primary">
              El mapa de {data.name}
            </p>
            <p className="mt-1 text-sm text-foreground/70">
              Estos son tus números principales. Toca cualquiera para conocerlo a fondo.
            </p>

            {data.groups.map((group) => (
              <div key={group.title} className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
                  {group.title}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {group.items.map((item) => (
                    <MapTile key={item.label} item={item} />
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={saved}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 disabled:opacity-70"
              >
                {saved ? 'Guardado en Mi carta ✓' : 'Guardar mi mapa'}
              </button>
            </div>
          </div>
        </div>
      ) : submitted ? (
        <p className="mt-4 text-sm text-foreground/60">
          Revisa los datos ingresados para generar tu mapa.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu nombre completo y tu fecha de nacimiento para ver tu mapa numerológico
          completo.
        </p>
      )}
    </div>
  )
}
