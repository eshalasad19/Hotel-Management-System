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
    padding: "12px 14px",
    border: `1px solid ${
      errors[key]
        ? "#c0392b"
        : "rgba(201,168,76,0.3)"
    }`,
    background: "white",
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
      {/* HEADER */}
      <div
        style={{
          background: COLORS.darker,
          padding: "5rem 2rem 4rem",
          textAlign: "center",
        }}
      >
        <SectionTag>Get in Touch</SectionTag>

        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(40px,5vw,72px)",
            fontWeight: 300,
            color: "#f0ead8",
            marginBottom: "1rem",
          }}
        >
          We are <em>Here for You</em>
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
          Our team is available 24 hours a day to
          assist with reservations, enquiries and
          special requests.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div
        style={{
          padding: "4rem 2rem",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "3rem",
          maxWidth: "1100px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          <h2
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize: "36px",
              fontWeight: 300,
              color: COLORS.dark,
              marginBottom: "2rem",
            }}
          >
            Contact <em>Details</em>
          </h2>

          {CONTACT_ITEMS.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1.25rem",
                marginBottom: "1.75rem",
                paddingBottom: "1.75rem",
                borderBottom:
                  "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  marginTop: "2px",
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
                    marginBottom: "6px",
                  }}
                >
                  {c.label}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: COLORS.text,
                    lineHeight: 1.8,
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
              Follow Us
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              {["In", "Tw", "Fb", "Li"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: "40px",
                    height: "40px",
                    border:
                      "1px solid rgba(201,168,76,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: COLORS.gold,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div
          style={{
            background: COLORS.light,
            padding: "2.5rem",
            border:
              "1px solid rgba(201,168,76,0.2)",
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
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "56px",
                  color: COLORS.gold,
                  marginBottom: "1rem",
                }}
              >
                ✦
              </div>

              <h3
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                  fontSize: "32px",
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
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Thank you, {form.name}. Our team will
                respond within 2 business hours.
              </p>

              <Btn
                onClick={() => {
                  setSent(false);

                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "General Enquiry",
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
                  fontSize: "30px",
                  fontWeight: 400,
                  color: COLORS.dark,
                  marginBottom: "1.8rem",
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
                        textTransform: "uppercase",
                        color: COLORS.muted,
                        marginBottom: "6px",
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
                          marginTop: "4px",
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
                    marginBottom: "6px",
                  }}
                >
                  Phone (optional)
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
                    marginBottom: "6px",
                  }}
                >
                  Subject
                </label>

                <select
                  value={form.subject}
                  onChange={update("subject")}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border:
                      "1px solid rgba(201,168,76,0.3)",
                    background: "white",
                    fontSize: "13px",
                    color: COLORS.dark,
                    outline: "none",
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
                    marginBottom: "6px",
                  }}
                >
                  Message
                </label>

                <textarea
                  rows={5}
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
                      marginTop: "4px",
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
                  padding: "14px",
                  fontSize: "11px",
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
          background: COLORS.dark,
          height: "260px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop:
            "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "34px",
              marginBottom: "0.5rem",
            }}
          >
            📍
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "#555",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            One LuxuryStay Tower, Karachi
          </p>

          <p
            style={{
              fontSize: "11px",
              color: COLORS.gold,
              marginTop: "8px",
              cursor: "pointer",
              letterSpacing: "1px",
            }}
          >
            Open in Maps →
          </p>
        </div>
      </div>
    </div>
  );
}