# Aimar Fitness Studio

Aplicacion web para la gestion de un estudio de fitness. El proyecto tiene un frontend en React y un backend en Express conectado a PostgreSQL.

## Que hace la app

- Muestra informacion publica del estudio: inicio, servicios, quienes somos y contacto.
- Permite registrar usuarios e iniciar sesion.
- Diferencia entre usuarios normales y administradores mediante roles.
- Permite a los usuarios acceder a su area privada.
- Permite al administrador gestionar clases: listar, crear, editar y eliminar.
- Expone una API REST para autenticacion, clases y reservas.
- Incluye documentacion Swagger del backend.

## Estructura del proyecto

```txt
Aimar-Fitness-Studio/
|-- Backend-Aimar-Fitness-Studio/
|   |-- src/
|   |-- package.json
|   |-- query-example.sql
|   `-- README.md
|-- Frontend-Aimar-Fitness-Studio/
|   |-- src/
|   |-- package.json
|   `-- vite.config.js
`-- docs/
    `-- diagrama-aimar.pgerd
```

## Como correrla localmente

### 1. Base de datos

1. Crea una base de datos PostgreSQL llamada `Aimar_Fitness_Studio`.
2. Ejecuta el script SQL con las tablas y datos de muestra:

```bash
npm run sql
```

El script `npm run sql` esta preparado para un contenedor Docker llamado `some-postgres`. Si usas PostgreSQL instalado localmente, puedes ejecutar el archivo `query-example.sql` desde pgAdmin o con `psql`.

### 2. Backend

Desde esta carpeta:

```bash
npm install
```

Crea un archivo `.env` en `Backend-Aimar-Fitness-Studio/` con estas variables:

```env
PORT=3000
DB_HOST=localhost
DB_DATABASE=Aimar_Fitness_Studio
DB_USER=postgres
DB_PASSWORD=tu_password
DB_PORT=5432
DB_MAX=10
JWT_SECRET=tu_clave_secreta
```

Arranca el servidor:

```bash
npm run dev
```

La API quedara disponible en:

- `http://localhost:3000/api`
- `http://localhost:3000/api-docs`

### 3. Frontend

En otra terminal, entra en la carpeta del frontend:

```bash
cd ../Frontend-Aimar-Fitness-Studio
yarn install
```

Crea un archivo `.env` en `Frontend-Aimar-Fitness-Studio/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Arranca la app:

```bash
yarn dev
```

La aplicacion se abrira normalmente en:

```txt
http://localhost:5173
```

Si no usas Yarn, tambien puedes instalar y arrancar el frontend con `npm install` y `npm run dev`.

## Tecnologias usadas

### Frontend

- React
- Vite
- React Router
- Sass
- React Big Calendar
- React Datepicker
- React Data Table Component
- SweetAlert2
- date-fns

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- JSON Web Token
- bcrypt / bcryptjs
- express-validator
- cors
- dotenv
- Swagger
- Nodemon

## Usuarios existentes

Usuarios de prueba para iniciar sesion:

| Email | Contrasena | Rol |
| --- | --- | --- |
| `prueba@corre.com` | `123jke3nt6R@` | `admin` |
| `usuario@correo.com` | `123jke3nt6R@` | `usuario` |
| `usuario2@correo.com` | `123jke3nt6R@` | `usuario` |

El usuario con rol `admin` puede acceder al panel de administracion. Los usuarios con rol `usuario` pueden acceder al area privada de usuario.


