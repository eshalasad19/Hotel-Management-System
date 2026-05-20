import { useState } from "react";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const ROOMS = [
  {
    name: "Deluxe Room",
    size: "45 sqm",
    price: "$320",
    beds: "1 King",
    desc:
      "Elegantly appointed with city views, marble bath and premium bedding.",
    features: [
      "City View",
      "King Bed",
      "Marble Bath",
      "Mini Bar",
    ],
    bg: "#2A2A2A",
    palette: "#2A4858",
  },
  {
    name: "Premier Suite",
    size: "75 sqm",
    price: "$580",
    beds: "1 King",
    desc:
      "A sanctuary of space with a separate living area and panoramic windows.",
    features: [
      "Panoramic View",
      "Living Area",
      "Jacuzzi",
      "Butler Service",
    ],
    bg: "#1A1A1A",
    palette: "#3D2B1F",
  },
  {
    name: "Royal Penthouse",
    size: "160 sqm",
    price: "$1,200",
    beds: "2 Beds",
    desc:
      "The pinnacle of luxury — rooftop terrace, private pool, 360° vistas.",
    features: [
      "Private Pool",
      "Rooftop Terrace",
      "360° View",
      "Personal Chef",
    ],
    bg: "#141414",
    palette: "#1F3D2B",
  },
  {
    name: "Garden Villa",
    size: "120 sqm",
    price: "$850",
    beds: "1 King",
    desc:
      "Nestled in our lush gardens with a private plunge pool and open-air bath.",
    features: [
      "Private Garden",
      "Plunge Pool",
      "Open Bath",
      "Golf Cart",
    ],
    bg: "#1E1E1E",
    palette: "#3D3320",
  },
];

function BookingModal({
  room,
  onClose,
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent:
          "center",
        padding: "2rem",
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          background:
            COLORS.cream,
          width: "100%",
          maxWidth: "520px",
          padding: "2.5rem",
          border:
            "1px solid rgba(201,168,76,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "flex-start",
            marginBottom:
              "1.5rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize:
                  "32px",
                fontWeight: 400,
                color:
                  COLORS.dark,
                marginBottom:
                  "0.4rem",
              }}
            >
              {room.name}
            </h2>

            <div
              style={{
                fontSize:
                  "11px",
                letterSpacing:
                  "2px",
                textTransform:
                  "uppercase",
                color:
                  COLORS.gold,
              }}
            >
              {room.size} ·{" "}
              {room.price}
              /night
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background:
                "transparent",
              fontSize: "20px",
              cursor: "pointer",
              color:
                COLORS.muted,
            }}
          >
            ✕
          </button>
        </div>

        <GoldLine
          width="70px"
          margin="0 0 2rem"
        />

        {[
          [
            "Check-in",
            "date",
          ],
          [
            "Check-out",
            "date",
          ],
          [
            "Guests",
            "number",
          ],
        ].map(
          ([label, type]) => (
            <div
              key={label}
              style={{
                marginBottom:
                  "1.2rem",
              }}
            >
              <label
                style={{
                  display:
                    "block",
                  fontSize:
                    "10px",
                  letterSpacing:
                    "2px",
                  textTransform:
                    "uppercase",
                  color:
                    COLORS.muted,
                  marginBottom:
                    "6px",
                }}
              >
                {label}
              </label>

              <input
                type={type}
                style={{
                  width:
                    "100%",
                  padding:
                    "12px 14px",
                  border:
                    "1px solid rgba(201,168,76,0.25)",
                  background:
                    COLORS.light,
                  fontSize:
                    "13px",
                  outline:
                    "none",
                  color:
                    COLORS.dark,
                }}
              />
            </div>
          )
        )}

        <Btn
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "1rem",
          }}
        >
          Confirm Reservation
        </Btn>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [selected, setSelected] =
    useState(null);

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
        }}
      >
        <SectionTag>
          Accommodations
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
          }}
        >
          Our{" "}
          <em>
            Rooms & Suites
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
          }}
        >
          Forty-eight
          individually
          designed spaces —
          each a masterpiece
          of comfort and
          artistry.
        </p>
      </div>

      {/* ROOMS GRID */}
      <div
        style={{
          padding: "4rem 2rem",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "1.5rem",
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        {ROOMS.map((r, i) => {
          const hov =
            hovered === i;

          return (
            <div
              key={i}
              onMouseEnter={() =>
                setHovered(i)
              }
              onMouseLeave={() =>
                setHovered(
                  null
                )
              }
              style={{
                background: hov
                  ? r.palette
                  : COLORS.light,
                transition:
                  "all 0.4s ease",
                border: `1px solid rgba(201,168,76,${
                  hov
                    ? 0.35
                    : 0.15
                })`,
                transform: hov
                  ? "translateY(-6px)"
                  : "translateY(0)",
                overflow:
                  "hidden",
              }}
            >
              {/* TOP IMAGE AREA */}
              <div
                style={{
                  height:
                    "220px",
                  background:
                    r.bg,
                  position:
                    "relative",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
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
                      "radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 70%)",
                  }}
                />

                <div
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize:
                      "64px",
                    color:
                      "rgba(201,168,76,0.2)",
                    letterSpacing:
                      "4px",
                  }}
                >
                  0{i + 1}
                </div>

                <div
                  style={{
                    position:
                      "absolute",
                    top: "1rem",
                    right:
                      "1rem",
                    border: `1px solid ${COLORS.gold}`,
                    background:
                      "rgba(201,168,76,0.12)",
                    padding:
                      "5px 10px",
                  }}
                >
                  <span
                    style={{
                      fontSize:
                        "10px",
                      color:
                        COLORS.gold,
                      letterSpacing:
                        "2px",
                    }}
                  >
                    {r.beds}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div
                style={{
                  padding:
                    "1.8rem",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    gap: "1rem",
                    marginBottom:
                      "1rem",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "26px",
                        fontWeight:
                          400,
                        color: hov
                          ? "#f0ead8"
                          : COLORS.dark,
                        marginBottom:
                          "0.4rem",
                      }}
                    >
                      {r.name}
                    </h3>

                    <div
                      style={{
                        fontSize:
                          "11px",
                        color: hov
                          ? "#999"
                          : COLORS.muted,
                        letterSpacing:
                          "1px",
                      }}
                    >
                      {
                        r.size
                      }
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "28px",
                        color:
                          COLORS.gold,
                      }}
                    >
                      {r.price}
                    </div>

                    <div
                      style={{
                        fontSize:
                          "9px",
                        color:
                          "#999",
                        letterSpacing:
                          "2px",
                      }}
                    >
                      PER NIGHT
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize:
                      "13px",
                    lineHeight:
                      1.9,
                    color: hov
                      ? "#bbb"
                      : COLORS.muted,
                    marginBottom:
                      "1.5rem",
                  }}
                >
                  {r.desc}
                </p>

                {/* FEATURES */}
                <div
                  style={{
                    display:
                      "flex",
                    flexWrap:
                      "wrap",
                    gap: "8px",
                    marginBottom:
                      "1.5rem",
                  }}
                >
                  {r.features.map(
                    (f) => (
                      <span
                        key={f}
                        style={{
                          fontSize:
                            "10px",
                          letterSpacing:
                            "1.5px",
                          textTransform:
                            "uppercase",
                          color:
                            COLORS.gold,
                          border:
                            "1px solid rgba(201,168,76,0.3)",
                          padding:
                            "4px 8px",
                        }}
                      >
                        {f}
                      </span>
                    )
                  )}
                </div>

                {/* BUTTONS */}
                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                  }}
                >
                  <Btn
                    onClick={() =>
                      setSelected(
                        r
                      )
                    }
                    style={{
                      flex: 1,
                      padding:
                        "11px",
                      fontSize:
                        "10px",
                    }}
                  >
                    Reserve
                  </Btn>

                  <Btn
                    variant="outline"
                    onClick={() =>
                      setSelected(
                        r
                      )
                    }
                    style={{
                      flex: 1,
                      padding:
                        "11px",
                      fontSize:
                        "10px",
                      border:
                        "1px solid rgba(201,168,76,0.35)",
                      color: hov
                        ? "#f0ead8"
                        : COLORS.dark,
                    }}
                  >
                    Details
                  </Btn>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selected && (
        <BookingModal
          room={selected}
          onClose={() =>
            setSelected(
              null
            )
          }
        />
      )}
    </div>
  );
}