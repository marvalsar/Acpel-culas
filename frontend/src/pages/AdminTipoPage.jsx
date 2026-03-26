import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminTipoPage() {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchTipos = () => {
    api.get('/tipos')
      .then(res => setTipos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/tipos/${editId}`, { nombre, descripcion });
      } else {
        await api.post('/tipos', { nombre, descripcion });
      }
      setNombre(''); setDescripcion(''); setEditId(null);
      fetchTipos();
    } catch (err) {
      alert(err.response?.data?.message || "Ocurrió un error");
    }
  };

  const handleEdit = (tipo) => {
    setEditId(tipo._id);
    setNombre(tipo.nombre);
    setDescripcion(tipo.descripcion || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este tipo de equipo?")) {
      try {
        await api.delete(`/tipos/${id}`);
        fetchTipos();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="glass-card">
      <div className="admin-page-header">
        <h2>Gestión de Tipos</h2>
        <span className="badge">{tipos.length} tipos</span>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Nombre (*)</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <button type="submit" className="primary-btn">{editId ? 'Actualizar' : 'Añadir'}</button>
        {editId && (
           <button type="button" className="danger-btn ml-2" onClick={() => { setEditId(null); setNombre(''); setDescripcion(''); }}>Cancelar</button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map(tipo => (
            <tr key={tipo._id}>
              <td>{tipo.nombre}</td>
              <td style={{opacity: 0.7}}>{tipo.descripcion || '--'}</td>
              <td>
                <button className="primary-btn sm-btn mr-2" onClick={() => handleEdit(tipo)}>Editar</button>
                <button className="danger-btn sm-btn" onClick={() => handleDelete(tipo._id)}>Borrar</button>
              </td>
            </tr>
          ))}
          {tipos.length === 0 && (
            <tr><td colSpan="3" className="text-center">No hay tipos registrados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTipoPage;
