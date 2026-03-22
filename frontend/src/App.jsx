/**
 * Propósito: Componente principal y UI de la aplicación.
 * Razón Técnica: Aquí orquestamos la obtención de datos llamando a `api.js` (Separation of Concerns).
 * El diseño aplica las variables globales de CSS para lograr un aspecto profesional Glassmorphism, 
 * renderizando la información proveniente directamente de MongoDB (siempre y cuando la DB devuelva registros).
 */

import React, { useEffect, useState } from 'react';
import api from './services/api';
import './index.css';

function App() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aquí hacemos la llamada a tu ruta original de /api/medias
    api.get('/medias')
      .then(response => {
        // Asumiendo que Mongoose nos devuelve un array directo
        setMedias(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando medios de MongoDB:", err);
        setError('No se pudo conectar con la base de datos real. Verifica que MongoDB esté corriendo.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="glass-header">
        <h1>🎬 Acpel Culas API</h1>
        <p>Panel Principal (Conectado a MongoDB Real)</p>
      </header>

      <main className="content">
        {loading && <div className="loader">Sincronizando con MongoDB...</div>}
        {error && <div className="error-card">{error}</div>}

        {!loading && !error && (
          <div className="grid-container">
            {medias.length === 0 ? (
              <div className="empty-state">
                <p>Base de datos conectada correctamente, pero no hay 'Medias' disponibles.</p>
              </div>
            ) : (
              medias.map(media => (
                <div key={media._id} className="glass-card">
                  <h2>{media.titulo || 'Módulo sin registrar'}</h2>
                  <p className="synopsis">{media.sinopsis || 'Aún no hay sinopsis agregada para este ítem.'}</p>
                  <div className="card-footer">
                    <span className="badge">{media.anioEstreno || '0000'}</span>
                    <button className="primary-btn">Editar Medio</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Estilos Modulares Internos para mantener un solo archivo limpio en este punto */}
      <style>{`
        .app-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .glass-header {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: fadeInDown 0.8s ease-out;
        }
        .glass-header h1 {
          margin: 0;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-header p {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.5s ease-out;
          animation-fill-mode: both;
        }
        .glass-card:nth-child(2) { animation-delay: 0.1s; }
        .glass-card:nth-child(3) { animation-delay: 0.2s; }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .glass-card h2 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .synopsis {
          color: var(--text-secondary);
          font-size: 0.9rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
        }
        .badge {
          background: rgba(59, 130, 246, 0.2);
          color: #93c5fd;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .primary-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .primary-btn:hover {
          background: var(--accent-hover);
        }
        .loader, .error-card, .empty-state {
          text-align: center;
          padding: 3rem;
          background: var(--glass-bg);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
        }
        .error-card {
          color: #f87171;
          border-color: rgba(248, 113, 113, 0.3);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
