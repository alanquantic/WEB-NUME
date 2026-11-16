import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'

import type * as TS from 'typescript'
import { describe, expect, it } from 'vitest'

// Se carga con require para que Vite no intente transformar el compilador.
const ts: typeof TS = createRequire(import.meta.url)('typescript')

// El navegador reacomoda el HTML mal anidado al leerlo (por ejemplo, cierra un
// <p> en cuanto encuentra otro <p> o un <div> dentro). El resultado ya no
// coincide con lo que React espera y la página falla al hidratarse (errores
// #418 y #423). Esta prueba revisa el JSX escrito a mano; no ve lo que un
// componente dibuja por dentro ni el HTML que llega como texto.

// Etiquetas que cierran un <p> abierto.
const CIERRAN_P = new Set([
  'address', 'article', 'aside', 'blockquote', 'details', 'dialog', 'div', 'dl',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section',
  'table', 'ul'
])
// Dentro de estas, un <p> exterior deja de contar.
const AISLAN = new Set(['button', 'td', 'th', 'caption'])
// Componentes que dibujan una etiqueta conocida.
const COMPONENTES: Record<string, string> = { Link: 'a' }
const ES_TITULO = /^h[1-6]$/

function etiquetaDe(nombre: string): string | null {
  if (COMPONENTES[nombre]) return COMPONENTES[nombre]
  return /^[a-z]/.test(nombre) ? nombre : null
}

function dentroDeP(pila: string[]): boolean {
  for (let i = pila.length - 1; i >= 0; i--) {
    if (pila[i] === 'p') return true
    if (AISLAN.has(pila[i])) return false
  }
  return false
}

function motivo(etiqueta: string, pila: string[]): string | null {
  const padre = pila[pila.length - 1]
  if (CIERRAN_P.has(etiqueta) && dentroDeP(pila)) return `<${etiqueta}> dentro de <p>`
  if (etiqueta === 'a' && pila.includes('a')) return 'enlace dentro de otro enlace'
  if (etiqueta === 'button' && pila.includes('button')) return '<button> dentro de <button>'
  if (etiqueta === 'form' && pila.includes('form')) return '<form> dentro de <form>'
  if (etiqueta === 'tr' && padre === 'table') return '<tr> directo en <table>, falta <tbody>'
  if (etiqueta === 'li' && padre === 'li') return '<li> directo en <li>'
  if (ES_TITULO.test(etiqueta) && padre && ES_TITULO.test(padre)) return `<${etiqueta}> dentro de <${padre}>`
  return null
}

export function htmlMalAnidado(codigo: string, archivo: string): string[] {
  const fuente = ts.createSourceFile(archivo, codigo, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const hallazgos: string[] = []

  function revisar(nodo: TS.Node, pila: string[]): string | null {
    const nombre = ts.isJsxElement(nodo)
      ? nodo.openingElement.tagName.getText(fuente)
      : ts.isJsxSelfClosingElement(nodo)
        ? nodo.tagName.getText(fuente)
        : null
    const etiqueta = nombre ? etiquetaDe(nombre) : null
    if (!etiqueta) return null
    const problema = motivo(etiqueta, pila)
    if (problema) {
      const { line } = fuente.getLineAndCharacterOfPosition(nodo.getStart(fuente))
      hallazgos.push(`${archivo}:${line + 1} ${problema}`)
    }
    return etiqueta
  }

  function recorrer(nodo: TS.Node, pila: string[]) {
    // Lo que va en un atributo no es contenido de la etiqueta.
    if (ts.isJsxAttribute(nodo)) {
      ts.forEachChild(nodo, (hijo) => recorrer(hijo, []))
      return
    }
    const etiqueta = revisar(nodo, pila)
    const siguiente = etiqueta ? [...pila, etiqueta] : pila
    ts.forEachChild(nodo, (hijo) => recorrer(hijo, siguiente))
  }

  recorrer(fuente, [])
  return hallazgos
}

function archivosTsx(carpeta: string): string[] {
  return readdirSync(carpeta, { withFileTypes: true }).flatMap((entrada) => {
    const ruta = join(carpeta, entrada.name)
    if (entrada.isDirectory()) return archivosTsx(ruta)
    return entrada.name.endsWith('.tsx') ? [ruta] : []
  })
}

describe('HTML mal anidado en JSX', () => {
  it('reconoce los casos que el navegador reacomoda', () => {
    const caso = (jsx: string) => htmlMalAnidado(`const x = ${jsx}`, 'caso.tsx')
    expect(caso('<p className="a"><p>texto</p></p>')).toEqual(['caso.tsx:1 <p> dentro de <p>'])
    expect(caso('<p>{ok ? <div>texto</div> : null}</p>')).toHaveLength(1)
    expect(caso('<Link href="/a"><a href="/b">texto</a></Link>')).toHaveLength(1)
    expect(caso('<table><tr><td>1</td></tr></table>')).toHaveLength(1)
  })

  it('no marca el anidado válido', () => {
    const caso = (jsx: string) => htmlMalAnidado(`const x = ${jsx}`, 'caso.tsx')
    expect(caso('<div><p>uno</p><p>dos <strong>tres</strong></p></div>')).toEqual([])
    expect(caso('<p><Tooltip contenido={<div>texto</div>}>uno</Tooltip></p>')).toEqual([])
    expect(caso('<table><tbody><tr><td><p>1</p></td></tr></tbody></table>')).toEqual([])
  })

  it('ninguna página ni componente lo tiene', () => {
    const hallazgos = ['app', 'components'].flatMap((carpeta) =>
      archivosTsx(carpeta).flatMap((archivo) => htmlMalAnidado(readFileSync(archivo, 'utf8'), archivo))
    )
    expect(hallazgos).toEqual([])
  })
})
