import { COLORS, GoldLine, SectionTag } from "./Shared";

const TEAM = [
  { name: "Isabelle Marchand", role: "General Manager", bio: "20 years shaping the world's most celebrated hospitality brands, from Paris to Singapore." },
  { name: "Laurent Martin", role: "Executive Chef", bio: "Two Michelin stars, alumni of Le Bernardin. Passionate about zero-waste haute cuisine." },
  { name: "Aiko Tanaka", role: "Spa Director", bio: "Certified Ayurvedic practitioner and holistic wellness architect with roots in Kyoto." },
  { name: "James Whitfield", role: "Head of Concierge", bio: "Former Royal Household protocol officer. No guest request too intricate, too ambitious." },
];

const VALUES = [
  { v: "Artistry", d: "Every element of your experience is intentionally designed." },
  { v: "Integrity", d: "Transparent, honest and deeply respectful of your trust." },
  { v: "Sustainability", d: "Luxury that honours the world we inhabit." },
  { v: "Excellence", d: "The relentless pursuit of the extraordinary in all we do." },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: COLORS.cream }}>
      {/* ── HEADER ── */}
      <div style={{ background: COLORS.darker, padding: "5rem 4rem 4rem", textAlign: "center" }}>
        <SectionTag>Our Story</SectionTag>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: "#f0ead8", marginBottom: "1rem" }}>
          A Legacy of <em>Excellence</em>
        </h1>
        <GoldLine />
      </div>

      {/* ── BRAND STORY ── */}
      <div style={{ padding: "5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", maxWidth: "1100px", margin: "0 auto", alignItems: "center" }}>
        <div>
          <SectionTag>Since 2009</SectionTag>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "44px", fontWeight: 300, color: COLORS.dark, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            Born from a<br /><em>Passion for Perfection</em>
          </h2>
          <p style={{ fontSize: "14px", color: COLORS.muted, lineHeight: 1.9, marginBottom: "1.25rem" }}>
            LuxuryStay was founded on a singular belief: that true hospitality is not a service, but an art form. Every gesture, every detail, every moment of your stay is composed with the same care a maestro gives to a symphony.
          </p>
          <p style={{ fontSize: "14px", color: COLORS.muted, lineHeight: 1.9, marginBottom: "2rem" }}>
            From our first property to our current network spanning four continents, that founding philosophy has never wavered — only deepened.
          </p>
          <div style={{ display: "flex", gap: "3rem" }}>
            {[["4", "Properties"], ["48", "Suites"], ["3", "Award Years"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "40px", fontWeight: 300, color: COLORS.gold }}>{n}</div>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.muted }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* decorative emblem */}
        <div style={{ background: COLORS.dark, height: "420px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,168,76,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.08) 0%,transparent 60%)" }} />
          <div style={{ textAlign: "center", zIndex: 2 }}>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "80px", fontWeight: 300, color: "rgba(201,168,76,0.2)", lineHeight: 1 }}>LS</div>
            <div style={{ width: "1px", height: "40px", background: COLORS.gold, margin: "1rem auto" }} />
            <div style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.gold }}>Est. 2009</div>
          </div>
        </div>
      </div>

      {/* ── VALUES ── */}
      <div style={{ background: COLORS.dark, padding: "4rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>Our Values</SectionTag>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "40px", fontWeight: 300, color: "#f0ead8", marginBottom: "3rem" }}>
            What We <em>Believe</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2px" }}>
            {VALUES.map(({ v, d }) => (
              <div key={v} style={{ padding: "2.5rem 1.5rem", border: "1px solid rgba(201,168,76,0.1)" }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300, color: COLORS.gold, marginBottom: "0.75rem" }}>{v}</div>
                <div style={{ width: "30px", height: "1px", background: COLORS.gold, margin: "0 auto 1rem" }} />
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.8 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ padding: "5rem 4rem", maxWidth: "800px", margin: "0 auto" }}>
        <SectionTag>Milestones</SectionTag>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "40px", fontWeight: 300, textAlign: "center", color: COLORS.dark, marginBottom: "3rem" }}>
          Our <em>Journey</em>
        </h2>
        {[
          { year: "2009", event: "LuxuryStay flagship opens in Karachi." },
          { year: "2012", event: "Best New Luxury Hotel — Asia Pacific Awards." },
          { year: "2015", event: "Serenity Spa wins Global Wellness Award." },
          { year: "2018", event: "Altitude restaurant receives first Michelin star." },
          { year: "2021", event: "Second property launches in Dubai." },
          { year: "2024", event: "Recognised in Condé Nast Top 10 Hotels Worldwide." },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", gap: "2rem", marginBottom: "1.75rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: "60px", fontFamily: "Cormorant Garamond, serif", fontSize: "20px", color: COLORS.gold, textAlign: "right" }}>{m.year}</div>
            <div style={{ width: "1px", background: "rgba(201,168,76,0.3)", alignSelf: "stretch", marginTop: "4px" }} />
            <p style={{ fontSize: "14px", color: COLORS.muted, lineHeight: 1.8, paddingTop: "2px" }}>{m.event}</p>
          </div>
        ))}
      </div>

      {/* ── TEAM ── */}
      <div style={{ background: COLORS.light, padding: "5rem 4rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionTag>The People</SectionTag>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "44px", fontWeight: 300, textAlign: "center", color: COLORS.dark, marginBottom: "3rem" }}>
            Our <em>Leadership</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "1.5rem" }}>
            {TEAM.map((t, i) => (
              <div key={i} style={{ textAlign: "center", padding: "2rem", background: COLORS.cream, border: "1px solid rgba(201,168,76,0.15)" }}>
                {/* avatar */}
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: COLORS.dark, border: `2px solid ${COLORS.gold}`, margin: "0 auto 1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", color: COLORS.gold }}>
                    {t.name.split(" ").map((x) => x[0]).join("")}
                  </span>
                </div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "18px", color: COLORS.dark, marginBottom: "4px" }}>{t.name}</div>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.75rem" }}>{t.role}</div>
                <p style={{ fontSize: "12px", color: COLORS.muted, lineHeight: 1.7 }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}