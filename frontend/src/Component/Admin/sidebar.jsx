import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

  // Auto-open parent menu if child is active
  useEffect(() => {
    const MENU_ROUTES = {
      bookings:   ['/admin/bookings', '/admin/booking-new', '/admin/checkin-checkout'],
      users:      ['/admin/users', '/admin/staff'],
      billing:    ['/admin/payments'],
      restaurant: ['/admin/restaurant-menu', '/admin/restaurant-orders'],
    };
    setOpenMenus(prev => {
      const next = { ...prev };
      Object.entries(MENU_ROUTES).forEach(([key, paths]) => {
        if (paths.includes(location.pathname)) next[key] = true;
      });
      return next;
    });
  }, [location.pathname]);

  const toggleMenu = (key) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // ── STYLES ──────────────────────────────────────────────
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '250px',
    background: 'linear-gradient(180deg, #1a1f3a 0%, #162032 100%)',
    zIndex: 1002,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
  };

  const logoBoxStyle = {
    flexShrink: 0,
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  };

  const scrollAreaStyle = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingBottom: '30px',
    // Custom scrollbar
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.15) transparent',
  };

  const sectionLabelStyle = {
    padding: '16px 20px 6px',
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: 600,
  };

  const navLinkBase = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 20px',
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 6,
    margin: '2px 8px',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    width: 'calc(100% - 16px)',
    textAlign: 'left',
  };

  const navLinkActive = {
    ...navLinkBase,
    color: '#fff',
    background: 'rgba(64,81,137,0.55)',
  };

  const subNavLink = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 20px 8px 46px',
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    fontSize: 13,
    borderRadius: 6,
    margin: '1px 8px',
    transition: 'all 0.15s ease',
  };

  const subNavLinkActive = {
    ...subNavLink,
    color: '#fff',
    background: 'rgba(255,255,255,0.08)',
  };

  const iconStyle = { fontSize: 18, flexShrink: 0, width: 20, textAlign: 'center' };

  const chevronStyle = (open) => ({
    marginLeft: 'auto',
    fontSize: 12,
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    color: 'rgba(255,255,255,0.4)',
  });

  // NavLink helper
  const NavLink = ({ to, icon, label, active }) => (
    <Link
      to={to}
      style={active ? navLinkActive : navLinkBase}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent'; }}}
    >
      <i className={icon} style={iconStyle}></i>
      <span>{label}</span>
    </Link>
  );

  // Dropdown toggle button
  const DropdownToggle = ({ menuKey, icon, label, parentActive }) => (
    <button
      onClick={() => toggleMenu(menuKey)}
      style={parentActive ? navLinkActive : navLinkBase}
      onMouseEnter={e => { if (!parentActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
      onMouseLeave={e => { if (!parentActive) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent'; }}}
    >
      <i className={icon} style={iconStyle}></i>
      <span>{label}</span>
      <i className="ri-arrow-right-s-line" style={chevronStyle(openMenus[menuKey])}></i>
    </button>
  );

  // Sub-link helper
  const SubLink = ({ to, label }) => (
    <Link
      to={to}
      style={isActive(to) ? subNavLinkActive : subNavLink}
      onMouseEnter={e => { if (!isActive(to)) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
      onMouseLeave={e => { if (!isActive(to)) { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent'; }}}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', flexShrink: 0, display: 'inline-block', marginRight: 8 }}></span>
      {label}
    </Link>
  );

  return (
    <div style={sidebarStyle}>

      {/* ── LOGO ── */}
      <div style={logoBoxStyle}>
        <Link to="/admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #405189, #0ab39c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 4px 12px rgba(64,81,137,0.4)',
          }}>
            <span style={{ fontSize: 20 }}>🏨</span>
          </div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>
            Hotel Manager
          </div>
        </Link>
      </div>

      {/* ── SCROLL AREA ── */}
      <div style={scrollAreaStyle}>

        <div style={sectionLabelStyle}>Main Menu</div>

        {/* Dashboard */}
    {hasRole('admin','manager') && (
          <NavLink to="/admin/dashboard" icon="ri-dashboard-2-line" label="Dashboard" active={isActive('/admin/dashboard')} />
        )}

        {/* Bookings */}
        {hasRole('admin','manager','receptionist') && (
          <>
            <DropdownToggle
              menuKey="bookings"
              icon="ri-calendar-check-line"
              label="Bookings"
              parentActive={isParentActive('/admin/bookings','/admin/booking-new','/admin/checkin-checkout')}
            />
            {openMenus.bookings && (
              <div>
                <SubLink to="/admin/bookings" label="All Bookings" />
                <SubLink to="/admin/booking-new" label="New Booking" />
                <SubLink to="/admin/checkin-checkout" label="Check-in / Check-out" />
              </div>
            )}
          </>
        )}

        {/* Manage Rooms */}
        {hasRole('admin','manager','receptionist') && (
          <NavLink to="/admin/rooms" icon="ri-building-line" label="Manage Rooms" active={isActive('/admin/rooms')} />
        )}

        {/* Users & Staff */}
        {hasRole('admin') && (
          <>
            <DropdownToggle
              menuKey="users"
              icon="ri-user-line"
              label="Users & Staff"
              parentActive={isParentActive('/admin/users','/admin/staff')}
            />
            {openMenus.users && (
              <div>
                <SubLink to="/admin/users" label="Registered Users" />
                <SubLink to="/admin/staff" label="Manage Staff" />
              </div>
            )}
          </>
        )}

        {/* Billing */}
        {hasRole('admin','manager') && (
          <>
            <DropdownToggle
              menuKey="billing"
              icon="ri-bill-line"
              label="Billing & Invoices"
              parentActive={isActive('/admin/payments')}
            />
            {openMenus.billing && (
              <div>
                <SubLink to="/admin/payments" label="Payments & Invoices" />
              </div>
            )}
          </>
        )}

        {/* Restaurant */}
        {hasRole('admin','manager','receptionist','kitchen') && (
          <>
            <DropdownToggle
              menuKey="restaurant"
              icon="ri-restaurant-line"
              label="Restaurant"
              parentActive={isParentActive('/admin/restaurant-menu','/admin/restaurant-orders')}
            />
            {openMenus.restaurant && (
              <div>
                {hasRole('admin','manager','kitchen') && (
                  <SubLink to="/admin/restaurant-menu" label="Menu Management" />
                )}
                <SubLink to="/admin/restaurant-orders" label="Orders" />
              </div>
            )}
          </>
        )}

        {/* Guest Services */}
        {hasRole('admin','manager','receptionist') && (
          <NavLink to="/admin/services" icon="ri-customer-service-2-line" label="Guest Services" active={isActive('/admin/services')} />
        )}

        {/* Hotel Services */}
        {hasRole('admin','manager') && (
          <NavLink to="/admin/hotel-services" icon="ri-hotel-line" label="Hotel Services" active={isActive('/admin/hotel-services')} />
        )}

        {/* Housekeeping */}
        {hasRole('admin','manager','housekeeping') && (
          <NavLink to="/admin/housekeeping" icon="ri-brush-line" label="Housekeeping" active={isActive('/admin/housekeeping')} />
        )}

        {/* Maintenance */}
        {hasRole('admin','manager','maintenance') && (
          <NavLink to="/admin/maintenance" icon="ri-tools-line" label="Maintenance" active={isActive('/admin/maintenance')} />
        )}

        {/* Feedback */}
        {hasRole('admin','manager') && (
          <NavLink to="/admin/feedback" icon="ri-star-line" label="Feedback" active={isActive('/admin/feedback')} />
        )}

        {/* Reports */}
        {hasRole('admin','manager') && (
          <NavLink to="/admin/reports" icon="ri-bar-chart-line" label="Reports & Analytics" active={isActive('/admin/reports')} />
        )}

        {/* FAQs */}
        {hasRole('admin','manager') && (
          <NavLink to="/admin/faqs" icon="ri-question-answer-line" label="FAQs" active={isActive('/admin/faqs')} />
        )}

        {/* About Us */}
        {hasRole('admin','manager') && (
          <NavLink to="/admin/about-us" icon="ri-information-line" label="About Us" active={isActive('/admin/about-us')} />
        )}

        {/* System Settings */}
        {hasRole('admin') && (
          <>
            <div style={{ ...sectionLabelStyle, marginTop: 8 }}>System</div>
            <NavLink to="/admin/settings" icon="ri-settings-3-line" label="System Settings" active={isActive('/admin/settings')} />
          </>
        )}

      </div>{/* end scroll area */}

    </div>
  );
};

export default Sidebar;