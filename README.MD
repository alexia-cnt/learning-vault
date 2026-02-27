Learning Vault – Backend API

Api desarrollada con Node.js + Express + MongoDB para la gestión de tableros, secciones, clases y bloques de contenido. Tiene la intención de facilitar e impulsar el estudio autodidactico. Sirve para crear tus propias cursadas con los temas que a vos te interesen y que lo dividas de la manera que más te guste.

Este backend implementa autenticación segura con JWT, verificación de email, arquitectura en capas y CRUD completo con relaciones entre entidades. Tecnologías utilizadas: Node.js, Express, MongoDB + Mongoose, JWT (autenticación con expiración), bcrypt (hash de contraseñas), Nodemailer (envío de correos), dotenv y CORS.


El proyecto sigue una arquitectura en capas:

Routes → definen endpoints
Controllers → manejan request/response
Middleware → autenticación y validaciones
Utils → helpers (JWT, email, etc.)


Para la seguridad cuenta con

Hash de contraseñas con bcrypt
Autenticación con JWT (Bearer Token)
Tokens con expiración
Middleware de protección de rutas
Verificación de cuenta por email (mailtrap)
Variables de entorno protegidas con dotenv


Verificación por email

Al registrarse, el usuario recibe un correo con un enlace de activación. Debe confirmarlo antes de poder iniciar sesión. En este caso use mailtrap para hacer la simulación.


Funcionalidad futura preparada

El sistema fue diseñado para permitir en el futuro que ciertos contenidos puedan marcarse como públicos y compartirse con otros usuarios. Actualmente todas las entidades son privadas por usuario, pero la estructura ya permite extender la visibilidad sin modificar la arquitectura principal.
Como esto, hay varias cosas a mejorar, algunas mas extensas que otras pero no tuve tiempo suficiente para desarrollarlo como me gustaria, asi que algunas cosas las deje como muestra visual.


Entidades principales

Users
Boards
Sections
Classes
Blocks

Relaciones:

Un usuario → muchos tableros
Un tablero → muchas secciones
Una sección → muchas clases
Una clase → muchos bloques


Instalación y ejecución

1- Clonar repositorio
git clone <URL_DEL_REPO>
cd backend

2- Instalar dependencias
npm install

3- Crear archivo .env

Ejemplo:

PORT=4000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secret
EMAIL_USER=tu_email
EMAIL_PASS=tu_password
CLIENT_URL=http://localhost:5173

4- Ejecutar servidor
npm run dev

Servidor corriendo en:

http://localhost:4000


Autenticación

Para acceder a rutas protegidas:

Authorization: Bearer <token>


Endpoints principales

Auth

POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify/:token

Boards

GET /api/boards
POST /api/boards
DELETE /api/boards/:id

Sections

GET /api/sections/:boardId
POST /api/sections
DELETE /api/sections/:id

Classes

GET /api/classes/:sectionId
POST /api/classes
DELETE /api/classes/:id

Blocks

GET /api/blocks/:classId
POST /api/blocks
DELETE /api/blocks/:id
