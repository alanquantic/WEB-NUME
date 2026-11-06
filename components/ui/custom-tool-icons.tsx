import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
  strokeWidth?: number
}

const base = ({
  size = 22,
  strokeWidth = 1.75,
  ...rest
}: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...rest
})

// Pináculo: pirámide 3D clara con estrella en la punta
export function PinnacleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      {/* pirámide (triángulo + arista central para dar volumen) */}
      <path d="M12 6 3 21h18Z" />
      <path d="M12 6v15" />
      {/* base sombreada / línea de piso */}
      <path d="M7.5 21 12 12l4.5 9" />
      {/* estrella pequeña en la cima */}
      <path
        d="M12 1.8l0.6 1.4l1.5 0.2l-1.1 1l0.3 1.5l-1.3 -0.8l-1.3 0.8l0.3 -1.5l-1.1 -1l1.5 -0.2z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

// Camino de Vida: dos montañas simples (metáfora del recorrido vital).
export function LifePathIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      {/* montaña grande al centro + montaña chica a la derecha, unidas en la base */}
      <path d="M2 20 L 9 8 L 14 15 L 17 11 L 22 20 Z" />
      {/* sol */}
      <circle cx="17" cy="5" r="1.6" />
    </svg>
  )
}

// Año Personal: calendario con estrella central
export function YearStarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M12 12.5l0.9 1.9l2 0.3l-1.5 1.4l0.4 2l-1.8 -1l-1.8 1l0.4 -2l-1.5 -1.4l2 -0.3z" />
    </svg>
  )
}
