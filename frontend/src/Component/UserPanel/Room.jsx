// PREMIUM ROOMS PAGE UI
// Add room images + luxury hover + badges + gallery feel

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
          "rgba(0,0,0,0.88)",
        backdropFilter: "blur(8px)",
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
          maxWidth: "620px",
          overflow: "hidden",
          borderRadius: "12px",
          border:
            "1px solid rgba(201,168,76,0.2)",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            height: "260px",
            background:
              room.images &&
              room.images.length > 0
                ? `url(${room.images[0]}) center/cover`
                : COLORS.dark,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
            }}
          />

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "none",
              background:
                "rgba(255,255,255,0.1)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ✕
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "25px",
              left: "25px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "3px",
                color: COLORS.gold,
                textTransform:
                  "uppercase",
                marginBottom: "8px",
              }}
            >
              Luxury Collection
            </div>

            <h2
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize: "42px",
                color: "#fff",
                fontWeight: 300,
              }}
            >
              {room.type}
            </h2>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "2rem" }}>
          <GoldLine
            width="70px"
            margin="0 0 2rem"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              [
                "Room Number",
                room.roomNumber,
              ],
              [
                "Capacity",
                `${room.capacity} Guests`,
              ],
              ["Floor", room.floor],
              ["Status", room.status],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  padding: "1rem",
                  background:
                    "rgba(201,168,76,0.05)",
                  border:
                    "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform:
                      "uppercase",
                    color:
                      COLORS.gold,
                    marginBottom: "8px",
                  }}
                >
                  {k}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color:
                      COLORS.dark,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "14px",
              color:
                COLORS.muted,
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            {room.description}
          </p>

          {/* Amenities */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "2rem",
            }}
          >
            {room.amenities?.map(
              (item, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "10px",
                    letterSpacing:
                      "1.5px",
                    textTransform:
                      "uppercase",
                    color:
                      COLORS.gold,
                    border:
                      "1px solid rgba(201,168,76,0.35)",
                    padding:
                      "6px 12px",
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
          fontSize: "28px",
          fontFamily:
            "Cormorant Garamond, serif",
        }}
      >
        Loading Luxury Rooms...
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
      {/* HERO */}
      <div
        style={{
          height: "70vh",
          background:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop') center/cover",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <SectionTag>
            Accommodations
          </SectionTag>

          <h1
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(46px,6vw,90px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Rooms & <em>Suites</em>
          </h1>

          <GoldLine />

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#ddd",
              lineHeight: 1.9,
              fontSize: "15px",
            }}
          >
            Elegant interiors,
            handcrafted luxury and
            breathtaking comfort in
            every stay.
          </p>
        </div>
      </div>

      {/* ROOMS */}
      <div
        style={{
          padding: "5rem 2rem",
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "2rem",
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
                  setHovered(null)
                }
                style={{
                  background:
                    "#fff",
                  overflow:
                    "hidden",
                  borderRadius:
                    "18px",
                  transition:
                    "all 0.45s ease",
                  transform: hov
                    ? "translateY(-10px)"
                    : "translateY(0)",
                  boxShadow: hov
                    ? "0 30px 60px rgba(0,0,0,0.15)"
                    : "0 8px 20px rgba(0,0,0,0.06)",
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    height: "260px",
                    overflow:
                      "hidden",
                    position:
                      "relative",
                  }}
                >
                  <img
                    src={
                      r.images &&
                      r.images.length > 0
                        ? r.images[0]
                        : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={r.type}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit:
                        "cover",
                      transition:
                        "transform 0.7s ease",
                      transform: hov
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
                        "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                    }}
                  />

                  <div
                    style={{
                      position:
                        "absolute",
                      top: "18px",
                      right: "18px",
                      background:
                        "rgba(0,0,0,0.45)",
                      backdropFilter:
                        "blur(4px)",
                      padding:
                        "7px 12px",
                      border:
                        "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <span
                      style={{
                        fontSize:
                          "10px",
                        letterSpacing:
                          "2px",
                        color:
                          "#fff",
                      }}
                    >
                      {r.capacity} Guests
                    </span>
                  </div>

                  <div
                    style={{
                      position:
                        "absolute",
                      bottom: "20px",
                      left: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "11px",
                        color:
                          COLORS.gold,
                        letterSpacing:
                          "2px",
                        textTransform:
                          "uppercase",
                        marginBottom:
                          "6px",
                      }}
                    >
                      {r.floor} Floor
                    </div>

                    <h3
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "34px",
                        color:
                          "#fff",
                        fontWeight:
                          300,
                      }}
                    >
                      {r.type}
                    </h3>
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
                      marginBottom:
                        "1rem",
                      alignItems:
                        "center",
                    }}
                  >
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
                      Luxury Suite
                    </div>

                    <div
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize:
                          "34px",
                        color:
                          COLORS.gold,
                      }}
                    >
                      Rs {r.price}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize:
                        "14px",
                      lineHeight:
                        1.9,
                      color:
                        COLORS.muted,
                      marginBottom:
                        "1.5rem",
                    }}
                  >
                    {r.description}
                  </p>

                  {/* AMENITIES */}
                  <div
                    style={{
                      display:
                        "flex",
                      flexWrap:
                        "wrap",
                      gap: "8px",
                      marginBottom:
                        "1.8rem",
                    }}
                  >
                    {r.amenities?.slice(
                      0,
                      4
                    ).map(
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
                              "1px",
                            textTransform:
                              "uppercase",
                            color:
                              COLORS.gold,
                            border:
                              "1px solid rgba(201,168,76,0.25)",
                            padding:
                              "5px 10px",
                            borderRadius:
                              "20px",
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
                      gap: "12px",
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
                          "12px",
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
                          "12px",
                        fontSize:
                          "10px",
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