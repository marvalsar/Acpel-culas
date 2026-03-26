import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import NavBar from './components/NavBar';
import './index.css';

// Componentes del Dashboard de Administración
import AdminDirectorPage from './pages/AdminDirectorPage';
import AdminGeneroPage from './pages/AdminGeneroPage';
import AdminProductoraPage from './pages/AdminProductoraPage';
import AdminTipoPage from './pages/AdminTipoPage';
import AdminMediaPage from './pages/AdminMediaPage';

function App() {
  return (
    <>
      <NavBar />
      <div className="main-layout">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          
          {/* Rutas de Administrador */}
          <Route path="/admin/directores" element={<AdminDirectorPage />} />
          <Route path="/admin/generos" element={<AdminGeneroPage />} />
          <Route path="/admin/productoras" element={<AdminProductoraPage />} />
          <Route path="/admin/tipos" element={<AdminTipoPage />} />
          <Route path="/admin/medias" element={<AdminMediaPage />} />
        </Routes>
      </div>

      <style>{`
         /* ESTILOS GLOBALES DE LA PLATAFORMA MOVIDOS AQUI DESDE EL VIEJO APP.JSX */
         .main-layout {
           padding: 2rem;
           max-width: 1200px;
           margin: 0 auto;
         }
         
        .app-container {
          padding: 0;
          max-width: 100%;
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
          position: relative;
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
        .card-serial-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(16, 185, 129, 0.9);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          z-index: 10;
        }
        .card-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
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
        .danger-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .danger-btn:hover {
          background: #dc2626;
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
        
        .admin-page-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 2rem;
        }
        .admin-table {
           width: 100%;
           border-collapse: collapse;
        }
        .admin-table th, .admin-table td {
           padding: 1rem;
           text-align: left;
           border-bottom: 1px solid var(--glass-border);
        }
        .admin-table th {
           background: rgba(255, 255, 255, 0.05);
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
    </>
  );
}

export default App;
