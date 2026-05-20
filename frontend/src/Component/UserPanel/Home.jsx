import { useState, useEffect } from "react";
import { COLORS, GoldLine, SectionTag, Btn } from "./Shared";

const HERO_SLIDES = [
  {
    heading: "Timeless Luxury,\nUnforgettable Stays",
    sub: "Experience the art of refined hospitality",
  },
  {
    heading: "Where Comfort\nMeets Elegance",
    sub: "Each room a sanctuary crafted for you",
  },
  {
    heading: "Indulge in\nPure Serenity",
    sub: "World-class amenities at every turn",
  },
];

const FEATURES = [
  {
    icon: "✦",
    title: "Luxury Rooms",
    desc: "Handcrafted suites with panoramic views and bespoke furnishings.",
    page: "Rooms",
  },
  {
    icon: "◈",
    title: "Fine Dining",
    desc: "Culinary journeys curated by award-winning chefs.",
    page: "Restaurant",
  },
  {
    icon: "❧",
    title: "Serenity Spa",
    desc: "Holistic treatments drawn from ancient wellness traditions.",
    page: "Spa",
  },
  {
    icon: "⬡",
    title: "Concierge",
    desc: "24/7 personalised service for every guest desire.",
    page: "Services",
  },
];

const TESTIMONIALS = [
  {
    name: "Amelia Thornton",
    role: "London",
    text: "An experience beyond imagination. Every detail spoke of extraordinary care.",
  },
  {
    name: "Reza Ahmadi",
    role: "Dubai",
    text: "LuxuryStay redefined what a hotel could be. Absolutely magnificent.",
  },
  {
    name: "Priya Kapoor",
    role: "Mumbai",
    text: "The spa, the food, the rooms — perfection in every sense.",
  },
];

export default function HomePage({ setPage }) {
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  const s = HERO_SLIDES[slide];

  return (
    <div>
      {/* HERO */}
      <div
        style={{
          height: "100vh",
          background: COLORS.darker,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Decorative Lines */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.3) 50%,transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.3) 50%,transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "60px",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(180deg,transparent 0%,rgba(201,168,76,0.2) 50%,transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "60px",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(180deg,transparent 0%,rgba(201,168,76,0.2) 50%,transparent 100%)",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            textAlign: "center",
            zIndex: 2,
            padding: "0 2rem",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            LuxuryStay Hospitality
          </p>

          {s.heading.split("\n").map((ln, i) => (
            <h1
              key={i}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(48px,7vw,96px)",
                fontWeight: 300,
                color: "#f0ead8",
                letterSpacing: "2px",
                lineHeight: 1.1,
              }}
            >
              {ln}
            </h1>
          ))}

          <GoldLine />

          <p
            style={{
              fontSize: "14px",
              color: "#aaa",
              letterSpacing: "3px",
              marginBottom: "2.5rem",
            }}
          >
            {s.sub}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Btn onClick={() => setPage("Rooms")}>
              Reserve a Room
            </Btn>

            <Btn
              variant="outline"
              onClick={() => setPage("About")}
            >
              Discover More
            </Btn>
          </div>

          {/* Slider Dots */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            {HERO_SLIDES.map((_, i) => (
              <div
                key={i}
                onClick={() => setSlide(i)}
                style={{
                  width: i === slide ? 24 : 8,
                  height: "2px",
                  background:
                    i === slide
                      ? COLORS.gold
                      : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.4s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: `linear-gradient(180deg,transparent,${COLORS.gold})`,
            }}
          />

          <span
            style={{
              fontSize: "9px",
              letterSpacing: "3px",
              color: COLORS.gold,
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          padding: "6rem 4rem",
          background: COLORS.cream,
        }}
      >
        <SectionTag>Our Offerings</SectionTag>

        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 300,
            textAlign: "center",
            color: COLORS.dark,
            marginBottom: "4rem",
          }}
        >
          A World of <em>Privilege</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "2px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {FEATURES.map((f, i) => {
            const hov = hovered === i;

            return (
              <div
                key={i}
                onClick={() => setPage(f.page)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hov
                    ? COLORS.dark
                    : COLORS.light,
                  padding: "3rem 2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.4s",
                  border: `1px solid rgba(201,168,76,${
                    hov ? 0.3 : 0.2
                  })`,
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    color: COLORS.gold,
                    marginBottom: "1.25rem",
                  }}
                >
                  {f.icon}
                </div>

                <h3
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: hov
                      ? "#f0ead8"
                      : COLORS.dark,
                    marginBottom: "0.75rem",
                  }}
                >
                  {f.title}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: hov
                      ? "#999"
                      : COLORS.muted,
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  {f.desc}
                </p>

                <div
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: COLORS.gold,
                    textTransform: "uppercase",
                  }}
                >
                  Explore →
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          background: COLORS.dark,
          padding: "4rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          ["15+", "Years of Excellence"],
          ["48", "Luxury Suites"],
          ["4", "Signature Restaurants"],
          ["99%", "Guest Satisfaction"],
        ].map(([n, l], i) => (
          <div
            key={i}
            style={{
              flex: 1,
              minWidth: "200px",
              maxWidth: "220px",
              textAlign: "center",
              borderRight:
                i < 3
                  ? "1px solid rgba(201,168,76,0.15)"
                  : "none",
              padding: "1rem 2rem",
            }}
          >
            <div
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize: "52px",
                fontWeight: 300,
                color: COLORS.gold,
                lineHeight: 1,
              }}
            >
              {n}
            </div>

            <div
              style={{
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#777",
                marginTop: "0.5rem",
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <div
        style={{
          padding: "6rem 4rem",
          background: COLORS.cream,
          textAlign: "center",
        }}
      >
        <SectionTag>Guest Stories</SectionTag>

        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(28px,3vw,44px)",
            fontWeight: 300,
            color: COLORS.dark,
            marginBottom: "3rem",
          }}
        >
          What Our <em>Guests</em> Say
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: COLORS.light,
                padding: "2.5rem",
                border:
                  "1px solid rgba(201,168,76,0.2)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "48px",
                  color: COLORS.gold,
                  lineHeight: 0.5,
                  marginBottom: "1.5rem",
                }}
              >
                "
              </div>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.9,
                  color: COLORS.muted,
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                }}
              >
                {t.text}
              </p>

              <div
                style={{
                  borderTop:
                    "1px solid rgba(201,168,76,0.2)",
                  paddingTop: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: COLORS.dark,
                  }}
                >
                  {t.name}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: COLORS.gold,
                    textTransform: "uppercase",
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: COLORS.dark,
          padding: "5rem 4rem",
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
              "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%,transparent 70%)",
          }}
        />

        <SectionTag>Reserve Now</SectionTag>

        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(32px,4vw,56px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom: "1rem",
          }}
        >
          Begin Your <em>Journey</em>
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#777",
            letterSpacing: "2px",
            marginBottom: "2.5rem",
          }}
        >
          Extraordinary experiences await
        </p>

        <Btn
          onClick={() => setPage("Rooms")}
          style={{
            padding: "15px 48px",
            fontSize: "12px",
          }}
        >
          Book Your Stay
        </Btn>
      </div>
    </div>
  );
}