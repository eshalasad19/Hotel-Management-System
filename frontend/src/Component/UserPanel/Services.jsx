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
  },
  {
    icon: "🧳",
    title: "Concierge Service",
    desc:
      "Personal concierge available 24/7 to arrange tours, reservations, theatre tickets and more.",
  },
  {
    icon: "🎽",
    title: "Fitness Center",
    desc:
      "State-of-the-art gym with personal trainers, yoga studio and infinity pool with skyline views.",
  },
  {
    icon: "👔",
    title: "Business Center",
    desc:
      "Fully equipped meeting rooms, video conferencing, printing and secretarial support.",
  },
  {
    icon: "🌹",
    title: "Event Planning",
    desc:
      "Weddings, galas and corporate events designed to perfection by our award-winning team.",
  },
  {
    icon: "🧹",
    title: "Housekeeping",
    desc:
      "Daily turndown service, 24-hour laundry, dry cleaning and same-day pressing available.",
  },
  {
    icon: "🍽",
    title: "In-Room Dining",
    desc:
      "Round-the-clock dining from our full restaurant menu, served directly to your suite.",
  },
  {
    icon: "🚗",
    title: "Valet Parking",
    desc:
      "Secure underground valet with electric vehicle charging stations and premium car detailing.",
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
      {/* HEADER */}
      <div
        style={{
          background: COLORS.darker,
          padding:
            "5rem 2rem 4rem",
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

        <SectionTag>
          Amenities
        </SectionTag>

        <h1
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(40px,5vw,72px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom:
              "1rem",
            position:
              "relative",
            zIndex: 2,
          }}
        >
          Services &
          <em>
            {" "}
            Amenities
          </em>
        </h1>

        <GoldLine />

        <p
          style={{
            color: "#999",
            fontSize: "14px",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.9,
            position:
              "relative",
            zIndex: 2,
          }}
        >
          Every service
          crafted with
          precision, every
          amenity chosen for
          your pleasure.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div
        style={{
          padding: "5rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "1.5rem",
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
                    setHovered(
                      i
                    )
                  }
                  onMouseLeave={() =>
                    setHovered(
                      null
                    )
                  }
                  style={{
                    background:
                      hov
                        ? COLORS.dark
                        : COLORS.light,
                    padding:
                      "2rem",
                    border: `1px solid rgba(201,168,76,${
                      hov
                        ? 0.4
                        : 0.15
                    })`,
                    transition:
                      "all 0.4s ease",
                    transform:
                      hov
                        ? "translateY(-6px)"
                        : "translateY(0)",
                    cursor:
                      "pointer",
                  }}
                >
                  <div
                    style={{
                      width:
                        "64px",
                      height:
                        "64px",
                      border:
                        "1px solid rgba(201,168,76,0.25)",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      marginBottom:
                        "1.5rem",
                      fontSize:
                        "28px",
                      background:
                        hov
                          ? "rgba(201,168,76,0.06)"
                          : "transparent",
                    }}
                  >
                    {s.icon}
                  </div>

                  <h3
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                      fontSize:
                        "24px",
                      fontWeight:
                        400,
                      color: hov
                        ? "#f0ead8"
                        : COLORS.dark,
                      marginBottom:
                        "0.9rem",
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      fontSize:
                        "13px",
                      color: hov
                        ? "#999"
                        : COLORS.muted,
                      lineHeight:
                        1.9,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          background: COLORS.light,
          padding:
            "3rem 2rem",
          borderTop:
            "1px solid rgba(201,168,76,0.1)",
          borderBottom:
            "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {EXTRA.map(
            (e, i) => (
              <div
                key={i}
                style={{
                  padding:
                    "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize:
                      "42px",
                    color:
                      COLORS.gold,
                    marginBottom:
                      "0.4rem",
                  }}
                >
                  {e.value}
                </div>

                <div
                  style={{
                    fontSize:
                      "11px",
                    letterSpacing:
                      "2px",
                    textTransform:
                      "uppercase",
                    color:
                      COLORS.muted,
                  }}
                >
                  {e.label}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA SECTION */}
      <div
        style={{
          background: COLORS.dark,
          padding:
            "5rem 2rem",
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
              "radial-gradient(circle at center, rgba(201,168,76,0.07), transparent 70%)",
          }}
        />

        <SectionTag>
          Concierge
        </SectionTag>

        <h2
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(32px,4vw,52px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom:
              "1rem",
            position:
              "relative",
            zIndex: 2,
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
            fontSize: "14px",
            color: "#777",
            maxWidth: "600px",
            margin:
              "0 auto 2rem",
            lineHeight: 1.9,
            position:
              "relative",
            zIndex: 2,
          }}
        >
          From private jet
          arrangements to
          bespoke celebrations,
          our concierge team
          is available around
          the clock to fulfill
          every request.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
            gap: "1rem",
            flexWrap: "wrap",
            position:
              "relative",
            zIndex: 2,
          }}
        >
          <Btn
            style={{
              padding:
                "13px 32px",
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
                "13px 32px",
              fontSize:
                "11px",
              border:
                "1px solid rgba(201,168,76,0.35)",
              color:
                "#f0ead8",
            }}
          >
            Explore Services
          </Btn>
        </div>

        <div
          style={{
            marginTop: "2rem",
            fontSize: "12px",
            color:
              COLORS.gold,
            letterSpacing:
              "2px",
            position:
              "relative",
            zIndex: 2,
          }}
        >
          +92 21 111 598
          7890 ·
          concierge@luxurystay.com
        </div>
      </div>
    </div>
  );
}