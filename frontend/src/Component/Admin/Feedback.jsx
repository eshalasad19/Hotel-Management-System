import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Feedback = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const isAdmin = user.role === 'admin';

  const [feedbacks, setFeedbacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterRating, setFilterRating] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { loadFeedbacks(); }, []);

  useEffect(() => {
    setFiltered(filterRating ? feedbacks.filter(f => f.rating === Number(filterRating)) : feedbacks);
  }, [filterRating, feedbacks]);

  const loadFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_URL}/feedbacks`, { headers });
      setFeedbacks(res.data);
      setFiltered(res.data);
    } catch (err) { console.error(err); }
  };

  const avg = feedbacks.length > 0
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  const stars = (rating) => '⭐'.repeat(rating);

  const ratingBadge = (rating) => {
    const color = rating >= 4 ? 'success' : rating === 3 ? 'warning' : 'danger';
    return <span className={`badge bg-${color}-subtle text-${color}`}>{rating}/5</span>;
  };

  const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger'];

  const handleReply = async () => {
    setError('');
    if (!replyText.trim()) { setError('Please enter a reply.'); return; }
    try {
      await axios.put(`${API_URL}/feedbacks/${selected._id}/reply`, { adminReply: replyText }, { headers });
      setShowReplyModal(false);
      setReplyText('');
      loadFeedbacks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save reply.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/feedbacks/${selected._id}`, { headers });
      setShowDeleteModal(false);
      loadFeedbacks();
    } catch (err) { console.error(err); }
  };

  const openReply = (f) => {
    setSelected(f);
    setReplyText(f.adminReply || '');
    setError('');
    setShowReplyModal(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-sm-0">Feedback Management</h4>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 col-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-info-subtle rounded fs-3"><i className="bx bx-message-dots text-info"></i></span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1 fs-12">Total Reviews</p>
                  <h4 className="mb-0 fw-semibold">{feedbacks.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-warning-subtle rounded fs-3"><i className="bx bx-star text-warning"></i></span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1 fs-12">Average Rating</p>
                  <h4 className="mb-0 fw-semibold">{avg} / 5</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-success-subtle rounded fs-3"><i className="bx bx-happy text-success"></i></span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1 fs-12">Positive (4-5⭐)</p>
                  <h4 className="mb-0 fw-semibold">{feedbacks.filter(f => f.rating >= 4).length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-danger-subtle rounded fs-3"><i className="bx bx-sad text-danger"></i></span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1 fs-12">Negative (1-2⭐)</p>
                  <h4 className="mb-0 fw-semibold">{feedbacks.filter(f => f.rating <= 2).length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h5 className="card-title mb-0 flex-grow-1">All Feedback</h5>
          <select className="form-select form-select-sm w-auto" value={filterRating} onChange={e => setFilterRating(e.target.value)}>
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>#</th><th>Guest</th><th>Rating</th><th>Review</th><th>Admin Reply</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4 text-muted">No feedback found.</td></tr>
                ) : filtered.map((f, i) => {
                  const name = f.userId?.name || 'Guest';
                  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr key={f._id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-xs">
                            <span className={`avatar-title rounded-circle ${colors[i % colors.length]} text-white`} style={{ fontSize: '11px' }}>{initials}</span>
                          </div>
                          <div>
                            <div className="fw-medium">{name}</div>
                            <small className="text-muted">{f.userId?.email || ''}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{ratingBadge(f.rating)}</div>
                        <small>{stars(f.rating)}</small>
                      </td>
                      <td><span className="text-muted">{f.review}</span></td>
                      <td>
                        {f.adminReply ? (
                          <div>
                            <span className="text-success">{f.adminReply}</span>
                            {f.repliedAt && <small className="d-block text-muted">{new Date(f.repliedAt).toLocaleDateString('en-PK')}</small>}
                          </div>
                        ) : (
                          <span className="text-muted fst-italic">No reply yet</span>
                        )}
                      </td>
                      <td><small className="text-muted">{new Date(f.createdAt).toLocaleDateString('en-PK')}</small></td>
                      <td>
                        <button className="btn btn-soft-primary btn-sm me-1" onClick={() => openReply(f)} title="Reply">
                          <i className="ri-reply-line"></i>
                        </button>
                        {isAdmin && (
                          <button className="btn btn-soft-danger btn-sm" onClick={() => { setSelected(f); setShowDeleteModal(true); }} title="Delete">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showReplyModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reply to {selected?.userId?.name || 'Guest'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowReplyModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 p-3 bg-light rounded">
                  <small className="text-muted d-block mb-1">Guest review ({selected?.rating}/5)</small>
                  <em>{selected?.review}</em>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <label className="form-label">Your reply</label>
                <textarea className="form-control" rows={4} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Thank the guest or address their concerns..." />
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowReplyModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleReply}>Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && isAdmin && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <h5>Delete this feedback?</h5>
                <p className="text-muted">This action cannot be undone.</p>
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

export default Feedback;
