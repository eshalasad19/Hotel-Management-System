import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const CATEGORIES = ['Desi', 'Italian', 'Chinese', 'FastFood'];

const RestaurantMenu = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const emptyForm = { name: '', description: '', price: '', category: 'Desi', image: '', isAvailable: true };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { loadMenu(); }, []);

  useEffect(() => {
    setFiltered(filterCategory ? items.filter(i => i.category === filterCategory) : items);
  }, [filterCategory, items]);

  const loadMenu = async () => {
    try {
      const res = await axios.get(`${API_URL}/restaurant/menu`, { headers });
      setItems(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const stats = {
    total: items.length,
    available: items.filter(i => i.isAvailable).length,
    categories: [...new Set(items.map(i => i.category))].length,
  };

  const handleAdd = async () => {
    setError('');
    if (!form.name || !form.price || !form.category) {
      setError('Name, price, and category are required.');
      return;
    }
    try {
      await axios.post(`${API_URL}/restaurant/menu`, { ...form, price: Number(form.price) }, { headers });
      setShowAddModal(false);
      setForm(emptyForm);
      loadMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item.');
    }
  };

  const handleEdit = async () => {
    setError('');
    try {
      await axios.put(`${API_URL}/restaurant/menu/${selected._id}`, { ...form, price: Number(form.price) }, { headers });
      setShowEditModal(false);
      loadMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/restaurant/menu/${selected._id}`, { headers });
      setShowDeleteModal(false);
      loadMenu();
    } catch (err) { console.error(err); }
  };

  const openEdit = (item) => {
    setSelected(item);
    setForm({
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
      image: item.image || '',
      isAvailable: item.isAvailable,
    });
    setError('');
    setShowEditModal(true);
  };

  const formatPKR = (n) => 'PKR ' + Number(n).toLocaleString('en-PK');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Restaurant Menu</h4>
            <button className="btn btn-success" onClick={() => { setForm(emptyForm); setError(''); setShowAddModal(true); }}>
              <i className="ri-add-line me-1"></i> Add Menu Item
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {[
          { label: 'Total Items', value: stats.total, icon: 'ri-restaurant-line', color: 'primary' },
          { label: 'Available', value: stats.available, icon: 'ri-checkbox-circle-line', color: 'success' },
          { label: 'Categories', value: stats.categories, icon: 'ri-price-tag-3-line', color: 'info' },
        ].map((s, i) => (
          <div className="col-md-4" key={i}>
            <div className="card card-animate">
              <div className="card-body d-flex align-items-center gap-3">
                <span className={`avatar-sm avatar-title bg-${s.color}-subtle rounded fs-3`}>
                  <i className={`${s.icon} text-${s.color}`}></i>
                </span>
                <div>
                  <p className="text-muted mb-1 fs-12 text-uppercase">{s.label}</p>
                  <h4 className="mb-0">{s.value}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header d-flex align-items-center flex-wrap gap-2">
          <h5 className="card-title mb-0 flex-grow-1">Menu Items</h5>
          <select className="form-select form-select-sm w-auto" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>#</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-4 text-muted">No menu items yet.</td></tr>
                ) : filtered.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="fw-medium">{item.name}</div>
                      {item.description && <small className="text-muted">{item.description}</small>}
                    </td>
                    <td><span className="badge bg-primary-subtle text-primary">{item.category}</span></td>
                    <td>{formatPKR(item.price)}</td>
                    <td>
                      <span className={`badge ${item.isAvailable ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-soft-primary btn-sm me-1" onClick={() => openEdit(item)}><i className="ri-pencil-line"></i></button>
                      <button className="btn btn-soft-danger btn-sm" onClick={() => { setSelected(item); setShowDeleteModal(true); }}><i className="ri-delete-bin-line"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Add Menu Item</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <MenuForm form={form} setForm={setForm} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleAdd}>Add Item</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Edit Menu Item</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <MenuForm form={form} setForm={setForm} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <h5>Delete &quot;{selected?.name}&quot;?</h5>
                <p className="text-muted">This cannot be undone.</p>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuForm = ({ form, setForm }) => (
  <>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
    </div>
    <div className="mb-3">
      <label className="form-label">Description</label>
      <textarea className="form-control" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
    </div>
    <div className="row">
      <div className="col-6 mb-3">
        <label className="form-label">Price (PKR)</label>
        <input type="number" className="form-control" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      </div>
      <div className="col-6 mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
    <div className="mb-3">
      <label className="form-label">Image URL (optional)</label>
      <input className="form-control" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
    </div>
    <div className="form-check">
      <input type="checkbox" className="form-check-input" id="avail" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} />
      <label className="form-check-label" htmlFor="avail">Available for ordering</label>
    </div>
  </>
);

export default RestaurantMenu;