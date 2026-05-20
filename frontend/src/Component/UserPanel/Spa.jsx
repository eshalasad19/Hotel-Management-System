import { useState } from "react";
import { COLORS, GoldLine, SectionTag, Btn } from "./Shared";

const TREATMENTS = [
  { name: "Himalayan Stone Ritual", duration: "90 min", price: "$220", cat: "Massage", desc: "Volcanic stones heated to therapeutic warmth, releasing deep tension and restoring energy flow." },
  { name: "Gold Leaf Facial", duration: "75 min", price: "$185", cat: "Facial", desc: "24-karat gold infused with hyaluronic serum brightens and firms for radiant luminosity." },
  { name: "Ayurvedic Abhyanga", duration: "60 min", price: "$160", cat: "Massage", desc: "Ancient Indian full-body warm oil treatment balancing all three doshas." },
  { name: "Arabian Hammam", duration: "120 min", price: "$280", cat: "Ritual", desc: "A journey through steam, exfoliation and aromatherapy in our authentic marble hammam." },
  { name: "Alpine Herb Wrap", duration: "60 min", price: "$145", cat: "Body", desc: "Swiss mountain herbs detoxify and nourish the skin while soothing tired muscles." },
  { name: "Couples Sanctuary", duration: "180 min", price: "$520", cat: "Couples", desc: "A shared journey — massage, facial, private pool and champagne for two." },
];

const CATEGORIES = ["All", "Massage", "Facial", "Ritual", "Body", "Couples"];

export default function SpaPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.cat === filter);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: COLORS.cream }}>
      {/* ── HEADER ── */}
      <div style={{ background: COLORS.darker, padding: "5rem 4rem 4rem", textAlign: "center" }}>
        <SectionTag>Wellness</SectionTag>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: "#f0ead8", marginBottom: "1rem" }}>
          The <em>Serenity</em> Spa
        </h1>
        <GoldLine />
        <p style={{ color: "#999", fontSize: "14px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.9 }}>
          Ancient wisdom meets modern science in our award-winning wellness sanctuary spanning four floors.
        </p>
      </div>

      {/* ── SPA HIGHLIGHTS ── */}
      <div style={{ background: COLORS.dark, padding: "2.5rem 4rem", display: "flex", justifyContent: "center", gap: "0" }}>
        {[["4", "Floors"], ["12", "Treatment Rooms"], ["1", "Private Hammam"], ["∞", "Pool Access"]].map(([n, l], i) => (
          <div key={i} style={{ flex: 1, maxWidth: "180px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(201,168,76,0.15)" : "none", padding: "0.75rem 1.5rem" }}>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "36px", fontWeight: 300, color: COLORS.gold, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginTop: "4px" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── FILTER TABS ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", padding: "2.5rem 4rem 0", flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: "8px 20px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", background: filter === c ? COLORS.gold : "transparent", color: filter === c ? COLORS.dark : COLORS.muted, border: `1px solid ${filter === c ? COLORS.gold : "rgba(201,168,76,0.3)"}`, transition: "all 0.3s", cursor: "pointer" }}>
            {c}
          </button>
        ))}
      </div>

      {/* ── TREATMENT CARDS ── */}
      <div style={{ padding: "2.5rem 4rem 4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        {filtered.map((t, i) => (
          <div key={i} style={{ background: COLORS.light, border: "1px solid rgba(201,168,76,0.2)", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: COLORS.gold }}>{t.cat}</span>
              <span style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.muted }}>{t.duration}</span>
            </div>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontWeight: 400, color: COLORS.dark, margin: "0.5rem 0 0.75rem" }}>{t.name}</h3>
            <p style={{ fontSize: "13px", color: COLORS.muted, lineHeight: 1.8, marginBottom: "1.5rem" }}>{t.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "1rem" }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "24px", color: COLORS.gold }}>{t.price}</span>
              <Btn style={{ padding: "9px 20px", fontSize: "10px" }}>Book</Btn>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: COLORS.darker, padding: "4rem", textAlign: "center" }}>
        <SectionTag>Gift Experiences</SectionTag>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "36px", fontWeight: 300, color: "#f0ead8", marginBottom: "1rem" }}>
          Give the Gift of <em>Wellness</em>
        </h2>
        <p style={{ color: "#777", fontSize: "13px", marginBottom: "2rem", letterSpacing: "1px" }}>Spa gift cards available in any denomination</p>
        <Btn style={{ padding: "13px 36px", fontSize: "11px" }}>Purchase Gift Card</Btn>
      </div>
    </div>
  );
}