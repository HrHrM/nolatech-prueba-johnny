

```markdown
# Employee Evaluation System

Este proyecto es un sistema de evaluación de empleados, que permite a los administradores y evaluadores gestionar las evaluaciones de los empleados, ver detalles y generar informes.

## Requisitos Previos

Antes de comenzar, asegúrate de tener configurado el manejador de paquetes y la base de datos configurada

- [Node.js](https://nodejs.org/) (22.11.0)
- [MongoDB](https://www.mongodb.com)

## Instalación

```bash 
git clone https://github.com/HrHrM/nolatech-prueba-johnny.git
cd nolatech-prueba-johnny
```

### 2. Instalar Dependencias

Inicia el siguiente comando en el directorio principal del proyecto para instalar todas las dependencias necesarias tanto para el frontend como para el backend:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```


## Configuración

### 1. Configuración del Backend

#### Variables de Entorno

Crea un archivo `.env` en la raíz de la carpeta del backend con el siguiente contenido:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee-evaluation
JWT_SECRET=tu_jwt_secreto
```

Para fines de las pruebas, estas son las credenciales, normalmente no se aplicarian publicas en un servidor, estas son solo para motivos de prueba y normalmente no se deberian ver

```bash
MONGO_URI=mongodb+srv://johnny130205:1130205Jb@backend-nltcj-johnny.de6pi.mongodb.net/backend-nltcj-johnny
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyODA3NjQ0OCIsIm5hbWUiOiJHYWJyaWVsIENhcnZhamFsIiwiaWF0IjoxNTE2MjM5MDIyfQ._viERjz1WgodHQybkqVA0FevspGkiWMxLOY7vk0Yqlo
PORT=5000

```

- `MONGO_URI`: La URL de conexión a tu base de datos MongoDB.
- `JWT_SECRET`: Una clave secreta para firmar los tokens JWT (puedes generar una cadena aleatoria).

### 2. Configuración del Frontend

En el directorio `/frontend`, crea un archivo `.env` con el siguiente contenido:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Este archivo configura la URL base para las solicitudes del frontend al backend.

## Ejecutar la Aplicación

### 1. Iniciar el Backend

Primero, asegurate de tener instalado en tu sistema PM2 globalmente

Esta es una libreria de npm que funciona para poder correr de forma automarica los servicios que se tenga en una aplicación, en este caso mi archivo princial es el server,js, donde haremos lo siguiere:


```bash

npm install -g pm2

luego iniciaremos nuestro servicio de forma automatica:

pm2 start server.js

pm2 save

```

Parar servidor: 

```bash
pm2 stop server.js

```

El servidor se iniciará en `http://localhost:5000`.

### 2. Iniciar el Frontend

Luego, inicia el frontend en la carpeta `/frontend`:

```bash
npm run dev
```


- **backend/**: Hecho con Express + MongoDB.
- **frontend/**: Hecho con React + Vite.

