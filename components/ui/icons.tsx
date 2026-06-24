import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps) {
  return {
    viewBox: '0 0 24 24',
    width: 20,
    height: 20,
    'aria-hidden': true,
    ...props
  }
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 7h16" strokeLinecap="round" />
      <path d="M4 12h16" strokeLinecap="round" />
      <path d="M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 2 12a31 31 0 0 0 .1 3.8 3 3 0 0 0 2.1 2.1c1.9.6 7.8.6 7.8.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0 0-3.8ZM10 15V9l5 3-5 3Z" />
    </svg>
  )
}

export function TiktokIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M16 3c.3 2 1.5 3.6 3.5 4v2.3c-1.3 0-2.5-.4-3.5-1v5.7a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.4a3 3 0 1 0 2.1 2.9V3H16Z" />
    </svg>
  )
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5 13.4c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-1.6-.1-1.4-.4-2.6-1.2-3.7-2.4-.8-.9-1.3-1.8-1.4-2.6 0-.5.1-1.1.5-1.5.2-.2.4-.3.6-.3h.5c.2 0 .3.3.4.5l.5 1.2c0 .2 0 .3-.1.4l-.4.4c-.1.1-.2.3-.1.5.3.7 1.4 1.8 2.2 2.1.2.1.4.1.5-.1l.5-.6c.1-.2.3-.2.5-.1l1.2.6c.2.1.4.2.4.3 0 .2 0 .4-.1.5Z" />
    </svg>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M21.5 4.3 2.9 11.5c-.9.3-.9 1.5 0 1.8l4.6 1.4 1.8 5.5c.2.6 1 .7 1.4.2l2.5-2.6 4.6 3.4c.6.4 1.4.1 1.6-.6l3-14.4c.2-.9-.6-1.6-1.4-1.3Zm-3.6 3.3-7 6.2c-.2.2-.3.4-.3.7l-.3 2.5-1.3-4 8.6-5.6c.4-.2.7.2.3.2Z" />
    </svg>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M6.5 8A1.5 1.5 0 1 0 5 6.5 1.5 1.5 0 0 0 6.5 8ZM5.5 10h2v8h-2v-8Zm5 0h1.9v1.1c.4-.7 1.3-1.3 2.4-1.3 2 0 2.7 1.2 2.7 3.2V18h-2v-4.2c0-1-.4-1.6-1.3-1.6s-1.4.6-1.4 1.6V18h-2v-8Z" />
    </svg>
  )
}
