import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Settings = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [activeTab, setActiveTab] = useState('pricing');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Pricing Settings
  const [pricing, setPricing] = useState({
    singleRoom: 5000,
    doubleRoom: 8000,
    suiteRoom: 15000,
    deluxeRoom: 12000,
    extraBedCharge: 1500,
    breakfastCharge: 800,
  });

  // Tax Settings
  const [taxes, setTaxes] = useState({
    gst: 16,
    serviceTax: 5,
    tourismLevy: 2,
    taxEnabled: true,
  });

  // Policy Settings
  const [policies, setPolicies] = useState({
    checkInTime: '14:00',
    checkOutTime: '12:00',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in. After that, one night charge applies.',
    petPolicy: 'Pets are not allowed on the premises.',
    smokingPolicy: 'This is a smoke-free property. Smoking is only permitted in designated outdoor areas.',
    paymentPolicy: 'Full payment required at check-in. We accept cash and online transfers.',
    childPolicy: 'Children under 5 stay free. Extra bed charges apply for children above 5 years.',
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newBookingAlert: true,
    checkInReminder: true,
    checkOutReminder: true,
    paymentAlert: true,
    maintenanceAlert: true,
    housekeepingAlert: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  // Hotel Info
  const [hotelInfo, setHotelInfo] = useState({
    hotelName: 'Hotel Management System',
    address: 'Karachi, Pakistan',
    phone: '+92 300 0000000',
    email: 'info@hotel.com',
    website: 'www.hotel.com',
    description: 'A premium hotel offering world-class amenities and services.',
    currency: 'PKR',
    timezone: 'Asia/Karachi',
  });

  const showSuccess = (msg) => {
    setSuccess(msg);
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const showError = (msg) => {
    setError(msg);
    setSuccess('');
  };

  const savePricing = () => {
    localStorage.setItem('hotel_pricing', JSON.stringify(pricing));
    showSuccess('Pricing settings saved successfully!');
  };

  const saveTaxes = () => {
    localStorage.setItem('hotel_taxes', JSON.stringify(taxes));
    showSuccess('Tax settings saved successfully!');
  };

  const savePolicies = () => {
    localStorage.setItem('hotel_policies', JSON.stringify(policies));
    showSuccess('Policy settings saved successfully!');
  };

  const saveNotifications = () => {
    localStorage.setItem('hotel_notifications', JSON.stringify(notifications));
    showSuccess('Notification settings saved successfully!');
  };

  const saveHotelInfo = () => {
    localStorage.setItem('hotel_info', JSON.stringify(hotelInfo));
    showSuccess('Hotel information saved successfully!');
  };

  // Load saved settings
  useEffect(() => {
    const savedPricing = localStorage.getItem('hotel_pricing');
    const savedTaxes = localStorage.getItem('hotel_taxes');
    const savedPolicies = localStorage.getItem('hotel_policies');
    const savedNotifications = localStorage.getItem('hotel_notifications');
    const savedHotelInfo = localStorage.getItem('hotel_info');

    if (savedPricing) setPricing(JSON.parse(savedPricing));
    if (savedTaxes) setTaxes(JSON.parse(savedTaxes));
    if (savedPolicies) setPolicies(JSON.parse(savedPolicies));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedHotelInfo) setHotelInfo(JSON.parse(savedHotelInfo));
  }, []);

  const tabs = [
    { key: 'hotel', label: 'Hotel Info', icon: 'ri-building-line' },
    { key: 'pricing', label: 'Pricing', icon: 'ri-price-tag-3-line' },
    { key: 'taxes', label: 'Taxes', icon: 'ri-percent-line' },
    { key: 'policies', label: 'Policies', icon: 'ri-file-list-3-line' },
    { key: 'notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">System Settings</h4>
          </div>
        </div>
      </div>

      {success && <div className="alert alert-success"><i className="ri-check-line me-2"></i>{success}</div>}
      {error && <div className="alert alert-danger"><i className="ri-error-warning-line me-2"></i>{error}</div>}

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

          {/* Hotel Info */}
          {activeTab === 'hotel' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0"><i className="ri-building-line me-2 text-primary"></i>Hotel Information</h5>
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
                    <label className="form-label">Website</label>
                    <input className="form-control" value={hotelInfo.website}
                      onChange={e => setHotelInfo({ ...hotelInfo, website: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input className="form-control" value={hotelInfo.address}
                      onChange={e => setHotelInfo({ ...hotelInfo, address: e.target.value })} />
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

          {/* Pricing */}
          {activeTab === 'pricing' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0"><i className="ri-price-tag-3-line me-2 text-success"></i>Room Pricing (PKR per night)</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {[
                    { label: 'Single Room', key: 'singleRoom', icon: 'ri-hotel-bed-line', color: 'info' },
                    { label: 'Double Room', key: 'doubleRoom', icon: 'ri-hotel-bed-line', color: 'primary' },
                    { label: 'Suite Room', key: 'suiteRoom', icon: 'ri-building-2-line', color: 'warning' },
                    { label: 'Deluxe Room', key: 'deluxeRoom', icon: 'ri-vip-crown-line', color: 'danger' },
                  ].map(room => (
                    <div className="col-md-6" key={room.key}>
                      <div className={`p-3 bg-${room.color}-subtle rounded`}>
                        <label className="form-label fw-semibold">
                          <i className={`${room.icon} me-1 text-${room.color}`}></i>{room.label}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">PKR</span>
                          <input type="number" className="form-control" value={pricing[room.key]}
                            onChange={e => setPricing({ ...pricing, [room.key]: Number(e.target.value) })} />
                          <span className="input-group-text">/night</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-12"><hr className="my-1" /></div>

                  <div className="col-md-6">
                    <label className="form-label">Extra Bed Charge</label>
                    <div className="input-group">
                      <span className="input-group-text">PKR</span>
                      <input type="number" className="form-control" value={pricing.extraBedCharge}
                        onChange={e => setPricing({ ...pricing, extraBedCharge: Number(e.target.value) })} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Breakfast Charge</label>
                    <div className="input-group">
                      <span className="input-group-text">PKR</span>
                      <input type="number" className="form-control" value={pricing.breakfastCharge}
                        onChange={e => setPricing({ ...pricing, breakfastCharge: Number(e.target.value) })} />
                    </div>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="fw-semibold mb-3">Current Pricing Summary</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered mb-0">
                      <thead className="table-light">
                        <tr><th>Room Type</th><th>Price/Night</th><th>Weekly (7 nights)</th><th>Monthly (30 nights)</th></tr>
                      </thead>
                      <tbody>
                        {[
                          { label: 'Single', key: 'singleRoom' },
                          { label: 'Double', key: 'doubleRoom' },
                          { label: 'Suite', key: 'suiteRoom' },
                          { label: 'Deluxe', key: 'deluxeRoom' },
                        ].map(r => (
                          <tr key={r.key}>
                            <td>{r.label}</td>
                            <td>PKR {pricing[r.key].toLocaleString()}</td>
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

          {/* Taxes */}
          {activeTab === 'taxes' && (
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0"><i className="ri-percent-line me-2 text-warning"></i>Tax Configuration</h5>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" checked={taxes.taxEnabled}
                    onChange={e => setTaxes({ ...taxes, taxEnabled: e.target.checked })} />
                  <label className="form-check-label">
                    {taxes.taxEnabled ? <span className="text-success fw-medium">Taxes Enabled</span> : <span className="text-danger fw-medium">Taxes Disabled</span>}
                  </label>
                </div>
              </div>
              <div className="card-body">
                <div className={taxes.taxEnabled ? '' : 'opacity-50 pe-none'}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="p-3 bg-warning-subtle rounded">
                        <label className="form-label fw-semibold">GST (%)</label>
                        <div className="input-group">
                          <input type="number" className="form-control" value={taxes.gst}
                            onChange={e => setTaxes({ ...taxes, gst: Number(e.target.value) })} min="0" max="100" />
                          <span className="input-group-text">%</span>
                        </div>
                        <small className="text-muted">General Sales Tax</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-info-subtle rounded">
                        <label className="form-label fw-semibold">Service Tax (%)</label>
                        <div className="input-group">
                          <input type="number" className="form-control" value={taxes.serviceTax}
                            onChange={e => setTaxes({ ...taxes, serviceTax: Number(e.target.value) })} min="0" max="100" />
                          <span className="input-group-text">%</span>
                        </div>
                        <small className="text-muted">Hotel Service Charges</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-success-subtle rounded">
                        <label className="form-label fw-semibold">Tourism Levy (%)</label>
                        <div className="input-group">
                          <input type="number" className="form-control" value={taxes.tourismLevy}
                            onChange={e => setTaxes({ ...taxes, tourismLevy: Number(e.target.value) })} min="0" max="100" />
                          <span className="input-group-text">%</span>
                        </div>
                        <small className="text-muted">Tourism Development Levy</small>
                      </div>
                    </div>
                  </div>

                  {/* Tax Preview */}
                  <div className="mt-4 p-3 bg-light rounded">
                    <h6 className="fw-semibold mb-3">Tax Preview — Sample Bill (PKR 10,000)</h6>
                    <table className="table table-sm mb-0">
                      <tbody>
                        <tr><td>Room Charges</td><td className="text-end">PKR 10,000</td></tr>
                        <tr><td>GST ({taxes.gst}%)</td><td className="text-end">PKR {(10000 * taxes.gst / 100).toLocaleString()}</td></tr>
                        <tr><td>Service Tax ({taxes.serviceTax}%)</td><td className="text-end">PKR {(10000 * taxes.serviceTax / 100).toLocaleString()}</td></tr>
                        <tr><td>Tourism Levy ({taxes.tourismLevy}%)</td><td className="text-end">PKR {(10000 * taxes.tourismLevy / 100).toLocaleString()}</td></tr>
                        <tr className="fw-bold table-light">
                          <td>Total</td>
                          <td className="text-end text-success">
                            PKR {(10000 + (10000 * (taxes.gst + taxes.serviceTax + taxes.tourismLevy) / 100)).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 text-end">
                  <button className="btn btn-warning" onClick={saveTaxes}>
                    <i className="ri-save-line me-1"></i> Save Tax Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Policies */}
          {activeTab === 'policies' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0"><i className="ri-file-list-3-line me-2 text-info"></i>Hotel Policies</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Check-in Time</label>
                    <input type="time" className="form-control" value={policies.checkInTime}
                      onChange={e => setPolicies({ ...policies, checkInTime: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Check-out Time</label>
                    <input type="time" className="form-control" value={policies.checkOutTime}
                      onChange={e => setPolicies({ ...policies, checkOutTime: e.target.value })} />
                  </div>

                  {[
                    { label: 'Cancellation Policy', key: 'cancellationPolicy' },
                    { label: 'Payment Policy', key: 'paymentPolicy' },
                    { label: 'Child Policy', key: 'childPolicy' },
                    { label: 'Pet Policy', key: 'petPolicy' },
                    { label: 'Smoking Policy', key: 'smokingPolicy' },
                  ].map(p => (
                    <div className="col-12" key={p.key}>
                      <label className="form-label fw-semibold">{p.label}</label>
                      <textarea className="form-control" rows="2" value={policies[p.key]}
                        onChange={e => setPolicies({ ...policies, [p.key]: e.target.value })}></textarea>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-end">
                  <button className="btn btn-info text-white" onClick={savePolicies}>
                    <i className="ri-save-line me-1"></i> Save Policies
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0"><i className="ri-notification-3-line me-2 text-danger"></i>Notification Settings</h5>
              </div>
              <div className="card-body">
                <h6 className="fw-semibold mb-3 text-muted text-uppercase fs-12">Alert Preferences</h6>
                <div className="row g-3 mb-4">
                  {[
                    { label: 'New Booking Alert', key: 'newBookingAlert', desc: 'Get notified when a new booking is made' },
                    { label: 'Check-in Reminder', key: 'checkInReminder', desc: 'Remind staff about upcoming check-ins' },
                    { label: 'Check-out Reminder', key: 'checkOutReminder', desc: 'Remind staff about upcoming check-outs' },
                    { label: 'Payment Alert', key: 'paymentAlert', desc: 'Alert when payment is received or pending' },
                    { label: 'Maintenance Alert', key: 'maintenanceAlert', desc: 'Notify about new maintenance requests' },
                    { label: 'Housekeeping Alert', key: 'housekeepingAlert', desc: 'Notify about housekeeping task updates' },
                  ].map(n => (
                    <div className="col-md-6" key={n.key}>
                      <div className="p-3 bg-light rounded d-flex align-items-center justify-content-between">
                        <div>
                          <div className="fw-medium">{n.label}</div>
                          <small className="text-muted">{n.desc}</small>
                        </div>
                        <div className="form-check form-switch ms-3">
                          <input className="form-check-input" type="checkbox"
                            checked={notifications[n.key]}
                            onChange={e => setNotifications({ ...notifications, [n.key]: e.target.checked })} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h6 className="fw-semibold mb-3 text-muted text-uppercase fs-12">Notification Channels</h6>
                <div className="row g-3">
                  {[
                    { label: 'Email Notifications', key: 'emailNotifications', icon: 'ri-mail-line', desc: 'Send alerts via email' },
                    { label: 'SMS Notifications', key: 'smsNotifications', icon: 'ri-message-2-line', desc: 'Send alerts via SMS' },
                  ].map(n => (
                    <div className="col-md-6" key={n.key}>
                      <div className="p-3 border rounded d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`${n.icon} fs-20 text-primary`}></i>
                          <div>
                            <div className="fw-medium">{n.label}</div>
                            <small className="text-muted">{n.desc}</small>
                          </div>
                        </div>
                        <div className="form-check form-switch ms-3">
                          <input className="form-check-input" type="checkbox"
                            checked={notifications[n.key]}
                            onChange={e => setNotifications({ ...notifications, [n.key]: e.target.checked })} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-end">
                  <button className="btn btn-danger" onClick={saveNotifications}>
                    <i className="ri-save-line me-1"></i> Save Notification Settings
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