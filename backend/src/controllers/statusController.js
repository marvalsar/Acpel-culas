/**
 * Propósito: Controlador para manejar la verificación de estado del servidor.
 * Razón Técnica: Separar la lógica de la respuesta en un controlador mantiene las rutas limpias
 * y sigue el patrón de diseño de 'separación de responsabilidades' de la arquitectura aprobada.
 */

exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '¡La API de Express está funcionando correctamente y esta es la primera respuesta!',
    timestamp: new Date().toISOString()
  });
};
