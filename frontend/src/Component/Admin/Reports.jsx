import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Reports = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState('revenue');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [bookingsRes, roomsRes] = await Promise.all([
        axios.get(`${API_URL}/bookings/all`, { headers }),
        axios.get(`${API_URL}/rooms`, { headers })
      ]);
      setBookings(bookingsRes.data);
      setRooms(roomsRes.data);
    } catch (err) { console.error(err); }
  };

  const formatPKR = (amount) => 'PKR ' + Number(amount).toLocaleString('en-PK');

  // Monthly revenue data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = new Array(12).fill(0);
  const monthlyBookings = new Array(12).fill(0);
  bookings.forEach(b => {
    const m = new Date(b.createdAt).getMonth();
    monthlyBookings[m]++;
    if (b.paymentStatus === 'paid') monthlyRevenue[m] += b.totalAmount;
  });

  // Room type stats
  const roomTypeStats = {};
  rooms.forEach(r => { roomTypeStats[r.type] = (roomTypeStats[r.type] || 0) + 1; });

  // Booking status stats
  const bookingStats = {
    pending: bookings.filter(b => b.bookingStatus === 'pending').length,
    confirmed: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    completed: bookings.filter(b => b.bookingStatus === 'completed').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'cancelled').length,
  };

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalAmount, 0);
  const totalUnpaid = bookings.filter(b => b.paymentStatus === 'unpaid').reduce((s, b) => s + b.totalAmount, 0);

  const maxRevenue = Math.max(...monthlyRevenue, 1);
  const maxBookings = Math.max(...monthlyBookings, 1);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-sm-0">Reports & Analytics</h4>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-3">
        {[
          { label: 'Total Revenue', value: formatPKR(totalRevenue), icon: 'bx bx-dollar-circle', color: 'success' },
          { label: 'Unpaid Amount', value: formatPKR(totalUnpaid), icon: 'bx bx-time', color: 'warning' },
          { label: 'Total Bookings', value: bookings.length, icon: 'bx bx-calendar-check', color: 'info' },
          { label: 'Total Rooms', value: rooms.length, icon: 'bx bx-building', color: 'primary' },
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

      {/* Tabs */}
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0">
            {[
              { key: 'revenue', label: 'Revenue Report' },
              { key: 'bookings', label: 'Booking Report' },
              { key: 'occupancy', label: 'Occupancy Report' },
            ].map(tab => (
              <li className="nav-item" key={tab.key}>
                <button className={`nav-link ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">

          {/* Revenue Report */}
          {activeTab === 'revenue' && (
            <div>
              <h6 className="fw-semibold mb-3">Monthly Revenue (PKR)</h6>
              <div className="table-responsive mb-4">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr><th>Month</th><th>Revenue</th><th>Bookings</th><th>Progress</th></tr>
                  </thead>
                  <tbody>
                    {months.map((m, i) => (
                      <tr key={i}>
                        <td className="fw-medium">{m}</td>
                        <td className="fw-semibold text-success">{formatPKR(monthlyRevenue[i])}</td>
                        <td>{monthlyBookings[i]}</td>
                        <td style={{ minWidth: '150px' }}>
                          <div className="progress" style={{ height: '6px' }}>
                            <div className="progress-bar bg-success" style={{ width: `${(monthlyRevenue[i] / maxRevenue) * 100}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td className="fw-bold">Total</td>
                      <td className="fw-bold text-success">{formatPKR(totalRevenue)}</td>
                      <td className="fw-bold">{bookings.length}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Booking Report */}
          {activeTab === 'bookings' && (
            <div>
              <h6 className="fw-semibold mb-3">Booking Status Summary</h6>
              <div className="row g-3 mb-4">
                {[
                  { label: 'Pending', value: bookingStats.pending, color: 'warning' },
                  { label: 'Confirmed', value: bookingStats.confirmed, color: 'success' },
                  { label: 'Completed', value: bookingStats.completed, color: 'info' },
                  { label: 'Cancelled', value: bookingStats.cancelled, color: 'danger' },
                ].map((s, i) => (
                  <div className="col-md-3 col-6" key={i}>
                    <div className={`p-3 bg-${s.color}-subtle rounded text-center`}>
                      <h3 className={`fw-bold text-${s.color} mb-1`}>{s.value}</h3>
                      <p className="text-muted mb-0 fs-12">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h6 className="fw-semibold mb-3">Monthly Bookings</h6>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr><th>Month</th><th>Bookings</th><th>Progress</th></tr>
                  </thead>
                  <tbody>
                    {months.map((m, i) => (
                      <tr key={i}>
                        <td className="fw-medium">{m}</td>
                        <td>{monthlyBookings[i]}</td>
                        <td style={{ minWidth: '150px' }}>
                          <div className="progress" style={{ height: '6px' }}>
                            <div className="progress-bar bg-info" style={{ width: `${(monthlyBookings[i] / maxBookings) * 100}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Occupancy Report */}
          {activeTab === 'occupancy' && (
            <div>
              <h6 className="fw-semibold mb-3">Room Status Overview</h6>
              <div className="row g-3 mb-4">
                {[
                  { label: 'Available', value: rooms.filter(r => r.status === 'available').length, color: 'success' },
                  { label: 'Occupied', value: rooms.filter(r => r.status === 'occupied').length, color: 'danger' },
                  { label: 'Maintenance', value: rooms.filter(r => r.status === 'maintenance').length, color: 'warning' },
                ].map((s, i) => (
                  <div className="col-md-4" key={i}>
                    <div className={`p-3 bg-${s.color}-subtle rounded text-center`}>
                      <h3 className={`fw-bold text-${s.color} mb-1`}>{s.value}</h3>
                      <p className="text-muted mb-0 fs-12">{s.label}</p>
                      <small className="text-muted">{rooms.length > 0 ? Math.round((s.value / rooms.length) * 100) : 0}%</small>
                    </div>
                  </div>
                ))}
              </div>
              <h6 className="fw-semibold mb-3">Rooms by Type</h6>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr><th>Room Type</th><th>Total Rooms</th><th>Percentage</th></tr>
                  </thead>
                  <tbody>
                    {Object.entries(roomTypeStats).map(([type, count], i) => (
                      <tr key={i}>
                        <td className="fw-medium text-capitalize">{type}</td>
                        <td>{count}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress flex-grow-1" style={{ height: '6px' }}>
                              <div className="progress-bar bg-primary" style={{ width: `${(count / rooms.length) * 100}%` }}></div>
                            </div>
                            <span className="text-muted fs-12">{Math.round((count / rooms.length) * 100)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Reports;