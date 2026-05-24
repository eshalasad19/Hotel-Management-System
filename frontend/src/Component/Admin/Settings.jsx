import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Settings = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [activeTab, setActiveTab] = useState('hotel');
  const [success, setSuccess] = useState('');
  const [error, setError]     = useState('');

  const [hotelInfo, setHotelInfo] = useState({
    hotelName:   'Hotel Management System',
    address:     'Karachi, Pakistan',
    phone:       '+92 300 0000000',
    email:       'info@hotel.com',
    description: 'A premium hotel offering world-class amenities and services.',
    currency:    'PKR',
    timezone:    'Asia/Karachi',
  });

  const [pricing, setPricing] = useState({
    single: 5000,
    double: 8000,
    suite:  15000,
    deluxe: 12000,
  });

  const showSuccess = (msg) => {
    setSuccess(msg); setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const persistSettings = async (key, value, successMsg) => {
    try {
      await axios.post(`${API_URL}/settings`, { key, value }, { headers });
      localStorage.setItem(`hotel_${key}`, JSON.stringify(value));
      showSuccess(successMsg);
    } catch {
      localStorage.setItem(`hotel_${key}`, JSON.stringify(value));
      showSuccess(`${successMsg} (saved locally)`);
    }
  };

  const saveHotelInfo = () => {
    // hotel_info key — Payments invoice is se read karta hai
    localStorage.setItem('hotel_info', JSON.stringify(hotelInfo));
    persistSettings('hotelInfo', hotelInfo, 'Hotel information saved!');
  };

  const savePricing = () => {
    // hotel_pricing key — Rooms add form is se auto-fill karta hai
    localStorage.setItem('hotel_pricing', JSON.stringify(pricing));
    persistSettings('pricing', pricing, 'Pricing saved!');
  };

  useEffect(() => {
    const loadFromApi = async () => {
      try {
        const res = await axios.get(`${API_URL}/settings`, { headers });
        const s = res.data;
        if (s.hotelInfo) setHotelInfo(s.hotelInfo);
        if (s.pricing)   setPricing(s.pricing);
      } catch {
        const savedHotelInfo = localStorage.getItem('hotel_hotelInfo') || localStorage.getItem('hotel_info');
        const savedPricing   = localStorage.getItem('hotel_pricing');
        if (savedHotelInfo) setHotelInfo(JSON.parse(savedHotelInfo));
        if (savedPricing)   setPricing(JSON.parse(savedPricing));
      }
    };
    loadFromApi();
  }, []);

  const tabs = [
    { key: 'hotel',   label: 'Hotel Info', icon: 'ri-building-line'    },
    { key: 'pricing', label: 'Pricing',    icon: 'ri-price-tag-3-line' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="mb-sm-0">System Settings</h4>
          </div>
        </div>
      </div>

      {success && <div className="alert alert-success"><i className="ri-check-line me-2"></i>{success}</div>}
      {error   && <div className="alert alert-danger"><i className="ri-error-warning-line me-2"></i>{error}</div>}

      <div className="row">
        {/* Sidebar Tabs */}
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body p-0">
              <div className="nav flex-column nav-pills p-2" role="tablist">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    className={`nav-link text-start mb-1 ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <i className={`${tab.icon} me-2`}></i>{tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-9">

          {/* ── HOTEL INFO ── */}
          {activeTab === 'hotel' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="ri-building-line me-2 text-primary"></i>Hotel Information
                </h5>
                <small className="text-muted">This info appears on invoices and receipts</small>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Hotel Name</label>
                    <input className="form-control" value={hotelInfo.hotelName}
                      onChange={e => setHotelInfo({ ...hotelInfo, hotelName: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input className="form-control" value={hotelInfo.phone}
                      onChange={e => setHotelInfo({ ...hotelInfo, phone: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={hotelInfo.email}
                      onChange={e => setHotelInfo({ ...hotelInfo, email: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Currency</label>
                    <select className="form-select" value={hotelInfo.currency}
                      onChange={e => setHotelInfo({ ...hotelInfo, currency: e.target.value })}>
                      <option value="PKR">PKR — Pakistani Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input className="form-control" value={hotelInfo.address}
                      onChange={e => setHotelInfo({ ...hotelInfo, address: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Timezone</label>
                    <select className="form-select" value={hotelInfo.timezone}
                      onChange={e => setHotelInfo({ ...hotelInfo, timezone: e.target.value })}>
                      <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={hotelInfo.description}
                      onChange={e => setHotelInfo({ ...hotelInfo, description: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button className="btn btn-primary" onClick={saveHotelInfo}>
                    <i className="ri-save-line me-1"></i> Save Hotel Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── PRICING ── */}
          {activeTab === 'pricing' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="ri-price-tag-3-line me-2 text-success"></i>Room Pricing (PKR per night)
                </h5>
                <small className="text-muted">
                  <i className="ri-information-line me-1"></i>
                  These prices can be automatically filled when adding new rooms.
                </small>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {[
                    { label: 'Single Room', key: 'single', icon: 'ri-hotel-bed-line',  color: 'info'    },
                    { label: 'Double Room', key: 'double', icon: 'ri-hotel-bed-line',  color: 'primary' },
                    { label: 'Suite Room',  key: 'suite',  icon: 'ri-building-2-line', color: 'warning' },
                    { label: 'Deluxe Room', key: 'deluxe', icon: 'ri-vip-crown-line',  color: 'danger'  },
                  ].map(room => (
                    <div className="col-md-6" key={room.key}>
                      <div className={`p-3 bg-${room.color}-subtle rounded`}>
                        <label className="form-label fw-semibold">
                          <i className={`${room.icon} me-1 text-${room.color}`}></i>{room.label}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">PKR</span>
                          <input
                            type="number"
                            className="form-control"
                            value={pricing[room.key]}
                            onChange={e => setPricing({ ...pricing, [room.key]: Number(e.target.value) })}
                          />
                          <span className="input-group-text">/night</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary table */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="fw-semibold mb-3">Pricing Summary</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered mb-0">
                      <thead className="table-light">
                        <tr><th>Room Type</th><th>Per Night</th><th>Weekly (7 nights)</th><th>Monthly (30 nights)</th></tr>
                      </thead>
                      <tbody>
                        {[
                          { label: 'Single', key: 'single' },
                          { label: 'Double', key: 'double' },
                          { label: 'Suite',  key: 'suite'  },
                          { label: 'Deluxe', key: 'deluxe' },
                        ].map(r => (
                          <tr key={r.key}>
                            <td className="fw-medium">{r.label}</td>
                            <td>PKR {Number(pricing[r.key]).toLocaleString()}</td>
                            <td>PKR {(pricing[r.key] * 7).toLocaleString()}</td>
                            <td>PKR {(pricing[r.key] * 30).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 text-end">
                  <button className="btn btn-success" onClick={savePricing}>
                    <i className="ri-save-line me-1"></i> Save Pricing
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;