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

            {/* ── NOTIFICATIONS ── */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowNotifDropdown(p => !p); setShowUserDropdown(false); }}
                style={{
                  position: 'relative', background: 'transparent',
                  border: 'none', cursor: 'pointer', padding: '6px 8px',
                  borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <i className="bx bx-bell" style={{ fontSize: 22, color: '#6c757d' }}></i>
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 2, right: 2,
                    background: '#dc3545', color: '#fff',
                    borderRadius: '50%', width: 18, height: 18,
                    fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div style={{
                  position: 'absolute', right: 0, top: '110%',
                  width: 340, background: '#fff',
                  borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  zIndex: 9999, overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}>
                  {/* Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #405189, #0ab39c)',
                    padding: '14px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>
                        Notifications
                      </div>
                      {unreadCount > 0 && (
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>
                          {unreadCount} unread
                        </div>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        style={{
                          background: 'rgba(255,255,255,0.2)', border: 'none',
                          color: '#fff', fontSize: 11, borderRadius: 6,
                          padding: '4px 10px', cursor: 'pointer', fontWeight: 600
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* List */}
                  <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                    {recentNotifs.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '32px 16px', color: '#adb5bd' }}>
                        <i className="bx bx-bell-off fs-2 d-block mb-2"></i>
                        No notifications yet
                      </div>
                    ) : recentNotifs.map(n => {
                      const ti = typeIcon(n.type);
                      return (
                        <div
                          key={n._id}
                          onClick={() => !n.isRead && handleMarkRead(n._id)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '12px 16px',
                            background: n.isRead ? '#fff' : '#f0f4ff',
                            borderBottom: '1px solid #f0f0f0',
                            cursor: n.isRead ? 'default' : 'pointer',
                            transition: 'background 0.2s',
                          }}
                        >
                          {/* Type icon */}
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: ti.bg, color: ti.color, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                          }}>
                            <i className={ti.icon}></i>
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ fontWeight: n.isRead ? 500 : 700, fontSize: 13, color: '#212529' }}>
                                {n.title}
                              </div>
                              {!n.isRead && (
                                <div style={{
                                  width: 8, height: 8, borderRadius: '50%',
                                  background: '#405189', flexShrink: 0, marginLeft: 6
                                }}></div>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: '#6c757d', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {n.message}
                            </div>
                            <div style={{ fontSize: 10, color: '#adb5bd', marginTop: 4 }}>
                              {new Date(n.createdAt).toLocaleString('en-PK')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  {notifications.length > 8 && (
                    <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: 12, color: '#405189', fontWeight: 600, cursor: 'pointer' }}>
                        View all {notifications.length} notifications
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

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