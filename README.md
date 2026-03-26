# 🎬 Acpel-culas API - MERN Stack

Bienvenidos al repositorio oficial de **Acpel-culas**, una plataforma moderna para la gestión inteligente de catálogos y colecciones de cine diseñada bajo una arquitectura estricta de **MERN Stack** (MongoDB, Express, React, Node.js). 

Este proyecto fue estructurado priorizando las mejores prácticas de ingeniería de software, enfocándose en la modularidad, integridad de datos, y en una desvinculación total de responsabilidades entre el Frontend y el Backend comunicados por una robusta capa REST API. 

---

## 🏗 Arquitectura del Sistema

El proyecto se divide en dos caparazones o entidades independientes, asegurando escalabilidad y bajo acoplamiento:

1. **BACKEND (Servidor de Negocios y Base de Datos)**
   - **Tecnologías:** Node.js, Express.js y Mongoose.
   - **Misión de la Capa:** Se encarga de validar asincrónicamente los esquemas, operar cálculos automáticos (como el serial fotográfico `PEL-XXXX`) para resguardar la consistencia, y comunicarse con el Atlas o contenedor local de MongoDB. Nunca toca la interfaz visual.
   
2. **FRONTEND (Interfaz de Usuario Reactiva)**
   - **Tecnologías:** ReactJS 19, react-router-dom, Vite, Vanilla CSS.
   - **Misión de la Capa:** Orquestar enrutamientos públicos y privados mediante componentes modulares. Extrae, renderiza y administra (`CRUD`) toda la información de la Base de datos mediante llamadas seguras con la librería `Axios`. Cuenta con paneles centralizados de administrador.

---

## 💫 Funcionalidades Técnicas Implementadas

### Módulo Administrativo Independiente (`/admin/`)
- Formularios interactivos con despliegue CRUD (Crear, Leer, Actualizar, Borrar) para gestionar las **Entidades Base** que dan vida a la plataforma:
  - 💺 Directores
  - 🎭 Géneros
  - 🏢 Productoras
  - 📀 Tipos de Formato
- **Diseño Estético Premium:** Interfaces bañadas bajo las lógicas del *Glassmorphism* (UI desenfocada), con badges de status dinámicos y navegación SPA.

### Registro Inteligente de Películas (`AdminMediaPage`)
- Las películas interactúan con las tablas dependientes en tiempo real sin requerir selectores anticuados. El administrador **introduce directamente el nombre** de los directores, casas o formatos, y en milisegundos una evaluación matemática convierte dicha entrada en IDs de Mongoose, autocompletando la base o instanciándola de ser un registro inédito *(Creación de Relaciones Transparentes "Lazy Creation")*.

### Serializador Automático Persistente (`PEL-XXXX`)
- Toda interacción humana relacionada al código de la película fue abstracta.
- El servidor Node.js invoca *Middleware (Pre-Save Hooks Asíncronos)* sobre Mongoose para interceptar cada película generada y asignarle de forma programada una credencial irreversible y correlativa (`PEL-0001, PEL-0002...`) garantizando su idoneidad como llave única de colección de inventario.
- **Parche de Retrocompatibilidad:** Cualquier película insertada en etapas tempranas recibe el tratamiento serial autogenerado al inicializar llamadas remotas desde el *MediaController*, estabilizando inventarios arcaicos sin mantenimiento.

---

## 🚀 Guía de Instalación y Ejecución Local

Para levantar este proyecto en etapa de desarrollo te sugerimos correr dos terminales en paralelo, una para el backend y otra para el visual.

### Prerrequisitos
- Instalar **Node.js** (v18.x o superior)
- Tener levantado **MongoDB** (En local o de forma remota vía MongoAtlas) con cadena dispuesta en tus variables de entorno.

### 1️⃣ Levantar el Backend 
Ejecutar en la primera terminal:
```bash
cd backend
npm install
npm run dev
```

### 2️⃣ Levantar el Frontend
Ejecutar de manera compartida en la segunda terminal:
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Visualización
Si sigues los pasos tradicionales de la herramienta Vite, los servidores se dispondrán de esta forma en tu navegador:
- Visual UI y Catálogo: [http://localhost:5173/](http://localhost:5173/)
- Endpoints JSON puros: [http://localhost:4000/api/...](http://localhost:4000/api/medias)

---

> Documentación de grado técnico curada junto a Arquitectos Virtuales. *Escalar código es el arte de minimizar fricción.*
