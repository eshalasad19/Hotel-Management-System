import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="footer" className="footer-dark">
      <div className="hero-wrap section pb-0">
        <div className="hero-mask opacity-9 bg-black"></div>
        <div
          className="hero-bg hero-bg-scroll"
          style={{ backgroundImage: `url('/images/footer-bg.jpg')` }}
        ></div>
        <div className="hero-content">
          <div className="container">
            <div className="row gy-4">

              <div className="col-sm-7 col-md-6 col-lg-4">
                <div className="mb-4 d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "linear-gradient(135deg, #c9a96e, #a67c45)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className="fa-solid fa-bell-concierge text-white" style={{ fontSize: "18px" }}></i>
                  </div>
                  <div className="d-flex flex-column lh-1">
                    <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>Luxury Stay</span>
                    <span style={{ fontSize: "9px", fontWeight: "600", color: "#c9a96e", letterSpacing: "4px", textTransform: "uppercase" }}>Hotel</span>
                  </div>
                </div>
                <p className="text-3">Welcome to Luxury Stay Hotel — a luxurious haven nestled in the heart of the city.</p>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-3 ms-auto">
                <h6 style={{ color: "#c9a96e", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Quick Links</h6>
                <ul className="nav flex-column fw-500">
                  {[
                    { to: "/home", label: "Home", end: true },
                    { to: "/about", label: "About Us", end: false },
                    { to: "/room", label: "Rooms", end: false },
                    { to: "/restaurant", label: "Restaurant", end: false },
                    { to: "/faq", label: "FAQs", end: false },
                    { to: "/contact", label: "Contact Us", end: false },
                  ].map((item) => (
                    <li className="nav-item" key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => "nav-link py-1" + (isActive ? " active" : "")}
                        style={{ fontSize: "14px" }}
                      >
                        <i className="fa-solid fa-chevron-right me-2" style={{ fontSize: "9px", color: "#c9a96e" }}></i>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 col-lg-4">
                <h6 style={{ color: "#c9a96e", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Contact Us</h6>
                <div className="d-flex gap-3 mb-3">
                  <span className="text-6" style={{ color: "#c9a96e", flexShrink: 0 }}><i className="fa-solid fa-location-dot"></i></span>
                  <div className="text-3 lh-lg">423 W 9th St, Los Angeles, CA 90014, United States</div>
                </div>
                <a href="tel:+0604445346" className="d-flex align-items-center gap-3 mb-2 link-primary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">
                  <span className="text-5" style={{ color: "#c9a96e", flexShrink: 0 }}><i className="fa-solid fa-phone-volume"></i></span>
                  <div className="text-4 fw-600">(+060) 444 5346</div>
                </a>
                <a href="mailto:info@theluxurystay.com" className="d-flex align-items-center gap-3 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">
                  <span className="text-5" style={{ color: "#c9a96e", flexShrink: 0 }}><i className="fa-solid fa-envelope"></i></span>
                  <div className="text-4 fw-500">info@theluxurystay.com</div>
                </a>
                <div className="mt-4">
                  <h6 style={{ color: "#c9a96e", fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Follow Us</h6>
                  <ul className="social-icons social-icons-light">
                    <li><a href="http://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="http://www.x.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="http://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="http://www.whatsapp.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <div className="footer-copyright">
            <div className="container">
              <div className="row gy-3">
                <div className="col-lg">
                  <p className="text-3 text-center mb-2">Copyright &copy; 2026 <a className="fw-500 link-primary" href="#">The Luxury Stay</a>. All Rights Reserved.</p>
                  <p className="text-3 text-center mb-0">Designed by <a className="fw-500 link-primary" href="https://theluxuryTeam.net/">The Luxury Team</a></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}