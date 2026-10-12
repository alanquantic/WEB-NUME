#!/usr/bin/env node
// Genera lib/seo/redirects.generated.json a partir de docs/seo/mapa-urls.csv
// (mapa de las URLs del WordPress original → acción en el sitio nuevo).
//
//   301            URL vieja duplicada/etiqueta con clics → otra URL vieja canónica
//   410            etiqueta sin tráfico → Gone
//   RENOMBRAR_RUTA ruta del sitio nuevo (p.ej. /diapersonal) → su URL vieja
//
// El resto de acciones (YA_COINCIDE, PAGINA_CREADA, POST_EN_RAIZ…) se sirven
// directamente en su URL vieja y no necesitan redirect.
//
// Las claves van sin barra final (el middleware normaliza antes de buscar) y
// los destinos internos con barra final, igual que el WordPress original.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSV_PATH = resolve(__dirname, '../../docs/seo/mapa-urls.csv')
const OUT = resolve(__dirname, '../../lib/seo/redirects.generated.json')

function parseCsvLine(line) {
  const fields = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
    } else if (ch === ',') {
      fields.push(field)
      field = ''
    } else if (ch === '"' && field === '') {
      inQuotes = true
    } else {
      field += ch
    }
  }
  fields.push(field)
  return fields
}

const key = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path)
const destination = (path) =>
  /^https?:\/\//.test(path) || path.endsWith('/') ? path : `${path}/`

const lines = readFileSync(CSV_PATH, 'utf8').split(/\r?\n/).filter(Boolean)
const header = parseCsvLine(lines.shift())
const COL = Object.fromEntries(header.map((name, i) => [name, i]))

const redirects = {}
const gone = []
const counts = { redirect: 0, renombrar: 0, gone: 0 }

for (const line of lines) {
  const row = parseCsvLine(line)
  const oldUrl = row[COL.url_vieja]
  const accion = row[COL.accion]
  const nueva = row[COL.pagina_nueva_que_la_sirve]

  if (accion === '301' && nueva) {
    redirects[key(oldUrl)] = destination(nueva)
    counts.redirect++
  } else if (accion === '410') {
    gone.push(key(oldUrl))
    counts.gone++
  } else if (accion === 'RENOMBRAR_RUTA' && nueva && key(nueva) !== key(oldUrl)) {
    redirects[key(nueva)] = destination(oldUrl)
    counts.renombrar++
  }
}

// Evitar cadenas: si un destino también redirige, apuntar directo al final.
for (const [from, to] of Object.entries(redirects)) {
  let target = to
  for (let hops = 0; hops < 5 && redirects[key(target)]; hops++) target = redirects[key(target)]
  redirects[from] = target
}

writeFileSync(
  OUT,
  JSON.stringify({ generatedAt: new Date().toISOString(), counts, redirects, gone: gone.sort() }, null, 2) + '\n'
)
console.log(`wrote ${Object.keys(redirects).length} redirects + ${gone.length} gone -> ${OUT}`, counts)
