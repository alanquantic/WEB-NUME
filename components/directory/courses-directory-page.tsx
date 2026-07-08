import Link from 'next/link'

import { STORE_URL } from '@/lib/site-config'

const courseLinks = [
  {
    href: STORE_URL,
    title: 'Ver cursos en la tienda',
    description: 'Explora especializaciones, certificaciones y programas disponibles.',
    external: true
  },
  {
    href: '/membresias',
    title: 'Membresías',
    description: 'Accede a contenido premium, comunidad y recursos exclusivos.',
    external: false
  }
] as const

export function CoursesDirectoryPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#fff8ee_0%,#f7ecdd_28%,#fbf4e8_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <section
          className="overflow-hidden rounded-[2.6rem] border border-[#e7d1b9] bg-[#693061] shadow-[0_28px_70px_rgba(105,48,97,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(105,48,97,0.18), rgba(105,48,97,0.28)), url('/images/directory-hero-banner.png')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="flex min-h-[320px] items-center justify-center px-8 py-16 text-center md:min-h-[400px] md:px-12 md:py-20">
            <div className="max-w-3xl rounded-[2rem] bg-white/96 px-8 py-8 shadow-[0_20px_55px_rgba(105,48,97,0.18)] backdrop-blur-sm md:px-12 md:py-10">
              <h1 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
                Consultores e Instructores Numerológicos
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-consultor-certificado.png"
                  alt="Consultor Certificado"
                  className="h-16 w-auto object-contain md:h-20"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-instructor-certificado.png"
                  alt="Instructor Certificado"
                  className="h-16 w-auto object-contain md:h-20"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2.2rem] border border-[#e7d1b9] bg-white shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/directory-group-268.png"
            alt="Consultores e instructores numerológicos"
            className="h-auto w-full object-cover"
          />
        </section>

        <section className="mt-8 rounded-[2.2rem] border border-[#e7d1b9] bg-[#f2f2f2] p-6 shadow-[0_18px_40px_rgba(105,48,97,0.08)] md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold text-[#693061] md:text-4xl">
              Cursos y certificaciones
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6d5b56]">
              Aprende numerología paso a paso o profundiza en una certificación profesional
              con la misma línea visual del directorio.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {courseLinks.map((link) => {
              const className =
                'group flex h-full flex-col rounded-[2rem] border border-[#f0ddbb] bg-[#fff2d2] p-7 shadow-[0_16px_40px_rgba(105,48,97,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(105,48,97,0.18)]'

              const content = (
                <>
                  <div className="inline-flex h-12 items-center justify-center self-start rounded-full bg-white px-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#693061]">
                    {link.external ? 'Tienda' : 'Acceso'}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#693061]">
                    {link.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-[#6d5b56]">
                    {link.description}
                  </p>
                  <span className="mt-6 inline-flex min-h-11 items-center justify-center self-start rounded-full bg-gradient-to-b from-[#dea924] to-[#b38a25] px-6 text-base font-semibold text-white shadow-[0_8px_22px_rgba(179,138,37,0.45)] transition group-hover:scale-[1.02]">
                    {link.external ? 'Visitar' : 'Abrir'}
                  </span>
                </>
              )

              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>
                  {content}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
