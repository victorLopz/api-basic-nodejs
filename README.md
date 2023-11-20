# API de Almacenamiento

Esta es una API simple para gestionar productos en un almacén, desarrollada utilizando Node.js, Express, y MySQL.

## Configuración

Asegúrate de tener Node.js y MySQL instalados en tu sistema.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

3. **Instalar las dependencias:**
   ```bash
   npm install express mysql morgan body-parser
   
3. **Configurar la base de datos:**

   - Crea una base de datos en MySQL.
   - Copia el contenido del archivo database.sql en tu base de datos para crear la tabla necesaria.

4. **Configurar las variables de entorno:**

   Crea un archivo .env en la raíz del proyecto y configura las variables necesarias:PORT=3200

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_DATABASE=******

5. **Inicia la aplicación:**
   ```bash
   npm start
   La aplicación estará disponible en http://localhost:3200.


# Rutas de la API

- `GET /productos`: Obtiene todos los productos visibles en el almacén.
- `GET /cantidad`: Obtiene la cantidad de productos visibles.
- `GET /productos/:id`: Obtiene un producto por su ID.
- `POST /add`: Añade un nuevo producto.
- `PUT /update/:id`: Actualiza la información de un producto.
- `DELETE /delete/:id`: Elimina un producto.



