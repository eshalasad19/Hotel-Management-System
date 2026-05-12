import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Feedback = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [feedbacks, setFeedbacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterRating, setFilterRating] = useState('');

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-sm-0">Feedback Management</h4>
          </div>
        </div>
      </div>

      {/* Stats */}
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

      {/* Table */}
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h5 className="card-title mb-0 flex-grow-1">All Feedback</h5>
          <select className="form-select form-select-sm w-auto" value={filterRating} onChange={e => setFilterRating(e.target.value)}>
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>#</th><th>Guest</th><th>Rating</th><th>Review</th><th>Date</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4 text-muted">No feedback found.</td></tr>
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
                            <small className="text-muted">{f.userId?.email?.includes('@walkin.hotel') ? 'Walk-in Guest' : f.userId?.email || ''}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{ratingBadge(f.rating)}</div>
                        <small>{stars(f.rating)}</small>
                      </td>
                      <td><span className="text-muted">{f.review}</span></td>
                      <td><small className="text-muted">{new Date(f.createdAt).toLocaleDateString('en-PK')}</small></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;