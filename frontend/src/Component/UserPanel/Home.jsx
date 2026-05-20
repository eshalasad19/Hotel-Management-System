import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const HERO_SLIDES = [
  {
    heading: "Timeless Luxury,\nUnforgettable Stays",
    sub: "Experience the art of refined hospitality",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
  },
  {
    heading: "Where Comfort\nMeets Elegance",
    sub: "Each room a sanctuary crafted for you",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    heading: "Indulge in\nPure Serenity",
    sub: "World-class amenities at every turn",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
  },
];

const FEATURES = [
  {
    icon: "✦",
    title: "Luxury Rooms",
    desc: "Handcrafted suites with panoramic views and bespoke furnishings.",
    path: "/Rooms",
  },
  {
    icon: "◈",
    title: "Fine Dining",
    desc: "Culinary journeys curated by award-winning chefs.",
    path: "/restaurant",
  },
  {
    icon: "❧",
    title: "Serenity Spa",
    desc: "Holistic treatments drawn from ancient wellness traditions.",
    path: "/spa",
  },
  {
    icon: "⬡",
    title: "Concierge",
    desc: "24/7 personalised service for every guest desire.",
    path: "/services",
  },
];



export default function HomePage() {
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BACKGROUND IMAGE */}
        <img
          src={s.img}
          alt="Luxury Hotel"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 1s ease",
          }}
        />

        {/* DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75))",
          }}
        />

        {/* GOLD GLOW */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />

        {/* TOP LINE */}
        <div
          style={{
            position: "absolute",
            top: "90px",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: COLORS.goldLight,
                marginBottom: "2rem",
              }}
            >
              LuxuryStay Hospitality
            </p>

            {s.heading.split("\n").map((ln, i) => (
              <h1
                key={i}
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize:
                    "clamp(48px,7vw,100px)",
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1.05,
                  textShadow:
                    "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                {ln}
              </h1>
            ))}

            <GoldLine />

            <p
              style={{
                fontSize: "15px",
                color: "#ddd",
                letterSpacing: "2px",
                marginBottom: "2.5rem",
              }}
            >
              {s.sub}
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link to="/Rooms">
                <Btn
                  style={{
                    padding: "15px 42px",
                    fontSize: "11px",
                  }}
                >
                  Reserve a Room
                </Btn>
              </Link>

              <Link to="/about">
                <Btn
                  variant="outline"
                  style={{
                    padding: "15px 42px",
                    fontSize: "11px",
                  }}
                >
                  Discover More
                </Btn>
              </Link>
            </div>

            {/* SLIDER DOTS */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "3rem",
              }}
            >
              {HERO_SLIDES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    width: i === slide ? "30px" : "8px",
                    height: "3px",
                    borderRadius: "10px",
                    background:
                      i === slide
                        ? COLORS.gold
                        : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "0.4s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SCROLL TEXT */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            color: COLORS.gold,
            fontSize: "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            zIndex: 5,
          }}
        >
          Scroll Down
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          padding: "6rem 2rem",
          background: COLORS.cream,
        }}
      >
        <SectionTag>Our Offerings</SectionTag>

        <h2
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(32px,4vw,52px)",
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
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {FEATURES.map((f, i) => {
            const hov = hovered === i;

            return (
              <Link
                key={i}
                to={f.path}
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  onMouseEnter={() =>
                    setHovered(i)
                  }
                  onMouseLeave={() =>
                    setHovered(null)
                  }
                  style={{
                    background: hov
                      ? COLORS.dark
                      : "#fff",
                    padding: "3rem 2rem",
                    borderRadius: "20px",
                    border:
                      "1px solid rgba(201,168,76,0.2)",
                    textAlign: "center",
                    transition: "0.4s",
                    transform: hov
                      ? "translateY(-8px)"
                      : "translateY(0)",
                    boxShadow: hov
                      ? "0 20px 40px rgba(0,0,0,0.18)"
                      : "0 8px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "34px",
                      color: COLORS.gold,
                      marginBottom: "1rem",
                    }}
                  >
                    {f.icon}
                  </div>

                  <h3
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                      fontSize: "28px",
                      fontWeight: 400,
                      color: hov
                        ? "#fff"
                        : COLORS.dark,
                      marginBottom: "1rem",
                    }}
                  >
                    {f.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: hov
                        ? "#bbb"
                        : COLORS.muted,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}