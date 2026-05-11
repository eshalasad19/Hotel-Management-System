import { useEffect, useState } from 'react';
import { apiRequest, formatDate } from './userData';


export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  async function loadNotifications() {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest('/notifications/my');
      setNotifications(data || []);
    } catch (err) {
      setError(err.message || 'Notifications load nahi hui.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadNotifications();
  }, []);
  const markRead = async (id) => {
    await apiRequest(`/notifications/${id}/read`, { method: 'PUT' });
    setNotifications((current) => current.map((item) => item._id === id ? { ...item, isRead: true } : item));
  };
  const removeNotification = async (id) => {
    await apiRequest(`/notifications/${id}`, { method: 'DELETE' });
    setNotifications((current) => current.filter((item) => item._id !== id));
  };
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Notifications</div>
          <h1 className="user-page-title">Hotel updates</h1>
          <p className="user-page-subtitle">Booking updates, reminders, and staff messages for your account.</p>
        </div>
        <button className="user-btn user-btn-ghost" type="button" onClick={loadNotifications}>
          <i className="ri-refresh-line"></i>
          Refresh
        </button>
      </div>
      {error && <div className="user-alert error" style={{ marginBottom: 18 }}>{error}</div>}
      <div className="user-card">
        {loading ? (
          <div className="user-empty">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="user-empty">No notifications available.</div>
        ) : (
          notifications.map((item) => (
            <div className="user-card-pad" style={{ borderBottom: '1px solid var(--user-line)' }} key={item._id}>
              <div className="user-actions" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className={`user-badge ${item.isRead ? 'user-badge-neutral' : 'user-badge-info'}`}>
                    {item.isRead ? 'read' : 'new'}
                  </span>
                  <h2 style={{ margin: '10px 0 6px', fontSize: 18 }}>{item.title}</h2>
                  <p style={{ color: 'var(--user-muted)', margin: 0 }}>{item.message}</p>
                  <small>{formatDate(item.createdAt)}</small>
                </div>
                <div className="user-actions">
                  {!item.isRead && (
                    <button className="user-icon-btn" type="button" onClick={() => markRead(item._id)} aria-label="Mark as read">
                      <i className="ri-check-line"></i>
                    </button>
                  )}
                  <button className="user-icon-btn" type="button" onClick={() => removeNotification(item._id)} aria-label="Delete notification">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
