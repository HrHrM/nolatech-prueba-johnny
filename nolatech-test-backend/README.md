# NOLA Tech Backend API

Este proyecto implementa una API RESTful utilizando **Node.js** y **Express**. Está diseñado para gestionar usuarios, empleados, evaluaciones y feedback, integrando autenticación mediante **JWT** y roles de usuario (Admin, Manager y Employee). Los datos se almacenan en una base de datos **MongoDB** y el proyecto incluye diversas funcionalidades para realizar operaciones CRUD.

## Características

- **Autenticación JWT**: Registro e inicio de sesión de usuarios, con generación de tokens JWT.
- **Gestión de Roles**: Permisos y roles para Admin, Manager y Employee.
- **Evaluaciones**: Creación y gestión de evaluaciones para empleados.
- **Feedback**: Envío de feedback para evaluaciones de empleados.
- **Reportes**: Generación de reportes de evaluaciones para empleados.
- **Middleware de Validación**: Validación de datos de entrada y manejo de errores.

## Endpoints

### Autenticación
- `POST /api/auth/register`: Registro de usuarios (Admin, Manager, Employee).
- `POST /api/auth/login`: Inicio de sesión, devuelve un token JWT.

### Empleados
- `GET /api/employees`: Obtener lista de empleados.

### Evaluaciones
- `POST /api/evaluations`: Crear una nueva evaluación.
- `GET /api/evaluations/:id`: Obtener detalles de una evaluación.
- `PUT /api/evaluations/:id`: Actualizar una evaluación.
- `GET /api/evaluations/employee/:id`: Obtener evaluaciones de un empleado.

### Feedback
- `POST /api/feedback`: Enviar feedback para una evaluación.

### Reportes
- `GET /api/reports/employee/:id`: Generar reporte de evaluación para un empleado.

## Configuración del Proyecto

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/nola_tech.git
cd nola_tech

2. Instala las dependencias
Asegúrate de tener Node.js y npm instalados en tu sistema. Luego ejecuta:

bash
npm install

3. Configuración de Variables de Entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

MONGO_URI=mongodb+srv://node_web_server:28076448@miclusterserver.jjtgfag.mongodb.net/nola_tech
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyODA3NjQ0OCIsIm5hbWUiOiJHYWJyaWVsIENhcnZhamFsIiwiaWF0IjoxNTE2MjM5MDIyfQ._viERjz1WgodHQybkqVA0FevspGkiWMxLOY7vk0Yqlo
PORT=5000

4 . instalar e iniciar servicio de pm2

Esta es una libreria de npm que funciona para poder correr de forma automarica los servicios que se tenga en una aplicación, en este caso mi archivo princial es el server,js, donde haremos lo siguiere:

npm install pm2

luego iniciaremos nuestro servicio de forma automatica:

pm2 start server.js

pm2 save



