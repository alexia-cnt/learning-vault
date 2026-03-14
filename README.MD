# Learning Vault – Backend API

API desarrollada con **Node.js + Express + MongoDB** para la gestión de contenido educativo organizado en tableros.

El sistema permite crear estructuras de estudio personalizadas organizadas en:

Boards → Sections → Classes → Blocks

Cada usuario puede crear sus propios contenidos para organizar temas de estudio y dividirlos de la forma que prefiera.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (autenticación)
- bcrypt (hash de contraseñas)
- Nodemailer
- Mailtrap (simulación de envío de emails)
- dotenv
- CORS

---

# Arquitectura del proyecto

El backend sigue una **arquitectura en capas**:

routes → definición de endpoints
controllers → lógica de request / response
services → lógica de negocio
repositories → acceso a base de datos
middleware → autenticación y manejo de errores
utils → helpers (JWT, envío de emails, etc)


---

# Seguridad

El sistema implementa:

- Hash de contraseñas con **bcrypt**
- Autenticación con **JWT**
- Tokens con expiración
- Middleware de protección de rutas
- Verificación de cuenta por email
- Variables de entorno protegidas con **dotenv**

---

# Verificación por email

Al registrarse, el usuario recibe un correo de verificación.

Para el desarrollo se utiliza **Mailtrap** para simular el envío de emails.

El usuario debe confirmar su cuenta antes de poder iniciar sesión.

---

# Entidades principales

Users
Boards
Sections
Classes
Blocks


Relaciones:

User → Boards
Board → Sections
Section → Classes
Class → Blocks


---

# Instalación

1. Clonar repositorio

```bash
git clone AQUI_VA_LA_URL_DEL_REPO_BACKEND
cd backend


2. Instalar dependencias

npm install
Variables de entorno

Crear archivo .env

Ejemplo:

PORT=4000 
MONGO_URI=TU_URI_DE_MONGODB
JWT_SECRET=TU_SECRET

EMAIL_USER=MAILTRAP_USER
EMAIL_PASS=MAILTRAP_PASS

CLIENT_URL=http://localhost:5173
Ejecutar el servidor
npm run dev

Servidor disponible en:

http://localhost:4000
Autenticación

Las rutas protegidas requieren un token JWT.

Ejemplo de header:

Authorization: Bearer <token>


---

Endpoints principales


Auth

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/verify/:token


Boards

GET    /api/boards
POST   /api/boards
GET    /api/boards/:id
PUT    /api/boards/:id
DELETE /api/boards/:id


Sections

GET    /api/sections/:boardId
GET    /api/sections/detail/:id
POST   /api/sections
PUT    /api/sections/:id
DELETE /api/sections/:id


Classes

GET    /api/classes/section/:sectionId
GET    /api/classes/detail/:id
POST   /api/classes
PUT    /api/classes/:id
DELETE /api/classes/:id


Blocks

GET    /api/blocks/:classId
POST   /api/blocks
DELETE /api/blocks/:id
Search
GET /api/search?query=texto


---


Postman collection


El archivo:
learning-vault-api.postman_collection.json

incluye ejemplos de requests para probar todos los endpoints.


Para usarlo:

1. Abrir Postman

2. Importar el archivo JSON

3. Ejecutar las requests disponibles


---

Funcionalidades futuras


La arquitectura fue diseñada para permitir extensiones futuras:

- sección social para compartir tableros
- edición de contenido
- mejoras visuales en dashboard