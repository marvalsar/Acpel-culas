/**
 * Propósito: Definir todas las rutas base de la API.
 * Razón Técnica: Agrupar y exportar endpoints como un 'Router' modular previene que
 * el archivo principal del servidor se llene de cientos de rutas a medida que el proyecto crezca.
 */
const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Definir endpoint GET inicial
router.get('/status', statusController.getHealthStatus);

module.exports = router;
