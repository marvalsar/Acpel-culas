# Acpel-culas (Frontend)

Proyecto frontend de la aplicación "Acpel-culas". Utiliza React, Vite y Fetch/Axios para consumir una API REST local (en backend/).

## 📦 Requisitos

- Node.js 18+ (recomendado 20)
- npm 9+ (o yarn/pnpm)
- Backend (servidor) levantado en `http://localhost:3000` (por defecto)

## 🚀 Iniciar en local

1. Abrir terminal en `frontend/`
2. `npm install`
3. `npm run dev`
4. Abrir `http://localhost:5173` (o la URL que muestre Vite)

## 🛠️ Scripts útiles

- `npm run dev`: arranca el servidor de desarrollo con recarga en caliente.
- `npm run build`: compila el frontend estático en `dist/`.
- `npm run preview`: prueba la versión de producción local.

## 🔗 Backend (API)

En este repositorio la API está en `backend/`:

- `npm start` (desde `backend/`) arranca el servidor Express/Mongo que sirve recursos de `media`, `director`, `genero`, `productora`, `tipo`.

### 🧪 Flujo de prueba rápido

1. Levantar backend: `cd backend && npm install && npm start`
2. Levantar frontend: `cd frontend && npm install && npm run dev`
3. Abrir app en navegador e ingresar datos de películas/géneros destacados.

## ℹ️ Estructura del frontend

- `src/main.jsx`: punto de entrada.
- `src/App.jsx`: componente principal.
- `src/App.css` y `src/index.css`: estilos globales.
- `src/services/api.js`: cliente HTTP hacia la API (configurar host/puerto si es necesario).

## ✅ Buenas prácticas

- Mantener variables de entorno en `.env` en `frontend/` para base URL de API (p.ej. `VITE_API_URL=http://localhost:3000`).
- Usar control de estado local con hooks (`useState`, `useEffect`).
- Configurar **eslint** y **prettier** según tu preferencia.

## 💡 Notas

- Este README está en español para facilitar el onboarding en equipos hispanohablantes.
- Ajusta puertos si tienes servicios ocupando `3000` o `5173`.
