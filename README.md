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

