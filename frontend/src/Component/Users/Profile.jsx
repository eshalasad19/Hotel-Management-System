
import { useEffect, useState } from 'react';
import { apiRequest, formatDate, getStoredUser } from './userData';
function initials(name = 'Guest User') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'GU';
}
export default function Profile() {
  const storedUser = getStoredUser();
  const [profile, setProfile] = useState(storedUser);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    async function loadProfile() {
      try {
        const data = await apiRequest('/auth/profile');
        if (alive) setProfile(data || storedUser);
      } catch (err) {
        if (alive) setError(err.message || 'Profile load nahi hua.');
      }
    }
    loadProfile();
    return () => {
      alive = false;
    };
  }, []);
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Profile</div>
          <h1 className="user-page-title">Account details</h1>
          <p className="user-page-subtitle">Your guest profile stored in the hotel system.</p>
        </div>
      </div>
      {error && <div className="user-alert error" style={{ marginBottom: 18 }}>{error}</div>}
      <div className="user-detail-layout">
        <div className="user-card user-card-pad">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
            <div className="user-avatar" style={{ width: 72, height: 72, fontSize: 22 }}>{initials(profile.name)}</div>
            <div>
              <h2 style={{ margin: 0 }}>{profile.name || 'Guest User'}</h2>
              <p style={{ margin: '6px 0 0', color: 'var(--user-muted)' }}>{profile.email || 'No email saved'}</p>
            </div>
          </div>
          <div className="user-table-wrap">
            <table className="user-table" style={{ minWidth: 0 }}>
              <tbody>
                <tr><th>Name</th><td>{profile.name || 'Not set'}</td></tr>
                <tr><th>Email</th><td>{profile.email || 'Not set'}</td></tr>
                <tr><th>Phone</th><td>{profile.phone || 'Not set'}</td></tr>
                <tr><th>Address</th><td>{profile.address || 'Not set'}</td></tr>
                <tr><th>Role</th><td>{profile.role || 'guest'}</td></tr>
                <tr><th>Member since</th><td>{formatDate(profile.createdAt)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <aside className="user-card user-card-pad">
          <h2>Stay Preferences</h2>
          <div className="user-grid" style={{ marginTop: 16 }}>
            <div className="user-alert"><strong>Preferred room</strong><div>Deluxe or suite room</div></div>
            <div className="user-alert"><strong>Payment</strong><div>Online and cash supported</div></div>
            <div className="user-alert"><strong>Support</strong><div>Use services page for guest requests</div></div>
          </div>
        </aside>
      </div>
    </section>
  );
}