import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const typeIcon = (type) => {
  const map = {
    booking:     { icon: 'ri-calendar-check-line', bg: '#405189', color: '#fff' },
    order:       { icon: 'ri-restaurant-line',     bg: '#0ab39c', color: '#fff' },
    maintenance: { icon: 'ri-tools-line',           bg: '#fd7e14', color: '#fff' },
    service:     { icon: 'ri-customer-service-2-line', bg: '#0dcaf0', color: '#000' },
    general:     { icon: 'ri-notification-3-line', bg: '#6c757d', color: '#fff' },
  };
  return map[type] || map['general'];
};

const roleInfo = {
  admin:        { label: 'Admin',         color: '#6f42c1' },
  manager:      { label: 'Manager',       color: '#0d6efd' },
  receptionist: { label: 'Receptionist',  color: '#0dcaf0' },
  housekeeping: { label: 'Housekeeping',  color: '#198754' },
  maintenance:  { label: 'Maintenance',   color: '#fd7e14' },
  kitchen:      { label: 'Kitchen Staff', color: '#d63384' },
};

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  const name     = user.name  || 'Admin';
  const role     = user.role  || 'admin';
  const email    = user.email || '';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const currentRole = roleInfo[role] || { label: role, color: '#6c757d' };

  const [notifications, setNotifications]     = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown]   = useState(false);

  const notifRef = useRef(null);
  const userRef  = useRef(null);

  useEffect(() => {
    if (token) loadNotifications();
    // Auto refresh every 60 seconds
    const interval = setInterval(() => { if (token) loadNotifications(); }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifDropdown(false);
      if (userRef.current  && !userRef.current.contains(e.target))  setShowUserDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const loadNotifications = async () => {
    try {
      // Admin/manager — sari notifications, baaki — sirf apni
      const endpoint = ['admin', 'manager'].includes(role)
        ? `${API_URL}/notifications/all`
        : `${API_URL}/notifications/my`;
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) { console.error(err); }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${API_URL}/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) { console.error(err); }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put(`${API_URL}/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) { console.error(err); }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const unreadCount  = notifications.filter(n => !n.isRead).length;
  const recentNotifs = notifications.slice(0, 8);

  return (
    <header id="page-topbar" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className="layout-width">
        <div className="navbar-header">

          {/* Left — empty */}
          <div className="d-flex align-items-center">
          </div>

          {/* Right */}
          <div className="d-flex align-items-center gap-1">

         

            {/* ── USER PROFILE ── */}
            <div ref={userRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowUserDropdown(p => !p); setShowNotifDropdown(false); }}
                style={{
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', padding: '4px 8px', borderRadius: 8,
                  display: 'flex', alignItems: 'center', gap: 8
                }}
              >
                <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: currentRole.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0
                  }}>
                    {initials}
                  </div>
                  <span className="d-none d-xl-flex flex-column align-items-start">
                    <span style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.2, color: '#212529' }}>{name}</span>
                    <span style={{ fontSize: 11, color: '#6c757d', lineHeight: 1.2 }}>{currentRole.label}</span>
                  </span>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div style={{
                  position: 'absolute', right: 0, top: '110%',
                  width: 240, background: '#fff',
                  borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  zIndex: 9999, overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}>
                  {/* User info header */}
                  <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{
                        width: 42, height: 42, borderRadius: '50%',
                        background: currentRole.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0
                      }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#212529' }}>{name}</div>
                        <div style={{ fontSize: 11, color: '#6c757d', marginTop: 1 }}>{email}</div>
                        <span style={{
                          display: 'inline-block', marginTop: 4,
                          fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
                          background: currentRole.color, color: '#fff',
                          padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase'
                        }}>
                          {currentRole.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Logout */}
                  <div style={{ padding: '8px' }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', borderRadius: 8, border: 'none',
                        background: 'transparent', cursor: 'pointer', color: '#dc3545',
                        fontWeight: 600, fontSize: 13, transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <i className="ri-logout-box-r-line fs-16"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;