import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MENU_ROUTES = {
  bookings: ['/admin/bookings', '/admin/booking-new', '/admin/checkin-checkout'],
  users: ['/admin/users', '/admin/staff'],
  billing: ['/admin/payments'],
  restaurant: ['/admin/restaurant-menu', '/admin/restaurant-orders'],
};

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'guest';

  const [openMenus, setOpenMenus] = useState({
    bookings: false,
    users: false,
    billing: false,
    restaurant: false,
  });

  const hasRole = (...roles) => roles.includes(role);
  const isActive = (path) => location.pathname === path;
  const isParentActive = (...paths) => paths.some((p) => location.pathname === p);

  useEffect(() => {
    setOpenMenus((prev) => {
      const next = { ...prev };
      Object.entries(MENU_ROUTES).forEach(([key, paths]) => {
        if (paths.some((p) => location.pathname === p)) {
          next[key] = true;
        }
      });
      return next;
    });
  }, [location.pathname]);

  const toggleMenu = (key, e) => {
    e.preventDefault();
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/dashboard') ? 'active' : ''}`} to="/admin/dashboard">
                  <i className="ri-dashboard-2-line"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}

            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isParentActive(...MENU_ROUTES.bookings) ? 'active' : ''} ${openMenus.bookings ? '' : 'collapsed'}`}
                  onClick={(e) => toggleMenu('bookings', e)}
                  aria-expanded={openMenus.bookings}
                >
                  <i className="ri-calendar-check-line"></i>
                  <span>Bookings</span>
                </button>
                <div className={`collapse menu-dropdown ${openMenus.bookings ? 'show' : ''}`}>
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

            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/rooms') ? 'active' : ''}`} to="/admin/rooms">
                  <i className="ri-building-line"></i>
                  <span>Manage Rooms</span>
                </Link>
              </li>
            )}

            {hasRole('admin') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isParentActive(...MENU_ROUTES.users) ? 'active' : ''} ${openMenus.users ? '' : 'collapsed'}`}
                  onClick={(e) => toggleMenu('users', e)}
                  aria-expanded={openMenus.users}
                >
                  <i className="ri-user-line"></i>
                  <span>Users & Staff</span>
                </button>
                <div className={`collapse menu-dropdown ${openMenus.users ? 'show' : ''}`}>
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

            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isActive('/admin/payments') ? 'active' : ''} ${openMenus.billing ? '' : 'collapsed'}`}
                  onClick={(e) => toggleMenu('billing', e)}
                  aria-expanded={openMenus.billing}
                >
                  <i className="ri-bill-line"></i>
                  <span>Billing & Invoices</span>
                </button>
                <div className={`collapse menu-dropdown ${openMenus.billing ? 'show' : ''}`}>
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to="/admin/payments" className={`nav-link ${isActive('/admin/payments') ? 'active' : ''}`}>Payments & Invoices</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isParentActive(...MENU_ROUTES.restaurant) ? 'active' : ''} ${openMenus.restaurant ? '' : 'collapsed'}`}
                  onClick={(e) => toggleMenu('restaurant', e)}
                  aria-expanded={openMenus.restaurant}
                >
                  <i className="ri-restaurant-line"></i>
                  <span>Restaurant</span>
                </button>
                <div className={`collapse menu-dropdown ${openMenus.restaurant ? 'show' : ''}`}>
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to="/admin/restaurant-menu" className={`nav-link ${isActive('/admin/restaurant-menu') ? 'active' : ''}`}>Menu Management</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/restaurant-orders" className={`nav-link ${isActive('/admin/restaurant-orders') ? 'active' : ''}`}>Orders</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/services') ? 'active' : ''}`} to="/admin/services">
                  <i className="ri-customer-service-2-line"></i>
                  <span>Guest Services</span>
                </Link>
              </li>
            )}

            {hasRole('admin', 'manager', 'housekeeping') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/housekeeping') ? 'active' : ''}`} to="/admin/housekeeping">
                  <i className="ri-brush-line"></i>
                  <span>Housekeeping</span>
                </Link>
              </li>
            )}

            {hasRole('admin', 'manager', 'maintenance') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/maintenance') ? 'active' : ''}`} to="/admin/maintenance">
                  <i className="ri-tools-line"></i>
                  <span>Maintenance</span>
                </Link>
              </li>
            )}

            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/feedback') ? 'active' : ''}`} to="/admin/feedback">
                  <i className="ri-star-line"></i>
                  <span>Feedback</span>
                </Link>
              </li>
            )}

            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/reports') ? 'active' : ''}`} to="/admin/reports">
                  <i className="ri-bar-chart-line"></i>
                  <span>Reports & Analytics</span>
                </Link>
              </li>
            )}

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
