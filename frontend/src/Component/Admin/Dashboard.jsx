import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const headers = { Authorization: `Bearer ${token}` };

  const [stats, setStats] = useState({
    totalRevenue: 0, totalBookings: 0,
    availableRooms: 0, occupiedRooms: 0,
    pendingBookings: 0, confirmedBookings: 0, cancelledBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [activity, setActivity] = useState([]);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const formatPKR = (amount) => 'PKR ' + Number(amount).toLocaleString('en-PK');

  const statusBadge = (status) => {
    const map = {
      pending:   'bg-warning-subtle text-warning',
      confirmed: 'bg-success-subtle text-success',
      cancelled: 'bg-danger-subtle text-danger',
      completed: 'bg-info-subtle text-info'
    };
    return <span className={`badge ${map[status] || 'bg-secondary'}`}>{status}</span>;
  };

  const paymentBadge = (status) => (
    <span className={`badge ${status === 'paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
      {status}
    </span>
  );

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [roomsRes, bookingsRes] = await Promise.all([
        axios.get(`${API_URL}/rooms`, { headers }),
        axios.get(`${API_URL}/bookings/all`, { headers })
      ]);

      const rooms = roomsRes.data;
      const bookings = bookingsRes.data;

      setStats({
        totalRevenue: bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalAmount, 0),
        totalBookings: bookings.length,
        availableRooms: rooms.filter(r => r.status === 'available').length,
        occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
        pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
        confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
        cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
      });

      setRecentBookings(bookings.slice(0, 8));
      setActivity(bookings.slice(0, 6));

    } catch (err) {
      console.error(err);
    }
  };

  const colors = ['#0ab39c', '#405189', '#f7b84b', '#f06548', '#299cdb'];

  return (
    <div className="container-fluid">

      {/* Welcome */}
      <div className="row mb-3 pb-1">
        <div className="col-12">
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">{greeting}, {user.name || 'Admin'}!</h4>
              <p className="text-muted mb-0">Here's what's happening at your hotel today.</p>
            </div>
            <div className="mt-3 mt-lg-0">
              <span className="text-muted fs-14">{dateStr}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Revenue</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">{formatPKR(stats.totalRevenue)}</h4>
                  <a href="#" className="text-decoration-underline">View payments</a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-success-subtle rounded fs-3">
                    <i className="bx bx-dollar-circle text-success"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Bookings</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">{stats.totalBookings}</h4>
                  <a href="#" className="text-decoration-underline">View all bookings</a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-info-subtle rounded fs-3">
                    <i className="bx bx-calendar-check text-info"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Available Rooms</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">{stats.availableRooms}</h4>
                  <a href="#" className="text-decoration-underline">View all rooms</a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-warning-subtle rounded fs-3">
                    <i className="bx bx-building text-warning"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Occupied Rooms</p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">{stats.occupiedRooms}</h4>
                  <a href="#" className="text-decoration-underline">View occupied</a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-danger-subtle rounded fs-3">
                    <i className="bx bx-bed text-danger"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings + Activity */}
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Recent Bookings</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.length === 0 ? (
                      <tr><td colSpan="6" className="text-center text-muted py-4">No bookings yet</td></tr>
                    ) : (
                      recentBookings.map(b => (
                        <tr key={b._id}>
                          <td><div className="fw-medium">{b.userId?.name || 'Guest'}</div></td>
                          <td>{b.roomId ? `Room ${b.roomId.roomNumber}` : '—'}</td>
                          <td>{new Date(b.checkInDate).toLocaleDateString('en-PK')}</td>
                          <td>{new Date(b.checkOutDate).toLocaleDateString('en-PK')}</td>
                          <td>{formatPKR(b.totalAmount)}</td>
                          <td>{statusBadge(b.bookingStatus)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Recent Activity</h4>
            </div>
            <div className="card-body">
              {activity.length === 0 ? (
                <div className="text-center text-muted py-4">No activity yet</div>
              ) : (
                activity.map((b, i) => {
                  const name = b.userId?.name || 'Guest';
                  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  const color = colors[i % colors.length];
                  const text = b.bookingStatus === 'confirmed' ? 'confirmed a booking' :
                    b.bookingStatus === 'pending' ? 'requested a booking' :
                    b.bookingStatus === 'cancelled' ? 'cancelled booking' : 'completed stay';
                  return (
                    <div key={b._id} className="d-flex align-items-center mb-3">
                      <div className="avatar-xs flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle text-white fw-semibold"
                          style={{ background: color, fontSize: '12px' }}>
                          {initials}
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-medium">{name}</p>
                        <small className="text-muted">{text} · {new Date(b.createdAt).toLocaleDateString('en-PK')}</small>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status Summary */}
      <div className="row">
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-warning-subtle rounded fs-3">
                    <i className="bx bx-time text-warning"></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1">Pending Bookings</p>
                  <h4 className="mb-0 fw-semibold">{stats.pendingBookings}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-success-subtle rounded fs-3">
                    <i className="bx bx-check-circle text-success"></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1">Confirmed Bookings</p>
                  <h4 className="mb-0 fw-semibold">{stats.confirmedBookings}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-danger-subtle rounded fs-3">
                    <i className="bx bx-x-circle text-danger"></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted mb-1">Cancelled Bookings</p>
                  <h4 className="mb-0 fw-semibold">{stats.cancelledBookings}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;