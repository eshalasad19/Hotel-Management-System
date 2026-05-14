import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const BookingNew = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    guestName: '', guestPhone: '', guestEmail: '', guestCnic: '',
    roomId: '', checkIn: '', checkOut: '', guests: 1,
    paymentMethod: 'cash', specialRequests: ''
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => { loadRooms(); }, []);

  const loadRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/rooms`, { headers });
      setRooms(res.data.filter(r => r.status === 'available'));
    } catch (err) { console.error(err); }
  };

  const calcSummary = (roomId, checkIn, checkOut) => {
    const room = rooms.find(r => r._id === roomId);
    if (!room || !checkIn || !checkOut) { setSummary(null); return; }
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    if (days <= 0) { setSummary(null); return; }
    setSummary({ room, days, total: days * room.price });
  };

  const handleChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    calcSummary(
      field === 'roomId' ? value : newForm.roomId,
      field === 'checkIn' ? value : newForm.checkIn,
      field === 'checkOut' ? value : newForm.checkOut
    );
  };

  const handleSubmit = async () => {
    setError(''); setSuccess('');
    if (!form.guestName) { setError('Guest name is required.'); return; }
    if (!form.guestPhone) { setError('Guest phone is required.'); return; }
    if (!form.roomId) { setError('Please select a room.'); return; }
    if (!form.checkIn || !form.checkOut) { setError('Check-in and check-out dates are required.'); return; }
    if (!summary) { setError('Invalid dates selected.'); return; }

    setLoading(true);
    try {
      const email = form.guestEmail || `${form.guestPhone}@walkin.hotel`;

      // Register guest
      let userId = null;
      try {
        const regRes = await axios.post(`${API_URL}/auth/register`, {
          name: form.guestName, email, phone: form.guestPhone,
          password: form.guestPhone, role: 'guest'
        }, { headers });
        userId = regRes.data.user._id;
      } catch {
        // Already exists — login
        try {
          const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email, password: form.guestPhone
          }, { headers });
          userId = loginRes.data.user.id;
        } catch { setError('Could not create guest. Try again.'); setLoading(false); return; }
      }

      // Create booking
      await axios.post(`${API_URL}/bookings`, {
        roomId: form.roomId, userId,
        checkInDate: form.checkIn, checkOutDate: form.checkOut,
        guests: form.guests, totalAmount: summary.total,
        specialRequests: form.specialRequests, bookingStatus: 'confirmed'
      }, { headers });

      setSuccess(`Booking created! Guest: ${form.guestName} | Room: ${summary.room.roomNumber} | PKR ${summary.total.toLocaleString()}`);
      setTimeout(() => navigate('/admin/bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating booking.');
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">New Booking</h4>
            <button className="btn btn-light" onClick={() => navigate('/admin/bookings')}>
              <i className="ri-arrow-left-line me-1"></i> Back to Bookings
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="row g-3">
            {/* Guest Info */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0"><i className="ri-user-line me-2 text-primary"></i>Guest Information</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Guest Name <span className="text-danger">*</span></label>
                      <input className="form-control" value={form.guestName} onChange={e => handleChange('guestName', e.target.value)} placeholder="Full name" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Phone <span className="text-danger">*</span></label>
                      <input className="form-control" value={form.guestPhone} onChange={e => handleChange('guestPhone', e.target.value)} placeholder="03001234567" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={form.guestEmail} onChange={e => handleChange('guestEmail', e.target.value)} placeholder="Optional" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">CNIC</label>
                      <input className="form-control" value={form.guestCnic} onChange={e => handleChange('guestCnic', e.target.value)} placeholder="42101-1234567-1" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Special Requests</label>
                      <textarea className="form-control" rows="2" value={form.specialRequests} onChange={e => handleChange('specialRequests', e.target.value)} placeholder="Any special requests..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0"><i className="ri-calendar-check-line me-2 text-success"></i>Booking Details</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Select Room <span className="text-danger">*</span></label>
                      <select className="form-select" value={form.roomId} onChange={e => handleChange('roomId', e.target.value)}>
                        <option value="">Select Available Room</option>
                        {rooms.map(r => (
                          <option key={r._id} value={r._id}>
                            Room {r.roomNumber} — {r.type} — PKR {Number(r.price).toLocaleString()}/night
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label">Check In <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" min={today} value={form.checkIn} onChange={e => handleChange('checkIn', e.target.value)} />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Check Out <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" min={form.checkIn || today} value={form.checkOut} onChange={e => handleChange('checkOut', e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Number of Guests</label>
                      <input type="number" className="form-control" min="1" value={form.guests} onChange={e => handleChange('guests', e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select" value={form.paymentMethod} onChange={e => handleChange('paymentMethod', e.target.value)}>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            {summary && (
              <div className="col-12">
                <div className="card border border-success">
                  <div className="card-header bg-success-subtle">
                    <h5 className="card-title mb-0 text-success"><i className="ri-file-list-3-line me-2"></i>Booking Summary</h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Room</p>
                        <h6 className="fw-semibold">Room {summary.room.roomNumber}</h6>
                      </div>
                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Type</p>
                        <h6 className="fw-semibold">{summary.room.type}</h6>
                      </div>
                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Price/Night</p>
                        <h6 className="fw-semibold">PKR {Number(summary.room.price).toLocaleString()}</h6>
                      </div>
                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Nights</p>
                        <h6 className="fw-semibold">{summary.days}</h6>
                      </div>
                      <div className="col-12 border-top pt-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fs-15 text-muted">Total Amount:</span>
                          <span className="fs-20 fw-bold text-success">PKR {summary.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-12 text-end">
              <button className="btn btn-light me-2" onClick={() => navigate('/admin/bookings')}>Cancel</button>
              <button className="btn btn-success btn-lg" onClick={handleSubmit} disabled={loading}>
                <i className="ri-calendar-check-line me-1"></i>
                {loading ? 'Creating...' : 'Create Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingNew;