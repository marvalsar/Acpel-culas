/**
 * Propósito: Configurar el servidor principal de Express.
 * Razón Técnica: Centraliza la configuración de Node.js, la seguridad CORS,
 * la inicialización de tu base de datos MongoDB y las rutas originales de tu API.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar conexión original a MongoDB
const { getConnection } = require('../db/db_connection-mongo');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors()); 
app.use(express.json());

// Iniciar conexión a MongoDB Atlas
getConnection();

// Rutas de estado/salud del sistema
app.use('/api', apiRoutes);

// Tus rutas originales mapeadas al nuevo sistema
app.use('/api/generos', require('../routes/genero'));
app.use('/api/directores', require('../routes/director'));
app.use('/api/productoras', require('../routes/productora'));
app.use('/api/tipos', require('../routes/tipo'));
app.use('/api/medias', require('../routes/media'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Servidor Backend fusionado ejecutándose en http://localhost:${PORT}`);
});
