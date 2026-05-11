
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, formatCurrency, formatDate, normalizeBooking, statusClass } from './userData';
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    async function loadBookings() {
      setLoading(true);
      setError('');
      try {
        const data = await apiRequest('/bookings/my');
        if (alive) setBookings((data || []).map(normalizeBooking));
      } catch (err) {
        if (alive) setError(err.message || 'Bookings load nahi hui.');
      } finally {
        if (alive) setLoading(false);
      }
    }
    loadBookings();
    return () => {
      alive = false;
    };
  }, []);
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">My Bookings</div>
          <h1 className="user-page-title">Your reservations</h1>
          <p className="user-page-subtitle">Track booking status, stay dates, and payment status.</p>
        </div>
        <Link className="user-btn user-btn-primary" to="/user/booking">
          <i className="ri-add-line"></i>
          New booking
        </Link>
      </div>
      {error && <div className="user-alert error" style={{ marginBottom: 18 }}>{error}</div>}
      <div className="user-card">
        {loading ? (
          <div className="user-empty">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="user-empty">No bookings yet.</div>
        ) : (
          <div className="user-table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Guests</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td><strong>{booking.id.slice(-8).toUpperCase()}</strong></td>
                    <td>{booking.roomName}</td>
                    <td>{formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)}</td>
                    <td>{booking.guests}</td>
                    <td>{formatCurrency(booking.totalAmount)}</td>
                    <td>
                      <span className={`user-badge user-badge-${statusClass(booking.bookingStatus)}`}>{booking.bookingStatus}</span>
                    </td>
                    <td>
                      <span className={`user-badge user-badge-${statusClass(booking.paymentStatus)}`}>{booking.paymentStatus}</span>
                    </td>
                    <td>
                      {booking.paymentStatus !== 'paid' ? (
                        <Link className="user-btn user-btn-primary" to={`/user/payment?bookingId=${booking.id}`}>Pay</Link>
                      ) : (
                        <span className="user-badge user-badge-success">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}