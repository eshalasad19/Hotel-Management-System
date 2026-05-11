
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getStoredUser } from './userData';
const navItems = [
  { to: '/user/dashboard', label: 'Dashboard', icon: 'ri-dashboard-3-line' },
  { to: '/user/rooms', label: 'Rooms', icon: 'ri-hotel-bed-line' },
  { to: '/user/my-bookings', label: 'My Bookings', icon: 'ri-calendar-check-line' },
  { to: '/user/payment', label: 'Payments', icon: 'ri-bank-card-line' },
  { to: '/user/services', label: 'Services', icon: 'ri-customer-service-2-line' },
  { to: '/user/feedback', label: 'Feedback', icon: 'ri-star-smile-line' },
  { to: '/user/notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
  { to: '/user/profile', label: 'Profile', icon: 'ri-user-3-line' }
];
function initials(name = 'Guest User') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'GU';
}
export default function UserNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = getStoredUser();
  const name = user.name || 'Guest User';
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const links = navItems.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) => `user-nav-link ${isActive ? 'active' : ''}`}
      onClick={() => setOpen(false)}
    >
      <i className={item.icon} aria-hidden="true"></i>
      <span>{item.label}</span>
    </NavLink>
  ));
  return (
    <>
      <div className="user-mobile-topbar">
        <Link className="user-brand" to="/user/dashboard">
          <strong>Themist Stay</strong>
        </Link>
        <button className="user-icon-btn" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          <i className={open ? 'ri-close-line' : 'ri-menu-line'}></i>
        </button>
      </div>
      <aside className={`user-sidebar ${open ? 'open' : ''}`}>
        <Link className="user-brand" to="/user/dashboard" onClick={() => setOpen(false)}>
          <strong>Themist Stay</strong>
          <span>Guest Portal</span>
        </Link>
        <nav className="user-nav" aria-label="Guest navigation">
          {links}
        </nav>
        <div className="user-sidebar-footer">
          <div className="user-mini-profile">
            <div className="user-avatar">{initials(name)}</div>
            <div>
              <strong>{name}</strong>
              <span>{user.email || 'Guest account'}</span>
            </div>
          </div>
          <button className="user-btn user-btn-ghost" type="button" onClick={logout} style={{ width: '100%' }}>
            <i className="ri-logout-box-r-line"></i>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
