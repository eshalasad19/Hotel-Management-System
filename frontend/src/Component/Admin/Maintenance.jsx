import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Maintenance = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [rooms, setRooms] = useState([]);
  const [maintStaff, setMaintStaff] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [addForm, setAddForm] = useState({ roomId: '', issue: '' });
  const [updateForm, setUpdateForm] = useState({ status: 'pending', assignedTo: '' });
  const [error, setError] = useState('');

  useEffect(() => { loadRequests(); }, []);

  useEffect(() => {
    setFiltered(filterStatus ? requests.filter(r => r.status === filterStatus) : requests);
  }, [filterStatus, requests]);

  const loadRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/maintenance`, { headers });
      setRequests(res.data);
      setFiltered(res.data);
    } catch (err) { console.error(err); }
  };

  const loadModalData = async () => {
    try {
      const [roomsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/rooms`, { headers }),
        axios.get(`${API_URL}/auth/users`, { headers })
      ]);
      setRooms(roomsRes.data);
      setMaintStaff(usersRes.data.filter(u => u.role === 'maintenance'));
    } catch (err) { console.error(err); }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    resolved: requests.filter(r => r.status === 'resolved').length,
  };

  const statusBadge = (status) => {
    const map = {
      pending:     'bg-warning-subtle text-warning',
      in_progress: 'bg-primary-subtle text-primary',
      resolved:    'bg-success-subtle text-success'
    };
    return <span className={`badge ${map[status]}`}>{status.replace('_', ' ')}</span>;
  };

  const handleAdd = async () => {
    setError('');
    if (!addForm.roomId || !addForm.issue) { setError('Please select room and describe the issue.'); return; }
    try {
      await axios.post(`${API_URL}/maintenance`, { roomId: addForm.roomId, issue: addForm.issue }, { headers });
      setShowAddModal(false);
      setAddForm({ roomId: '', issue: '' });
      loadRequests();
    } catch (err) { setError(err.response?.data?.message || 'Error adding request.'); }
  };

  const handleUpdate = async () => {
    try {
      const body = { status: updateForm.status };
      if (updateForm.assignedTo) body.assignedTo = updateForm.assignedTo;
      await axios.put(`${API_URL}/maintenance/${selectedRequest._id}`, body, { headers });
      setShowUpdateModal(false);
      loadRequests();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/maintenance/${selectedRequest._id}`, { headers });
      setShowDeleteModal(false);
      loadRequests();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Maintenance Requests</h4>
            <button className="btn btn-success" onClick={() => { loadModalData(); setAddForm({ roomId: '', issue: '' }); setError(''); setShowAddModal(true); }}>
              <i className="ri-add-line me-1"></i> Add Request
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          { label: 'Total Requests', value: stats.total, icon: 'bx bx-list-ul', color: 'info' },
          { label: 'Pending', value: stats.pending, icon: 'bx bx-time', color: 'warning' },
          { label: 'In Progress', value: stats.inProgress, icon: 'bx bx-loader', color: 'primary' },
          { label: 'Resolved', value: stats.resolved, icon: 'bx bx-check-circle', color: 'success' },
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
          <h5 className="card-title mb-0 flex-grow-1">All Maintenance Requests</h5>
          <select className="form-select form-select-sm w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>#</th><th>Room</th><th>Issue</th><th>Reported By</th><th>Assigned To</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-4 text-muted">No maintenance requests found.</td></tr>
                ) : filtered.map((r, i) => (
                  <tr key={r._id}>
                    <td>{i + 1}</td>
                    <td><span className="fw-medium">{r.roomId ? `Room ${r.roomId.roomNumber}` : '—'}</span></td>
                    <td><span className="text-muted">{r.issue}</span></td>
                    <td>{r.reportedBy?.name || '—'}</td>
                    <td>{r.assignedTo?.name || <span className="text-muted">Not assigned</span>}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td><small className="text-muted">{new Date(r.createdAt).toLocaleDateString('en-PK')}</small></td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-soft-primary btn-sm" title="Update" onClick={() => {
                          loadModalData();
                          setSelectedRequest(r);
                          setUpdateForm({ status: r.status, assignedTo: r.assignedTo?._id || '' });
                          setShowUpdateModal(true);
                        }}>
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="btn btn-soft-danger btn-sm" title="Delete" onClick={() => { setSelectedRequest(r); setShowDeleteModal(true); }}>
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                <h5 className="modal-title">Add Maintenance Request</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Select Room <span className="text-danger">*</span></label>
                    <select className="form-select" value={addForm.roomId} onChange={e => setAddForm({ ...addForm, roomId: e.target.value })}>
                      <option value="">Select Room</option>
                      {rooms.map(r => <option key={r._id} value={r._id}>Room {r.roomNumber} ({r.type})</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Issue Description <span className="text-danger">*</span></label>
                    <textarea className="form-control" rows="3" value={addForm.issue}
                      onChange={e => setAddForm({ ...addForm, issue: e.target.value })}
                      placeholder="Describe the maintenance issue..."></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleAdd}>Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Maintenance Request</h5>
                <button className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={updateForm.status} onChange={e => setUpdateForm({ ...updateForm, status: e.target.value })}>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Assign Staff</label>
                    <select className="form-select" value={updateForm.assignedTo} onChange={e => setUpdateForm({ ...updateForm, assignedTo: e.target.value })}>
                      <option value="">Not Assigned</option>
                      {maintStaff.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
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
                <h5>Delete Request?</h5>
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

export default Maintenance;