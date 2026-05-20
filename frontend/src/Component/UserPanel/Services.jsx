import { useState } from "react";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const SERVICES = [
  {
    icon: "✈",
    title: "Airport Transfers",
    desc:
      "Seamless arrivals and departures with our fleet of luxury vehicles and professional chauffeurs.",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "🧳",
    title: "Concierge Service",
    desc:
      "Personal concierge available 24/7 to arrange tours, reservations, theatre tickets and more.",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "🎽",
    title: "Fitness Center",
    desc:
      "State-of-the-art gym with personal trainers, yoga studio and infinity pool with skyline views.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "👔",
    title: "Business Center",
    desc:
      "Fully equipped meeting rooms, video conferencing, printing and secretarial support.",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "🌹",
    title: "Event Planning",
    desc:
      "Weddings, galas and corporate events designed to perfection by our award-winning team.",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "🧹",
    title: "Housekeeping",
    desc:
      "Daily turndown service, 24-hour laundry, dry cleaning and same-day pressing available.",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "🍽",
    title: "In-Room Dining",
    desc:
      "Round-the-clock dining from our full restaurant menu, served directly to your suite.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: "🚗",
    title: "Valet Parking",
    desc:
      "Secure underground valet with electric vehicle charging stations and premium car detailing.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
];

const EXTRA = [
  {
    value: "24/7",
    label: "Concierge Support",
  },
  {
    value: "48",
    label: "Luxury Suites",
  },
  {
    value: "5★",
    label: "Guest Experience",
  },
  {
    value: "15+",
    label: "Years Excellence",
  },
];

export default function ServicesPage() {
  const [hovered, setHovered] =
    useState(null);

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        background: COLORS.cream,
      }}
    >
      {/* HERO */}
      <div
        style={{
          height: "65vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <SectionTag>
            Luxury Hospitality
          </SectionTag>

          <h1
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(42px,6vw,80px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Services &
            <em> Amenities</em>
          </h1>

          <GoldLine />

          <p
            style={{
              color: "#ddd",
              maxWidth: "650px",
              lineHeight: 1.9,
              fontSize: "15px",
            }}
          >
            Every experience is
            thoughtfully curated to
            deliver exceptional
            comfort, elegance and
            world-class hospitality.
          </p>
        </div>
      </div>

      {/* SERVICES */}
      <div
        style={{
          padding: "6rem 2rem",
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "2rem",
          }}
        >
          {SERVICES.map(
            (s, i) => {
              const hov =
                hovered === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() =>
                    setHovered(i)
                  }
                  onMouseLeave={() =>
                    setHovered(null)
                  }
                  style={{
                    background: "#fff",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: hov
                      ? "0 25px 50px rgba(0,0,0,0.15)"
                      : "0 10px 30px rgba(0,0,0,0.08)",
                    transition:
                      "all 0.45s ease",
                    transform: hov
                      ? "translateY(-10px)"
                      : "translateY(0)",
                    border:
                      "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      height: "220px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition:
                          "0.6s",
                        transform: hov
                          ? "scale(1.08)"
                          : "scale(1)",
                      }}
                    />

                    <div
                      style={{
                        position:
                          "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.4))",
                      }}
                    />

                    <div
                      style={{
                        position:
                          "absolute",
                        bottom: "18px",
                        left: "18px",
                        width: "58px",
                        height: "58px",
                        borderRadius:
                          "16px",
                        background:
                          "rgba(0,0,0,0.55)",
                        backdropFilter:
                          "blur(8px)",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontSize: "28px",
                        color:
                          COLORS.gold,
                        border:
                          "1px solid rgba(201,168,76,0.35)",
                      }}
                    >
                      {s.icon}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    style={{
                      padding: "2rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "32px",
                        fontWeight: 400,
                        color:
                          COLORS.dark,
                        marginBottom:
                          "1rem",
                      }}
                    >
                      {s.title}
                    </h3>

                    <p
                      style={{
                        fontSize:
                          "14px",
                        color:
                          COLORS.muted,
                        lineHeight:
                          1.9,
                        marginBottom:
                          "1.8rem",
                      }}
                    >
                      {s.desc}
                    </p>

                    <Btn
                      style={{
                        padding:
                          "12px 26px",
                        fontSize:
                          "10px",
                      }}
                    >
                      Learn More
                    </Btn>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          background: COLORS.dark,
          padding: "5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "2rem",
          }}
        >
          {EXTRA.map(
            (e, i) => (
              <div
                key={i}
                style={{
                  textAlign:
                    "center",
                  padding:
                    "2rem 1rem",
                  border:
                    "1px solid rgba(201,168,76,0.12)",
                  background:
                    "rgba(255,255,255,0.02)",
                  borderRadius:
                    "20px",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize:
                      "58px",
                    color:
                      COLORS.gold,
                    lineHeight:
                      1,
                    marginBottom:
                      "0.6rem",
                  }}
                >
                  {e.value}
                </div>

                <div
                  style={{
                    fontSize:
                      "11px",
                    letterSpacing:
                      "3px",
                    textTransform:
                      "uppercase",
                    color: "#999",
                  }}
                >
                  {e.label}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          padding: "6rem 2rem",
          background:
            "linear-gradient(135deg,#111,#1c1c1c)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(201,168,76,0.08), transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <SectionTag>
            Premium Concierge
          </SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(34px,5vw,62px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom:
                "1rem",
            }}
          >
            Need Something
            <em>
              {" "}
              Extraordinary?
            </em>
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin:
                "0 auto 2.5rem",
              color: "#aaa",
              lineHeight: 1.9,
              fontSize: "15px",
            }}
          >
            From private jet
            reservations to
            bespoke celebrations,
            our concierge team is
            available around the
            clock to craft moments
            beyond imagination.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Btn
              style={{
                padding:
                  "14px 34px",
                fontSize:
                  "11px",
              }}
            >
              Contact Concierge
            </Btn>

            <Btn
              variant="outline"
              style={{
                padding:
                  "14px 34px",
                fontSize:
                  "11px",
                color: "#fff",
                border:
                  "1px solid rgba(201,168,76,0.35)",
              }}
            >
              Explore More
            </Btn>
          </div>

          <div
            style={{
              marginTop: "2rem",
              color:
                COLORS.gold,
              fontSize: "12px",
              letterSpacing:
                "2px",
            }}
          >
            +92 21 111 598 7890
            ·
            concierge@luxurystay.com
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background:
            "#0b0b0b",
          padding:
            "4rem 2rem 2rem",
          borderTop:
            "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "2rem",
            marginBottom:
              "3rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize:
                  "34px",
                color: "#fff",
              }}
            >
              Luxury
              <span
                style={{
                  color:
                    COLORS.gold,
                }}
              >
                Stay
              </span>
            </h2>

            <p
              style={{
                color: "#888",
                lineHeight:
                  1.8,
                fontSize:
                  "14px",
                marginTop:
                  "1rem",
              }}
            >
              Experience timeless
              luxury and refined
              hospitality crafted
              for unforgettable
              moments.
            </p>
          </div>

          <div>
            <h4
              style={{
                color: "#fff",
                marginBottom:
                  "1rem",
              }}
            >
              Services
            </h4>

            {[
              "Luxury Suites",
              "Fine Dining",
              "Spa & Wellness",
              "Events",
            ].map((x) => (
              <div
                key={x}
                style={{
                  color: "#888",
                  marginBottom:
                    "10px",
                  fontSize:
                    "14px",
                }}
              >
                {x}
              </div>
            ))}
          </div>

          <div>
            <h4
              style={{
                color: "#fff",
                marginBottom:
                  "1rem",
              }}
            >
              Contact
            </h4>

            <div
              style={{
                color: "#888",
                lineHeight:
                  2,
                fontSize:
                  "14px",
              }}
            >
              Karachi, Pakistan
              <br />
              +92 21 111 598
              7890
              <br />
              info@luxurystay.com
            </div>
          </div>

          <div>
            <h4
              style={{
                color: "#fff",
                marginBottom:
                  "1rem",
              }}
            >
              Newsletter
            </h4>

            <input
              type="email"
              placeholder="Your Email"
              style={{
                width: "100%",
                padding:
                  "14px",
                background:
                  "#161616",
                border:
                  "1px solid rgba(201,168,76,0.2)",
                color: "#fff",
                marginBottom:
                  "1rem",
                outline: "none",
              }}
            />

            <Btn
              style={{
                width: "100%",
              }}
            >
              Subscribe
            </Btn>
          </div>
        </div>

        <div
          style={{
            borderTop:
              "1px solid rgba(201,168,76,0.1)",
            paddingTop:
              "1.5rem",
            textAlign: "center",
            color: "#666",
            fontSize: "13px",
          }}
        >
          © 2026 LuxuryStay —
          Crafted with Elegance
        </div>
      </footer>
    </div>
  );
}