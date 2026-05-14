import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Users = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => { loadUsers(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(users.filter(u => u.name.toLowerCase().includes(q) || (u.email && u.email.toLowerCase().includes(q))));
  }, [search, users]);

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/users`, { headers });
      const guests = res.data.filter(u => u.role === 'guest');
      setUsers(guests);
      setFiltered(guests);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/auth/users/${selectedUser._id}`, { headers });
      setShowDeleteModal(false);
      loadUsers();
    } catch (err) { console.error(err); }
  };

  const walkinCount = users.filter(u => u.email?.includes('@walkin.hotel')).length;
  const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger'];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Registered Users (Guests)</h4>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          { label: 'Total Users', value: users.length, icon: 'bx bx-user', color: 'info' },
          { label: 'Online Guests', value: users.length - walkinCount, icon: 'bx bx-user-check', color: 'success' },
          { label: 'Walk-in Guests', value: walkinCount, icon: 'bx bx-user-x', color: 'warning' },
        ].map((s, i) => (
          <div className="col-md-4" key={i}>
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
          <h5 className="card-title mb-0 flex-grow-1">All Registered Users</h5>
          <input type="text" className="form-control form-control-sm w-auto" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Registered</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4 text-muted">No users found.</td></tr>
                ) : filtered.map((u, i) => {
                  const isWalkin = u.email?.includes('@walkin.hotel');
                  const initials = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr key={u._id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-xs">
                            <span className={`avatar-title rounded-circle ${colors[i % colors.length]} text-white`} style={{ fontSize: '11px' }}>{initials}</span>
                          </div>
                          <div>
                            <div className="fw-medium">{u.name}</div>
                            {isWalkin && <small className="text-muted">Walk-in Guest</small>}
                          </div>
                        </div>
                      </td>
                      <td>{isWalkin ? <span className="text-muted">—</span> : u.email}</td>
                      <td>{u.phone || '—'}</td>
                      <td><span className="badge bg-info-subtle text-info">{isWalkin ? 'Walk-in' : 'Online'}</span></td>
                      <td><small className="text-muted">{new Date(u.createdAt).toLocaleDateString('en-PK')}</small></td>
                      <td>
                        <button className="btn btn-soft-danger btn-sm" onClick={() => { setSelectedUser(u); setShowDeleteModal(true); }}>
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                <h5>Delete User?</h5>
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

export default Users;