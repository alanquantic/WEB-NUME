#!/usr/bin/env node
// Genera lib/seo/redirects.generated.json a partir de url-audit.csv.
// Fuente: ../../../url-audit.csv (root del monorepo numeVercel).
// Incluye:
//   - manual_redirect_candidate (cambios de slug/estructura, orden fijo)
//   - api_post_slug_match no-tag (posts migrados: /slug -> /blog/slug)
//   - /tag/* -> /busqueda?q=<texto con espacios> (puente hasta revisar con GSC)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSV_PATH = resolve(__dirname, '../../../url-audit.csv')
const MANUAL_OUT = resolve(__dirname, '../../lib/seo/redirects.manual.generated.json')
const BULK_OUT = resolve(__dirname, '../../lib/seo/redirects.bulk.generated.json')

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

const raw = readFileSync(CSV_PATH, 'utf8')
const lines = raw.split(/\r?\n/).filter(Boolean)
const header = parseCsvLine(lines.shift())
const COL = Object.fromEntries(header.map((name, i) => [name, i]))

const manual = []
const blog = []
const tags = []
const seen = new Set()
const tagSeen = new Set()

for (const line of lines) {
  const row = parseCsvLine(line)
  const matchType = row[COL.match_type]
  const source = row[COL.old_path]
  const destination = row[COL.recommended_new_path]
  if (!source) continue

  if (source.startsWith('/tag/')) {
    const tagSlug = source.slice('/tag/'.length).replace(/\/$/, '')
    if (!tagSlug || tagSeen.has(tagSlug)) continue
    tagSeen.add(tagSlug)
    // Next.js decodes %20 a espacio literal al emitir Location, lo que rompe
    // la validez del header. Usamos '+' (form-urlencoded) que preserva el
    // espacio y lo entiende el formulario de /busqueda al parsear la query.
    const query = tagSlug.replace(/-/g, '+')
    tags.push({
      source: `/tag/${tagSlug}`,
      destination: `/busqueda?q=${query}`,
      statusCode: 301
    })
    continue
  }

  if (!destination || source === destination) continue
  if (seen.has(source)) continue

  if (matchType === 'manual_redirect_candidate') {
    seen.add(source)
    manual.push({ source, destination, statusCode: 301 })
  } else if (matchType === 'api_post_slug_match') {
    seen.add(source)
    blog.push({ source, destination, statusCode: 301 })
  }
}

const generatedAt = new Date().toISOString()

// Manual: pocos, no triggerean el warning de Next (<=1000 custom routes).
const manualPayload = {
  generatedAt,
  counts: { manual: manual.length },
  redirects: manual
}

// Bulk: lookup O(1) desde el middleware. Mapa plano source->destination.
const bulkRedirects = {}
for (const { source, destination } of [...blog, ...tags]) {
  bulkRedirects[source] = destination
}
const bulkPayload = {
  generatedAt,
  counts: { blog: blog.length, tags: tags.length, total: blog.length + tags.length },
  redirects: bulkRedirects
}

mkdirSync(dirname(MANUAL_OUT), { recursive: true })
writeFileSync(MANUAL_OUT, JSON.stringify(manualPayload, null, 2) + '\n')
writeFileSync(BULK_OUT, JSON.stringify(bulkPayload, null, 2) + '\n')

console.log(
  `wrote ${manual.length} manual -> ${MANUAL_OUT}\nwrote ${blog.length + tags.length} bulk (${blog.length} blog + ${tags.length} tags) -> ${BULK_OUT}`
)
