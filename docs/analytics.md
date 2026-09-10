# Analytics — Numerología Cotidiana

Este documento describe cómo está instrumentado GA4 en el sitio, qué eventos se envían y cómo definir las audiencias clave para remarketing y reportes.

## Estado actual

- **Plataforma**: Google Analytics 4 únicamente (por ahora).
- **Measurement ID**: `G-42049MCJ59` (variable `NEXT_PUBLIC_GA4_MEASUREMENT_ID`).
- **Consent Mode**: v2 activo. Estados por defecto: `denied` para storage de anuncios y analytics; `granted` solo cuando el visitante acepta en el banner. Cookie de consentimiento: `nume_consent` (180 días).
- **Cross-domain**: la tienda (`tienda-nume-chi.vercel.app`) es un sitio separado. Aquí solo se trackea el click saliente (`outbound_click` + `select_promotion`). Para atribuir compras a este sitio hay que:
  1. Instalar el mismo `G-42049MCJ59` en el repo de la tienda.
  2. En GA4 → Admin → Data Streams → Configure your domains → agregar `numerologia-cotidiana.com` y `tienda-nume-chi.vercel.app`.

## Arquitectura de código

```
lib/analytics/
├── index.ts         # export barrel + mapa CALCULATOR_LABEL
├── events.ts        # tipos AnalyticsEventMap (contrato único)
├── consent.ts       # Consent Mode v2 + cookie de consentimiento
├── gtag.ts          # wrapper de gtag: track(), pageView(), setUserId(), hashInput()
└── calculator.ts    # helpers para calculadoras (useCalculatorView, trackCalculatorSubmit, ...)

components/analytics/
├── google-analytics.tsx   # <Script> gtag + consent defaults denied
├── route-tracker.tsx      # page_view manual en cada navegación App Router
├── consent-banner.tsx     # banner de cookies + update de consent
└── outbound-link.tsx      # <a> con tracking de outbound_click + select_promotion
```

## Catálogo de eventos

### Navegación
- `page_view` — automático en cada cambio de ruta (RouteTracker).

### Calculadoras (15 en total)
- `calculator_view` — al montar el componente.
- `calculator_submit` — al pulsar Calcular. Incluye: `calculator_id`, `calculator_name`, `input_date` (YYYY-MM-DD), `input_year`, `input_month`, `input_day`, `has_name_input`, `input_name_hash`.
- `calculator_result_view` — cuando aparece el resultado.
- `calculator_result_save` — cuando el usuario guarda el resultado en "Mi carta".

**IDs de calculadora**: life-path, expression, soul-urge, personality, maturity, pinnacle, challenges, compatibility, personal-year, personal-month, personal-week, personal-day, personal-stage, name-number, active-name, hereditary-name, numerological-map, personal-compass, collective-vibrations, annual-horoscope, couple-numerology, letter-meaning, number-meaning.

### Autenticación
- `login` — con `method` (password/google/facebook).
- `sign_up` — pendiente (la ruta `/registro` aún no está implementada).

### Membresías
- `view_membership` — al ver el listado de planes (uno por plan).
- `select_plan` — al pulsar "Elegir plan".
- `begin_subscription` — cuando se dispara el checkout de Stripe.
- `subscribe` — en la página `/membresias/success`, deduplicado por `session_id`. Es la conversión.

### Outbound / tienda externa
- `outbound_click` — click a la tienda. Payload: `link_url`, `link_domain`, `link_text`.
- `select_promotion` — mismo click con contexto de creativo: `promotion_id`, `promotion_name`, `creative_slot`, `location_id`.

### Ecommerce (para el repo de la tienda, no aquí)
Contrato ya tipado en `lib/analytics/events.ts` para cuando lo instrumentes en el otro repo:
`view_item_list`, `view_item`, `select_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`.

## Audiencias recomendadas en GA4

Todas se crean en **GA4 → Admin → Audiences → New audience**.

### 1. "Usó calculadora pero no guardó resultado"
- **Uso**: retargeting con anuncio de "guarda tu carta numerológica" o suscripción a membresía.
- **Include**: users que dispararon `calculator_submit` en los últimos 30 días.
- **Exclude**: users que dispararon `calculator_result_save` en los últimos 30 días.
- **Membership duration**: 30 días.

### 2. "Vio membresía sin suscribirse"
- **Uso**: campaña de descuento para conversión.
- **Include**: `view_membership` o `select_plan` en los últimos 60 días.
- **Exclude**: `subscribe` en los últimos 60 días.
- **Membership duration**: 60 días.

### 3. "Abandono de checkout de membresía"
- **Uso**: recordatorio con urgencia.
- **Include**: `begin_subscription` en los últimos 14 días.
- **Exclude**: `subscribe` en los últimos 14 días.
- **Membership duration**: 14 días.

### 4. "Cumpleaños del mes" (la joya)
- **Uso**: mailing/anuncio con contenido personalizado del mes personal correspondiente.
- **Cómo**: crea 12 audiencias, una por mes, con:
  - Condición: `calculator_submit` con parámetro `input_month = 1` (enero), 2 (febrero), etc.
  - Scope: any point in time (últimos 365 días).
- **Alternativa más eficiente**: registra el parámetro `input_month` como **Custom dimension** (Admin → Custom definitions → Create custom dimension → user-scoped, param name `input_month`), luego crea un solo report por mes.

### 5. "Compradores de membresía últimos 90 días" (para LAL en Ads)
- **Include**: `subscribe` en los últimos 90 días.
- **Membership duration**: 540 días (máx GA4).
- **Uso**: exportar a Google Ads para Lookalike / audiencias similares.

### 6. "Interés por horóscopo mensual"
- **Include**: `page_view` con `page_path` conteniendo `/mespersonal` o `/revisatuhoroscopomensual` o `calculator_view` con `calculator_id = 'annual-horoscope'` o `'personal-month'`.
- **Membership duration**: 60 días.
- **Uso**: campaña de horóscopo del próximo mes.

### 7. "Interesado en tienda pero no clickeó"
- **Include**: sessions donde `page_view` con `page_path` = `/` (home) o `/cursos`.
- **Exclude**: `outbound_click` con `link_domain` = `tienda-nume-chi.vercel.app`.
- **Uso**: banner de descuento en tienda.

## Reportes clave que debes crear

### Reporte 1 — "Fechas más consultadas por calculadora"
En GA4 → **Explore → Free form**:
- **Rows**: `calculator_name`, `input_month`, `input_day`.
- **Values**: Event count (filtrado a `calculator_submit`).
- Ordena por Event count descendente.
- **Requiere** registrar `input_month` e `input_day` como custom dimensions (Admin → Custom definitions).

### Reporte 2 — "Funnel de conversión de membresía"
GA4 → **Explore → Funnel exploration**:
1. `view_membership`
2. `select_plan`
3. `begin_subscription`
4. `subscribe`

### Reporte 3 — "Outbound a tienda por creativo"
GA4 → **Explore → Free form**:
- **Rows**: `promotion_id`, `promotion_name`.
- **Values**: Event count filtrado a `select_promotion`.

## Custom dimensions a registrar en GA4

**Admin → Custom definitions → Create custom dimension** (todas event-scoped salvo user_id que es user-scoped):

| Param name | Display name | Scope |
|---|---|---|
| `calculator_id` | Calculator ID | Event |
| `calculator_name` | Calculator Name | Event |
| `input_month` | Input Month | Event |
| `input_day` | Input Day | Event |
| `input_year` | Input Year | Event |
| `input_date` | Input Date | Event |
| `membership_id` | Membership ID | Event |
| `membership_name` | Membership Name | Event |
| `promotion_id` | Promotion ID | Event |
| `promotion_name` | Promotion Name | Event |
| `creative_slot` | Creative Slot | Event |
| `link_domain` | Link Domain | Event |
| `method` | Auth Method | Event |

Sin registrarlas, aparecen en Realtime pero no en los reportes ni exploraciones.

## Conversiones a marcar

**Admin → Events → Marca como conversión**:
- `subscribe` (conversión principal)
- `calculator_result_save` (micro-conversión de engagement)
- `outbound_click` **filtrado por** `link_domain = tienda-nume-chi.vercel.app` (crea Event modificado si es necesario).

## Cómo probar que funciona

1. Con `NEXT_PUBLIC_GA4_MEASUREMENT_ID` en `.env`, corre `npm run dev`.
2. Abre el sitio y **acepta** el banner de cookies.
3. En una pestaña separada abre GA4 → **Reports → Realtime**.
4. Haz submit en una calculadora → deberías ver `calculator_submit` en tiempo real con `input_date`.
5. Con la extensión **GA Debugger** de Chrome puedes ver todos los parámetros que se envían.

## Pendientes / mejoras futuras

- Sumar Meta Pixel y TikTok Pixel (contrato ya tipado en `events.ts`, la capa `track()` los soportará agregando dispatchers en `gtag.ts`).
- Instrumentar eventos server-side vía Measurement Protocol para deduplicación con Ads y para eventos de webhooks (p.ej. la confirmación real de suscripción de Stripe).
- Registro (`/registro`) sin instrumentar porque la página aún no tiene formulario.
- La tienda externa (`tienda-nume-chi.vercel.app`) necesita instrumentación completa de ecommerce (ver contrato en `events.ts`).
