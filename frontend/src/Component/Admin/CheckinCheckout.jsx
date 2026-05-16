import { useState, useEffect } from 'react';
import axios from 'axios';
// Page
const API_URL = 'http://localhost:5001/api';

const CheckinCheckout = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [bookings, setBookings] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('paid');
  const [activeTab, setActiveTab] = useState('checkin');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStr = today.toLocaleDateString('en-PK', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => { loadBookings(); }, []);

  const loadBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings/all`, { headers });
      setBookings(res.data);
    } catch (err) { console.error(err); }
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const confirmed = bookings.filter(b => b.bookingStatus === 'confirmed');

  const checkInList = confirmed.filter(b => isSameDay(new Date(b.checkInDate), today));

  const checkOutList = confirmed.filter(b => {
    const co = new Date(b.checkOutDate);
    co.setHours(0, 0, 0, 0);
    return co <= today;
  });

  const occupiedList = confirmed.filter(b => {
    const ci = new Date(b.checkInDate); ci.setHours(0, 0, 0, 0);
    const co = new Date(b.checkOutDate); co.setHours(0, 0, 0, 0);
    return ci <= today && co > today;
  });

  const paymentBadge = (status) => (
    <span className={`badge ${status === 'paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>{status}</span>
  );

  const handleCheckout = async () => {
    try {
      await axios.put(`${API_URL}/bookings/${selectedBooking._id}`,
        { bookingStatus: 'completed', paymentStatus }, { headers });
      setShowCheckoutModal(false);
      loadBookings();
    } catch (err) { console.error(err); }
  };

  const BookingRow = ({ b, showCheckout = false }) => {
    const checkIn = new Date(b.checkInDate).toLocaleDateString('en-PK');
    const checkOut = new Date(b.checkOutDate).toLocaleDateString('en-PK');
    const nights = Math.ceil((new Date(b.checkOutDate) - new Date(b.checkInDate)) / (1000 * 60 * 60 * 24));
    const coDate = new Date(b.checkOutDate); coDate.setHours(0, 0, 0, 0);
    const isOverdue = showCheckout && coDate < today;

    return (
      <tr className={isOverdue ? 'table-danger' : ''}>
        <td>
          <div className="fw-semibold">{b.userId?.name || 'Guest'}</div>
          {isOverdue && <small className="text-danger"><i className="ri-alarm-warning-line me-1"></i>Overdue</small>}
        </td>
        <td><small>{b.userId?.phone || '—'}</small></td>
        <td><span className="badge bg-primary-subtle text-primary">{b.roomId ? `Room ${b.roomId.roomNumber} (${b.roomId.type})` : '—'}</span></td>
        <td><span className={showCheckout ? '' : 'text-success fw-medium'}>{checkIn}</span></td>
        <td><span className={showCheckout ? 'text-warning fw-medium' : ''}>{checkOut}</span></td>
        {!showCheckout && <td>{nights} night(s)</td>}
        <td className="fw-semibold">PKR {Number(b.totalAmount).toLocaleString()}</td>
        <td>{paymentBadge(b.paymentStatus)}</td>
        {!showCheckout && <td><small className="text-muted">{b.specialRequests || '—'}</small></td>}
        {showCheckout && (
          <td>
            <button className="btn btn-warning btn-sm" onClick={() => { setSelectedBooking(b); setPaymentStatus(b.paymentStatus); setShowCheckoutModal(true); }}>
              <i className="ri-logout-box-line me-1"></i>Check-out
            </button>
          </td>
        )}
      </tr>
    );
  };

  const OccupiedRow = ({ b }) => {
    const checkIn = new Date(b.checkInDate).toLocaleDateString('en-PK');
    const checkOut = new Date(b.checkOutDate).toLocaleDateString('en-PK');
    const coDate = new Date(b.checkOutDate); coDate.setHours(0, 0, 0, 0);
    const nightsLeft = Math.ceil((coDate - today) / (1000 * 60 * 60 * 24));
    return (
      <tr>
        <td><div className="fw-semibold">{b.userId?.name || 'Guest'}</div></td>
        <td><small>{b.userId?.phone || '—'}</small></td>
        <td><span className="badge bg-primary-subtle text-primary">{b.roomId ? `Room ${b.roomId.roomNumber} (${b.roomId.type})` : '—'}</span></td>
        <td>{checkIn}</td>
        <td>{checkOut}</td>
        <td><span className={`badge ${nightsLeft <= 1 ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'}`}>{nightsLeft} night(s) left</span></td>
        <td className="fw-semibold">PKR {Number(b.totalAmount).toLocaleString()}</td>
        <td>{paymentBadge(b.paymentStatus)}</td>
      </tr>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Check-in / Check-out</h4>
            <span className="text-muted fs-14">{todayStr}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          { label: "Today's Check-ins", value: checkInList.length, icon: 'bx bx-log-in', color: 'success' },
          { label: "Today's Check-outs", value: checkOutList.length, icon: 'bx bx-log-out', color: 'warning' },
          { label: 'Currently Occupied', value: occupiedList.length, icon: 'bx bx-hotel', color: 'info' },
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

      {/* Tabs */}
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
            {[
              { key: 'checkin', label: 'Check-in Today', count: checkInList.length, color: 'success' },
              { key: 'checkout', label: 'Check-out Today', count: checkOutList.length, color: 'warning' },
              { key: 'occupied', label: 'Currently Occupied', count: occupiedList.length, color: 'info' },
            ].map(tab => (
              <li className="nav-item" key={tab.key}>
                <button className={`nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                  {tab.label} <span className={`badge bg-${tab.color} ms-1`}>{tab.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 'checkin' && (
            <>
              <p className="text-muted mb-3"><i className="ri-information-line me-1"></i>Guests whose check-in date is <strong>today</strong>.</p>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr><th>Guest</th><th>Phone</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Nights</th><th>Amount</th><th>Payment</th><th>Request</th></tr>
                  </thead>
                  <tbody>
                    {checkInList.length === 0
                      ? <tr><td colSpan="9" className="text-center py-4 text-muted">No check-ins for today</td></tr>
                      : checkInList.map(b => <BookingRow key={b._id} b={b} />)}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'checkout' && (
            <>
              <p className="text-muted mb-3"><i className="ri-information-line me-1"></i>Guests due for check-out <strong>today or overdue</strong>.</p>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr><th>Guest</th><th>Phone</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Amount</th><th>Payment</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {checkOutList.length === 0
                      ? <tr><td colSpan="8" className="text-center py-4 text-muted">No check-outs for today</td></tr>
                      : checkOutList.map(b => <BookingRow key={b._id} b={b} showCheckout={true} />)}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'occupied' && (
            <>
              <p className="text-muted mb-3"><i className="ri-information-line me-1"></i>Guests currently staying in the hotel.</p>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr><th>Guest</th><th>Phone</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Nights Left</th><th>Amount</th><th>Payment</th></tr>
                  </thead>
                  <tbody>
                    {occupiedList.length === 0
                      ? <tr><td colSpan="8" className="text-center py-4 text-muted">No guests currently staying</td></tr>
                      : occupiedList.map(b => <OccupiedRow key={b._id} b={b} />)}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && selectedBooking && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning-subtle">
                <h5 className="modal-title"><i className="ri-logout-box-line me-2 text-warning"></i>Confirm Check-out</h5>
                <button className="btn-close" onClick={() => setShowCheckoutModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="p-3 bg-light rounded mb-3">
                  <div className="row g-2">
                    <div className="col-6"><p className="text-muted mb-1 fs-12">Guest</p><h6>{selectedBooking.userId?.name}</h6></div>
                    <div className="col-6"><p className="text-muted mb-1 fs-12">Phone</p><h6>{selectedBooking.userId?.phone || '—'}</h6></div>
                    <div className="col-6"><p className="text-muted mb-1 fs-12">Room</p><h6>{selectedBooking.roomId ? `Room ${selectedBooking.roomId.roomNumber}` : '—'}</h6></div>
                    <div className="col-6"><p className="text-muted mb-1 fs-12">Amount</p><h6 className="text-success">PKR {Number(selectedBooking.totalAmount).toLocaleString()}</h6></div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Payment Status</label>
                  <select className="form-select" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}>
                    <option value="paid">Paid ✅</option>
                    <option value="unpaid">Unpaid ❌</option>
                  </select>
                </div>
                <div className="alert alert-warning">
                  <i className="ri-alert-line me-2"></i>Room will be automatically marked as <strong>Available</strong> after check-out.
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowCheckoutModal(false)}>Cancel</button>
                <button className="btn btn-warning" onClick={handleCheckout}>
                  <i className="ri-logout-box-line me-1"></i>Confirm Check-out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckinCheckout;