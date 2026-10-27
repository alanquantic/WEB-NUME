# Nume Frontend Base

Base de Next.js 14 con App Router, TypeScript estricto, Tailwind y una capa BFF para auth con cookies `httpOnly`.

## Incluye

- Rutas públicas, ecommerce, perfil y admin
- Middleware para proteger `/perfil` y `/admin`
- Servicios tipados según `FRONTEND_HANDOFF.md`
- `PremiumGate` para `403 Forbidden`
- Store global de sesión con Zustand
- Calculadora ejemplo con lógica separada en `lib/numerology`

## Siguientes pasos

1. Instalar dependencias con `npm install`
2. Crear `.env.local` a partir de `.env.example`
3. Levantar con `npm run dev`
4. Sustituir placeholders admin por tablas, formularios y editores

## Pedidos de prueba

En el admin se distingue «Pedido de prueba» cuando `discount_amount` cubre el
100% de un `subtotal_amount` positivo y el código del cupón contiene `test` o
`prueba` (sin distinguir mayúsculas). El backend debe incluir `coupon_code` en
el pedido o `metadata.coupon_code`; también se admite `metadata.coupon` como
texto o como objeto con `code`. Un descuento total sin código o importes
inválidos se muestra como «Tipo por verificar». Los demás pedidos se muestran
como reales según esta regla. Esta clasificación es visual y no modifica pagos.

## Seguimiento de correos de pedidos

El admin de `/perfil/ordenes` consulta Resend con el botón «Consultar estado».
Configurar `RESEND_API_KEY` exclusivamente en el entorno del servidor, con permiso
de lectura de correos. La ruta `/api/admin/emails/[id]` exige sesión de administrador
y devuelve únicamente asunto, destinatarios, último evento y hora de consulta.

El backend que envía el correo debe guardar el `id` devuelto por Resend como
`resend_email_id` en el pedido o en cada producto (también se admite dentro de
`metadata`). No se asocian correos automáticamente por destinatario: un cliente
puede tener varios pedidos. Si falta el ID, el admin permite una consulta manual
que no guarda la vinculación.

La consulta usa `GET https://api.resend.com/emails/{id}` y su `last_event`.
Un evento `clicked` confirma un clic; otros eventos no descartan clics anteriores.
No se conserva un historial de eventos en este frontend. Para un historial
persistente, el backend debe almacenar los webhooks de Resend. Habilitar el
seguimiento de clics del dominio remitente para registrar nuevos clics.

Documentación: https://resend.com/docs/api-reference/emails/retrieve-email y
https://resend.com/docs/dashboard/domains/tracking.
