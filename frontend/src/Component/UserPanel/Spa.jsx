import { useState } from "react";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const TREATMENTS = [
  {
    name: "Himalayan Stone Ritual",
    duration: "90 min",
    price: "Rs 220",
    cat: "Massage",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    desc:
      "Volcanic stones heated to therapeutic warmth, releasing deep tension and restoring energy flow.",
  },
  {
    name: "Gold Leaf Facial",
    duration: "75 min",
    price: "Rs 185",
    cat: "Facial",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    desc:
      "24-karat gold infused with hyaluronic serum brightens and firms for radiant luminosity.",
  },
  {
    name: "Ayurvedic Abhyanga",
    duration: "60 min",
    price: "Rs 160",
    cat: "Massage",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    desc:
      "Ancient Indian full-body warm oil treatment balancing all three doshas.",
  },
  {
    name: "Arabian Hammam",
    duration: "120 min",
    price: "Rs 280",
    cat: "Ritual",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    desc:
      "A journey through steam, exfoliation and aromatherapy in our authentic marble hammam.",
  },
  {
    name: "Alpine Herb Wrap",
    duration: "60 min",
    price: "Rs 145",
    cat: "Body",
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop",
    desc:
      "Swiss mountain herbs detoxify and nourish the skin while soothing tired muscles.",
  },
  {
    name: "Couples Sanctuary",
    duration: "180 min",
    price: "Rs 520",
    cat: "Couples",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    desc:
      "A shared journey — massage, facial, private pool and champagne for two.",
  },
];

const CATEGORIES = [
  "All",
  "Massage",
  "Facial",
  "Ritual",
  "Body",
  "Couples",
];

export default function SpaPage() {
  const [filter, setFilter] =
    useState("All");

  const [hovered, setHovered] =
    useState(null);

  const filtered =
    filter === "All"
      ? TREATMENTS
      : TREATMENTS.filter(
          (t) =>
            t.cat === filter
        );

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        background:
          COLORS.cream,
      }}
    >
      {/* HERO */}
      <div
        style={{
          height: "70vh",
          position:
            "relative",
          overflow:
            "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop"
          alt=""
          style={{
            position:
              "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit:
              "cover",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8))",
          }}
        />

        <div
          style={{
            position:
              "relative",
            zIndex: 5,
            height: "100%",
            display:
              "flex",
            flexDirection:
              "column",
            justifyContent:
              "center",
            alignItems:
              "center",
            textAlign:
              "center",
            padding:
              "0 2rem",
          }}
        >
          <SectionTag>
            Luxury Wellness
          </SectionTag>

          <h1
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(42px,6vw,82px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom:
                "1rem",
            }}
          >
            The
            <em>
              {" "}
              Serenity
            </em>{" "}
            Spa
          </h1>

          <GoldLine />

          <p
            style={{
              color: "#ddd",
              maxWidth:
                "700px",
              lineHeight:
                1.9,
              fontSize:
                "15px",
            }}
          >
            Ancient wisdom
            meets modern
            science in our
            award-winning
            wellness sanctuary
            designed for total
            renewal.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          background:
            COLORS.dark,
          padding:
            "4rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth:
              "1200px",
            margin:
              "0 auto",
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            [
              "4",
              "Luxury Floors",
            ],
            [
              "12",
              "Treatment Rooms",
            ],
            [
              "1",
              "Private Hammam",
            ],
            [
              "∞",
              "Infinity Pool",
            ],
          ].map(
            ([n, l], i) => (
              <div
                key={i}
                style={{
                  textAlign:
                    "center",
                  padding:
                    "2rem",
                  border:
                    "1px solid rgba(201,168,76,0.12)",
                  borderRadius:
                    "22px",
                  background:
                    "rgba(255,255,255,0.03)",
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
                    marginBottom:
                      "0.5rem",
                  }}
                >
                  {n}
                </div>

                <div
                  style={{
                    fontSize:
                      "11px",
                    letterSpacing:
                      "3px",
                    textTransform:
                      "uppercase",
                    color:
                      "#999",
                  }}
                >
                  {l}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div
        style={{
          padding:
            "4rem 2rem 1rem",
          display:
            "flex",
          justifyContent:
            "center",
          gap: "12px",
          flexWrap:
            "wrap",
        }}
      >
        {CATEGORIES.map(
          (c) => (
            <button
              key={c}
              onClick={() =>
                setFilter(c)
              }
              style={{
                padding:
                  "12px 24px",
                borderRadius:
                  "50px",
                border: `1px solid ${
                  filter === c
                    ? COLORS.gold
                    : "rgba(201,168,76,0.25)"
                }`,
                background:
                  filter === c
                    ? COLORS.gold
                    : "transparent",
                color:
                  filter === c
                    ? COLORS.dark
                    : COLORS.muted,
                fontSize:
                  "11px",
                letterSpacing:
                  "2px",
                textTransform:
                  "uppercase",
                cursor:
                  "pointer",
                transition:
                  "0.3s",
              }}
            >
              {c}
            </button>
          )
        )}
      </div>

      {/* TREATMENTS */}
      <div
        style={{
          padding:
            "2rem 2rem 6rem",
          maxWidth:
            "1300px",
          margin:
            "0 auto",
        }}
      >
        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "2rem",
          }}
        >
          {filtered.map(
            (t, i) => {
              const hov =
                hovered ===
                i;

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
                      "#fff",
                    borderRadius:
                      "24px",
                    overflow:
                      "hidden",
                    boxShadow:
                      hov
                        ? "0 25px 50px rgba(0,0,0,0.15)"
                        : "0 10px 30px rgba(0,0,0,0.08)",
                    transition:
                      "0.45s",
                    transform:
                      hov
                        ? "translateY(-10px)"
                        : "translateY(0)",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      height:
                        "240px",
                      position:
                        "relative",
                      overflow:
                        "hidden",
                    }}
                  >
                    <img
                      src={
                        t.img
                      }
                      alt={
                        t.name
                      }
                      style={{
                        width:
                          "100%",
                        height:
                          "100%",
                        objectFit:
                          "cover",
                        transition:
                          "0.6s",
                        transform:
                          hov
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
                          "linear-gradient(transparent, rgba(0,0,0,0.5))",
                      }}
                    />

                    <div
                      style={{
                        position:
                          "absolute",
                        bottom:
                          "18px",
                        left:
                          "18px",
                        background:
                          "rgba(0,0,0,0.55)",
                        backdropFilter:
                          "blur(8px)",
                        padding:
                          "10px 18px",
                        borderRadius:
                          "50px",
                        color:
                          COLORS.gold,
                        fontSize:
                          "10px",
                        letterSpacing:
                          "2px",
                        textTransform:
                          "uppercase",
                        border:
                          "1px solid rgba(201,168,76,0.25)",
                      }}
                    >
                      {t.cat}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    style={{
                      padding:
                        "2rem",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        marginBottom:
                          "1rem",
                      }}
                    >
                      <span
                        style={{
                          color:
                            COLORS.gold,
                          fontSize:
                            "12px",
                          letterSpacing:
                            "2px",
                          textTransform:
                            "uppercase",
                        }}
                      >
                        {
                          t.duration
                        }
                      </span>

                      <span
                        style={{
                          fontFamily:
                            "Cormorant Garamond, serif",
                          fontSize:
                            "28px",
                          color:
                            COLORS.gold,
                        }}
                      >
                        {
                          t.price
                        }
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "32px",
                        fontWeight:
                          400,
                        color:
                          COLORS.dark,
                        marginBottom:
                          "1rem",
                      }}
                    >
                      {t.name}
                    </h3>

                    <p
                      style={{
                        color:
                          COLORS.muted,
                        lineHeight:
                          1.9,
                        fontSize:
                          "14px",
                        marginBottom:
                          "2rem",
                      }}
                    >
                      {t.desc}
                    </p>

                    <Btn
                      style={{
                        width:
                          "100%",
                        padding:
                          "14px",
                        fontSize:
                          "11px",
                      }}
                    >
                      Reserve
                      Treatment
                    </Btn>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#111,#1d1d1d)",
          padding:
            "6rem 2rem",
          textAlign:
            "center",
          position:
            "relative",
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(201,168,76,0.08), transparent 70%)",
          }}
        />

        <div
          style={{
            position:
              "relative",
            zIndex: 2,
          }}
        >
          <SectionTag>
            Gift Wellness
          </SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(34px,5vw,58px)",
              fontWeight:
                300,
              color:
                "#fff",
              marginBottom:
                "1rem",
            }}
          >
            Give the Gift of
            <em>
              {" "}
              Serenity
            </em>
          </h2>

          <p
            style={{
              color:
                "#999",
              maxWidth:
                "650px",
              margin:
                "0 auto 2.5rem",
              lineHeight:
                1.9,
              fontSize:
                "15px",
            }}
          >
            Share luxurious
            wellness experiences
            with beautifully
            curated spa gift
            cards and exclusive
            treatment packages.
          </p>

          <Btn
            style={{
              padding:
                "15px 40px",
              fontSize:
                "11px",
            }}
          >
            Purchase Gift Card
          </Btn>
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
            maxWidth:
              "1200px",
            margin:
              "0 auto",
            display:
              "grid",
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
                color:
                  "#fff",
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
                color:
                  "#888",
                lineHeight:
                  1.8,
                marginTop:
                  "1rem",
                fontSize:
                  "14px",
              }}
            >
              Rejuvenate your
              body, calm your
              mind and awaken
              your senses in our
              world-class luxury
              spa sanctuary.
            </p>
          </div>

          <div>
            <h4
              style={{
                color:
                  "#fff",
                marginBottom:
                  "1rem",
              }}
            >
              Spa Services
            </h4>

            {[
              "Massage Therapy",
              "Facials",
              "Hammam Rituals",
              "Couple Packages",
            ].map((x) => (
              <div
                key={x}
                style={{
                  color:
                    "#888",
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
                color:
                  "#fff",
                marginBottom:
                  "1rem",
              }}
            >
              Contact
            </h4>

            <div
              style={{
                color:
                  "#888",
                lineHeight:
                  2,
                fontSize:
                  "14px",
              }}
            >
              Karachi,
              Pakistan
              <br />
              +92 21 111
              598 7890
              <br />
              spa@luxurystay.com
            </div>
          </div>

          <div>
            <h4
              style={{
                color:
                  "#fff",
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
                width:
                  "100%",
                padding:
                  "14px",
                background:
                  "#161616",
                border:
                  "1px solid rgba(201,168,76,0.2)",
                color:
                  "#fff",
                marginBottom:
                  "1rem",
                outline:
                  "none",
              }}
            />

            <Btn
              style={{
                width:
                  "100%",
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
            textAlign:
              "center",
            color:
              "#666",
            fontSize:
              "13px",
          }}
        >
          © 2026 LuxuryStay
          Spa — Wellness &
          Luxury Redefined
        </div>
      </footer>
    </div>
  );
}