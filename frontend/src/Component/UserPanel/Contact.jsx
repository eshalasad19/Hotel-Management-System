import { useState } from "react";
import { COLORS, GoldLine, SectionTag, Btn } from "./Shared";

const SUBJECTS = [
  "General Enquiry",
  "Room Reservation",
  "Spa Booking",
  "Restaurant Reservation",
  "Event Planning",
  "Other",
];

const CONTACT_ITEMS = [
  {
    icon: "📍",
    label: "Address",
    val: "One LuxuryStay Tower\nFinancial District, Karachi 75600\nPakistan",
  },
  {
    icon: "📞",
    label: "Reservations",
    val: "+92 21 111 598 7890",
  },
  {
    icon: "✉",
    label: "Email",
    val: "reservations@luxurystay.com",
  },
  {
    icon: "🕐",
    label: "Concierge Hours",
    val: "24 hours · 7 days a week",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = true;

    if (
      !form.email.trim() ||
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      errs.email = true;
    }

    if (!form.message.trim()) errs.message = true;

    return errs;
  };

  const submit = () => {
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSent(true);
  };

  const inputStyle = (key) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `1px solid ${
      errors[key]
        ? "#c0392b"
        : "rgba(201,168,76,0.25)"
    }`,
    background: "#fff",
    fontSize: "13px",
    color: COLORS.dark,
    outline: "none",
    transition: "0.3s",
    boxSizing: "border-box",
  });

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
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.78)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "7rem 2rem 6rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <SectionTag>Get in Touch</SectionTag>

        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(42px,5vw,78px)",
            fontWeight: 300,
            color: "#f5efe2",
            marginBottom: "1rem",
          }}
        >
          We are <em>Here for You</em>
        </h1>

        <GoldLine />

        <p
          style={{
            color: "#d0d0d0",
            fontSize: "15px",
            maxWidth: "620px",
            margin: "0 auto",
            lineHeight: 1.9,
          }}
        >
          Whether you are planning a luxury stay,
          wellness retreat or unforgettable event,
          our team is available around the clock to
          assist you.
        </p>
      </div>

      {/* MAIN */}
      <div
        style={{
          padding: "5rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(340px,1fr))",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          <SectionTag>Contact Details</SectionTag>

          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize: "42px",
              fontWeight: 300,
              color: COLORS.dark,
              marginBottom: "2.5rem",
            }}
          >
            Let’s Start a <em>Conversation</em>
          </h2>

          {CONTACT_ITEMS.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1.2rem",
                marginBottom: "1.5rem",
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "18px",
                border:
                  "1px solid rgba(201,168,76,0.15)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background:
                    "rgba(201,168,76,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>

              <div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: COLORS.gold,
                    marginBottom: "8px",
                  }}
                >
                  {c.label}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: COLORS.text,
                    lineHeight: 1.9,
                    whiteSpace: "pre-line",
                  }}
                >
                  {c.val}
                </div>
              </div>
            </div>
          ))}

          {/* SOCIAL */}
          <div style={{ marginTop: "2rem" }}>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: COLORS.gold,
                marginBottom: "1rem",
              }}
            >
              Follow LuxuryStay
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {["Instagram", "Facebook", "X", "LinkedIn"].map(
                (s) => (
                  <div
                    key={s}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "30px",
                      border:
                        "1px solid rgba(201,168,76,0.25)",
                      background: "#fff",
                      fontSize: "12px",
                      color: COLORS.dark,
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    {s}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div
          style={{
            background: "#fff",
            padding: "2.8rem",
            borderRadius: "24px",
            border:
              "1px solid rgba(201,168,76,0.15)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          {sent ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
              }}
            >
              <div
                style={{
                  fontSize: "70px",
                  marginBottom: "1rem",
                }}
              >
                ✨
              </div>

              <h3
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "38px",
                  color: COLORS.dark,
                  marginBottom: "1rem",
                }}
              >
                Message Received
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: COLORS.muted,
                  lineHeight: 1.9,
                  marginBottom: "2rem",
                }}
              >
                Thank you, {form.name}. Our team
                will contact you shortly with a
                personalised response.
              </p>

              <Btn
                onClick={() => {
                  setSent(false);

                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    subject:
                      "General Enquiry",
                    message: "",
                  });
                }}
              >
                Send Another Message
              </Btn>
            </div>
          ) : (
            <>
              <h3
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "36px",
                  fontWeight: 400,
                  color: COLORS.dark,
                  marginBottom: "2rem",
                }}
              >
                Send a Message
              </h3>

              {/* NAME + EMAIL */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {[
                  ["Full Name", "name", "text"],
                  [
                    "Email Address",
                    "email",
                    "email",
                  ],
                ].map(([label, key, type]) => (
                  <div key={key}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform:
                          "uppercase",
                        color: COLORS.muted,
                        marginBottom: "8px",
                      }}
                    >
                      {label}
                    </label>

                    <input
                      type={type}
                      value={form[key]}
                      onChange={update(key)}
                      style={inputStyle(key)}
                    />

                    {errors[key] && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#c0392b",
                          marginTop: "5px",
                        }}
                      >
                        Required
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* PHONE */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: COLORS.muted,
                    marginBottom: "8px",
                  }}
                >
                  Phone Number
                </label>

                <input
                  type="text"
                  value={form.phone}
                  onChange={update("phone")}
                  style={inputStyle("phone")}
                />
              </div>

              {/* SUBJECT */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: COLORS.muted,
                    marginBottom: "8px",
                  }}
                >
                  Subject
                </label>

                <select
                  value={form.subject}
                  onChange={update("subject")}
                  style={{
                    ...inputStyle("subject"),
                    cursor: "pointer",
                  }}
                >
                  {SUBJECTS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* MESSAGE */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: COLORS.muted,
                    marginBottom: "8px",
                  }}
                >
                  Your Message
                </label>

                <textarea
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  style={{
                    ...inputStyle("message"),
                    resize: "vertical",
                  }}
                />

                {errors.message && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#c0392b",
                      marginTop: "5px",
                    }}
                  >
                    Required
                  </div>
                )}
              </div>

              <Btn
                onClick={submit}
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "11px",
                  borderRadius: "12px",
                }}
              >
                Send Message
              </Btn>
            </>
          )}
        </div>
      </div>

      {/* MAP SECTION */}
      <div
        style={{
          position: "relative",
          height: "380px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop"
          alt="map"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.45)",
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
            <div
              style={{
                fontSize: "54px",
                marginBottom: "1rem",
              }}
            >
              📍
            </div>

            <h3
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
                fontSize: "42px",
                fontWeight: 300,
                color: "#f0ead8",
                marginBottom: "0.8rem",
              }}
            >
              Visit LuxuryStay
            </h3>

            <p
              style={{
                color: "#ccc",
                fontSize: "14px",
                letterSpacing: "1px",
                marginBottom: "1.5rem",
              }}
            >
              One LuxuryStay Tower · Karachi
            </p>

            <Btn
              style={{
                padding: "12px 30px",
                fontSize: "11px",
              }}
            >
              Open in Maps
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}