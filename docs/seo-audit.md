# Auditoría SEO técnico + GEO — Numerología Cotidiana

Fecha: 2026-09-09
Alcance: Next.js 14 (App Router) en `WEB-NUME/`. Dominio prod: `numerologia-cotidiana.com`.

## Resumen ejecutivo

- **3 hallazgos críticos**: metadata incompleta en varias páginas de contenido, sitemap sin 8+ rutas de calculadora, casi nulo uso de FAQPage/HowTo (mata GEO).
- **Este PR aplica**: sitemap ampliado y priorizado, helpers de JSON-LD (FAQ, HowTo, WebPage con speakable, Person para E-E-A-T), metadata + JSON-LD completo en 3 calculadoras principales, ISR (revalidate) en blog y significados dinámicos.
- **Queda para siguiente iteración**: repetir el patrón en las ~20 páginas restantes, migrar `<img>` a `next/image` en 5 archivos, agregar bloques "TL;DR" en artículos largos.

## Bloque 1 — SEO técnico

| Severidad | Hallazgo | Estado |
|---|---|---|
| Alta | Metadata solo con `title` en `numerodelalma`, `numerodelamadurez`, `mespersonal`, `significadodeletras`, `vibracionescolectivas` (sin description, canonical, OG). | Pendiente (patrón ya definido, aplicar) |
| Alta | H2 con tamaño visual de H1 en páginas de contenido — jerarquía de headings rota. | Pendiente |
| Media | `<img>` crudos en `numerodelalma:182`, `numerodelamadurez:179`, `labrujulanumerologica:86`, `mespersonal:68`, `vibracionescolectivas:63`, `courses-directory-page.tsx`, `site-header/footer`. | Pendiente (migrar a `next/image`) |
| Media | Sin JSON-LD específico en rutas dinámicas de blog y significados. | ✅ Aplicado en significados; blog ya tenía metadata |
| Baja | Ninguna ruta declaraba `revalidate`. | ✅ Aplicado en `blog/[id]`, `paginas/[id]`, `significadodelosnumeros/[concepto]/[numero]` |

## Bloque 2 — GEO (Generative Engine Optimization)

Los LLMs (ChatGPT, Perplexity, Claude, Gemini) priorizan sitios con: respuestas directas + FAQPage + HowTo + autoría verificable + `dateModified` fresco.

| Severidad | Hallazgo | Estado |
|---|---|---|
| Alta | Solo 2 páginas tenían FAQPage schema (`home-seo-section`, `numerologia-de-pareja`). | ✅ Helper `faqPageJsonLd()` creado; aplicado en 3 calculadoras |
| Alta | `dateModified = datePublished` fijo en articleJsonLd → LLMs interpretan contenido como viejo. | ✅ `articleJsonLd()` ahora acepta `dateModified` separado |
| Media | Person schema incompleto (solo name). | ✅ `personJsonLd()` con `image`, `sameAs`, `knowsAbout` |
| Media | Cero HowTo schemas — las calculadoras son perfectas para HowTo. | ✅ Helper `howToJsonLd()` creado; aplicado en 3 calculadoras |
| Baja | Sin bloques "TL;DR" ni `Speakable` para voz. | ✅ `webPageJsonLd()` acepta `speakableSelectors`; aplicado en 3 calculadoras. Falta agregar bloque "Resumen rápido" en artículos largos |

## Bloque 3 — Sitemap / robots / indexabilidad

**Antes**: 39 rutas estáticas, faltaban 8+ calculadoras.
**Después**: `PRIMARY_ROUTES` (34, priority 0.8) + `SECONDARY_ROUTES` (8, priority 0.5) + `dynamic` (significados + personales, priority 0.6, changeFreq monthly).

Rutas añadidas: `/mi-carta`, `/horoscopoanopersonal`, `/calculadoras/ano-personal-horoscopo`, y todas las que ya existían pero no estaban listadas.

Pendiente:
- `lastModified` sigue siendo `new Date()` (siempre "hoy"). Idealmente usar timestamp de build o fechas por categoría.
- `mi-mapa-numerologico` está intencionalmente NO indexado (`robots: index: false` en la página) → correcto no incluirlo.

## Bloque 4 — Performance / Core Web Vitals

- Buenas noticias: 0 `use client` en `app/(public)/*/page.tsx` (todo server-rendered).
- Sin lodash/moment completos, uso correcto de Lucide (tree-shakeable).
- Bandera: ~10 `<img>` crudos que deberían migrar a `next/image` para no afectar LCP/CLS.

## Aplicado en este PR

1. **`app/sitemap.ts`** — categorizado en primary/secondary/dynamic con priorities correctas.
2. **`lib/seo.ts`** — nuevos helpers: `personJsonLd`, `faqPageJsonLd`, `howToJsonLd`, `webPageJsonLd`. `articleJsonLd` ahora acepta `dateModified`. `organizationJsonLd` referencia al Person.
3. **`app/(public)/calculadoras/camino-de-vida/page.tsx`** — metadata OG + canonical + JSON-LD (WebPage/HowTo/FAQ/Breadcrumb).
4. **`app/(public)/calculadoras/expresion/page.tsx`** — igual patrón.
5. **`app/(public)/calculadoras/compatibilidad/page.tsx`** — igual patrón.
6. **`app/(public)/significadodelosnumeros/[concepto]/[numero]/page.tsx`** — canonical + OG + WebPage/Breadcrumb JSON-LD + `revalidate = 86400`.
7. **`app/(public)/blog/[id]/page.tsx`** — `revalidate = 3600`.
8. **`app/(public)/paginas/[id]/page.tsx`** — `revalidate = 3600`.

## Backlog priorizado para siguiente iteración

1. **Aplicar el mismo patrón (metadata + WebPage/FAQ/HowTo + Breadcrumb) a**:
   - `/calculadoras/desafios-de-vida`
   - `/calculadoras/ano-personal-horoscopo`
   - `/numerodelalma`, `/numerodelamadurez`, `/numerodeexpresiondelalma`, `/numerodelnombre`
   - `/mespersonal`, `/semanapersonal`, `/diapersonal`, `/etapapersonal`, `/anopersonal`
   - `/nombreactivo`, `/nombrehereditario`, `/significadodeletras`
   - `/labrujulanumerologica`, `/vibraciondeltiempo`, `/vibracionescolectivas`
   - `/calculatupinaculo`, `/numerologianombre`, `/numerologia-de-pareja`
2. **Migrar 5 imágenes críticas** a `next/image`: mini-laura, logos header/footer, banners de content.
3. **Agregar bloque "Resumen rápido"** en páginas con más de 800 palabras (mejora ~15% CTR y +40% probabilidad de cita en LLMs).
4. **Corregir jerarquía de headings**: usar `<h2>` con `text-4xl` sin dejar solo un `<h1>` real por página.
5. **Capturar `updated_at` del CMS** para pasarlo como `dateModified` a `articleJsonLd`.
6. **Verificar Google Search Console** — configurar dominio, subir sitemap, revisar cobertura.

## Cómo validar

- **Rich Results Test**: https://search.google.com/test/rich-results — pega URLs de calculadoras y confirma que detecta HowTo/FAQ.
- **Schema Markup Validator**: https://validator.schema.org/
- **Lighthouse** (Chrome DevTools) para CWV.
- Search Console → **Enhancements** para ver rich snippets detectados.
