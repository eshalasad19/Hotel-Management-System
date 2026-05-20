import { useState } from "react";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const POSTS = [
  {
    cat: "Travel",
    date: "March 2025",
    read: "8 min",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    title:
      "The Art of Slow Travel: Finding Meaning in Every Journey",
    excerpt:
      "In an age of rushed itineraries, we explore why the most transformative travel is measured not in destinations, but in depth of experience.",
  },
  {
    cat: "Wellness",
    date: "February 2025",
    read: "6 min",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    title:
      "Ancient Wisdom, Modern Healing: A Guide to Ayurvedic Retreats",
    excerpt:
      "From Himalayan herbs to copper vessel rituals, discover how ancient traditions are finding new relevance in contemporary wellness culture.",
  },
  {
    cat: "Gastronomy",
    date: "January 2025",
    read: "5 min",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title:
      "The Zero-Food-Waste Philosophy Behind Our Kitchen",
    excerpt:
      "Chef Laurent Martin explains how sustainability and haute cuisine are inseparable in the modern kitchen.",
  },
  {
    cat: "Culture",
    date: "December 2024",
    read: "7 min",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    title:
      "Architecture of Serenity: Designing Spaces That Heal",
    excerpt:
      "The invisible design decisions that transform spaces into sanctuaries of peace and comfort.",
  },
  {
    cat: "Travel",
    date: "November 2024",
    read: "4 min",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    title:
      "Hidden Corners: The Secret Gardens of Our Properties",
    excerpt:
      "A journey through our curated green sanctuaries hidden within the city skyline.",
  },
  {
    cat: "Wellness",
    date: "October 2024",
    read: "6 min",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    title:
      "Sleep as Luxury: The Science Behind Our Rest Protocols",
    excerpt:
      "Discover how circadian lighting, pillow menus and soundscapes redefine luxury sleep.",
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
        background: COLORS.cream,
      }}
    >
      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: "75vh",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1600&auto=format&fit=crop"
          alt=""
          style={{
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
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.75))",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div>
            <SectionTag>
              Journal
            </SectionTag>

            <h1
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize:
                  "clamp(48px,7vw,90px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              The LuxuryStay
              <br />
              <em>Journal</em>
            </h1>

            <GoldLine />

            <p
              style={{
                color: "#ccc",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: 1.9,
                fontSize: "15px",
              }}
            >
              Stories of travel,
              wellness, gastronomy
              and extraordinary
              living from around the
              world.
            </p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          padding: "3rem 2rem 1rem",
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "10px 22px",
              borderRadius: "30px",
              border: `1px solid ${
                filter === c
                  ? COLORS.gold
                  : "rgba(201,168,76,0.3)"
              }`,
              background:
                filter === c
                  ? COLORS.gold
                  : "transparent",
              color:
                filter === c
                  ? COLORS.dark
                  : COLORS.muted,
              cursor: "pointer",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "0.3s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FEATURED */}
      {featured && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "2rem auto",
            padding: "0 2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              background: COLORS.dark,
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.18)",
            }}
          >
            <img
              src={featured.img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                minHeight: "350px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent:
                  "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: COLORS.gold,
                    fontSize: "10px",
                    letterSpacing: "3px",
                    textTransform:
                      "uppercase",
                  }}
                >
                  {featured.cat}
                </span>

                <span
                  style={{
                    color: "#777",
                    fontSize: "11px",
                  }}
                >
                  {featured.date}
                </span>
              </div>

              <h2
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize:
                    "clamp(28px,3vw,42px)",
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1.3,
                  marginBottom: "1rem",
                }}
              >
                {featured.title}
              </h2>

              <p
                style={{
                  color: "#aaa",
                  lineHeight: 1.9,
                  marginBottom: "2rem",
                  fontSize: "14px",
                }}
              >
                {featured.excerpt}
              </p>

              <Btn
                style={{
                  width: "fit-content",
                  padding:
                    "12px 28px",
                  fontSize: "11px",
                }}
              >
                Read Article →
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* BLOG GRID */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "2rem",
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
                background: "#fff",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: hov
                  ? "0 18px 40px rgba(0,0,0,0.15)"
                  : "0 8px 24px rgba(0,0,0,0.06)",
                transform: hov
                  ? "translateY(-8px)"
                  : "translateY(0)",
                transition: "0.4s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  height: "230px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hov
                      ? "scale(1.08)"
                      : "scale(1)",
                    transition:
                      "0.5s",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "1.8rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "1rem",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      color: COLORS.gold,
                      fontSize: "10px",
                      letterSpacing:
                        "2px",
                      textTransform:
                        "uppercase",
                    }}
                  >
                    {p.cat}
                  </span>

                  <span
                    style={{
                      color: "#999",
                      fontSize: "11px",
                    }}
                  >
                    {p.read} read
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize: "28px",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color:
                      COLORS.dark,
                    marginBottom:
                      "1rem",
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    color:
                      COLORS.muted,
                    fontSize: "14px",
                    lineHeight: 1.9,
                    marginBottom:
                      "1.5rem",
                  }}
                >
                  {p.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  <span
                    style={{
                      color: "#999",
                      fontSize: "12px",
                    }}
                  >
                    {p.date}
                  </span>

                  <span
                    style={{
                      color: COLORS.gold,
                      fontSize: "12px",
                      letterSpacing:
                        "1px",
                    }}
                  >
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* NEWSLETTER */}
      <div
        style={{
          background: COLORS.dark,
          padding: "5rem 2rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <SectionTag>
            Newsletter
          </SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(34px,4vw,54px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Stay Inspired
          </h2>

          <p
            style={{
              color: "#888",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Receive curated travel
            stories, wellness
            insights and exclusive
            LuxuryStay updates.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent:
                "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding:
                  "15px 18px",
                minWidth: "280px",
                border:
                  "1px solid rgba(201,168,76,0.3)",
                background:
                  "rgba(255,255,255,0.05)",
                color: "#fff",
                outline: "none",
                borderRadius:
                  "12px",
              }}
            />

            <Btn
              style={{
                padding:
                  "15px 28px",
                fontSize: "11px",
              }}
            >
              Subscribe
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}