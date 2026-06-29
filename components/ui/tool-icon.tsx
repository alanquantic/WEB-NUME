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

import { cn } from '@/lib/utils'

const KEY_ICONS: Record<string, LucideIcon> = {
  'camino-de-vida': Route,
  expresion: Sparkles,
  compatibilidad: HeartHandshake,
  'numerologia-de-pareja': HeartHandshake,
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
  explora: Telescope,
  'mi-carta': Bookmark,
  numerologia: Sparkles,
  vibraciondeltiempo: Hourglass,
  numerologianombre: Signature,
  horoscopos: MoonStar,
  revisatuhoroscopomensual2026: MoonStar,
  cursos: GraduationCap,
  consultores: Users,
  instructores: Users
}

export function getToolIcon(href: string): LucideIcon {
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
