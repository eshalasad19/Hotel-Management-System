import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const [notifications, setNotifications] = useState([]);

  const name = user.name || 'Admin';
  const role = user.role || 'admin';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  useEffect(() => {
    if (token) loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/notifications/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box horizontal-logo">
              <Link to="/admin/dashboard" className="logo logo-dark">
                <span className="logo-lg">
                  <span className="fw-bold fs-16">🏨 Hotel Manager</span>
                </span>
              </Link>
              <Link to="/admin/dashboard" className="logo logo-light">
                <span className="logo-lg">
                  <span className="fw-bold fs-16 text-white">🏨 Hotel Manager</span>
                </span>
              </Link>
            </div>
            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none" id="topnav-hamburger-icon">
              <span className="hamburger-icon">
                <span></span><span></span><span></span>
              </span>
            </button>
          </div>

          <div className="d-flex align-items-center">

            {/* Notifications */}
            <div className="dropdown topbar-head-dropdown ms-1 header-item">
              <button type="button" className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="bx bx-bell fs-22"></i>
                {unreadCount > 0 && (
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                <div className="dropdown-head bg-primary bg-pattern rounded-top">
                  <div className="p-3">
                    <h6 className="m-0 fs-16 fw-semibold text-white">Notifications</h6>
                  </div>
                </div>
                <div data-simplebar style={{ maxHeight: '300px' }}>
                  {notifications.length === 0 ? (
                    <div className="text-center p-3 text-muted">No notifications</div>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <div key={n._id} className={`text-reset notification-item d-block dropdown-item position-relative ${!n.isRead ? 'active' : ''}`}>
                        <div className="d-flex">
                          <div className="avatar-xs me-3 flex-shrink-0">
                            <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                              <i className="bx bx-bell"></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 lh-base">{n.title}</h6>
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              {new Date(n.createdAt).toLocaleDateString('en-PK')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button type="button" className="btn material-shadow-none"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="d-flex align-items-center">
                  <div className="rounded-circle header-profile-user bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: '32px', height: '32px', fontSize: '13px' }}>
                    {initials}
                  </div>
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{name}</span>
                    <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Welcome!</h6>
                <Link className="dropdown-item" to="/admin/profile">
                  <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">My Profile</span>
                </Link>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Sign Out</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;