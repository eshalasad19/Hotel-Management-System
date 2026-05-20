import { useState } from "react";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const RESTAURANTS = [
  {
    name: "Altitude",
    cuisine: "Contemporary European",
    floor: "Rooftop, 24F",
    hours: "7pm – 11pm",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    desc:
      "An ever-changing tasting menu inspired by the seasons, paired with rare wines from our 10,000-bottle cellar.",
    reservations: true,
  },
  {
    name: "The Garden Terrace",
    cuisine: "Mediterranean All-Day",
    floor: "Ground Floor",
    hours: "7am – 6pm",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    desc:
      "Sunlit al-fresco dining surrounded by sculpted hedges — breakfasts, lunches and leisurely afternoon teas.",
    reservations: false,
  },
  {
    name: "Ember & Oak",
    cuisine: "Japanese Grill",
    floor: "Level 3",
    hours: "12pm – 3pm · 6pm – 11pm",
    image:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=1200&auto=format&fit=crop",
    desc:
      "Robata grills, omakase sushi counter and premium wagyu — a theatre of fire and precision.",
    reservations: true,
  },
  {
    name: "The Cigar Lounge",
    cuisine: "Small Plates & Cocktails",
    floor: "Level 2",
    hours: "4pm – 2am",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
    desc:
      "Intimate wood-panelled bar for rare spirits, artisanal cocktails and elevated sharing plates.",
    reservations: false,
  },
];

const MENU = [
  {
    cat: "Starters",
    items: [
      {
        name: "Hamachi Tartare",
        detail: "yuzu, daikon, micro shiso",
        price: "$28",
      },
      {
        name: "Truffle Arancini",
        detail: "aged parmesan, lemon aioli",
        price: "$24",
      },
      {
        name: "Burrata",
        detail:
          "heritage tomato, olive oil, sea salt",
        price: "$22",
      },
    ],
  },
  {
    cat: "Mains",
    items: [
      {
        name: "A5 Wagyu Tenderloin",
        detail:
          "bone marrow jus, pommes dauphine",
        price: "$98",
      },
      {
        name: "Line-caught Sea Bass",
        detail:
          "fennel velouté, caviar butter",
        price: "$64",
      },
      {
        name: "Roasted Celeriac",
        detail:
          "black truffle, walnut cream",
        price: "$42",
      },
    ],
  },
  {
    cat: "Desserts",
    items: [
      {
        name:
          "Valrhona Chocolate Fondant",
        detail:
          "salted caramel, vanilla bean",
        price: "$20",
      },
      {
        name: "Mango Soufflé",
        detail:
          "passion fruit coulis",
        price: "$18",
      },
      {
        name:
          "Artisanal Cheese Board",
        detail:
          "seasonal accompaniments",
        price: "$32",
      },
    ],
  },
];

export default function RestaurantPage() {
  const [activeMenu, setActiveMenu] =
    useState("Starters");

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
          background:
            "linear-gradient(rgba(10,10,10,0.72), rgba(10,10,10,0.82)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop') center/cover",
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "5rem 2rem",
        }}
      >
        <SectionTag>
          Culinary Arts
        </SectionTag>

        <h1
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(48px,6vw,84px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          Dining{" "}
          <em>Experiences</em>
        </h1>

        <GoldLine />

        <p
          style={{
            color: "#bbb",
            fontSize: "15px",
            maxWidth: "650px",
            margin: "2rem auto 0",
            lineHeight: 2,
          }}
        >
          Four extraordinary culinary
          destinations — from rooftop
          fine dining to intimate
          cocktail lounges and elegant
          garden breakfasts.
        </p>
      </div>

      {/* RESTAURANTS */}
      <div
        style={{
          padding: "5rem 2rem",
          maxWidth: "1250px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "2rem",
        }}
      >
        {RESTAURANTS.map((r, i) => {
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
                  hov ? 0.35 : 0.15
                })`,
                borderRadius: "24px",
                overflow: "hidden",
                transition:
                  "all 0.45s ease",
                transform: hov
                  ? "translateY(-10px) scale(1.02)"
                  : "translateY(0)",
                boxShadow: hov
                  ? "0 25px 50px rgba(0,0,0,0.18)"
                  : "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  height: "240px",
                  background: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.35)), url(${r.image}) center/cover`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position:
                      "absolute",
                    top: "18px",
                    right: "18px",
                    background:
                      "rgba(201,168,76,0.15)",
                    border:
                      "1px solid rgba(201,168,76,0.35)",
                    padding:
                      "6px 14px",
                    borderRadius:
                      "40px",
                    fontSize: "9px",
                    letterSpacing:
                      "2px",
                    color:
                      COLORS.gold,
                    textTransform:
                      "uppercase",
                  }}
                >
                  Fine Dining
                </div>
              </div>

              {/* CONTENT */}
              <div
                style={{
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing:
                      "3px",
                    textTransform:
                      "uppercase",
                    color:
                      COLORS.gold,
                    marginBottom:
                      "0.6rem",
                  }}
                >
                  {r.floor}
                </div>

                <h3
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize:
                      "32px",
                    fontWeight: 400,
                    color: hov
                      ? "#f0ead8"
                      : COLORS.dark,
                    marginBottom:
                      "0.5rem",
                  }}
                >
                  {r.name}
                </h3>

                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing:
                      "2px",
                    textTransform:
                      "uppercase",
                    color: hov
                      ? "#888"
                      : COLORS.muted,
                    marginBottom:
                      "1rem",
                  }}
                >
                  {r.cuisine}
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.9,
                    color: hov
                      ? "#aaa"
                      : COLORS.muted,
                    marginBottom:
                      "1.8rem",
                  }}
                >
                  {r.desc}
                </p>

                <div
                  style={{
                    borderTop:
                      "1px solid rgba(201,168,76,0.12)",
                    paddingTop:
                      "1rem",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "11px",
                      color: hov
                        ? "#777"
                        : "#999",
                    }}
                  >
                    {r.hours}
                  </div>

                  {r.reservations && (
                    <Btn
                      style={{
                        padding:
                          "9px 18px",
                        fontSize:
                          "9px",
                      }}
                    >
                      Reserve
                    </Btn>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MENU */}
      <div
        style={{
          background: COLORS.dark,
          padding: "5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <SectionTag>
            Signature Menu
          </SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(34px,5vw,52px)",
              fontWeight: 300,
              color: "#f0ead8",
              marginBottom:
                "2rem",
            }}
          >
            Altitude{" "}
            <em>Selections</em>
          </h2>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom:
                "2rem",
            }}
          >
            {MENU.map((m) => (
              <button
                key={m.cat}
                onClick={() =>
                  setActiveMenu(
                    m.cat
                  )
                }
                style={{
                  padding:
                    "10px 28px",
                  fontSize:
                    "10px",
                  letterSpacing:
                    "2px",
                  textTransform:
                    "uppercase",
                  borderRadius:
                    "40px",
                  border: `1px solid ${
                    activeMenu ===
                    m.cat
                      ? COLORS.gold
                      : "rgba(201,168,76,0.2)"
                  }`,
                  background:
                    activeMenu ===
                    m.cat
                      ? COLORS.gold
                      : "transparent",
                  color:
                    activeMenu ===
                    m.cat
                      ? COLORS.dark
                      : "#777",
                  cursor:
                    "pointer",
                  transition:
                    "0.3s",
                }}
              >
                {m.cat}
              </button>
            ))}
          </div>

          {/* MENU ITEMS */}
          {MENU.find(
            (m) =>
              m.cat ===
              activeMenu
          )?.items.map(
            (item, i) => (
              <div
                key={i}
                style={{
                  borderBottom:
                    "1px solid rgba(201,168,76,0.08)",
                  padding:
                    "1.8rem 1rem",
                  borderRadius:
                    "14px",
                  transition:
                    "0.3s",
                  cursor:
                    "pointer",
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    textAlign:
                      "left",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                      fontSize:
                        "22px",
                      color:
                        "#f0ead8",
                      marginBottom:
                        "4px",
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      fontSize:
                        "12px",
                      color:
                        "#777",
                      lineHeight:
                        1.7,
                    }}
                  >
                    {
                      item.detail
                    }
                  </div>
                </div>

                <div
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize:
                      "24px",
                    color:
                      COLORS.gold,
                    minWidth:
                      "70px",
                    textAlign:
                      "right",
                  }}
                >
                  {item.price}
                </div>
              </div>
            )
          )}

          <p
            style={{
              marginTop: "2rem",
              fontSize: "11px",
              color: "#666",
              lineHeight: 1.8,
              letterSpacing:
                "1px",
            }}
          >
            Menus evolve seasonally
            using locally sourced
            ingredients and chef-led
            tasting concepts.
          </p>
        </div>
      </div>

      {/* CHEF */}
      <div
        style={{
          padding: "5rem 2rem",
          background: COLORS.cream,
          textAlign: "center",
        }}
      >
        <SectionTag>
          Executive Chef
        </SectionTag>

        <h2
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(38px,5vw,56px)",
            fontWeight: 300,
            color: COLORS.dark,
            marginBottom: "1rem",
          }}
        >
          Chef{" "}
          <em>
            Laurent Martin
          </em>
        </h2>

        <GoldLine />

        <p
          style={{
            maxWidth: "720px",
            margin:
              "2rem auto 0",
            lineHeight: 2,
            color:
              COLORS.muted,
            fontSize: "14px",
          }}
        >
          Michelin-starred culinary
          artist blending French
          precision with globally
          inspired flavors to create
          unforgettable dining
          experiences.
        </p>
      </div>

      {/* WINE SECTION */}
      <div
        style={{
          background: COLORS.darker,
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        <SectionTag>
          Wine Collection
        </SectionTag>

        <h2
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(34px,5vw,50px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom:
              "1rem",
          }}
        >
          10,000 Bottle{" "}
          <em>Cellar</em>
        </h2>

        <GoldLine />

        <p
          style={{
            maxWidth: "650px",
            margin:
              "2rem auto",
            color: "#888",
            lineHeight: 1.9,
            fontSize: "14px",
          }}
        >
          Rare vintages, private
          tastings and curated wine
          pairings from world-renowned
          vineyards.
        </p>

        <Btn
          style={{
            padding:
              "13px 34px",
            fontSize: "10px",
          }}
        >
          Explore Collection
        </Btn>
      </div>

      {/* CTA */}
      <div
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          background: COLORS.dark,
        }}
      >
        <SectionTag>
          Reservations
        </SectionTag>

        <h2
          style={{
            fontFamily:
              "Cormorant Garamond, serif",
            fontSize:
              "clamp(34px,5vw,52px)",
            color: "#f0ead8",
            fontWeight: 300,
            marginBottom:
              "1rem",
          }}
        >
          Reserve Your{" "}
          <em>Table</em>
        </h2>

        <p
          style={{
            color: "#777",
            marginBottom:
              "2rem",
            fontSize: "14px",
          }}
        >
          Limited seating available
          nightly for signature dining
          experiences.
        </p>

        <Btn
          style={{
            padding:
              "14px 40px",
            fontSize: "11px",
          }}
        >
          Book Dining Experience
        </Btn>
      </div>
    </div>
  );
}