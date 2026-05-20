// components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { COLORS, Btn } from "./Shared";

const NAV_ITEMS = [
  { name: "Home", path: "/user" },
  { name: "Rooms", path: "/Rooms" },
  { name: "Restaurant", path: "/restaurant" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact-us" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      {/* ───── NAVBAR ───── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "rgba(13,13,13,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ───── LOGO ───── */}
          <Link to="/user" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ cursor: "pointer", userSelect: "none" }}>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "34px",
                  fontWeight: 400,
                  color: "#f0ead8",
                  lineHeight: 1,
                }}
              >
                Luxury
                <span style={{ color: COLORS.gold }}>Stay</span>
              </h1>
              <p
                style={{
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: COLORS.gold,
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Premium Hospitality
              </p>
            </div>
          </Link>

          {/* ───── DESKTOP MENU ───── */}
          <nav
            className="desktopMenu"
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  position: "relative",
                  textDecoration: "none",
                  color: location.pathname === item.path ? COLORS.gold : "#ddd",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  transition: "0.3s",
                }}
              >
                {item.name}
                {location.pathname === item.path && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "-8px",
                      height: "1px",
                      background: COLORS.gold,
                    }}
                  />
                )}
              </Link>
            ))}

            <Link to="/Rooms">
              <Btn style={{ padding: "10px 24px", fontSize: "10px" }}>
                Book Now
              </Btn>
            </Link>
          </nav>

          {/* ───── MOBILE BUTTON ───── */}
          <button
            className="mobileBtn"
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{
              background: "transparent",
              border: "none",
              color: COLORS.gold,
              fontSize: "28px",
              cursor: "pointer",
              display: "none",
            }}
          >
            ☰
          </button>
        </div>

        {/* ───── MOBILE MENU ───── */}
        {mobileMenu && (
          <div
            style={{
              background: COLORS.darker,
              padding: "1rem 2rem 2rem",
              borderTop: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                style={{
                  display: "block",
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                  color: location.pathname === item.path ? COLORS.gold : "#ddd",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            ))}

            <Link to="/Rooms" onClick={() => setMobileMenu(false)}>
              <Btn style={{ width: "100%", marginTop: "1.5rem" }}>Reserve Room</Btn>
            </Link>
          </div>
        )}
      </header>

      {/* ───── RESPONSIVE CSS ───── */}
      <style>{`
        @media (max-width: 900px) {
          .desktopMenu {
            display: none !important;
          }

          .mobileBtn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}