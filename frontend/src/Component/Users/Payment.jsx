
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiRequest, formatCurrency, formatDate, normalizeBooking, statusClass } from './userData';
export default function Payment() {
  const [params] = useSearchParams();
  const [bookings, setBookings] = useState([]);
  const [selectedId, setSelectedId] = useState(params.get('bookingId') || '');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  async function loadBookings() {
    const data = await apiRequest('/bookings/my');
    const normalized = (data || []).map(normalizeBooking);
    setBookings(normalized);
    if (!selectedId) {
      const firstUnpaid = normalized.find((booking) => booking.paymentStatus !== 'paid');
      if (firstUnpaid) setSelectedId(firstUnpaid.id);
    }
  }
  useEffect(() => {
    loadBookings().catch((err) => setError(err.message || 'Payments load nahi hui.'));
  }, []);
  const payableBookings = bookings.filter((booking) => booking.paymentStatus !== 'paid');
  const selectedBooking = useMemo(
    () => bookings.find((booking) => booking.id === selectedId),
    [bookings, selectedId]
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedId) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await apiRequest('/payments', {
        method: 'POST',
        body: JSON.stringify({ bookingId: selectedId, paymentMethod })
      });
      setMessage('Payment successful.');
      await loadBookings();
    } catch (err) {
      setError(err.message || 'Payment process nahi hui.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Payments</div>
          <h1 className="user-page-title">Pay your booking invoice</h1>
          <p className="user-page-subtitle">Select an unpaid booking and choose cash or online payment.</p>
        </div>
        <Link className="user-btn user-btn-ghost" to="/user/my-bookings">
          My bookings
        </Link>
      </div>
      <div className="user-detail-layout">
        <form className="user-card user-card-pad user-form" onSubmit={handleSubmit}>
          {error && <div className="user-alert error">{error}</div>}
          {message && <div className="user-alert success">{message}</div>}
          <div className="user-field">
            <label htmlFor="bookingId">Booking</label>
            <select id="bookingId" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} required>
              <option value="">Select booking</option>
              {payableBookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.roomName} - {formatCurrency(booking.totalAmount)}
                </option>
              ))}
            </select>
          </div>
          <div className="user-payment-methods">
            {[
              { value: 'online', label: 'Online', icon: 'ri-bank-card-line' },
              { value: 'cash', label: 'Cash', icon: 'ri-cash-line' }
            ].map((method) => (
              <label className={`user-method ${paymentMethod === method.value ? 'active' : ''}`} key={method.value}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  style={{ marginRight: 8 }}
                />
                <i className={method.icon}></i> {method.label}
              </label>
            ))}
          </div>
          <button className="user-btn user-btn-primary" type="submit" disabled={loading || !selectedBooking || selectedBooking.paymentStatus === 'paid'}>
            <i className="ri-secure-payment-line"></i>
            {loading ? 'Processing...' : 'Pay now'}
          </button>
        </form>
        <aside className="user-card user-card-pad">
          <h2>Invoice Summary</h2>
          {selectedBooking ? (
            <div className="user-table-wrap">
              <table className="user-table" style={{ minWidth: 0 }}>
                <tbody>
                  <tr><th>Room</th><td>{selectedBooking.roomName}</td></tr>
                  <tr><th>Stay</th><td>{formatDate(selectedBooking.checkInDate)} to {formatDate(selectedBooking.checkOutDate)}</td></tr>
                  <tr><th>Nights</th><td>{selectedBooking.nights}</td></tr>
                  <tr><th>Status</th><td><span className={`user-badge user-badge-${statusClass(selectedBooking.paymentStatus)}`}>{selectedBooking.paymentStatus}</span></td></tr>
                  <tr><th>Total</th><td><strong>{formatCurrency(selectedBooking.totalAmount)}</strong></td></tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="user-empty">No unpaid booking selected.</div>
          )}
        </aside>
      </div>
    </section>
  );
}
