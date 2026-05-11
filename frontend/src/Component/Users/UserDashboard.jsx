



import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  apiRequest,
  fallbackRooms,
  formatCurrency,
  formatDate,
  getStoredUser,
  heroImages,
  normalizeBooking,
  normalizeRoom,
  statusClass,
  titleCase
} from './userData';
export default function UserDashboard() {
  const user = getStoredUser();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    async function loadDashboard() {
      setLoading(true);
      setError('');
      const [roomsResult, bookingsResult, notificationsResult] = await Promise.allSettled([
        apiRequest('/rooms'),
        apiRequest('/bookings/my'),
        apiRequest('/notifications/my')
      ]);
      if (!alive) return;
      if (roomsResult.status === 'fulfilled') {
        setRooms((roomsResult.value || []).map(normalizeRoom));
      } else {
        setRooms(fallbackRooms.map(normalizeRoom));
        setError('Backend rooms load nahi ho rahe, sample rooms show ho rahe hain.');
      }
      if (bookingsResult.status === 'fulfilled') {
        setBookings((bookingsResult.value || []).map(normalizeBooking));
      }
      if (notificationsResult.status === 'fulfilled') {
        setNotifications(notificationsResult.value || []);
      }
      setLoading(false);
    }
    loadDashboard();
    return () => {
      alive = false;
    };
  }, []);
  const stats = useMemo(() => {
    const activeBookings = bookings.filter((booking) => ['pending', 'confirmed'].includes(booking.bookingStatus));
    const unpaid = bookings.filter((booking) => booking.paymentStatus !== 'paid');
    const totalSpent = bookings
      .filter((booking) => booking.paymentStatus === 'paid')
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
    return [
      { label: 'Available Rooms', value: rooms.filter((room) => room.status === 'available').length, icon: 'ri-hotel-bed-line' },
      { label: 'Active Bookings', value: activeBookings.length, icon: 'ri-calendar-check-line' },
      { label: 'Pending Payments', value: unpaid.length, icon: 'ri-bank-card-line' },
      { label: 'Total Paid', value: formatCurrency(totalSpent), icon: 'ri-wallet-3-line' }
    ];
  }, [rooms, bookings]);
  const upcomingBookings = bookings
    .filter((booking) => booking.bookingStatus !== 'cancelled')
    .slice(0, 4);
  return (
    <section className="user-page">
      <div className="user-hero" style={{ backgroundImage: `url(${heroImages.slideOne})` }}>
        <div className="user-hero-content">
          <div className="user-kicker">Guest Dashboard</div>
          <h1>Welcome back, {user.name || 'Guest'}</h1>
          <p>Manage your stay, check room availability, handle payments, and request hotel services from one place.</p>
          <div className="user-actions">
            <Link className="user-btn user-btn-primary" to="/user/booking">
              <i className="ri-add-line"></i>
              New booking
            </Link>
            <Link className="user-btn user-btn-ghost" to="/user/rooms">
              <i className="ri-search-line"></i>
              Browse rooms
            </Link>
          </div>
        </div>
      </div>
      {error && <div className="user-alert error">{error}</div>}
      <div className="user-grid cols-4" style={{ margin: '18px 0' }}>
        {stats.map((stat) => (
          <div className="user-card user-stat" key={stat.label}>
            <i className={stat.icon}></i>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <div className="user-grid cols-2">
        <div className="user-card">
          <div className="user-card-head">
            <h2>Upcoming Bookings</h2>
            <Link className="user-btn user-btn-ghost" to="/user/my-bookings">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="user-empty">Loading bookings...</div>
          ) : upcomingBookings.length === 0 ? (
            <div className="user-empty">No bookings yet.</div>
          ) : (
            <div className="user-table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Check in</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.roomName}</strong>
                        <div style={{ color: 'var(--user-muted)', fontSize: 12 }}>{titleCase(booking.roomType)}</div>
                      </td>
                      <td>{formatDate(booking.checkInDate)}</td>
                      <td>{formatCurrency(booking.totalAmount)}</td>
                      <td>
                        <span className={`user-badge user-badge-${statusClass(booking.bookingStatus)}`}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="user-card">
          <div className="user-card-head">
            <h2>Latest Notifications</h2>
            <Link className="user-btn user-btn-ghost" to="/user/notifications">
              Open
            </Link>
          </div>
          {notifications.length === 0 ? (
            <div className="user-empty">No notifications available.</div>
          ) : (
            <div>
              {notifications.slice(0, 5).map((item) => (
                <div className="user-card-pad" style={{ borderBottom: '1px solid var(--user-line)' }} key={item._id}>
                  <strong>{item.title}</strong>
                  <p style={{ margin: '6px 0 0', color: 'var(--user-muted)' }}>{item.message}</p>
                  <small>{formatDate(item.createdAt)}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


