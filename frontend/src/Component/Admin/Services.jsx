import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const SERVICE_TYPES = ['room_service', 'laundry', 'wake_up_call', 'transportation'];

const Services = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState('pending');

  useEffect(() => { loadServices(); }, []);

  useEffect(() => {
    setFiltered(filterStatus ? services.filter(s => s.status === filterStatus) : services);
  }, [filterStatus, services]);

  const loadServices = async () => {
    try {
      const res = await axios.get(`${API_URL}/services`, { headers });
      setServices(res.data);
    } catch (err) { console.error(err); }
  };

  const stats = {
    total: services.length,
    pending: services.filter(s => s.status === 'pending').length,
    inProgress: services.filter(s => s.status === 'in_progress').length,
    completed: services.filter(s => s.status === 'completed').length,
  };

  const typeLabel = (t) => t?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '—';

  const statusBadge = (status) => {
    const map = {
      pending: 'bg-warning-subtle text-warning',
      in_progress: 'bg-primary-subtle text-primary',
      completed: 'bg-success-subtle text-success',
      cancelled: 'bg-danger-subtle text-danger',
    };
    return <span className={`badge ${map[status] || 'bg-secondary'}`}>{status?.replace('_', ' ')}</span>;
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${API_URL}/services/${selected._id}`, { status: newStatus }, { headers });
      setShowUpdateModal(false);
      loadServices();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-sm-0">Guest Service Requests</h4>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {[
          { label: 'Total Requests', value: stats.total, color: 'primary' },
          { label: 'Pending', value: stats.pending, color: 'warning' },
          { label: 'In Progress', value: stats.inProgress, color: 'info' },
          { label: 'Completed', value: stats.completed, color: 'success' },
        ].map((s, i) => (
          <div className="col-md-3" key={i}>
            <div className="card card-animate">
              <div className="card-body">
                <p className="text-muted mb-1 fs-12 text-uppercase">{s.label}</p>
                <h4 className={`mb-0 text-${s.color}`}>{s.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header d-flex align-items-center gap-2">
          <h5 className="card-title mb-0 flex-grow-1">All Service Requests</h5>
          <select className="form-select form-select-sm w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th><th>Guest</th><th>Service</th><th>Description</th><th>Status</th><th>Requested</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4 text-muted">No service requests.</td></tr>
                ) : filtered.map((s, i) => (
                  <tr key={s._id}>
                    <td>{i + 1}</td>
                    <td className="fw-medium">{s.userId?.name || 'Guest'}</td>
                    <td><span className="badge bg-info-subtle text-info">{typeLabel(s.serviceType)}</span></td>
                    <td><small>{s.description || '—'}</small></td>
                    <td>{statusBadge(s.status)}</td>
                    <td><small className="text-muted">{new Date(s.createdAt).toLocaleString('en-PK')}</small></td>
                    <td>
                      <button className="btn btn-soft-primary btn-sm" onClick={() => { setSelected(s); setNewStatus(s.status); setShowUpdateModal(true); }}>
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Update Status</h5>
                <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <select className="form-select" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdateStatus}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
