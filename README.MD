# Learning Vault – Backend API

API desarrollada con **Node.js + Express + MongoDB** para gestionar contenido de estudio personal organizado en estructuras jerárquicas.

El sistema permite a cada usuario crear su propio espacio de aprendizaje organizando contenido en:
Boards → Sections → Classes → Blocks

Esto permite estructurar información de manera clara, separando temas en niveles y agregando contenido dentro de cada clase.

---

## Tecnologías utilizadas

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

## Arquitectura del proyecto

El backend sigue una arquitectura en capas para separar responsabilidades.

src/
├ config/
│ └ db.js
├ controllers/
├ middleware/
├ models/
├ routes/
├ utils/
└ app.js

---

## Modelo de datos

Entidades principales:

- Users
- Boards
- Sections
- Classes
- Blocks

Relaciones:

User → Boards  
Board → Sections  
Section → Classes  
Class → Blocks

Cada usuario puede crear su propia estructura de estudio.

---

## Instalación

1. Clonar el repositorio
git clone https://github.com/alexia-cnt/learning-vault-backend.git
cd learning-vault-backend

2. Instalar dependencias
npm install

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

PORT=4000

MONGO_URI=tu_uri_de_mongodb_atlas

JWT_SECRET=tu_clave_secreta

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=tu_usuario_mailtrap
MAIL_PASS=tu_password_mailtrap

FRONTEND_URL=http://localhost:5173


El sistema utiliza Mailtrap para simular el envío de correos durante el desarrollo.

---

## Ejecutar el servidor

npm run dev

Servidor disponible en: http://localhost:4000

---

## Autenticación

Las rutas protegidas requieren un token **JWT**.

Header requerido: 
Authorization: Bearer <token>


---

## Verificación de email

Al registrarse, el sistema envía un correo de verificación utilizando Mailtrap. El usuario debe acceder al enlace de verificación antes de poder utilizar la cuenta.

Usuario de prueba disponible:

Email: test6@test.com
Password: Password123


---

## Endpoints principales

### Auth

POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/verify/:token  

### Boards

GET /api/boards  
POST /api/boards  
GET /api/boards/:id  
PUT /api/boards/:id  
DELETE /api/boards/:id  

### Sections

GET /api/sections  
POST /api/sections  
PUT /api/sections/:id  
DELETE /api/sections/:id  

### Classes

GET /api/classes  
POST /api/classes  
PUT /api/classes/:id  
DELETE /api/classes/:id  

### Blocks

GET /api/blocks  
POST /api/blocks  
PUT /api/blocks/:id  
DELETE /api/blocks/:id  

---

## Postman Collection

El proyecto incluye una Postman Collection para probar los endpoints de la API.

Permite:

- registrar usuarios
- iniciar sesión
- obtener token JWT
- probar endpoints protegidos
- crear y administrar boards, sections, classes y blocks

La colección puede importarse directamente en Postman.

---

## Mejoras futuras

Algunas funcionalidades previstas para próximas versiones del proyecto:

- Implementar soporte completo para tableros públicos y privados en la API.
- Permitir que los tableros públicos puedan ser explorados desde la sección social de la aplicación.
- Ampliar los endpoints para permitir filtrar y explorar tableros públicos de otros usuarios.
- Agregar Google reCAPTCHA en el registro de usuarios para evitar registros automáticos o bots.
- Implementar un sistema de recordatorios de estudio, donde el usuario pueda configurar avisos diarios para mantener una rutina de aprendizaje constante.

---

## Repositorio

Backend:  
https://github.com/alexia-cnt/learning-vault-backend

