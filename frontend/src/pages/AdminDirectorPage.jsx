import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminDirectorPage() {
  const [directores, setDirectores] = useState([]);
  const [nombres, setNombres] = useState('');
  const [estado, setEstado] = useState('activo');
  const [editId, setEditId] = useState(null);

  const fetchDirectores = () => {
    api.get('/directores')
      .then(res => setDirectores(res.data))
      .catch(err => console.error("Error obteniendo directores:", err));
  };

  useEffect(() => {
    fetchDirectores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/directores/${editId}`, { nombres, estado });
      } else {
        await api.post('/directores', { nombres, estado });
      }
      setNombres('');
      setEstado('activo');
      setEditId(null);
      fetchDirectores(); // Recargar lista
    } catch (err) {
      console.error("Error guardando director:", err);
      alert(err.response?.data?.message || "Ocurrió un error");
    }
  };

  const handleEdit = (dir) => {
    setEditId(dir._id);
    setNombres(dir.nombres);
    setEstado(dir.estado);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este director?")) {
      try {
        await api.delete(`/directores/${id}`);
        fetchDirectores();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="glass-card">
      <div className="admin-page-header">
        <h2>Gestión de Directores</h2>
        <span className="badge">{directores.length} directores</span>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Nombres Completos</label>
          <input 
            type="text" 
            value={nombres} 
            onChange={(e) => setNombres(e.target.value)} 
            required 
            placeholder="Ej: Steven Spielberg"
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="primary-btn">
          {editId ? 'Actualizar Director' : 'Añadir Director'}
        </button>
        {editId && (
          <button type="button" className="danger-btn ml-2" onClick={() => { setEditId(null); setNombres(''); setEstado('activo'); }}>Cancelar</button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map(dir => (
            <tr key={dir._id}>
              <td>{dir.nombres}</td>
              <td><span className={dir.estado === 'activo' ? 'text-green' : 'text-red'}>{dir.estado}</span></td>
              <td>{new Date(dir.fechaCreacion).toLocaleDateString()}</td>
              <td>
                <button className="primary-btn sm-btn mr-2" onClick={() => handleEdit(dir)}>Editar</button>
                <button className="danger-btn sm-btn" onClick={() => handleDelete(dir._id)}>Borrar</button>
              </td>
            </tr>
          ))}
          {directores.length === 0 && (
            <tr><td colSpan="4" className="text-center">No hay directores registrados.</td></tr>
          )}
        </tbody>
      </table>

      <style>{`
        .admin-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 200px;
        }
        .form-group label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          color: white;
          outline: none;
        }
        .form-group input:focus, .form-group select:focus {
          border-color: #3b82f6;
        }
        .sm-btn {
          padding: 0.3rem 0.6rem;
          font-size: 0.8rem;
        }
        .mr-2 { margin-right: 0.5rem; }
        .ml-2 { margin-left: 0.5rem; }
        .text-center { text-align: center; color: var(--text-secondary); }
        .text-green { color: #34d399; font-weight: bold; }
        .text-red { color: #f87171; font-weight: bold; }
      `}</style>
    </div>
  );
}

export default AdminDirectorPage;
