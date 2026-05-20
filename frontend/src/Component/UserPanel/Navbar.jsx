// components/Navbar.jsx

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { COLORS, Btn } from "./Shared";

const NAV_ITEMS = [
  { name: "Home", path: "/user" },
  { name: "About", path: "/about" },
  { name: "Rooms", path: "/Rooms" },
  { name: "Restaurant", path: "/restaurant" },
  { name: "Services", path: "/services" },
  { name: "Spa", path: "/spa" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact-us" },
];

export default function Navbar() {
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ───── SCROLL EFFECT ─────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      {/* ───────────────── NAVBAR ───────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(10,10,10,0.96)"
            : "rgba(13,13,13,0.72)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.18)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(0,0,0,0.35)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            padding: scrolled
              ? "0.9rem 2.5rem"
              : "1.3rem 2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.4s ease",
          }}
        >
          {/* ───────────────── LOGO ───────────────── */}
          <Link
            to="/user"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <h1
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: scrolled
                    ? "30px"
                    : "36px",
                  fontWeight: 500,
                  color: "#f5f1e8",
                  lineHeight: 1,
                  transition: "0.3s ease",
                  letterSpacing: "1px",
                }}
              >
                Luxury
                <span
                  style={{
                    color: COLORS.gold,
                    marginLeft: "2px",
                  }}
                >
                  Stay
                </span>
              </h1>

              <p
                style={{
                  fontSize: "8px",
                  letterSpacing: "5px",
                  color: COLORS.gold,
                  textTransform: "uppercase",
                  marginTop: "4px",
                  opacity: 0.9,
                }}
              >
                Premium Hospitality
              </p>
            </div>
          </Link>

          {/* ───────────────── DESKTOP MENU ───────────────── */}
          <nav
            className="desktopMenu"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.2rem",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    position: "relative",
                    textDecoration: "none",
                    color: active
                      ? COLORS.gold
                      : "#e5e5e5",
                    fontSize: "11px",
                    letterSpacing: "2.5px",
                    textTransform:
                      "uppercase",
                    fontWeight: active
                      ? 500
                      : 400,
                    transition:
                      "all 0.3s ease",
                    paddingBottom: "6px",
                  }}
                >
                  {item.name}

                  {/* ACTIVE LINE */}
                  <span
                    style={{
                      position:
                        "absolute",
                      left: 0,
                      bottom: 0,
                      width: active
                        ? "100%"
                        : "0%",
                      height: "1px",
                      background:
                        COLORS.gold,
                      transition:
                        "0.35s ease",
                    }}
                  />

                  {/* HOVER LINE */}
                  <span
                    className="hoverLine"
                    style={{
                      position:
                        "absolute",
                      left: 0,
                      bottom: 0,
                      width: "0%",
                      height: "1px",
                      background:
                        "rgba(201,168,76,0.6)",
                      transition:
                        "0.35s ease",
                    }}
                  />
                </Link>
              );
            })}

            {/* BOOK BUTTON */}
            <Link
              to="/Rooms"
              style={{
                textDecoration: "none",
              }}
            >
              <Btn
                style={{
                  padding:
                    "11px 28px",
                  fontSize: "10px",
                  letterSpacing:
                    "3px",
                  boxShadow:
                    "0 10px 25px rgba(201,168,76,0.25)",
                }}
              >
                Book Now
              </Btn>
            </Link>
          </nav>

          {/* ───────────────── MOBILE BUTTON ───────────────── */}
          <button
            className="mobileBtn"
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            style={{
              background:
                "transparent",
              border: "none",
              color: COLORS.gold,
              fontSize: "30px",
              cursor: "pointer",
              display: "none",
            }}
          >
            {mobileMenu
              ? "✕"
              : "☰"}
          </button>
        </div>

        {/* ───────────────── MOBILE MENU ───────────────── */}
        <div
          style={{
            maxHeight: mobileMenu
              ? "700px"
              : "0px",
            overflow: "hidden",
            transition:
              "all 0.45s ease",
            background:
              "rgba(8,8,8,0.98)",
            borderTop:
              mobileMenu
                ? "1px solid rgba(201,168,76,0.08)"
                : "none",
          }}
        >
          <div
            style={{
              padding:
                "1rem 2rem 2rem",
            }}
          >
            {NAV_ITEMS.map(
              (item) => {
                const active =
                  location.pathname ===
                  item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                    style={{
                      display:
                        "block",
                      padding:
                        "1rem 0",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.06)",
                      textDecoration:
                        "none",
                      color: active
                        ? COLORS.gold
                        : "#ddd",
                      fontSize:
                        "12px",
                      letterSpacing:
                        "2px",
                      textTransform:
                        "uppercase",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              }
            )}

            <Link
              to="/Rooms"
              onClick={() =>
                setMobileMenu(
                  false
                )
              }
              style={{
                textDecoration:
                  "none",
              }}
            >
              <Btn
                style={{
                  width: "100%",
                  marginTop:
                    "1.8rem",
                  padding:
                    "14px",
                }}
              >
                Reserve Room
              </Btn>
            </Link>
          </div>
        </div>
      </header>

      {/* ───────────────── CSS ───────────────── */}
      <style>{`
        .desktopMenu a:hover .hoverLine{
          width:100%;
        }

        .desktopMenu a:hover{
          color:${COLORS.gold};
        }

        @media (max-width: 980px){

          .desktopMenu{
            display:none !important;
          }

          .mobileBtn{
            display:block !important;
          }
        }

        @media (max-width: 600px){

          header h1{
            font-size:28px !important;
          }

        }
      `}</style>
    </>
  );
}