export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escapa "<" para que ningún valor (p. ej. un título con HTML proveniente del
  // API) pueda cerrar el <script> e inyectar marcado en la página.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
