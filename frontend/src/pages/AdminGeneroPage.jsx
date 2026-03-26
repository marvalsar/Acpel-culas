import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminGeneroPage() {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('activo');
  const [editId, setEditId] = useState(null);

  const fetchGeneros = () => {
    api.get('/generos')
      .then(res => setGeneros(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/generos/${editId}`, { nombre, descripcion, estado });
      } else {
        await api.post('/generos', { nombre, descripcion, estado });
      }
      setNombre('');
      setDescripcion('');
      setEstado('activo');
      setEditId(null);
      fetchGeneros();
    } catch (err) {
      alert(err.response?.data?.message || "Ocurrió un error");
    }
  };

  const handleEdit = (gen) => {
    setEditId(gen._id);
    setNombre(gen.nombre);
    setDescripcion(gen.descripcion || '');
    setEstado(gen.estado);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este género?")) {
      try {
        await api.delete(`/generos/${id}`);
        fetchGeneros();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="glass-card">
      <div className="admin-page-header">
        <h2>Gestión de Géneros</h2>
        <span className="badge">{generos.length} géneros</span>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Nombre del Género</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
            placeholder="Ej: Ciencia Ficción"
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Opcional"
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
          {editId ? 'Actualizar' : 'Añadir'}
        </button>
        {editId && (
          <button type="button" className="danger-btn ml-2" onClick={() => { setEditId(null); setNombre(''); setDescripcion(''); setEstado('activo'); }}>Cancelar</button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map(gen => (
            <tr key={gen._id}>
              <td>{gen.nombre}</td>
              <td style={{opacity: 0.7}}>{gen.descripcion || 'Sin descripción'}</td>
              <td><span className={gen.estado === 'activo' ? 'text-green' : 'text-red'}>{gen.estado}</span></td>
              <td>
                <button className="primary-btn sm-btn mr-2" onClick={() => handleEdit(gen)}>Editar</button>
                <button className="danger-btn sm-btn" onClick={() => handleDelete(gen._id)}>Borrar</button>
              </td>
            </tr>
          ))}
          {generos.length === 0 && (
            <tr><td colSpan="4" className="text-center">No hay géneros.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminGeneroPage;
