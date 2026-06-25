type PageBannerWidgetProps = {
  eyebrow?: string
  title: string
  description?: string
  imageSrc: string
}

export function PageBannerWidget({
  eyebrow,
  title,
  description,
  imageSrc
}: PageBannerWidgetProps) {
  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-border/80 bg-card shadow-panel">
      <div
        className="relative min-h-[17rem] bg-cover bg-center px-6 py-10 sm:min-h-[20rem] sm:px-8 md:px-10"
        style={{
          backgroundImage: `linear-gradient(105deg, hsl(var(--foreground) / 0.78), hsl(var(--primary) / 0.45), hsl(var(--fuchsia) / 0.34)), url('${imageSrc}')`
        }}
      >
        <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end text-white">
          {eyebrow ? (
            <span className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/88 backdrop-blur">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
