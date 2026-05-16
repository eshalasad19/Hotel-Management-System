import { useState, useEffect } from 'react';
import axios from 'axios';
import { downloadCsv } from '../../utils/exportCsv';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Reports = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('revenue');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [bookingsRes, roomsRes, ordersRes] = await Promise.all([
        axios.get(`${API_URL}/bookings/all`, { headers }),
        axios.get(`${API_URL}/rooms`, { headers }),
        axios.get(`${API_URL}/restaurant/orders`, { headers }).catch(() => ({ data: { data: [] } })),
      ]);
      setBookings(bookingsRes.data);
      setRooms(roomsRes.data);
      setOrders(ordersRes.data.data || []);
    } catch (err) { console.error(err); }
  };

  const formatPKR = (amount) => 'PKR ' + Number(amount).toLocaleString('en-PK');
  const dateStamp = new Date().toISOString().slice(0, 10);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = new Array(12).fill(0);
  const monthlyBookings = new Array(12).fill(0);
  bookings.forEach(b => {
    const m = new Date(b.createdAt).getMonth();
    monthlyBookings[m]++;
    if (b.paymentStatus === 'paid') monthlyRevenue[m] += b.totalAmount;
  });

  const roomTypeStats = {};
  rooms.forEach(r => { roomTypeStats[r.type] = (roomTypeStats[r.type] || 0) + 1; });

  const bookingStats = {
    pending: bookings.filter(b => b.bookingStatus === 'pending').length,
    confirmed: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    completed: bookings.filter(b => b.bookingStatus === 'completed').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'cancelled').length,
  };

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalAmount, 0);
  const totalUnpaid = bookings.filter(b => b.paymentStatus === 'unpaid').reduce((s, b) => s + b.totalAmount, 0);
  const restaurantRevenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + (o.totalAmount || 0), 0);

  const maxRevenue = Math.max(...monthlyRevenue, 1);
  const maxBookings = Math.max(...monthlyBookings, 1);

  const exportRevenue = () => {
    downloadCsv(
      `revenue-report-${dateStamp}.csv`,
      ['Month', 'Revenue (PKR)', 'Bookings'],
      months.map((m, i) => [m, monthlyRevenue[i], monthlyBookings[i]])
    );
  };

  const exportBookings = () => {
    downloadCsv(
      `bookings-report-${dateStamp}.csv`,
      ['Guest', 'Room', 'Check In', 'Check Out', 'Amount', 'Booking Status', 'Payment Status', 'Created'],
      bookings.map(b => [
        b.userId?.name || 'Guest',
        b.roomId ? `Room ${b.roomId.roomNumber}` : '—',
        new Date(b.checkInDate).toLocaleDateString('en-PK'),
        new Date(b.checkOutDate).toLocaleDateString('en-PK'),
        b.totalAmount,
        b.bookingStatus,
        b.paymentStatus,
        new Date(b.createdAt).toLocaleDateString('en-PK'),
      ])
    );
  };

  const exportOccupancy = () => {
    downloadCsv(
      `occupancy-report-${dateStamp}.csv`,
      ['Room Number', 'Type', 'Price', 'Status', 'Capacity'],
      rooms.map(r => [r.roomNumber, r.type, r.price, r.status, r.capacity])
    );
  };

  const exportRestaurant = () => {
    downloadCsv(
      `restaurant-report-${dateStamp}.csv`,
      ['Guest', 'Room', 'Items', 'Total (PKR)', 'Status', 'Date'],
      orders.map(o => [
        o.guestName || o.userId?.name || 'Guest',
        o.roomNumber || '—',
        o.items?.map(it => `${it.name} x${it.quantity}`).join('; ') || '',
        o.totalAmount,
        o.status,
        new Date(o.createdAt).toLocaleString('en-PK'),
      ])
    );
  };

  const exportHandlers = {
    revenue: exportRevenue,
    bookings: exportBookings,
    occupancy: exportOccupancy,
    restaurant: exportRestaurant,
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Reports & Analytics</h4>
            <button className="btn btn-success btn-sm" onClick={exportHandlers[activeTab]}>
              <i className="ri-download-2-line me-1"></i> Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {[
          { label: 'Hotel Revenue', value: formatPKR(totalRevenue), icon: 'bx bx-dollar-circle', color: 'success' },
          { label: 'Restaurant Revenue', value: formatPKR(restaurantRevenue), icon: 'ri-restaurant-line', color: 'primary' },
          { label: 'Unpaid Amount', value: formatPKR(totalUnpaid), icon: 'bx bx-time', color: 'warning' },
          { label: 'Total Bookings', value: bookings.length, icon: 'bx bx-calendar-check', color: 'info' },
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

      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0">
            {[
              { key: 'revenue', label: 'Revenue Report' },
              { key: 'bookings', label: 'Booking Report' },
              { key: 'occupancy', label: 'Occupancy Report' },
              { key: 'restaurant', label: 'Restaurant Report' },
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
                        <td>{rooms.length > 0 ? Math.round((count / rooms.length) * 100) : 0}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'restaurant' && (
            <div>
              <h6 className="fw-semibold mb-3">Restaurant Orders Summary</h6>
              <div className="row g-3 mb-4">
                {[
                  { label: 'Total Orders', value: orders.length, color: 'primary' },
                  { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, color: 'success' },
                  { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, color: 'warning' },
                  { label: 'Revenue', value: formatPKR(restaurantRevenue), color: 'info' },
                ].map((s, i) => (
                  <div className="col-md-3 col-6" key={i}>
                    <div className={`p-3 bg-${s.color}-subtle rounded text-center`}>
                      <h3 className={`fw-bold text-${s.color} mb-1 fs-18`}>{s.value}</h3>
                      <p className="text-muted mb-0 fs-12">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr><th>Guest</th><th>Room</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr><td colSpan="6" className="text-center text-muted py-3">No restaurant orders</td></tr>
                    ) : orders.map(o => (
                      <tr key={o._id}>
                        <td>{o.guestName || o.userId?.name || 'Guest'}</td>
                        <td>{o.roomNumber || '—'}</td>
                        <td><small>{o.items?.map(it => `${it.name} x${it.quantity}`).join(', ')}</small></td>
                        <td>{formatPKR(o.totalAmount)}</td>
                        <td><span className="badge bg-primary-subtle text-primary">{o.status}</span></td>
                        <td><small>{new Date(o.createdAt).toLocaleString('en-PK')}</small></td>
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
