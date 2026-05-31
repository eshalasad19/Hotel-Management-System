import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MENU_ROUTES = {
  bookings:   ['/admin/bookings', '/admin/booking-new', '/admin/checkin-checkout'],
  users:      ['/admin/users', '/admin/staff'],
  billing:    ['/admin/payments'],
  restaurant: ['/admin/restaurant-menu', '/admin/restaurant-orders'],
};

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'guest';

  const [openMenus, setOpenMenus] = useState({
    bookings: false, users: false, billing: false, restaurant: false,
  });

  const hasRole = (...roles) => roles.includes(role);
  const isActive = (path) => location.pathname === path;
  const isParentActive = (...paths) => paths.some(p => location.pathname === p);

  useEffect(() => {
    setOpenMenus(prev => {
      const next = { ...prev };
      Object.entries(MENU_ROUTES).forEach(([key, paths]) => {
        if (paths.some(p => location.pathname === p)) next[key] = true;
      });
      return next;
    });
  }, [location.pathname]);

  const toggleMenu = (key, e) => {
    e.preventDefault();
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Role label + color for badge
  const roleInfo = {
    admin:        { label: 'Admin',          color: '#6f42c1' },
    manager:      { label: 'Manager',        color: '#0d6efd' },
    receptionist: { label: 'Receptionist',   color: '#0dcaf0' },
    housekeeping: { label: 'Housekeeping',   color: '#198754' },
    maintenance:  { label: 'Maintenance',    color: '#fd7e14' },
    kitchen:      { label: 'Kitchen Staff',  color: '#d63384' },
  };
  const currentRole = roleInfo[role] || { label: role, color: '#6c757d' };

  return (
    <div className="app-menu navbar-menu" style={{ background: 'linear-gradient(180deg, #1a1f3a 0%, #162032 100%)' }}>
      {/* ── LOGO AREA ── */}
      <div className="navbar-brand-box" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 16 }}>
        <Link to="/admin/dashboard" style={{ textDecoration: 'none', display: 'block' }}>

          {/* Full logo */}
          <div className="logo logo-dark logo-lg d-flex align-items-center gap-2 px-2 pt-1">
            {/* Icon box */}
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #405189, #0ab39c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 4px 12px rgba(64,81,137,0.4)'
            }}>
              <span style={{ fontSize: 20 }}>🏨</span>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2, letterSpacing: 0.3 }}>
                Hotel Manager
              </div>
            </div>
          </div>
        </Link>

        <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      {/* ── USER INFO STRIP ── */}
      {/* <div className="logo-lg px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="d-flex align-items-center gap-2">
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: currentRole.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {(user.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name || 'Admin'}
            </div>
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: 0.5,
              background: currentRole.color, color: '#fff',
              padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase'
            }}>
              {currentRole.label}
            </span>
          </div>
        </div>
      </div> */}

      {/* ── NAV ITEMS ── */}
                  <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>

          {/* Section label */}
          <div className="logo-lg" style={{ padding: '16px 16px 4px', color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
            Main Menu
          </div>

          <ul className="navbar-nav" id="navbar-nav">

            {/* Dashboard — everyone */}
            {hasRole('admin', 'manager', 'receptionist', 'housekeeping', 'maintenance', 'kitchen') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/dashboard') ? 'active' : ''}`} to="/admin/dashboard">
                  <i className="ri-dashboard-2-line"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}

            {/* Bookings — admin, manager, receptionist */}
            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isParentActive(...MENU_ROUTES.bookings) ? 'active' : ''} ${openMenus.bookings ? '' : 'collapsed'}`}
                  onClick={e => toggleMenu('bookings', e)}
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

            {/* Manage Rooms — admin, manager, receptionist */}
            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/rooms') ? 'active' : ''}`} to="/admin/rooms">
                  <i className="ri-building-line"></i>
                  <span>Manage Rooms</span>
                </Link>
              </li>
            )}

            {/* Users & Staff — admin only */}
            {hasRole('admin') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isParentActive(...MENU_ROUTES.users) ? 'active' : ''} ${openMenus.users ? '' : 'collapsed'}`}
                  onClick={e => toggleMenu('users', e)}
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

            {/* Billing — admin, manager */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isActive('/admin/payments') ? 'active' : ''} ${openMenus.billing ? '' : 'collapsed'}`}
                  onClick={e => toggleMenu('billing', e)}
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

            {/* Restaurant — admin, manager, receptionist, kitchen */}
            {hasRole('admin', 'manager', 'receptionist', 'kitchen') && (
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link menu-link submenu-toggle w-100 text-start border-0 bg-transparent ${isParentActive(...MENU_ROUTES.restaurant) ? 'active' : ''} ${openMenus.restaurant ? '' : 'collapsed'}`}
                  onClick={e => toggleMenu('restaurant', e)}
                  aria-expanded={openMenus.restaurant}
                >
                  <i className="ri-restaurant-line"></i>
                  <span>Restaurant</span>
                </button>
                <div className={`collapse menu-dropdown ${openMenus.restaurant ? 'show' : ''}`}>
                  <ul className="nav nav-sm flex-column">
                    {/* Menu — admin, manager, kitchen (receptionist nahi) */}
                    {hasRole('admin', 'manager', 'kitchen') && (
                      <li className="nav-item">
                        <Link to="/admin/restaurant-menu" className={`nav-link ${isActive('/admin/restaurant-menu') ? 'active' : ''}`}>Menu Management</Link>
                      </li>
                    )}
                    {/* Orders — admin, manager, receptionist, kitchen */}
                    <li className="nav-item">
                      <Link to="/admin/restaurant-orders" className={`nav-link ${isActive('/admin/restaurant-orders') ? 'active' : ''}`}>Orders</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {/* Guest Services — admin, manager, receptionist */}
            {hasRole('admin', 'manager', 'receptionist') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/services') ? 'active' : ''}`} to="/admin/services">
                  <i className="ri-customer-service-2-line"></i>
                  <span>Guest Services</span>
                </Link>
              </li>
            )}
            {/* Hotel Services — admin, manager only */}
{hasRole('admin', 'manager') && (
  <li className="nav-item">
    <Link className={`nav-link menu-link ${isActive('/admin/hotel-services') ? 'active' : ''}`} to="/admin/hotel-services">
      <i className="ri-hotel-line"></i>
      <span>Hotel Services</span>
    </Link>
  </li>
)}

            {/* Housekeeping — admin, manager, housekeeping */}
            {hasRole('admin', 'manager', 'housekeeping') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/housekeeping') ? 'active' : ''}`} to="/admin/housekeeping">
                  <i className="ri-brush-line"></i>
                  <span>Housekeeping</span>
                </Link>
              </li>
            )}

            {/* Maintenance — admin, manager, maintenance */}
            {hasRole('admin', 'manager', 'maintenance') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/maintenance') ? 'active' : ''}`} to="/admin/maintenance">
                  <i className="ri-tools-line"></i>
                  <span>Maintenance</span>
                </Link>
              </li>
            )}

            {/* Feedback — admin, manager */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/feedback') ? 'active' : ''}`} to="/admin/feedback">
                  <i className="ri-star-line"></i>
                  <span>Feedback</span>
                </Link>
              </li>
            )}

            {/* Reports — admin, manager */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/reports') ? 'active' : ''}`} to="/admin/reports">
                  <i className="ri-bar-chart-line"></i>
                  <span>Reports & Analytics</span>
                </Link>
              </li>
            )}

            {/* FAQs — admin, manager */}
            {hasRole('admin', 'manager') && (
              <li className="nav-item">
                <Link className={`nav-link menu-link ${isActive('/admin/faqs') ? 'active' : ''}`} to="/admin/faqs">
                  <i className="ri-question-answer-line"></i>
                  <span>FAQs</span>
                </Link>
              </li>
            )}
{hasRole('admin', 'manager') && (
  <li className="nav-item">
    <Link className={`nav-link menu-link ${isActive('/admin/about-us') ? 'active' : ''}`} to="/admin/about-us">
      <i className="ri-information-line"></i>
      <span>About Us</span>
    </Link>
  </li>
)}
            {/* System Settings — admin only */}
            {hasRole('admin') && (
              <>
                <li className="nav-item" style={{ listStyle: 'none' }}>
                  <div className="logo-lg" style={{ padding: '16px 16px 4px', color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
                    System
                  </div>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link menu-link ${isActive('/admin/settings') ? 'active' : ''}`} to="/admin/settings">
                    <i className="ri-settings-3-line"></i>
                    <span>System Settings</span>
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
      <div className="sidebar-background"></div>
    </div>
  );
};

export default Sidebar;