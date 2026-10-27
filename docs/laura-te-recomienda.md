# "Laura te recomienda" — aviso flotante de productos

Guía para reutilizar en otros sitios el aviso flotante con mini Laura que
promociona productos de la tienda (`tienda.numerologia-cotidiana.com`).
Referencia: implementación de NUME (WEB Next.js 14 + API NestJS/Drizzle/Neon).

---

## 1. Qué hace

- Muestra en la esquina inferior derecha una tarjeta con mini Laura, la
  etiqueta **"Laura te recomienda"**, el **tipo de producto** (Reporte
  numerológico, Reporte con IA, Membresía, Agenda…), el nombre, el precio
  (con precio anterior tachado si hay oferta) y la imagen del producto.
- Al hacer click abre el producto en la tienda en una pestaña nueva.
- Aparece sola: el primer aviso entre 12 y 25 s después de entrar, los
  siguientes cada 45–90 s, y cada uno se oculta a los 9 s (se queda mientras
  el cursor está encima).
- Elige un producto activo al azar sin repetir el anterior.
- Si la persona cierra 3 avisos con la ✕ en la misma sesión, deja de
  mostrarse (contador en `sessionStorage`).
- No aparece en panel, login, registro ni flujos de contraseña/verificación.
- Un admin elige qué productos se muestran y su tipo desde
  `/perfil/productos-promo`, buscando directamente en la tienda.

```
Admin ──► WEB /api/store-products ──► Tienda /api/products/related   (buscar)
Admin ──► API POST/PATCH/DELETE /promo-products ──► tabla promo_products
Visitante ──► WEB /api/promo-products (cache 60 s) ──► API GET /promo-products?active_only=true
```

---

## 2. Piezas y archivos

### Backend (API)

| Pieza | Archivo en API NUME |
|---|---|
| Tabla | `database_promo_products_patch.sql` + `database_promo_products_type_patch.sql` |
| Esquema Drizzle | `src/database/schema.ts` → `promoProducts` |
| Validación (Zod) | `src/modules/promo-products/schemas/promo-products.schemas.ts` |
| Servicio | `src/modules/promo-products/promo-products.service.ts` |
| Controlador | `src/modules/promo-products/promo-products.controller.ts` |
| Módulo | `src/modules/promo-products/promo-products.module.ts` (registrado en `AppModule`) |

### Frontend (WEB)

| Pieza | Archivo en WEB NUME |
|---|---|
| Aviso flotante | `components/promo/promo-product-toast.tsx` (montado en `app/layout.tsx`) |
| Tipos, etiquetas, inferencia y formato de precio | `lib/api/promo-products.ts` |
| Llamadas del admin | `lib/api/promo-products.client.ts` |
| Lista pública cacheada | `app/api/promo-products/route.ts` |
| Buscador de la tienda (solo admin) | `app/api/store-products/route.ts` |
| Pantalla de admin | `app/(user)/perfil/productos-promo/page.tsx` + `components/admin/promo-products-manager.tsx` |
| Enlace en el menú del panel | `app/(user)/perfil/layout.tsx` (`/perfil/productos-promo`) |
| Imagen de Laura | `public/images/mini-laura.png` (PNG 261×281 con transparencia) |
| Helpers reutilizados | `lib/safe-url.ts` (`safeHref`), `lib/api/route-url.ts` (`apiRoute`), `lib/utils.ts` (`cn`) |

---

## 3. Base de datos

```sql
CREATE TABLE IF NOT EXISTS promo_products (
    id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    store_product_id  text NOT NULL,          -- id del producto en la tienda (único)
    slug              text NOT NULL,
    name              text NOT NULL,
    image_url         text,
    price             text,                   -- texto tal como lo da la tienda ("890.00")
    regular_price     text,                   -- precio antes de oferta, o NULL
    currency          text NOT NULL DEFAULT 'MXN',
    product_url       text NOT NULL,
    product_type      text,                   -- ver tipos abajo; NULL = se infiere
    is_active         boolean NOT NULL DEFAULT true,
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_promo_products_store_product ON promo_products (store_product_id);
CREATE INDEX IF NOT EXISTS idx_promo_products_active ON promo_products (is_active);
```

Los datos del producto son una **copia** de lo que devolvió la tienda al
agregarlo. Para refrescar precio/imagen/nombre, el admin pulsa "Actualizar"
(vuelve a hacer upsert por `store_product_id`, conservando el tipo elegido).

### Tipos de producto

| Valor | Etiqueta visible |
|---|---|
| `reporte` | Reporte numerológico |
| `reporte_ia` | Reporte con IA |
| `membresia` | Membresía |
| `agenda` | Agenda |
| `curso` | Curso / taller |
| `certificacion` | Certificación |
| `software` | Software |
| `otro` | *(no se muestra etiqueta)* |

Al agregar un producto, el tipo se preselecciona con
`inferPromoProductType(nombre, categoría de la tienda)`; el admin puede
cambiarlo en la lista. **La tienda no distingue los reportes con IA**
(aparecen como "Reportes Numerológicos"), así que esos hay que marcarlos a
mano como "Reporte con IA". Si un producto no tiene tipo guardado, el aviso lo
infiere por el nombre.

---

## 4. Endpoints

### API (prefijo `/api/v1`)

| Método | Ruta | Acceso | Uso |
|---|---|---|---|
| GET | `/promo-products?active_only=true` | público | Lista para el aviso |
| GET | `/promo-products` | público | Lista completa para el admin |
| POST | `/promo-products` | admin | Upsert por `store_product_id` |
| PATCH | `/promo-products/:id` | admin | `{ is_active?, product_type? }` |
| DELETE | `/promo-products/:id` | admin | Quitar (204) |

Body de POST:

```json
{
  "store_product_id": "…", "slug": "agenda-numerologica-2027",
  "name": "Agenda Numerológica 2027 Preventa",
  "image_url": "https://…", "price": "890.00", "regular_price": null,
  "currency": "MXN",
  "product_url": "https://tienda.numerologia-cotidiana.com/productos/agenda-numerologica-2027",
  "product_type": "agenda", "is_active": true
}
```

### Tienda (externa)

`GET {STORE_API_URL}/api/products/related?keyword=<texto>&limit=12` → 
`{ data: [{ id, slug, name, image, currency, price, regular_price, on_sale, category, url }] }`.
Es público y solo devuelve productos activos. El WEB lo llama desde un route
handler que exige sesión de admin (no se expone el buscador al público).

### WEB (route handlers)

- `GET /api/promo-products/` → `{ data: [{ id, name, image_url, price, regular_price, currency, product_url, product_type }] }`,
  con `revalidate = 60` y tag `promo-products`. El aviso lo llama **desde el
  cliente** para no volver dinámicas las páginas estáticas (SSG).
- `GET /api/store-products/?q=` → proxy a la tienda, solo admin.

---

## 5. Variables de entorno

| Variable | Dónde | Para qué |
|---|---|---|
| `STORE_API_URL` | WEB | Base de la tienda (default `https://tienda.numerologia-cotidiana.com`) |
| `NEXT_PUBLIC_API_BASE_URL` | WEB | URL de la API propia (con `/api/v1`), leída en `lib/auth/session.ts` |
| `DATABASE_URL` | API | Conexión a la BD donde vive `promo_products` |

---

## 6. Cómo llevarlo a otro sitio

### Opción A — sitio con API propia (como NUME)

1. Ejecutar los dos parches SQL en su base de datos.
2. Copiar el módulo `promo-products` de la API, agregar `promoProducts` al
   esquema Drizzle y registrar `PromoProductsModule` en `AppModule`. Requiere
   los decoradores `@Public()` y `@Roles('admin')`, y `ZodValidationPipe`.
3. Copiar en el WEB: `lib/api/promo-products.ts`,
   `lib/api/promo-products.client.ts`, los dos route handlers, el componente
   del aviso, la pantalla de admin y `mini-laura.png`.
4. Montar `<PromoProductToast />` una sola vez en el layout raíz, dentro de
   `<body>`.
5. Ajustar `HIDDEN_PREFIXES` del componente con las rutas donde no debe salir
   (panel, login, checkout…).
6. Agregar el enlace al admin en el menú del panel.

### Opción B — sitio sin backend propio (estático, WordPress, landing)

El aviso solo necesita una lista JSON con la forma de `/api/promo-products`.
Se puede apuntar a la API de NUME (`GET /api/v1/promo-products?active_only=true`
es público) y administrar los productos desde el panel de NUME, o servir un
JSON estático. En ese caso:

- Cambiar el `fetch(apiRoute('/api/promo-products'))` del componente por la URL
  del JSON (y quitar `apiRoute`, que solo existe por `trailingSlash` de Next).
- Si se consume la API de NUME desde otro dominio, **agregar ese dominio a
  CORS** en la API.
- Fuera de React, el componente se puede reescribir en vanilla JS: la lógica
  es un `fetch` + `setTimeout` aleatorio + un contador en `sessionStorage`.

### Dependencias del componente

- React 18 y Next (`usePathname` de `next/navigation`; en otro framework,
  sustituir por la ruta actual).
- Tailwind CSS (clases utilitarias; colores en `hsl(263 …)` = morado de marca
  y `hsl(var(--border))`, `shadow-panel` del tema de NUME → definirlos o
  reemplazarlos en el sitio destino).
- `safeHref` para no aceptar enlaces `javascript:` desde datos editables.
- Sin librerías extra (sin animaciones externas; respeta
  `prefers-reduced-motion` con `motion-reduce:transition-none`).

---

## 7. Parámetros ajustables (en `promo-product-toast.tsx`)

| Constante | Valor | Qué controla |
|---|---|---|
| `FIRST_DELAY` | 12–25 s | Espera del primer aviso |
| `NEXT_DELAY` | 45–90 s | Espera entre avisos |
| `VISIBLE_FOR` | 9 s | Tiempo visible |
| `MAX_DISMISSALS` | 3 | Cierres con ✕ antes de dejar de mostrarlo en la sesión |
| `HIDDEN_PREFIXES` | `/perfil`, `/login`, … | Rutas sin aviso |

---

## 8. Accesibilidad y analítica

- El contenedor es `role="complementary"` con `aria-label` que incluye el
  tipo ("Producto recomendado: Reporte con IA"); `aria-hidden` y
  `tabIndex=-1` mientras está oculto para que no se pueda enfocar.
- Botón de cerrar con `aria-label="Cerrar recomendación"`.
- No dispara eventos de analítica propios; si el sitio destino los usa, agregar
  `track('select_promotion', …)` en el `onClick` del enlace (como hacen los
  banners con `OutboundLink`).
