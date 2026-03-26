import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminProductoraPage() {
  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState('');
  const [slogan, setSlogan] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('activo');
  const [editId, setEditId] = useState(null);

  const fetchProductoras = () => {
    api.get('/productoras')
      .then(res => setProductoras(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProductoras();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/productoras/${editId}`, { nombre, slogan, descripcion, estado });
      } else {
        await api.post('/productoras', { nombre, slogan, descripcion, estado });
      }
      setNombre(''); setSlogan(''); setDescripcion(''); setEstado('activo'); setEditId(null);
      fetchProductoras();
    } catch (err) {
      alert(err.response?.data?.message || "Ocurrió un error");
    }
  };

  const handleEdit = (prod) => {
    setEditId(prod._id);
    setNombre(prod.nombre);
    setSlogan(prod.slogan || '');
    setDescripcion(prod.descripcion || '');
    setEstado(prod.estado);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta productora?")) {
      try {
        await api.delete(`/productoras/${id}`);
        fetchProductoras();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="glass-card">
      <div className="admin-page-header">
        <h2>Gestión de Productoras</h2>
        <span className="badge">{productoras.length} productoras</span>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Nombre (*)</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Slogan</label>
          <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="primary-btn">{editId ? 'Actualizar' : 'Añadir'}</button>
        {editId && (
           <button type="button" className="danger-btn ml-2" onClick={() => { setEditId(null); setNombre(''); setSlogan(''); setDescripcion(''); setEstado('activo'); }}>Cancelar</button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slogan</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map(prod => (
            <tr key={prod._id}>
              <td>{prod.nombre}</td>
              <td style={{opacity: 0.7}}>{prod.slogan || '--'}</td>
              <td><span className={prod.estado === 'activo' ? 'text-green' : 'text-red'}>{prod.estado}</span></td>
              <td>
                <button className="primary-btn sm-btn mr-2" onClick={() => handleEdit(prod)}>Editar</button>
                <button className="danger-btn sm-btn" onClick={() => handleDelete(prod._id)}>Borrar</button>
              </td>
            </tr>
          ))}
          {productoras.length === 0 && (
            <tr><td colSpan="4" className="text-center">No hay productoras.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductoraPage;
