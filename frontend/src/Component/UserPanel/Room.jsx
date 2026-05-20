// pages/RoomsPage.jsx

import { useState, useEffect } from "react";
import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

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
              {room.type}
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
              {room.floor} · $
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

        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          <strong>
            Room Number:
          </strong>{" "}
          {room.roomNumber}
        </div>

        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          <strong>
            Capacity:
          </strong>{" "}
          {room.capacity} Guests
        </div>

        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          <strong>Status:</strong>{" "}
          {room.status}
        </div>

        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <strong>
            Description:
          </strong>
          <p
            style={{
              marginTop: "8px",
              color:
                COLORS.muted,
              lineHeight: 1.8,
            }}
          >
            {room.description}
          </p>
        </div>

        {/* Amenities */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom:
              "1.5rem",
          }}
        >
          {room.amenities?.map(
            (item, index) => (
              <span
                key={index}
                style={{
                  fontSize:
                    "10px",
                  letterSpacing:
                    "1px",
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
                {item}
              </span>
            )
          )}
        </div>

        <Btn
          style={{
            width: "100%",
            padding: "14px",
          }}
        >
          Confirm Reservation
        </Btn>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [rooms, setRooms] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  const [hovered, setHovered] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH API DATA
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5001/api/rooms"
          );

        const data =
          await response.json();

        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          background:
            COLORS.cream,
          color:
            COLORS.gold,
          fontSize: "24px",
        }}
      >
        Loading Rooms...
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        background:
          COLORS.cream,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background:
            COLORS.darker,
          padding:
            "5rem 2rem 4rem",
          textAlign:
            "center",
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
            color:
              "#f0ead8",
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
          Experience luxury,
          comfort and
          elegance in every
          stay.
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
        {rooms.map((r, i) => {
          const hov =
            hovered === i;

          return (
            <div
              key={r._id}
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
                  ? COLORS.mid
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
              {/* IMAGE */}
              <div
                style={{
                  height:
                    "220px",
                  background:
                    r.images &&
                    r.images.length >
                      0
                      ? `url(${r.images[0]}) center/cover`
                      : COLORS.dark,
                  position:
                    "relative",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                {!r.images ||
                  (r.images
                    .length ===
                    0 && (
                    <div
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "60px",
                        color:
                          "rgba(201,168,76,0.2)",
                      }}
                    >
                      0{i + 1}
                    </div>
                  ))}

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
                    {
                      r.capacity
                    }{" "}
                    Guests
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
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {r.type}
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
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {r.floor} Floor
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
                    Rs
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
                  {
                    r.description
                  }
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
                  {r.amenities?.map(
                    (
                      item,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
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
                        {item}
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