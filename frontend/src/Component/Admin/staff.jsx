import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Staff = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [staff, setStaff] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterRole, setFilterRole] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [error, setError] = useState('');
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '', role: '', password: '' });
  const [editForm, setEditForm] = useState({ name: '', phone: '', role: '' });

  useEffect(() => { loadStaff(); }, []);

  useEffect(() => {
    setFiltered(filterRole ? staff.filter(u => u.role === filterRole) : staff);
  }, [filterRole, staff]);

  const loadStaff = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/users`, { headers });
      const staffOnly = res.data.filter(u => ['manager', 'receptionist', 'housekeeping', 'maintenance'].includes(u.role));
      setStaff(staffOnly);
      setFiltered(staffOnly);
    } catch (err) { console.error(err); }
  };

  const stats = {
    total: staff.length,
    receptionist: staff.filter(u => u.role === 'receptionist').length,
    housekeeping: staff.filter(u => u.role === 'housekeeping').length,
    maintenance: staff.filter(u => u.role === 'maintenance').length,
  };

  const roleBadge = (role) => {
    const map = {
      manager:      'bg-purple-subtle text-purple',
      receptionist: 'bg-info-subtle text-info',
      housekeeping: 'bg-success-subtle text-success',
      maintenance:  'bg-warning-subtle text-warning'
    };
    return <span className={`badge ${map[role] || 'bg-secondary'}`}>{role}</span>;
  };

  const handleAdd = async () => {
    setError('');
    const { name, email, phone, role, password } = addForm;
    if (!name || !email || !phone || !role || !password) { setError('All fields are required.'); return; }
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, phone, password, role }, { headers });
      setShowAddModal(false);
      setAddForm({ name: '', email: '', phone: '', role: '', password: '' });
      loadStaff();
    } catch (err) { setError(err.response?.data?.message || 'Error adding staff.'); }
  };

  const handleEdit = async () => {
    setError('');
    try {
      await axios.put(`${API_URL}/auth/users/${selectedStaff._id}`, editForm, { headers });
      setShowEditModal(false);
      loadStaff();
    } catch (err) { setError(err.response?.data?.message || 'Error updating staff.'); }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/auth/users/${selectedStaff._id}`, { headers });
      setShowDeleteModal(false);
      loadStaff();
    } catch (err) { console.error(err); }
  };

  const openEdit = (u) => {
    setSelectedStaff(u);
    setEditForm({ name: u.name, phone: u.phone || '', role: u.role });
    setError('');
    setShowEditModal(true);
  };

  const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger'];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Staff</h4>
            <button className="btn btn-success" onClick={() => { setAddForm({ name: '', email: '', phone: '', role: '', password: '' }); setError(''); setShowAddModal(true); }}>
              <i className="ri-user-add-line me-1"></i> Add Staff Member
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          { label: 'Total Staff', value: stats.total, icon: 'bx bx-group', color: 'primary' },
          { label: 'Receptionists', value: stats.receptionist, icon: 'bx bx-headphone', color: 'info' },
          { label: 'Housekeeping', value: stats.housekeeping, icon: 'bx bx-brush', color: 'success' },
          { label: 'Maintenance', value: stats.maintenance, icon: 'bx bx-wrench', color: 'warning' },
        ].map((s, i) => (
          <div className="col-md-3 col-6" key={i}>
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className={`avatar-title bg-${s.color}-subtle rounded fs-3`}>
                      <i className={`${s.icon} text-${s.color}`}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-medium text-muted mb-1 fs-12">{s.label}</p>
                    <h4 className="mb-0 fw-semibold">{s.value}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h5 className="card-title mb-0 flex-grow-1">Staff Members</h5>
          <select className="form-select form-select-sm w-auto" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="manager">Manager</option>
            <option value="receptionist">Receptionist</option>
            <option value="housekeeping">Housekeeping</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4 text-muted">No staff members found.</td></tr>
                ) : filtered.map((u, i) => {
                  const initials = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr key={u._id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-xs">
                            <span className={`avatar-title rounded-circle ${colors[i % colors.length]} text-white`} style={{ fontSize: '11px' }}>{initials}</span>
                          </div>
                          <div className="fw-medium">{u.name}</div>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone || '—'}</td>
                      <td>{roleBadge(u.role)}</td>
                      <td><small className="text-muted">{new Date(u.createdAt).toLocaleDateString('en-PK')}</small></td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-soft-primary btn-sm" onClick={() => openEdit(u)}><i className="ri-edit-line"></i></button>
                          <button className="btn btn-soft-danger btn-sm" onClick={() => { setSelectedStaff(u); setShowDeleteModal(true); }}><i className="ri-delete-bin-line"></i></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Staff Member</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-3">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter full name' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'Enter email' },
                    { label: 'Phone', key: 'phone', type: 'text', placeholder: '03001234567' },
                    { label: 'Password', key: 'password', type: 'password', placeholder: 'Set password' },
                  ].map(f => (
                    <div className="col-12" key={f.key}>
                      <label className="form-label">{f.label} <span className="text-danger">*</span></label>
                      <input type={f.type} className="form-control" placeholder={f.placeholder}
                        value={addForm[f.key]} onChange={e => setAddForm({ ...addForm, [f.key]: e.target.value })} />
                    </div>
                  ))}
                  <div className="col-12">
                    <label className="form-label">Role <span className="text-danger">*</span></label>
                    <select className="form-select" value={addForm.role} onChange={e => setAddForm({ ...addForm, role: e.target.value })}>
                      <option value="">Select Role</option>
                      <option value="manager">Manager</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="housekeeping">Housekeeping</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleAdd}>Add Staff</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Staff Member</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone</label>
                    <input className="form-control" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
                      <option value="manager">Manager</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="housekeeping">Housekeeping</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <div className="avatar-md mx-auto mb-3">
                  <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                    <i className="ri-delete-bin-line text-danger"></i>
                  </span>
                </div>
                <h5>Delete Staff Member?</h5>
                <p className="text-muted">This action cannot be undone.</p>
                <div className="d-flex gap-2 justify-content-center">
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

export default Staff;