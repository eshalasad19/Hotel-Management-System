import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'guest';

  const hasRole = (...roles) => roles.includes(role);

  const isActive = (path) => location.pathname === path;

  const isParentActive = (...paths) => paths.some(p => location.pathname === p);

  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
        <Link to="/admin/dashboard" className="logo logo-dark">
          <span className="logo-lg">
            <span className="fw-bold fs-16 text-white">🏨 Hotel Manager</span>
          </span>
          <span className="logo-sm">
            <span className="fw-bold text-white">🏨</span>
          </span>
        </Link>
        <Link to="/admin/dashboard" className="logo logo-light">
          <span className="logo-lg">
            <span className="fw-bold fs-16 text-white">🏨 Hotel Manager</span>
          </span>
          <span className="logo-sm">
            <span className="fw-bold text-white">🏨</span>
          </span>
        </Link>
        <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">

            {/* Dashboard — Admin, Manager */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/dashboard') ? 'active' : ''}`} to="/admin/dashboard">
                  <i className="ri-dashboard-2-line"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}

            {/* Bookings — Admin, Manager, Receptionist */}
            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <a className={`nav-link menu-link ${isParentActive('/admin/bookings', '/admin/booking-new', '/admin/checkin-checkout') ? '' : 'collapsed'}`}
                  href="#bookingsMenu" data-bs-toggle="collapse" role="button"
                  aria-expanded={isParentActive('/admin/bookings', '/admin/booking-new', '/admin/checkin-checkout')}>
                  <i className="ri-calendar-check-line"></i>
                  <span>Bookings</span>
                </a>
                <div className={`collapse menu-dropdown ${isParentActive('/admin/bookings', '/admin/booking-new', '/admin/checkin-checkout') ? 'show' : ''}`} id="bookingsMenu">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to="/admin/bookings" className={`nav-link ${isActive('/admin/bookings') ? 'active' : ''}`}>All Bookings</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/booking-new" className={`nav-link ${isActive('/admin/booking-new') ? 'active' : ''}`}>New Booking</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/checkin-checkout" className={`nav-link ${isActive('/admin/checkin-checkout') ? 'active' : ''}`}>Check-in / Check-out</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {/* Rooms */}
            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/rooms') ? 'active' : ''}`} to="/admin/rooms">
                  <i className="ri-building-line"></i>
                  <span>Manage Rooms</span>
                </Link>
              </li>
            )}

            {/* Users & Staff — Admin only */}
            {hasRole('admin') && (
              <li className="nav-item">
                <a className={`nav-link menu-link ${isParentActive('/admin/users', '/admin/staff') ? '' : 'collapsed'}`}
                  href="#usersMenu" data-bs-toggle="collapse" role="button"
                  aria-expanded={isParentActive('/admin/users', '/admin/staff')}>
                  <i className="ri-user-line"></i>
                  <span>Users & Staff</span>
                </a>
                <div className={`collapse menu-dropdown ${isParentActive('/admin/users', '/admin/staff') ? 'show' : ''}`} id="usersMenu">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to="/admin/users" className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`}>Registered Users</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/staff" className={`nav-link ${isActive('/admin/staff') ? 'active' : ''}`}>Manage Staff</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {/* Billing — Admin, Manager */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <a className={`nav-link menu-link ${isActive('/admin/payments') ? '' : 'collapsed'}`}
                  href="#billingMenu" data-bs-toggle="collapse" role="button"
                  aria-expanded={isActive('/admin/payments')}>
                  <i className="ri-bill-line"></i>
                  <span>Billing & Invoices</span>
                </a>
                <div className={`collapse menu-dropdown ${isActive('/admin/payments') ? 'show' : ''}`} id="billingMenu">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to="/admin/payments" className={`nav-link ${isActive('/admin/payments') ? 'active' : ''}`}>Payments & Invoices</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {/* Housekeeping */}
            {hasRole('admin', 'manager', 'housekeeping') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/housekeeping') ? 'active' : ''}`} to="/admin/housekeeping">
                  <i className="ri-brush-line"></i>
                  <span>Housekeeping</span>
                </Link>
              </li>
            )}

            {/* Maintenance */}
            {hasRole('admin', 'manager', 'maintenance') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/maintenance') ? 'active' : ''}`} to="/admin/maintenance">
                  <i className="ri-tools-line"></i>
                  <span>Maintenance</span>
                </Link>
              </li>
            )}

            {/* Feedback */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/feedback') ? 'active' : ''}`} to="/admin/feedback">
                  <i className="ri-star-line"></i>
                  <span>Feedback</span>
                </Link>
              </li>
            )}

            {/* Reports */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/reports') ? 'active' : ''}`} to="/admin/reports">
                  <i className="ri-bar-chart-line"></i>
                  <span>Reports & Analytics</span>
                </Link>
              </li>
            )}

            {/* Settings — Admin only */}
            {hasRole('admin') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/settings') ? 'active' : ''}`} to="/admin/settings">
                  <i className="ri-settings-3-line"></i>
                  <span>System Settings</span>
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
      <div className="sidebar-background"></div>
    </div>
  );
};

export default Sidebar;