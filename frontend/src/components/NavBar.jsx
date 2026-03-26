import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="glass-navbar">
      <div className="nav-brand">
        <Link to="/">🎬 API Películas</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={getLinkClass('/')}>Catálogo Público</Link>
        {/* Aquí irán las rutas del Admin */}
        <Link to="/admin/directores" className={getLinkClass('/admin/directores')}>Directores</Link>
        <Link to="/admin/generos" className={getLinkClass('/admin/generos')}>Géneros</Link>
        <Link to="/admin/productoras" className={getLinkClass('/admin/productoras')}>Productoras</Link>
        <Link to="/admin/tipos" className={getLinkClass('/admin/tipos')}>Tipos</Link>
        <Link to="/admin/medias" className={getLinkClass('/admin/medias')}>Películas (Media)</Link>
      </div>

      <style>{`
        .glass-navbar {
          background: rgba(17, 25, 40, 0.75);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--glass-border);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-brand a {
          font-weight: 700;
          font-size: 1.2rem;
          color: white;
          text-decoration: none;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: white;
        }
        .nav-link.active {
          color: #60a5fa;
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
