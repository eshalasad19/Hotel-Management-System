
import { useState } from 'react';
import { apiRequest, serviceOptions, titleCase } from './userData';
export default function Services() {
  const [serviceType, setServiceType] = useState('room_service');
  const [description, setDescription] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const data = await apiRequest('/services', {
        method: 'POST',
        body: JSON.stringify({ serviceType, description })
      });
      setRequests((current) => [data.service, ...current]);
      setMessage('Service request created.');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Service request create nahi hui.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Services</div>
          <h1 className="user-page-title">Request hotel services</h1>
          <p className="user-page-subtitle">Create room service, laundry, wakeup call, or transportation requests.</p>
        </div>
      </div>
      <div className="user-grid cols-4" style={{ marginBottom: 18 }}>
        {serviceOptions.map((service) => (
          <article className="user-card user-service-card" key={service.value}>
            <img src={service.image} alt={service.title} />
            <div className="user-card-pad">
              <i className={service.icon} style={{ color: 'var(--user-teal)', fontSize: 24 }}></i>
              <h2 style={{ fontSize: 18, margin: '12px 0 8px' }}>{service.title}</h2>
              <p style={{ color: 'var(--user-muted)', margin: 0 }}>{service.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="user-detail-layout">
        <form className="user-card user-card-pad user-form" onSubmit={handleSubmit}>
          {message && <div className="user-alert success">{message}</div>}
          {error && <div className="user-alert error">{error}</div>}
          <div className="user-field">
            <label htmlFor="serviceType">Service</label>
            <select id="serviceType" value={serviceType} onChange={(event) => setServiceType(event.target.value)}>
              {serviceOptions.map((service) => (
                <option key={service.value} value={service.value}>{service.title}</option>
              ))}
            </select>
          </div>
          <div className="user-field">
            <label htmlFor="description">Details</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add service details"
            />
          </div>
          <button className="user-btn user-btn-primary" type="submit" disabled={loading}>
            <i className="ri-customer-service-2-line"></i>
            {loading ? 'Sending...' : 'Create request'}
          </button>
        </form>
        <aside className="user-card">
          <div className="user-card-head">
            <h2>Recent Requests</h2>
          </div>
          {requests.length === 0 ? (
            <div className="user-empty">No new service requests in this session.</div>
          ) : (
            requests.map((request) => (
              <div className="user-card-pad" style={{ borderBottom: '1px solid var(--user-line)' }} key={request._id || request.createdAt}>
                <strong>{titleCase(request.serviceType)}</strong>
                <p style={{ color: 'var(--user-muted)', margin: '6px 0' }}>{request.description || 'No extra details'}</p>
                <span className="user-badge user-badge-warning">{request.status || 'pending'}</span>
              </div>
            ))
          )}
        </aside>
      </div>
    </section>
  );
}