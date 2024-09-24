<h1 align="center" style="border-bottom: none;">
  Microservicio de Inventario.
</h1>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Descripción

Microservicio de inventario template para cualquier tipo de proyecto.

## Levantar el Proyecto

### (Opcion 1). Levantar el Proyecto Localmente

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/nestjs/nest.git
   ```
2. **Instala las dependencias**:

   ```bash
   cd nombre-del-repositorio
   npm install
   ```

3. **Renombra el archivo de configuración**:

   - Renombra el archivo `.env.template` a `.env`.

4. **Configura las variables de entorno**:

   - Abre el archivo `.env` y reemplaza las variables según tus necesidades.

5. **Ejecuta el proyecto**:

   ```bash
   npm run dev
   ```

6. **Ejecuta los comandos de Prisma**:

   ```bash
   # Migrations
   npx prisma migrate dev --name init

   # Generate
   npx prisma generate
   ```

7. **Ejecuta el `Seed` para crear la base de datos local**:

   - Accede a: [localhost:45673/api/seed](http://localhost:45673/api/seed)

8. **Revisa los endpoints disponibles**:
   - Puedes encontrar la colección de Postman en el archivo [postman](./docs/Microservice%20Inventory.postman_collection.json). Descárgalo e impórtalo en Postman.

### (Opcion 2). Levantar el Proyecto con Docker

Para ejecutar el proyecto utilizando Docker, sigue estos pasos:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/nestjs/nest.git
   ```

2. **Renombra el archivo de configuración**:

   - Renombra el archivo `.env.template` a `.env` y asegúrate de que las variables de entorno estén configuradas correctamente.

3. **Levanta el contenedor de Docker**:

   ```bash
   docker-compose up -d
   ```

4. **Ejecuta el `Seed` para crear la base de datos local**:

   - Accede a: [localhost:45673/api/seed](http://localhost:45673/api/seed)

5. **Revisa los endpoints disponibles**:
   - Puedes encontrar la colección de Postman en el archivo [postman](./docs/Microservice%20Inventory.postman_collection.json). Descárgalo e impórtalo en Postman.

## Comandos de Prisma

Si deseas ejecutar comandos de Prisma manualmente, aquí están los comandos básicos:

```bash
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

## License

Este proyecto está licenciado bajo la [Licencia MIT](https://github.com/nestjs/nest/blob/master/LICENSE).

## Notas

Si se desea crear un usuario recordar ejecutar el [seed](localhost:45673/api/seed) primero ya que si no existe un supplier_id generará un error.
