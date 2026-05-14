import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Payments = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterPayment, setFilterPayment] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('paid');

  useEffect(() => { loadBookings(); }, []);

  useEffect(() => {
    setFiltered(filterPayment ? bookings.filter(b => b.paymentStatus === filterPayment) : bookings);
  }, [filterPayment, bookings]);

  const loadBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings/all`, { headers });
      setBookings(res.data);
      setFiltered(res.data);
    } catch (err) { console.error(err); }
  };

  const formatPKR = (amount) => 'PKR ' + Number(amount).toLocaleString('en-PK');

  const stats = {
    total: bookings.reduce((s, b) => s + b.totalAmount, 0),
    paid: bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalAmount, 0),
    unpaid: bookings.filter(b => b.paymentStatus === 'unpaid').reduce((s, b) => s + b.totalAmount, 0),
    count: bookings.length,
  };

  const paymentBadge = (status) => (
    <span className={`badge ${status === 'paid' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>{status}</span>
  );

  const handleUpdatePayment = async () => {
    try {
      await axios.put(`${API_URL}/bookings/${selectedBooking._id}`, { paymentStatus }, { headers });
      setShowUpdateModal(false);
      loadBookings();
    } catch (err) { console.error(err); }
  };

  const printInvoice = () => {
    const b = selectedBooking;
    if (!b) return;
    const nights = Math.ceil((new Date(b.checkOutDate) - new Date(b.checkInDate)) / (1000 * 60 * 60 * 24));
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; }
        th { background: #f8f9fa; }
        .text-end { text-align: right; }
        .text-center { text-align: center; }
        .total { font-size: 18px; font-weight: bold; color: green; }
      </style>
      </head><body>
      <h2>🏨 Hotel Management System</h2>
      <p><strong>Invoice:</strong> INV-${String(bookings.indexOf(b) + 1).padStart(4, '0')}</p>
      <p><strong>Date:</strong> ${new Date(b.createdAt).toLocaleDateString('en-PK')}</p>
      <hr>
      <h4>Guest Information</h4>
      <p>Name: ${b.userId?.name || 'Guest'} | Phone: ${b.userId?.phone || '—'}</p>
      <h4>Stay Details</h4>
      <p>Room: ${b.roomId ? `Room ${b.roomId.roomNumber} (${b.roomId.type})` : '—'}</p>
      <p>Check In: ${new Date(b.checkInDate).toLocaleDateString('en-PK')} | Check Out: ${new Date(b.checkOutDate).toLocaleDateString('en-PK')} | Nights: ${nights}</p>
      <table>
        <thead><tr><th>Description</th><th>Nights</th><th class="text-end">Rate/Night</th><th class="text-end">Amount</th></tr></thead>
        <tbody>
          <tr>
            <td>${b.roomId ? `Room ${b.roomId.roomNumber} — ${b.roomId.type}` : 'Room'}</td>
            <td class="text-center">${nights}</td>
            <td class="text-end">${formatPKR(b.roomId?.price || 0)}</td>
            <td class="text-end">${formatPKR(b.totalAmount)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td colspan="3" class="text-end"><strong>Total</strong></td><td class="text-end total">${formatPKR(b.totalAmount)}</td></tr>
          <tr><td colspan="3" class="text-end">Payment Status</td><td class="text-end">${b.paymentStatus.toUpperCase()}</td></tr>
        </tfoot>
      </table>
      <br><p class="text-center">Thank you for choosing our hotel!</p>
      <script>window.onload = function() { window.print(); }<\/script>
      </body></html>
    `);
    win.document.close();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-sm-0">Payments & Invoices</h4>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          { label: 'Total Revenue', value: formatPKR(stats.total), icon: 'bx bx-dollar-circle', color: 'success' },
          { label: 'Paid', value: formatPKR(stats.paid), icon: 'bx bx-check-circle', color: 'info' },
          { label: 'Unpaid', value: formatPKR(stats.unpaid), icon: 'bx bx-time', color: 'warning' },
          { label: 'Total Bookings', value: stats.count, icon: 'bx bx-receipt', color: 'primary' },
        ].map((s, i) => (
          <div className="col-xl-3 col-md-6" key={i}>
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
          <h5 className="card-title mb-0 flex-grow-1">All Invoices</h5>
          <select className="form-select form-select-sm w-auto" value={filterPayment} onChange={e => setFilterPayment(e.target.value)}>
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>Invoice #</th><th>Guest</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Nights</th><th>Amount</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="9" className="text-center py-4 text-muted">No invoices found.</td></tr>
                ) : filtered.map((b, i) => {
                  const nights = Math.ceil((new Date(b.checkOutDate) - new Date(b.checkInDate)) / (1000 * 60 * 60 * 24));
                  return (
                    <tr key={b._id}>
                      <td><span className="fw-medium text-primary">INV-{String(i + 1).padStart(4, '0')}</span></td>
                      <td>
                        <div className="fw-medium">{b.userId?.name || 'Guest'}</div>
                        <small className="text-muted">{b.userId?.phone || ''}</small>
                      </td>
                      <td>{b.roomId ? `Room ${b.roomId.roomNumber}` : '—'}</td>
                      <td>{new Date(b.checkInDate).toLocaleDateString('en-PK')}</td>
                      <td>{new Date(b.checkOutDate).toLocaleDateString('en-PK')}</td>
                      <td>{nights}</td>
                      <td className="fw-semibold">{formatPKR(b.totalAmount)}</td>
                      <td>{paymentBadge(b.paymentStatus)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-soft-info btn-sm" onClick={() => { setSelectedBooking(b); setShowInvoiceModal(true); }} title="View Invoice"><i className="ri-eye-line"></i></button>
                          <button className="btn btn-soft-primary btn-sm" onClick={() => { setSelectedBooking(b); setPaymentStatus(b.paymentStatus); setShowUpdateModal(true); }} title="Update Payment"><i className="ri-edit-line"></i></button>
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

      {/* Invoice Modal */}
      {showInvoiceModal && selectedBooking && (() => {
        const b = selectedBooking;
        const nights = Math.ceil((new Date(b.checkOutDate) - new Date(b.checkInDate)) / (1000 * 60 * 60 * 24));
        const idx = bookings.indexOf(b);
        return (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Invoice</h5>
                  <button className="btn-close" onClick={() => setShowInvoiceModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div><h4 className="fw-bold mb-1">🏨 Hotel Management System</h4><p className="text-muted mb-0">Official Invoice</p></div>
                    <div className="text-end">
                      <h5 className="fw-bold text-primary">INV-{String(idx + 1).padStart(4, '0')}</h5>
                      <p className="text-muted mb-1">Date: {new Date(b.createdAt).toLocaleDateString('en-PK')}</p>
                      {paymentBadge(b.paymentStatus)}
                    </div>
                  </div>
                  <hr />
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded">
                        <h6 className="fw-semibold mb-2 text-primary">Guest Information</h6>
                        <p className="mb-1">Name: <strong>{b.userId?.name || 'Guest'}</strong></p>
                        <p className="mb-1">Phone: {b.userId?.phone || '—'}</p>
                        <p className="mb-0">Email: {b.userId?.email?.includes('@walkin.hotel') ? '—' : b.userId?.email || '—'}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded">
                        <h6 className="fw-semibold mb-2 text-primary">Room Details</h6>
                        <p className="mb-1">Room: <strong>{b.roomId ? `Room ${b.roomId.roomNumber}` : '—'}</strong></p>
                        <p className="mb-1">Type: {b.roomId?.type || '—'}</p>
                        <p className="mb-0">Price/Night: {formatPKR(b.roomId?.price || 0)}</p>
                      </div>
                    </div>
                    <div className="col-md-4"><div className="p-3 bg-light rounded text-center"><p className="text-muted mb-1 fs-12">CHECK IN</p><h6 className="text-success">{new Date(b.checkInDate).toLocaleDateString('en-PK')}</h6></div></div>
                    <div className="col-md-4"><div className="p-3 bg-light rounded text-center"><p className="text-muted mb-1 fs-12">CHECK OUT</p><h6 className="text-warning">{new Date(b.checkOutDate).toLocaleDateString('en-PK')}</h6></div></div>
                    <div className="col-md-4"><div className="p-3 bg-light rounded text-center"><p className="text-muted mb-1 fs-12">DURATION</p><h6 className="text-info">{nights} Night(s)</h6></div></div>
                  </div>
                  <table className="table table-bordered mb-3">
                    <thead className="table-light">
                      <tr><th>Description</th><th className="text-center">Nights</th><th className="text-end">Rate/Night</th><th className="text-end">Amount</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{b.roomId ? `Room ${b.roomId.roomNumber} — ${b.roomId.type}` : 'Room'}</td>
                        <td className="text-center">{nights}</td>
                        <td className="text-end">{formatPKR(b.roomId?.price || 0)}</td>
                        <td className="text-end fw-medium">{formatPKR(b.totalAmount)}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="table-light">
                        <td colSpan="3" className="text-end fw-bold">Total Amount</td>
                        <td className="text-end fw-bold text-success fs-16">{formatPKR(b.totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="text-center text-muted fs-12">
                    <p className="mb-0">Thank you for choosing our hotel! 🏨</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" onClick={() => setShowInvoiceModal(false)}>Close</button>
                  <button className="btn btn-primary" onClick={printInvoice}><i className="ri-printer-line me-1"></i>Print Invoice</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Update Payment Modal */}
      {showUpdateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Payment</h5>
                <button className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Payment Status</label>
                <select className="form-select" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}>
                  <option value="paid">Paid ✅</option>
                  <option value="unpaid">Unpaid ❌</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleUpdatePayment}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;