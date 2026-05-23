import { NavLink, Link, useNavigate } from 'react-router-dom';
import { userAsset } from '../../../utils/userAssets';
import { useAuth } from '../../../Context/AuthContext';

export default function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    logout();

    navigate("/user-login");
  };

  return (
    <header id="header" className="sticky-top-slide">

      <nav className="primary-menu navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">

        <div className="container">

          {/* LOGO */}
          <Link className="navbar-brand" to="/">
            <img
              src={userAsset('images/logo.png')}
              alt="Logo"
              style={{
                height: "55px",
                objectFit: "contain"
              }}
            />
          </Link>

          {/* MOBILE TOGGLER */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#header-nav"
            aria-controls="header-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars fs-4"></i>
          </button>

          {/* NAVBAR CONTENT */}
          <div
            id="header-nav"
            className="collapse navbar-collapse"
          >

            {/* CENTER NAV LINKS */}
            <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-2">

              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/room"
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Rooms
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/restaurant"
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Restaurant
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  FAQs
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Contact
                </NavLink>
              </li>

            </ul>

            {/* RIGHT SIDE */}
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

              {/* USER INFO */}
              {user && (
                <div
                  className="d-flex align-items-center gap-2 bg-light px-3 py-2 rounded-pill"
                >

                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "35px",
                      height: "35px",
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <span className="fw-semibold text-dark">
                    {user.name}
                  </span>

                </div>
              )}

              {/* LOGIN / LOGOUT */}
              {user ? (

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger rounded-pill px-4"
                >
                  Logout
                </button>

              ) : (

                <Link
                  to="/user-login"
                  className="btn btn-outline-primary rounded-pill px-4"
                >
                  Login
                </Link>

              )}

              {/* BOOK NOW */}
              <Link
                to="/contact-us"
                className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2"
              >
                <span>Book Now</span>

                <i className="fa-solid fa-arrow-right"></i>
              </Link>

            </div>

          </div>

        </div>
      </nav>
    </header>
  );
}