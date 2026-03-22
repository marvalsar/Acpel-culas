/**
 * Propósito: Cliente centralizado para llamadas HTTP al Backend.
 * Razón Técnica: Centralizar Axios aquí nos permite que todos los componentes
 * compartan la misma URL base. Si en el futuro ponemos seguridad JWT, solo 
 * interceptamos las peticiones en este único archivo en vez de en cada componente.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Apunta al puerto de nuestro servidor unificado
  timeout: 10000,
});

export default api;
