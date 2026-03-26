import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminMediaPage() {
  const [medias, setMedias] = useState([]);
  
  // Dependencias para los Dropdowns
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Estado del Formulario
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    URL: '',
    Imagen: '',
    anioEstreno: new Date().getFullYear(),
    generoPrincipal: '',
    directorPrincipal: '',
    productora: '',
    tipo: ''
  });

  const fetchData = async () => {
    try {
      const [resMedias, resGen, resDir, resProd, resTip] = await Promise.all([
        api.get('/medias'),
        api.get('/generos'),
        api.get('/directores'),
        api.get('/productoras'),
        api.get('/tipos')
      ]);
      setMedias(Array.isArray(resMedias.data) ? resMedias.data : []);
      setGeneros(resGen.data);
      setDirectores(resDir.data);
      setProductoras(resProd.data);
      setTipos(resTip.data);
    } catch (err) {
      console.error("Error obteniendo catálogos:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      titulo: '', sinopsis: '', URL: '', Imagen: '', anioEstreno: new Date().getFullYear(),
      generoPrincipal: '', directorPrincipal: '', productora: '', tipo: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica de conversión Texto -> ID (Con Autocreación)
      let d = directores.find(x => x.nombres.toLowerCase() === formData.directorPrincipal.toLowerCase().trim());
      let g = generos.find(x => x.nombre.toLowerCase() === formData.generoPrincipal.toLowerCase().trim());
      let p = productoras.find(x => x.nombre.toLowerCase() === formData.productora.toLowerCase().trim());
      let t = tipos.find(x => x.nombre.toLowerCase() === formData.tipo.toLowerCase().trim());

      // Si el usuario tecleó algo nuevo, crearlo al vuelo transparente al usuario:
      if (!d && formData.directorPrincipal.trim() !== '') {
        const res = await api.post('/directores', { nombres: formData.directorPrincipal.trim(), estado: 'activo' });
        d = res.data;
      }
      if (!g && formData.generoPrincipal.trim() !== '') {
        const res = await api.post('/generos', { nombre: formData.generoPrincipal.trim(), estado: 'activo' });
        g = res.data;
      }
      if (!p && formData.productora.trim() !== '') {
        const res = await api.post('/productoras', { nombre: formData.productora.trim(), estado: 'activo' });
        p = res.data;
      }
      if (!t && formData.tipo.trim() !== '') {
        const res = await api.post('/tipos', { nombre: formData.tipo.trim(), descripcion: '' });
        t = res.data;
      }

      if (!d || !g || !p || !t) return alert("Por favor completa todos los campos requeridos correctamente.");

      const payload = {
        ...formData,
        directorPrincipal: d._id,
        generoPrincipal: g._id,
        productora: p._id,
        tipo: t._id
      };

      if (editId) {
        await api.put(`/medias/${editId}`, payload);
      } else {
        await api.post('/medias', payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Ocurrió un error");
    }
  };

  const handleEdit = (med) => {
    setEditId(med._id);
    setFormData({
      titulo: med.titulo || '',
      sinopsis: med.sinopsis || '',
      URL: med.URL || '',
      Imagen: med.Imagen || '',
      anioEstreno: med.anioEstreno || new Date().getFullYear(),
      generoPrincipal: med.generoPrincipal?.nombre || '',
      directorPrincipal: med.directorPrincipal?.nombres || '',
      productora: med.productora?.nombre || '',
      tipo: med.tipo?.nombre || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta película?")) {
      try {
        await api.delete(`/medias/${id}`);
        fetchData();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="glass-card">
      <div className="admin-page-header">
        <h2>Gestión de Películas (Media)</h2>
        <span className="badge">{medias.length} registros</span>
      </div>

      <form onSubmit={handleSubmit} className="admin-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Título (*)</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Sinopsis</label>
          <textarea name="sinopsis" value={formData.sinopsis} onChange={handleChange} rows="2" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white' }}></textarea>
        </div>
        <div className="form-group">
          <label>URL Video</label>
          <input type="url" name="URL" value={formData.URL} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label>URL Imagen/Póster</label>
          <input type="url" name="Imagen" value={formData.Imagen} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label>Año de Estreno</label>
          <input type="number" name="anioEstreno" value={formData.anioEstreno} onChange={handleChange} min="1800" max="2100" />
        </div>

        {/* Entradas Manuales Relacionales */}
        <div className="form-group">
          <label>Género Principal</label>
          <input type="text" name="generoPrincipal" value={formData.generoPrincipal} onChange={handleChange} required placeholder="Ej: Ciencia Ficción" />
        </div>
        <div className="form-group">
          <label>Director Principal</label>
          <input type="text" name="directorPrincipal" value={formData.directorPrincipal} onChange={handleChange} required placeholder="Ej: Steven Spielberg" />
        </div>
        <div className="form-group">
          <label>Productora</label>
          <input type="text" name="productora" value={formData.productora} onChange={handleChange} required placeholder="Ej: Warner Bros" />
        </div>
        <div className="form-group">
          <label>Tipo Formato</label>
          <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required placeholder="Ej: Película, Serie, Documental" />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="primary-btn">{editId ? 'Guardar Cambios' : 'Registrar Película'}</button>
          {editId && <button type="button" className="danger-btn" onClick={resetForm}>Cancelar Edición</button>}
        </div>
      </form>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Título</th>
              <th>Estreno</th>
              <th>Director</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medias.map(med => (
              <tr key={med._id}>
                <td><span className="badge" style={{ background: '#10b981', color: 'white' }}>{med.serial}</span></td>
                <td>{med.titulo}</td>
                <td>{med.anioEstreno}</td>
                <td style={{opacity: 0.7}}>{med.directorPrincipal?.nombres || '--'}</td>
                <td style={{opacity: 0.7}}>{med.generoPrincipal?.nombre || '--'}</td>
                <td>
                  <button className="primary-btn sm-btn mr-2" onClick={() => handleEdit(med)}>Editar</button>
                  <button className="danger-btn sm-btn" onClick={() => handleDelete(med._id)}>Borrar</button>
                </td>
              </tr>
            ))}
            {medias.length === 0 && (
              <tr><td colSpan="6" className="text-center">No hay películas registradas.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMediaPage;
