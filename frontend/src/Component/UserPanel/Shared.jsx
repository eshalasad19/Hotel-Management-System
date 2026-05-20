// shared.jsx — Colors, GoldLine, SectionTag, Btn — import these in every page

import { useState } from "react";

export const COLORS = {
  gold: "#C9A84C",
  goldLight: "#E8D5A3",
  goldDark: "#8B6914",
  dark: "#1A1A1A",
  darker: "#0D0D0D",
  mid: "#2A2A2A",
  light: "#F5F0E8",
  cream: "#FAF7F2",
  text: "#3A3A3A",
  muted: "#7A7A7A",
};

export const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Jost',sans-serif;background:${COLORS.cream};color:${COLORS.text};overflow-x:hidden;}
  button{cursor:pointer;border:none;outline:none;font-family:'Jost',sans-serif;}
  input,textarea,select{font-family:'Jost',sans-serif;}
  a{text-decoration:none;color:inherit;}
  img{display:block;}
  ::selection{background:${COLORS.goldLight};color:${COLORS.dark};}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:${COLORS.dark};}
  ::-webkit-scrollbar-thumb{background:${COLORS.gold};}
`;

export function GoldLine({ width = "80px", margin = "1.5rem auto" }) {
  return (
    <div style={{ width, height: "1px", background: `linear-gradient(90deg,transparent,${COLORS.gold},transparent)`, margin }} />
  );
}

export function SectionTag({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "0.75rem" }}>
      <div style={{ width: "30px", height: "1px", background: COLORS.gold }} />
      <span style={{ fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.gold, fontWeight: 400 }}>{children}</span>
      <div style={{ width: "30px", height: "1px", background: COLORS.gold }} />
    </div>
  );
}

export function Btn({ children, onClick, style = {}, variant = "gold" }) {
  const [hov, setHov] = useState(false);
  const base =
    variant === "gold"
      ? { background: hov ? COLORS.goldDark : COLORS.gold, color: COLORS.dark }
      : { background: "transparent", color: hov ? COLORS.gold : "#f0ead8", border: `1px solid ${hov ? COLORS.gold : "rgba(255,255,255,0.4)"}` };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "12px 32px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 500, transition: "all 0.3s", ...base, ...style }}
    >
      {children}
    </button>
  );
}