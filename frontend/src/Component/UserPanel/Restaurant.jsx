import { useState } from "react";
import { COLORS, GoldLine, SectionTag, Btn } from "./Shared";

const RESTAURANTS = [
  {
    name: "Altitude",
    cuisine: "Contemporary European",
    floor: "Rooftop, 24F",
    hours: "7pm – 11pm",
    desc:
      "An ever-changing tasting menu inspired by the seasons, paired with rare wines from our 10,000-bottle cellar.",
    reservations: true,
  },
  {
    name: "The Garden Terrace",
    cuisine: "Mediterranean All-Day",
    floor: "Ground Floor",
    hours: "7am – 6pm",
    desc:
      "Sunlit al-fresco dining surrounded by sculpted hedges — breakfasts, lunches and leisurely afternoon teas.",
    reservations: false,
  },
  {
    name: "Ember & Oak",
    cuisine: "Japanese Grill",
    floor: "Level 3",
    hours: "12pm – 3pm · 6pm – 11pm",
    desc:
      "Robata grills, omakase sushi counter and premium wagyu — a theatre of fire and precision.",
    reservations: true,
  },
  {
    name: "The Cigar Lounge",
    cuisine: "Small Plates & Cocktails",
    floor: "Level 2",
    hours: "4pm – 2am",
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
      {/* HEADER */}
      <div
        style={{
          background: COLORS.darker,
          padding: "5rem 2rem 4rem",
          textAlign: "center",
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
              "clamp(40px,5vw,72px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom: "1rem",
          }}
        >
          Dining <em>Experiences</em>
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
          Four distinct venues —
          from rooftop haute cuisine
          to sun-drenched terrace
          breakfasts.
        </p>
      </div>

      {/* RESTAURANTS */}
      <div
        style={{
          padding: "4rem 2rem",
          maxWidth: "1150px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "1.5rem",
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
                  hov ? 0.4 : 0.15
                })`,
                padding: "2rem",
                transition: "all 0.4s",
                transform: hov
                  ? "translateY(-5px)"
                  : "translateY(0)",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "3px",
                  textTransform:
                    "uppercase",
                  color: COLORS.gold,
                  marginBottom: "0.5rem",
                }}
              >
                {r.floor}
              </div>

              <h3
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: hov
                    ? "#f0ead8"
                    : COLORS.dark,
                  marginBottom: "0.5rem",
                }}
              >
                {r.name}
              </h3>

              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform:
                    "uppercase",
                  color: COLORS.muted,
                  marginBottom: "1rem",
                }}
              >
                {r.cuisine}
              </div>

              <p
                style={{
                  fontSize: "13px",
                  color: hov
                    ? "#aaa"
                    : COLORS.muted,
                  lineHeight: 1.9,
                  marginBottom: "1.5rem",
                }}
              >
                {r.desc}
              </p>

              <div
                style={{
                  borderTop:
                    "1px solid rgba(201,168,76,0.15)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
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
                        "7px 16px",
                      fontSize: "9px",
                    }}
                  >
                    Reserve
                  </Btn>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MENU SECTION */}
      <div
        style={{
          background: COLORS.dark,
          padding: "4rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <SectionTag>
            Sample Menu
          </SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(32px,4vw,44px)",
              fontWeight: 300,
              color: "#f0ead8",
              marginBottom: "2rem",
            }}
          >
            Altitude <em>Signature</em>
          </h2>

          {/* MENU TABS */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "6px",
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
                  fontSize: "10px",
                  letterSpacing:
                    "2px",
                  textTransform:
                    "uppercase",
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
                  border: `1px solid ${
                    activeMenu ===
                    m.cat
                      ? COLORS.gold
                      : "rgba(201,168,76,0.2)"
                  }`,
                  transition:
                    "all 0.3s",
                  cursor: "pointer",
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
                    "1px solid rgba(201,168,76,0.1)",
                  padding:
                    "1.4rem 0",
                  textAlign:
                    "left",
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                      fontSize:
                        "18px",
                      color:
                        "#e0d8c8",
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      fontSize:
                        "12px",
                      color:
                        "#666",
                      letterSpacing:
                        "0.5px",
                      marginTop:
                        "4px",
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
                      "20px",
                    color:
                      COLORS.gold,
                    minWidth:
                      "60px",
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
              fontSize: "11px",
              color: "#555",
              marginTop: "2rem",
              letterSpacing:
                "1px",
              lineHeight: 1.8,
            }}
          >
            Menu changes
            seasonally.
            Vegetarian,
            vegan and
            allergy-friendly
            options available
            on request.
          </p>
        </div>
      </div>
    </div>
  );
}