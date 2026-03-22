# PROYECTO_API - API REST para Gestión de Películas

## 📋 Descripción

**PROYECTO_API** es una API REST desarrollada con Node.js y Express que proporciona funcionalidades para la gestión de géneros de películas. La aplicación utiliza MongoDB como base de datos y está diseñada para ser escalable y mantenible.

**Autores:** Luz Marina Marín Aguirre y Elvis Antonio Guerra Jimenez

---

## 🚀 Características

- ✅ API REST completa para gestión de géneros
- ✅ Conexión a MongoDB Atlas
- ✅ Validación de datos robusta
- ✅ Manejo de errores centralizado
- ✅ CORS habilitado para acceso desde diferentes orígenes
- ✅ Variables de entorno configurables
- ✅ Modo desarrollo con nodemon

---

## 📦 Dependencias

### Producción
- **express** (^5.2.1) - Framework web
- **mongoose** (^9.2.4) - ODM para MongoDB
- **cors** (^2.8.6) - Middleware CORS
- **dotenv** (^17.3.1) - Gestión de variables de entorno

### Desarrollo
- **nodemon** (^3.1.14) - Reinicio automático durante el desarrollo

---

## 🔧 Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn
- Cuenta en MongoDB Atlas
- Git

### Pasos de instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/marvalsar/Acpel-culas.git
cd Proyecto_api/backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
Crear un archivo `.env` en la raíz del directorio `backend` basado en la plantilla `.env.template`:
```bash
cp .env.template .env
```

Luego editar el archivo `.env` con tus credenciales reales:
```env
PORT=4000
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombrebd?retryWrites=true&w=majority
```

4. **Iniciar la aplicación:**
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

La API estará disponible en `http://localhost:4000`

---

## 📚 Estructura del Proyecto

```
backend/
├── controllers/
│   └── generoController.js      # Controladores de géneros
├── db/
│   └── db_connection-mongo.js  # Configuración de conexión a MongoDB
├── models/
│   └── Genero.js               # Esquema y modelo de Género
├── routes/
│   └── genero.js               # Rutas de géneros
├── .env.template               # Plantilla de variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── index.js                    # Punto de entrada de la aplicación
├── package.json                # Configuración de npm
├── package-lock.json           # Lockfile de dependencias
└── README.md                   # Este archivo
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:4000/api
```

### 1. Obtener todos los géneros

**Endpoint:** `GET /api/generos`

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Acción",
    "estado": "activo",
    "descripcion": "Películas de acción y aventura",
    "fechaCreacion": "2026-03-06T10:30:00.000Z",
    "fechaActualizacion": "2026-03-06T10:30:00.000Z"
  }
]
```

**Respuesta error (500):**
```json
{
  "message": "Ocurrió un error al listar los géneros"
}
```

---

### 2. Crear un nuevo género

**Endpoint:** `POST /api/generos`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Comedia",
  "descripcion": "Películas cómicas y divertidas"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "nombre": "Comedia",
  "estado": "activo",
  "descripcion": "Películas cómicas y divertidas",
  "fechaCreacion": "2026-03-06T10:35:00.000Z",
  "fechaActualizacion": "2026-03-06T10:35:00.000Z"
}
```

**Respuesta error - Género duplicado (400):**
```json
{
  "message": "El género \"Comedia\" ya existe"
}
```

**Respuesta error - Error del servidor (500):**
```json
{
  "message": "Ocurrió un error al guardar el género"
}
```

---

## 📊 Modelo de Datos

### Genero

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Auto | ID único generado por MongoDB |
| `nombre` | String | ✅ | Nombre del género (único) |
| `estado` | String | ✅ | Estado del género: "activo" o "inactivo" |
| `descripcion` | String | ❌ | Descripción del género |
| `fechaCreacion` | Date | ✅ | Fecha de creación (auto-generada) |
| `fechaActualizacion` | Date | ✅ | Fecha de última actualización |

**Validaciones:**
- El nombre es requerido, único y se trimean espacios
- El estado debe ser "activo" o "inactivo" (por defecto "activo")
- Las fechas se generan automáticamente con la fecha actual

---

## 🔄 Flujo de la Aplicación

1. **Inicialización:** `index.js` inicia Express y configura middlewares
2. **Conexión DB:** Se establece conexión con MongoDB Atlas
3. **Rutas:** Las solicitudes se enrutan a través de `/api/generos`
4. **Controladores:** `generoController.js` procesa la lógica de negocio
5. **Modelos:** `Genero.js` define la estructura de datos
6. **Respuesta:** Se retorna JSON al cliente

---

## 🛠️ Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `start` | `npm start` | Inicia la aplicación en modo producción |
| `dev` | `npm run dev` | Inicia en modo desarrollo con nodemon |
| `test` | `npm test` | Ejecuta pruebas (pendiente de implementar) |

---

## 📝 Variables de Entorno

El proyecto incluye un archivo `.env.template` como plantilla. Para configurar las variables de entorno:

1. Copiar la plantilla: `cp .env.template .env`
2. Editar el archivo `.env` con tus credenciales reales

El archivo `.env` debe contener:

```env
# Puerto de la aplicación (por defecto 4000)
PORT=4000

# URI de conexión a MongoDB Atlas
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_bd?retryWrites=true&w=majority
```

**Nota:** Nunca commits el archivo `.env` en el repositorio. Está incluido en `.gitignore` por seguridad.

---

## 🔒 Seguridad

El proyecto implementa las siguientes medidas de seguridad:

- **Variables de entorno:** Las credenciales sensibles se almacenan en variables de entorno
- **Archivo .gitignore:** Excluye archivos sensibles del control de versiones
- **Validación de datos:** Validaciones robustas en modelos y controladores
- **CORS configurado:** Control de acceso desde diferentes orígenes

---

## 🚨 Manejo de Errores

La aplicación implementa un manejo centralizado de errores:

- **400:** Solicitud inválida (ej: género duplicado)
- **500:** Error del servidor (ej: problemas de conexión a BD)

Todos los errores se registran en consola con el prefijo ❌ para facilitar el debugging.

---

## 📌 Próximas Mejoras

- [ ] Implementar endpoints para actualizar géneros (PUT)
- [ ] Implementar endpoints para eliminar géneros (DELETE)
- [ ] Agregar pruebas unitarias e integración
- [ ] Implementar autenticación y autorización
- [ ] Agregar paginación en listados
- [ ] Implementar validación más robusta con joi o yup
- [ ] Agregar logging más avanzado
- [ ] Documentación con Swagger/OpenAPI

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mifeature`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mifeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC. Ver `package.json` para más detalles.

---

## 📧 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

**GitHub:** [Acpel-culas](https://github.com/marvalsar/Acpel-culas)

---

## 📋 Cambios recientes

- ✅ Inicialización del proyecto
- ✅ Configuración de MongoDB Atlas
- ✅ Implementación de endpoints para géneros
- ✅ Documentación completa de API
- ✅ Configuración de variables de entorno con plantilla (.env.template)
- ✅ Archivo .gitignore para seguridad
- ✅ Estructura del proyecto optimizada

---

**Última actualización:** 8 de marzo de 2026
