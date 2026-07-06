'use client'

import Pinnacle from '@/resources/pinnacle'

type PinnacleLetter =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
  | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'W'

const PINNACLE_POSITIONS: Record<PinnacleLetter, string> = {
  A: 'left-[10.2%] top-[42%]',
  B: 'left-[37.7%] top-[42%]',
  C: 'left-[65.7%] top-[42%]',
  D: 'left-[93%] top-[42%]',
  E: 'left-[24.5%] top-[30%]',
  F: 'left-[51.8%] top-[30%]',
  G: 'left-[37.9%] top-[17%]',
  H: 'left-[38.1%] top-[4%]',
  I: 'left-[38.2%] top-[29%]',
  J: 'left-[74%] top-[24%]',
  K: 'left-[24%] top-[56.5%]',
  L: 'left-[52.8%] top-[56.5%]',
  M: 'left-[38.2%] top-[67.5%]',
  N: 'left-[38.2%] top-[79.5%]',
  O: 'left-[38.2%] top-[56.5%]',
  P: 'left-[14.8%] top-[79.8%]',
  Q: 'left-[24.5%] top-[91.4%]',
  R: 'left-[38.2%] top-[91.4%]',
  S: 'left-[52.5%] top-[91.4%]',
  W: 'left-[6%] top-[67.9%]'
}

function fmt(value: number | undefined | ''): number | string {
  if (value === undefined || value === '') return ''
  return value
}

function compute(birthDate: string): Partial<Record<PinnacleLetter, number | string>> | null {
  if (!birthDate) return null
  try {
    const p = new Pinnacle(birthDate)
    return {
      A: fmt(p.calcKarma()),
      B: fmt(p.calcPersonalNumber()),
      C: fmt(p.calcPastLife()),
      D: fmt(p.calcPersonalityNumber()),
      E: fmt(p.calcLifeCycle(1)),
      F: fmt(p.calcLifeCycle(2)),
      G: fmt(p.calcLifeCycle(3)),
      H: fmt(p.calcLifeCycle(4)),
      I: fmt(p.calcUnconsciousNumber()),
      J: fmt(p.calcSubconsciousNumber()),
      K: fmt(p.calcFirstGoal()),
      L: fmt(p.calcSecGoal()),
      M: fmt(p.calcThiGoal()),
      N: fmt(p.calcFourGoal()),
      O: fmt(p.calcNegativeUnconsciousNumber()),
      P: fmt(p.calcShadeNumber()),
      Q: fmt(p.calcFamilysLowerSelfNumber()),
      R: fmt(p.calcConsciousLowerSelfNumber()),
      S: fmt(p.calcLatentLowerSelfNumber()),
      W: fmt(p.calcW())
    }
  } catch {
    return null
  }
}

export function PinnacleDiagram({ birthDate }: { birthDate: string }) {
  const values = compute(birthDate)
  if (!values) return null

  return (
    <div className="overflow-hidden rounded-[1.65rem] bg-white/70 p-3 shadow-[inset_0_1px_0_hsl(var(--card)/0.6)]">
      <div className="relative overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,hsl(var(--card)/0.84),hsl(var(--secondary)/0.7))]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/pinnacle.png" alt="Diagrama del pináculo" className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0">
          {(Object.entries(PINNACLE_POSITIONS) as Array<[PinnacleLetter, string]>).map(
            ([letter, position]) => (
              <span
                key={letter}
                className={`absolute inline-flex h-[1.85rem] w-[1.85rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-display text-[0.55rem] font-semibold leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-[2.1rem] sm:w-[2.1rem] sm:text-[1.08rem] ${position}`}
              >
                {values[letter] ?? ''}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}
