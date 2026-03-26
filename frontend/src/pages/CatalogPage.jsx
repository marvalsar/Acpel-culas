import React, { useEffect, useState } from 'react';
import api from '../services/api';

function CatalogPage() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/medias')
      .then(response => {
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
        <p>Panel Principal (Catálogo Público)</p>
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
                  <div className="card-serial-badge">{media.serial || 'Sin Serial'}</div>
                  <img
                      src={media.Imagen || 'https://via.placeholder.com/300x450?text=Sin+Póster'}
                      alt={media.titulo}
                      className="card-image"
                  />
                  <h2>{media.titulo || 'Módulo sin registrar'}</h2>
                  <p className="synopsis">{media.sinopsis || 'Aún no hay sinopsis agregada para este ítem.'}</p>
                  <div className="card-footer">
                    <span className="badge">{media.anioEstreno || '0000'}</span>
                    {/* Botón removido por ser vista pública */}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Los estilos globables se quedan en App o index.css, aquí solo dejamos los necesarios si lo fueran, 
          pero como index.css y App.css controlan esto, lo abstraemos. */}
    </div>
  );
}

export default CatalogPage;
