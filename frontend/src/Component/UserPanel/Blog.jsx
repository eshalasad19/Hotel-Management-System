import { useState } from "react";
import { COLORS, GoldLine, SectionTag, Btn } from "./Shared";

const POSTS = [
  {
    cat: "Travel",
    date: "March 2025",
    title:
      "The Art of Slow Travel: Finding Meaning in Every Journey",
    excerpt:
      "In an age of rushed itineraries, we explore why the most transformative travel is measured not in destinations, but in depth of experience.",
    read: "8 min",
  },
  {
    cat: "Wellness",
    date: "February 2025",
    title:
      "Ancient Wisdom, Modern Healing: A Guide to Ayurvedic Retreats",
    excerpt:
      "From Himalayan herbs to copper vessel rituals, discover how ancient traditions are finding new relevance in contemporary wellness culture.",
    read: "6 min",
  },
  {
    cat: "Gastronomy",
    date: "January 2025",
    title:
      "The Zero-Food-Waste Philosophy Behind Our Kitchen",
    excerpt:
      "Chef Laurent Martin explains how sustainability and haute cuisine are not merely compatible — they are inseparable in the modern kitchen.",
    read: "5 min",
  },
  {
    cat: "Culture",
    date: "December 2024",
    title:
      "Architecture of Serenity: Designing Spaces That Heal",
    excerpt:
      "Our lead architect on the invisible decisions that make a room feel like a sanctuary rather than simply a place to sleep.",
    read: "7 min",
  },
  {
    cat: "Travel",
    date: "November 2024",
    title:
      "Hidden Corners: The Secret Gardens of Our Properties",
    excerpt:
      "Beyond the lobby and the spa lies a world of curated green spaces — each one a small wilderness within the city.",
    read: "4 min",
  },
  {
    cat: "Wellness",
    date: "October 2024",
    title:
      "Sleep as Luxury: The Science Behind Our Rest Protocols",
    excerpt:
      "From pillow menus to circadian-responsive lighting — a deep dive into the sleep architecture of the world's finest hotels.",
    read: "6 min",
  },
];

const CATEGORIES = [
  "All",
  "Travel",
  "Wellness",
  "Gastronomy",
  "Culture",
];

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);

  const filtered =
    filter === "All"
      ? POSTS
      : POSTS.filter((p) => p.cat === filter);

  const [featured, ...rest] = filtered;

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
          padding: "5rem 2rem 4rem",
          textAlign: "center",
        }}
      >
        <SectionTag>Journal</SectionTag>

        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(40px,5vw,72px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom: "1rem",
          }}
        >
          The <em>LuxuryStay</em> Journal
        </h1>

        <GoldLine />

        <p
          style={{
            color: "#999",
            fontSize: "14px",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.9,
          }}
        >
          Stories of travel, wellness,
          gastronomy and the art of living
          extraordinarily.
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          padding: "2.5rem 2rem 0",
          flexWrap: "wrap",
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "9px 22px",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background:
                filter === c
                  ? COLORS.gold
                  : "transparent",
              color:
                filter === c
                  ? COLORS.dark
                  : COLORS.muted,
              border: `1px solid ${
                filter === c
                  ? COLORS.gold
                  : "rgba(201,168,76,0.3)"
              }`,
              transition: "all 0.3s",
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          padding: "2.5rem 2rem 5rem",
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        {/* FEATURED POST */}
        {featured && (
          <div
            style={{
              background: COLORS.dark,
              padding: "3rem",
              border:
                "1px solid rgba(201,168,76,0.2)",
              marginBottom: "2rem",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: COLORS.gold,
                    border:
                      "1px solid rgba(201,168,76,0.4)",
                    padding: "3px 8px",
                  }}
                >
                  {featured.cat}
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#666",
                  }}
                >
                  {featured.date}
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#555",
                  }}
                >
                  · {featured.read} read
                </span>
              </div>

              <h2
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize:
                    "clamp(24px,2.5vw,34px)",
                  fontWeight: 300,
                  color: "#f0ead8",
                  lineHeight: 1.3,
                  marginBottom: "1.25rem",
                }}
              >
                {featured.title}
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "#888",
                  lineHeight: 1.9,
                  marginBottom: "1.5rem",
                }}
              >
                {featured.excerpt}
              </p>

              <Btn
                style={{
                  padding: "10px 24px",
                  fontSize: "10px",
                }}
              >
                Read Article →
              </Btn>
            </div>

            {/* FEATURE IMAGE */}
            <div
              style={{
                height: "280px",
                background:
                  "rgba(201,168,76,0.05)",
                border:
                  "1px solid rgba(201,168,76,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "72px",
                  fontWeight: 300,
                  color:
                    "rgba(201,168,76,0.15)",
                }}
              >
                ✦
              </div>
            </div>
          </div>
        )}

        {/* BLOG GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.5rem",
          }}
        >
          {rest.map((p, i) => {
            const hov = hovered === i;

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
                  background: hov
                    ? COLORS.dark
                    : COLORS.light,
                  border: `1px solid rgba(201,168,76,${
                    hov ? 0.3 : 0.15
                  })`,
                  padding: "1.75rem",
                  transition: "all 0.4s",
                  cursor: "pointer",
                  transform: hov
                    ? "translateY(-4px)"
                    : "translateY(0)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "1rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: COLORS.gold,
                    }}
                  >
                    {p.cat}
                  </span>

                  <span
                    style={{
                      fontSize: "10px",
                      color: "#999",
                    }}
                  >
                    {p.date}
                  </span>
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
                    lineHeight: 1.4,
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: hov
                      ? "#888"
                      : COLORS.muted,
                    lineHeight: 1.8,
                    marginBottom: "1rem",
                  }}
                >
                  {p.excerpt.slice(0, 100)}…
                </p>

                <div
                  style={{
                    fontSize: "11px",
                    color: COLORS.gold,
                    letterSpacing: "1px",
                  }}
                >
                  {p.read} read →
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div
        style={{
          background: COLORS.dark,
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <SectionTag>Newsletter</SectionTag>

        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(30px,4vw,42px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom: "0.75rem",
          }}
        >
          Stories Delivered to Your <em>Inbox</em>
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "13px",
            marginBottom: "2rem",
          }}
        >
          Monthly dispatches from the world of
          LuxuryStay
        </p>

        <div
          style={{
            display: "flex",
            maxWidth: "500px",
            margin: "0 auto",
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              flex: 1,
              minWidth: "240px",
              padding: "13px 16px",
              border:
                "1px solid rgba(201,168,76,0.3)",
              borderRight: "none",
              background:
                "rgba(255,255,255,0.05)",
              fontSize: "13px",
              color: "#e0d8c8",
              outline: "none",
            }}
          />

          <Btn
            style={{
              padding: "13px 24px",
              fontSize: "10px",
              borderRadius: 0,
            }}
          >
            Subscribe
          </Btn>
        </div>
      </div>
    </div>
  );
}