import {
  COLORS,
  GoldLine,
  SectionTag,
  Btn,
} from "./Shared";

const TEAM = [
  {
    name: "Isabelle Marchand",
    role: "General Manager",
    bio: "20 years shaping the world's most celebrated hospitality brands, from Paris to Singapore.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Laurent Martin",
    role: "Executive Chef",
    bio: "Two Michelin stars, alumni of Le Bernardin. Passionate about zero-waste haute cuisine.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Aiko Tanaka",
    role: "Spa Director",
    bio: "Certified Ayurvedic practitioner and holistic wellness architect with roots in Kyoto.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "James Whitfield",
    role: "Head of Concierge",
    bio: "Former Royal Household protocol officer. No guest request too intricate, too ambitious.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
  },
];

const VALUES = [
  {
    v: "Artistry",
    d: "Every element of your experience is intentionally designed.",
  },
  {
    v: "Integrity",
    d: "Transparent, honest and deeply respectful of your trust.",
  },
  {
    v: "Sustainability",
    d: "Luxury that honours the world we inhabit.",
  },
  {
    v: "Excellence",
    d: "The relentless pursuit of the extraordinary in all we do.",
  },
];

export default function AboutPage() {
  return (
    <div
      style={{
        paddingTop: "80px",
        background: COLORS.cream,
        overflow: "hidden",
      }}
    >
      {/* HERO */}
      <div
        style={{
          height: "75vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Hotel"
          style={{
            position: "absolute",
            inset: 0,
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
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 5,
            padding: "0 2rem",
          }}
        >
          <SectionTag>Our Story</SectionTag>

          <h1
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(52px,7vw,100px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            A Legacy of <em>Luxury</em>
          </h1>

          <GoldLine />

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "#ddd",
              fontSize: "15px",
              lineHeight: 1.9,
              letterSpacing: "1px",
            }}
          >
            Where timeless elegance,
            impeccable service and
            extraordinary hospitality
            come together.
          </p>
        </div>
      </div>

      {/* STORY */}
      <div
        style={{
          padding: "6rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <SectionTag>Since 2009</SectionTag>

            <h2
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize:
                  "clamp(38px,5vw,58px)",
                fontWeight: 300,
                color: COLORS.dark,
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Crafted for the
              <br />
              <em>Exceptional</em>
            </h2>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 2,
                color: COLORS.muted,
                marginBottom: "1.5rem",
              }}
            >
              LuxuryStay was founded
              with a singular vision —
              to redefine hospitality
              through elegance,
              artistry and deeply
              personalised experiences.
            </p>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 2,
                color: COLORS.muted,
                marginBottom: "2rem",
              }}
            >
              Every suite, every meal,
              every interaction is
              thoughtfully designed to
              create memories that stay
              with our guests forever.
            </p>

            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                ["15+", "Years"],
                ["48", "Luxury Suites"],
                ["4", "Global Awards"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                      fontSize: "42px",
                      color: COLORS.gold,
                    }}
                  >
                    {n}
                  </div>

                  <div
                    style={{
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform:
                        "uppercase",
                      color: COLORS.muted,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
              alt="Hotel"
              style={{
                width: "100%",
                height: "520px",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.15)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "-25px",
                left: "-25px",
                background: COLORS.dark,
                padding: "2rem",
                border:
                  `1px solid ${COLORS.gold}`,
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "48px",
                  color: COLORS.gold,
                }}
              >
                LS
              </div>

              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform:
                    "uppercase",
                  color: "#aaa",
                }}
              >
                LuxuryStay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div
        style={{
          background: COLORS.dark,
          padding: "6rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <SectionTag>Our Values</SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(38px,5vw,58px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: "4rem",
            }}
          >
            What Defines <em>Us</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: "1.5rem",
            }}
          >
            {VALUES.map((item, i) => (
              <div
                key={i}
                style={{
                  background:
                    "rgba(255,255,255,0.03)",
                  border:
                    "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  backdropFilter:
                    "blur(10px)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                    fontSize: "34px",
                    color: COLORS.gold,
                    marginBottom: "1rem",
                  }}
                >
                  {item.v}
                </div>

                <GoldLine
                  width="40px"
                  margin="0 auto 1rem"
                />

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.9,
                    color: "#aaa",
                  }}
                >
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div
        style={{
          padding: "6rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <SectionTag>Milestones</SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(36px,4vw,54px)",
              fontWeight: 300,
              textAlign: "center",
              color: COLORS.dark,
              marginBottom: "4rem",
            }}
          >
            Our <em>Journey</em>
          </h2>

          {[
            {
              year: "2009",
              event:
                "LuxuryStay flagship opens in Karachi.",
            },
            {
              year: "2012",
              event:
                "Wins Best New Luxury Hotel award.",
            },
            {
              year: "2016",
              event:
                "Launches world-class Serenity Spa.",
            },
            {
              year: "2020",
              event:
                "Expands internationally to Dubai.",
            },
            {
              year: "2024",
              event:
                "Named among the world's top luxury hotels.",
            },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "2rem",
                marginBottom: "2rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: "80px",
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "28px",
                  color: COLORS.gold,
                }}
              >
                {m.year}
              </div>

              <div
                style={{
                  width: "1px",
                  background:
                    "rgba(201,168,76,0.25)",
                  alignSelf: "stretch",
                }}
              />

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.9,
                  color: COLORS.muted,
                }}
              >
                {m.event}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div
        style={{
          background: COLORS.light,
          padding: "6rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <SectionTag>The Team</SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(38px,5vw,58px)",
              fontWeight: 300,
              textAlign: "center",
              color: COLORS.dark,
              marginBottom: "4rem",
            }}
          >
            Meet Our <em>Leadership</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "2rem",
            }}
          >
            {TEAM.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.08)",
                  transition: "0.4s",
                }}
              >
                <img
                  src={t.img}
                  alt={t.name}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                      fontSize: "28px",
                      fontWeight: 400,
                      color: COLORS.dark,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t.name}
                  </h3>

                  <div
                    style={{
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform:
                        "uppercase",
                      color: COLORS.gold,
                      marginBottom: "1rem",
                    }}
                  >
                    {t.role}
                  </div>

                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: COLORS.muted,
                    }}
                  >
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: COLORS.dark,
          padding: "6rem 2rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(201,168,76,0.08), transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <SectionTag>Luxury Awaits</SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(42px,5vw,68px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Experience the
            <br />
            <em>Extraordinary</em>
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto 2.5rem",
              color: "#aaa",
              lineHeight: 1.9,
              fontSize: "15px",
            }}
          >
            Discover a world where
            elegance, comfort and
            personalised service blend
            into unforgettable moments.
          </p>

          <Btn
            style={{
              padding: "15px 46px",
              fontSize: "11px",
            }}
          >
            Book Your Stay
          </Btn>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0a0a0a",
          padding: "4rem 2rem 2rem",
          color: "#999",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize: "36px",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Luxury
              <span
                style={{
                  color: COLORS.gold,
                }}
              >
                Stay
              </span>
            </h2>

            <p
              style={{
                lineHeight: 1.9,
                fontSize: "14px",
              }}
            >
              Redefining luxury
              hospitality through
              unforgettable experiences.
            </p>
          </div>

          <div>
            <h4
              style={{
                color: COLORS.gold,
                marginBottom: "1rem",
                letterSpacing: "2px",
                fontSize: "12px",
                textTransform:
                  "uppercase",
              }}
            >
              Contact
            </h4>

            <p>Email: info@luxurystay.com</p>
            <p>Phone: +92 300 1234567</p>
            <p>Karachi, Pakistan</p>
          </div>

          <div>
            <h4
              style={{
                color: COLORS.gold,
                marginBottom: "1rem",
                letterSpacing: "2px",
                fontSize: "12px",
                textTransform:
                  "uppercase",
              }}
            >
              Opening
            </h4>

            <p>Mon - Fri: 24 Hours</p>
            <p>Spa: 9AM - 11PM</p>
            <p>Restaurant: 7AM - 12AM</p>
          </div>
        </div>

        <div
          style={{
            borderTop:
              "1px solid rgba(201,168,76,0.15)",
            paddingTop: "1.5rem",
            textAlign: "center",
            fontSize: "13px",
            color: "#666",
          }}
        >
          © 2026 LuxuryStay. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
}