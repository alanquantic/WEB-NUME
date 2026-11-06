import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  Compass,
  Eye,
  Globe,
  GraduationCap,
  Hash,
  Heart,
  HeartHandshake,
  Hourglass,
  Languages,
  Map as MapIcon,
  MoonStar,
  Pyramid,
  Route,
  Signature,
  Sparkles,
  Sprout,
  Sun,
  Telescope,
  TreeDeciduous,
  User,
  Users,
  type LucideIcon
} from 'lucide-react'

import {
  LifePathIcon,
  PinnacleIcon,
  YearStarIcon
} from '@/components/ui/custom-tool-icons'
import { cn } from '@/lib/utils'

type ToolIconComponent = LucideIcon | ((props: { size?: number; strokeWidth?: number }) => JSX.Element)

const KEY_ICONS: Record<string, ToolIconComponent> = {
  // calculadoras / herramientas con slug "antiguo" (sin guiones)
  calculatupinaculo: Pyramid,
  anopersonal: CalendarDays,
  mespersonal: CalendarRange,
  semanapersonal: CalendarClock,
  diapersonal: Sun,
  etapapersonal: Hourglass,
  labrujulanumerologica: Compass,
  vibracionescolectivas: Globe,
  numerodelnombre: Signature,
  numerodelalma: Heart,
  numerodeexpresiondelalma: Eye,
  nombreactivo: User,
  nombrehereditario: TreeDeciduous,
  numerodelamadurez: Sprout,
  significadodelosnumeros: Hash,
  significadodeletras: Languages,
  numerologianombre: Signature,
  vibraciondeltiempo: Hourglass,
  revisatuhoroscopomensual2026: MoonStar,
  horoscopos: MoonStar,

  // URLs reales usadas por el blog / herramientas
  'camino-de-vida': Route,
  'mi-camino-de-vida': LifePathIcon,
  'mi-mapa': MapIcon,
  'mi-carta': Bookmark,
  'numerologia-de-pareja': HeartHandshake,
  'como-se-relacionan-los-numeros-en-pareja': HeartHandshake,
  compatibilidad: HeartHandshake,
  pinaculo: PinnacleIcon,
  'ano-personal': YearStarIcon,
  'ano-personal-que-es-y-como-se-calcula': CalendarDays,
  '2026-ano-universal-1': Globe,
  'mes-personal': CalendarRange,
  'semana-personal-ok': CalendarClock,
  'semana-personal': CalendarClock,
  'dia-personal': Sun,
  'etapa-personal': Hourglass,
  'la-brujula-numerologica': Compass,
  'vibraciones-colectivas': Globe,
  'significado-de-tu-nombre': Signature,
  'significado-los-numeros': Hash,
  'significado-significado-de-letras': Languages,
  'significado-de-letras': Languages,
  'significado-numero-del-alma': Heart,
  'como-calcular-el-numero-del-alma': Heart,
  'significado-numero-de-expresion': Sparkles,
  'significado-numero-la-madurez': Sprout,
  'numero-personal-tu-esencia': Sparkles,
  'horoscopo-personal-2027': MoonStar,
  'horoscopo-mensual-2027': MoonStar,

  explora: Telescope,
  expresion: Sparkles,
  numerologia: Sparkles,
  cursos: GraduationCap,
  consultores: Users,
  instructores: Users
}

export function getToolIcon(href: string): ToolIconComponent {
  if (/^https?:/.test(href)) return GraduationCap
  if (href.startsWith('/blog')) return BookOpen
  const segments = href.replace(/^\//, '').split('/')
  const key = segments[0] === 'calculadoras' ? segments[1] ?? '' : segments[0] ?? ''
  return KEY_ICONS[key] ?? ArrowUpRight
}

type ToolIconTileProps = {
  href: string
  className?: string
  size?: number
}

export function ToolIconTile({ href, className, size = 22 }: ToolIconTileProps) {
  const Icon = getToolIcon(href)
  return (
    <span
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition duration-200 group-hover:bg-gradient-brand group-hover:text-white',
        className
      )}
    >
      <Icon size={size} strokeWidth={1.75} aria-hidden />
    </span>
  )
}
