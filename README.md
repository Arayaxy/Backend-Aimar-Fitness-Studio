# Backend-Aimar-Fitness-Studio

## Variables de despliegue

En Render, configura las variables de PostgreSQL y JWT habituales. Para permitir que el frontend desplegado en Vercel pueda llamar a la API, anade tambien:

```env
FRONTEND_URL=https://tu-frontend.vercel.app
```

En Vercel, el frontend debe apuntar a la API con `/api` al final:

```env
VITE_API_URL=https://backend-aimar-fitness-studio.onrender.com/api
```
