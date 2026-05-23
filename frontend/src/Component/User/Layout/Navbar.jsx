import { NavLink, Link, useNavigate } from 'react-router-dom';
import { userAsset } from '../../../utils/userAssets';
import { useAuth } from '../../../Context/AuthContext';

export default function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/user-login");
  };

  return (
    <>
      <style>{`
        .luxury-nav {
          background: rgba(15, 12, 10, 0.92) !important;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201, 169, 110, 0.15);
          padding: 0;
        }

        .luxury-nav .nav-link-item {
          color: #e8e0d5 !important;
          font-size: 15px;
          font-weight: 500;
          padding: 28px 16px !important;
          letter-spacing: 0.3px;
          transition: color 0.25s;
          position: relative;
          text-decoration: none;
          display: block;
        }

        .luxury-nav .nav-link-item:hover {
          color: #c9a96e !important;
        }

        .luxury-nav .nav-link-item.active-link {
          color: #c9a96e !important;
          font-weight: 600;
        }

        .luxury-nav .nav-link-item.active-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background: #c9a96e;
          border-radius: 2px 2px 0 0;
        }

        .logo-text-main {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.5px;
          line-height: 1.1;
        }

        .logo-text-sub {
          font-size: 9px;
          font-weight: 600;
          color: #c9a96e;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #c9a96e, #a67c45);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #fff;
          flex-shrink: 0;
        }

        .book-now-btn {
          background: linear-gradient(135deg, #c9a96e, #a67c45) !important;
          color: #fff !important;
          border: none !important;
          border-radius: 50px !important;
          padding: 10px 24px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s !important;
          box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
          text-decoration: none;
        }

        .book-now-btn:hover {
          box-shadow: 0 6px 24px rgba(201, 169, 110, 0.55) !important;
          transform: translateY(-1px);
          color: #fff !important;
        }

        .book-now-btn .arrow-box {
          width: 26px;
          height: 26px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(201, 169, 110, 0.1);
          border: 1px solid rgba(201, 169, 110, 0.3);
          border-radius: 50px;
          padding: 6px 14px 6px 6px;
          text-decoration: none;
          transition: all 0.25s;
        }

        .user-pill:hover {
          background: rgba(201, 169, 110, 0.2);
          border-color: rgba(201, 169, 110, 0.5);
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #c9a96e, #a67c45);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: #e8e0d5;
        }

        .logout-btn {
          background: transparent !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          color: #aaa !important;
          border-radius: 50px !important;
          padding: 8px 18px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          transition: all 0.25s !important;
        }

        .logout-btn:hover {
          border-color: rgba(220, 80, 80, 0.5) !important;
          color: #e07070 !important;
          background: rgba(220, 80, 80, 0.08) !important;
        }

        .login-btn {
          background: transparent !important;
          border: 1px solid rgba(201, 169, 110, 0.5) !important;
          color: #c9a96e !important;
          border-radius: 50px !important;
          padding: 8px 20px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          transition: all 0.25s !important;
          text-decoration: none;
        }

        .login-btn:hover {
          background: rgba(201, 169, 110, 0.12) !important;
          border-color: #c9a96e !important;
          color: #c9a96e !important;
        }

        .navbar-toggler-icon-custom {
          color: #e8e0d5;
          font-size: 20px;
        }

        @media (max-width: 991px) {
          .luxury-nav .nav-link-item {
            padding: 12px 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .luxury-nav .nav-link-item.active-link::after {
            display: none;
          }
          .luxury-nav .navbar-collapse {
            padding: 12px 0 20px;
          }
        }
      `}</style>

      <header id="header" className="sticky-top">
        <nav className="luxury-nav navbar navbar-expand-lg">
          <div className="container">

            {/* ===== LOGO ===== */}
            <Link
              className="navbar-brand d-flex align-items-center gap-2 text-decoration-none py-2"
              to="/"
            >
              <div className="logo-icon">
                <i className="fa-solid fa-bell-concierge"></i>
              </div>
              <div className="d-flex flex-column lh-1">
                <span className="logo-text-main">Luxury Stay</span>
                <span className="logo-text-sub">Hotel</span>
              </div>
            </Link>

            {/* ===== MOBILE TOGGLER ===== */}
            <button
              className="navbar-toggler border-0 shadow-none p-1"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#header-nav"
              aria-controls="header-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars navbar-toggler-icon-custom"></i>
            </button>

            {/* ===== NAVBAR CONTENT ===== */}
            <div id="header-nav" className="collapse navbar-collapse">

              {/* CENTER NAV LINKS */}
              <ul className="navbar-nav mx-auto align-items-lg-center">
                {[
                  { to: "/home", label: "Home", end: true },
                  { to: "/about", label: "About" },
                  { to: "/room", label: "Rooms" },
                  { to: "/restaurant", label: "Restaurant" },
                  { to: "/faq", label: "FAQs" },
                  { to: "/contact", label: "Contact" },
                ].map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `nav-link-item ${isActive ? "active-link" : ""}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* ===== RIGHT SIDE ===== */}
              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">

                {/* USER PILL */}
                {user && (
                  <Link to="/profile" className="user-pill">
                    <div className="user-avatar">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="user-name">{user.name}</span>
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{ fontSize: "9px", color: "#c9a96e" }}
                    ></i>
                  </Link>
                )}

                {/* LOGIN / LOGOUT */}
                {user ? (
                  <button onClick={handleLogout} className="btn logout-btn">
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Logout
                  </button>
                ) : (
                  <Link to="/user-login" className="btn login-btn">
                    Login
                  </Link>
                )}

                {/* BOOK NOW */}
                <Link to="/contact-us" className="book-now-btn">
                  <span>Book Now</span>
                  <div className="arrow-box">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </nav>
      </header>
    </>
  );
}