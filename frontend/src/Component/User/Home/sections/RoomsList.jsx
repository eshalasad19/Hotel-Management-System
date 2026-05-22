import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms, getSingleRoom } from "../../../../api/roomApi";

const BASE_URL = "http://localhost:5001";

const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/800x500?text=No+Image";
  if (img.startsWith("http")) return img;
  if (img.startsWith("uploads/")) return `${BASE_URL}/${img}`;
  return `${BASE_URL}/uploads/${img}`;
};

// ─── AMENITY ICON MAPPER ──────────────────────────────────────────────────────
const getAmenityIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("wifi") || n.includes("internet"))           return "fa-wifi";
  if (n.includes("tv") || n.includes("television"))           return "fa-tv";
  if (n.includes("pool") || n.includes("swimming"))           return "fa-water-ladder";
  if (n.includes("gym") || n.includes("fitness"))             return "fa-dumbbell";
  if (n.includes("spa") || n.includes("massage"))             return "fa-spa";
  if (n.includes("parking") || n.includes("garage"))          return "fa-square-parking";
  if (n.includes("breakfast") || n.includes("meal") || n.includes("dining")) return "fa-utensils";
  if (n.includes("bar") || n.includes("drink") || n.includes("minibar"))     return "fa-martini-glass";
  if (n.includes("air") || n.includes("ac") || n.includes("conditioner"))    return "fa-wind";
  if (n.includes("heat") || n.includes("heating"))            return "fa-temperature-high";
  if (n.includes("bath") || n.includes("tub") || n.includes("jacuzzi"))      return "fa-bath";
  if (n.includes("shower"))                                   return "fa-shower";
  if (n.includes("safe") || n.includes("locker"))             return "fa-lock";
  if (n.includes("laundry") || n.includes("washing"))         return "fa-shirt";
  if (n.includes("balcony") || n.includes("terrace"))         return "fa-archway";
  if (n.includes("view") || n.includes("ocean") || n.includes("sea") || n.includes("mountain")) return "fa-binoculars";
  if (n.includes("kitchen") || n.includes("kitchenette"))     return "fa-kitchen-set";
  if (n.includes("fridge") || n.includes("refrigerator"))     return "fa-temperature-low";
  if (n.includes("coffee") || n.includes("tea") || n.includes("kettle"))     return "fa-mug-hot";
  if (n.includes("phone") || n.includes("telephone"))         return "fa-phone";
  if (n.includes("desk") || n.includes("work"))               return "fa-briefcase";
  if (n.includes("iron") || n.includes("ironing"))            return "fa-shirt";
  if (n.includes("hair") || n.includes("dryer"))              return "fa-wind";
  if (n.includes("towel") || n.includes("linen"))             return "fa-scroll";
  if (n.includes("24") || n.includes("reception") || n.includes("concierge")) return "fa-bell-concierge";
  if (n.includes("room service"))                             return "fa-bell-concierge";
  if (n.includes("pet"))                                      return "fa-paw";
  if (n.includes("smoke") || n.includes("smoking"))           return "fa-smoking";
  if (n.includes("disable") || n.includes("accessible") || n.includes("wheelchair")) return "fa-wheelchair";
  if (n.includes("child") || n.includes("kid") || n.includes("baby"))        return "fa-baby";
  if (n.includes("garden") || n.includes("outdoor"))         return "fa-tree";
  if (n.includes("security") || n.includes("cctv"))           return "fa-shield-halved";
  if (n.includes("elevator") || n.includes("lift"))           return "fa-elevator";
  return "fa-circle-check"; // default
};

// ─── BOOKING STATUS HELPER ────────────────────────────────────────────────────
const isRoomUnavailable = (status) => {
  const unavailable = ["booked", "occupied", "reserved", "maintenance", "cleaning"];
  return unavailable.includes(status?.toLowerCase());
};

const getStatusLabel = (status) => {
  const labels = {
    booked:      { text: "Already Booked",     color: "#c0392b", bg: "rgba(192,57,43,0.15)",  border: "rgba(192,57,43,0.3)"  },
    occupied:    { text: "Currently Occupied",  color: "#e67e22", bg: "rgba(230,126,34,0.15)", border: "rgba(230,126,34,0.3)" },
    reserved:    { text: "Reserved",            color: "#8e44ad", bg: "rgba(142,68,173,0.15)", border: "rgba(142,68,173,0.3)" },
    maintenance: { text: "Under Maintenance",   color: "#7f8c8d", bg: "rgba(127,140,141,0.15)",border: "rgba(127,140,141,0.3)"},
    cleaning:    { text: "Being Cleaned",       color: "#2980b9", bg: "rgba(41,128,185,0.15)", border: "rgba(41,128,185,0.3)" },
  };
  return labels[status?.toLowerCase()] || null;
};

// ─── MODAL STYLES ─────────────────────────────────────────────────────────────
const MODAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  .rm-backdrop {
    position: fixed; inset: 0; z-index: 1050;
    background: rgba(10, 8, 6, 0.82);
    backdrop-filter: blur(8px);
    animation: rm-fade-in 0.3s ease forwards;
  }

  .rm-modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1055;
    width: min(980px, 96vw);
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    background: #0f0d0b;
    border-radius: 4px;
    border: 1px solid rgba(212, 175, 115, 0.18);
    box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,115,0.06);
    overflow: hidden;
    animation: rm-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    font-family: 'Jost', sans-serif;
  }

  .rm-modal-inner {
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: rgba(212,175,115,0.3) transparent;
  }
  .rm-modal-inner::-webkit-scrollbar { width: 4px; }
  .rm-modal-inner::-webkit-scrollbar-track { background: transparent; }
  .rm-modal-inner::-webkit-scrollbar-thumb { background: rgba(212,175,115,0.3); border-radius: 2px; }

  .rm-hero {
    position: relative;
    height: 380px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .rm-hero img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 8s ease;
    transform: scale(1.04);
  }
  .rm-hero img.rm-unavailable-img {
    filter: grayscale(60%) brightness(0.7);
  }
  .rm-modal:hover .rm-hero img { transform: scale(1); }

  .rm-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,8,6,0.1) 0%,
      rgba(10,8,6,0.0) 40%,
      rgba(10,8,6,0.85) 100%
    );
  }

  .rm-status-ribbon {
    position: absolute;
    top: 20px; left: 0;
    padding: 8px 20px 8px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    border-radius: 0 2px 2px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 5;
  }

  .rm-status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    animation: rm-pulse 1.8s ease-in-out infinite;
    flex-shrink: 0;
  }

  .rm-hero-content {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 28px 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .rm-tag {
    display: inline-block;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #d4af73;
    border: 1px solid rgba(212,175,115,0.5);
    padding: 5px 14px;
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .rm-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    color: #faf6f0;
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .rm-price-badge { text-align: right; }

  .rm-price-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 44px;
    font-weight: 300;
    color: #d4af73;
    line-height: 1;
  }

  .rm-price-night {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(250,246,240,0.5);
    display: block;
    margin-top: 3px;
  }

  .rm-body { padding: 0 36px 36px; }

  .rm-subtitle {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(212,175,115,0.7);
    padding: 24px 0 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 28px;
  }

  .rm-unavailable-banner {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border-radius: 2px;
    margin-bottom: 28px;
    border-left: 3px solid;
  }

  .rm-unavailable-banner-icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  .rm-unavailable-banner-text {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 1.5;
  }

  .rm-unavailable-banner-title {
    font-weight: 500;
    font-size: 13px;
    margin-bottom: 2px;
  }

  .rm-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 36px;
    border-radius: 2px;
    overflow: hidden;
  }

  .rm-feature-item {
    background: #161310;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .rm-feature-icon {
    width: 38px; height: 38px;
    border-radius: 2px;
    background: rgba(212,175,115,0.1);
    border: 1px solid rgba(212,175,115,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: #d4af73;
    font-size: 14px;
  }

  .rm-feature-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(250,246,240,0.35);
    margin-bottom: 3px;
  }

  .rm-feature-value {
    font-size: 13px;
    font-weight: 400;
    color: #faf6f0;
  }

  .rm-description {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: rgba(250,246,240,0.65);
    line-height: 1.8;
    margin-bottom: 36px;
    padding-bottom: 36px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .rm-section-title {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #d4af73;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .rm-section-title::after {
    content: ''; flex: 1;
    height: 1px;
    background: rgba(212,175,115,0.2);
  }

  .rm-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 36px;
  }

  .rm-gallery img {
    width: 100%; aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 2px;
    filter: brightness(0.85) saturate(0.9);
    transition: filter 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }
  .rm-gallery img:hover { filter: brightness(1) saturate(1); transform: scale(1.02); }

  .rm-amenities {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 36px;
  }

  .rm-amenity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: #161310;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    font-size: 13px;
    color: rgba(250,246,240,0.7);
    font-weight: 300;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
  }
  .rm-amenity-item:hover {
    border-color: rgba(212,175,115,0.3);
    color: #faf6f0;
    background: rgba(212,175,115,0.05);
  }

  .rm-amenity-icon {
    width: 32px; height: 32px;
    border-radius: 2px;
    background: rgba(212,175,115,0.08);
    border: 1px solid rgba(212,175,115,0.15);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: #d4af73;
    font-size: 12px;
    transition: background 0.25s, border-color 0.25s;
  }
  .rm-amenity-item:hover .rm-amenity-icon {
    background: rgba(212,175,115,0.15);
    border-color: rgba(212,175,115,0.35);
  }

  .rm-rules {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 36px;
    border-radius: 2px;
    overflow: hidden;
  }

  .rm-rule-item { background: #161310; padding: 20px 22px; }

  .rm-rule-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(212,175,115,0.6);
    margin-bottom: 8px;
  }

  .rm-rule-value { font-size: 14px; color: #faf6f0; font-weight: 300; }

  .rm-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .rm-footer-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .rm-footer-status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
  }

  .rm-footer-btns {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rm-btn-close {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(250,246,240,0.45);
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    padding: 12px 28px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .rm-btn-close:hover { color: #faf6f0; border-color: rgba(255,255,255,0.3); }

  .rm-btn-book {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #0f0d0b;
    background: #d4af73;
    border: none;
    padding: 13px 32px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
  }
  .rm-btn-book:hover { background: #e0c08a; color: #0f0d0b; }

  .rm-btn-book-disabled {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 13px 32px;
    border-radius: 2px;
    border: 1px solid;
    cursor: not-allowed;
    opacity: 0.85;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .rm-close-btn {
    position: absolute;
    top: 16px; right: 16px;
    z-index: 20;
    width: 40px; height: 40px;
    border-radius: 2px;
    background: rgba(10,8,6,0.7);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(250,246,240,0.7);
    font-size: 20px;
    line-height: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(4px);
  }
  .rm-close-btn:hover { background: rgba(212,175,115,0.15); color: #faf6f0; border-color: rgba(212,175,115,0.4); }

  @keyframes rm-fade-in { from { opacity: 0 } to { opacity: 1 } }

  @keyframes rm-slide-up {
    from { opacity: 0; transform: translate(-50%, -47%) scale(0.97) }
    to   { opacity: 1; transform: translate(-50%, -50%) scale(1) }
  }

  @keyframes rm-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.75); }
  }

  @media (max-width: 640px) {
    .rm-hero { height: 260px; }
    .rm-title { font-size: 28px; }
    .rm-hero-content { padding: 20px; flex-direction: column; align-items: flex-start; gap: 12px; }
    .rm-price-badge { text-align: left; }
    .rm-body { padding: 0 20px 28px; }
    .rm-features { grid-template-columns: 1fr; }
    .rm-gallery { grid-template-columns: repeat(2, 1fr); }
    .rm-amenities { grid-template-columns: 1fr; }
    .rm-rules { grid-template-columns: 1fr; }
    .rm-footer { flex-direction: column; align-items: stretch; }
    .rm-footer-btns { justify-content: flex-end; }
  }
`;

// ─── MODAL COMPONENT ─────────────────────────────────────────────────────────
const RoomModal = ({ room, onClose }) => {
  if (!room) return null;

  const unavailable = isRoomUnavailable(room.status);
  const statusInfo  = getStatusLabel(room.status);

  return (
    <>
      <style>{MODAL_STYLES}</style>

      {/* BACKDROP */}
      <div className="rm-backdrop" onClick={onClose} />

      {/* MODAL */}
      <div className="rm-modal" role="dialog" aria-modal="true">

        {/* CLOSE BTN */}
        <button className="rm-close-btn" onClick={onClose} aria-label="Close">×</button>

        <div className="rm-modal-inner">

          {/* HERO */}
          <div className="rm-hero">
            <img
              src={getImageUrl(room.images?.[0])}
              alt={room.title}
              className={unavailable ? "rm-unavailable-img" : ""}
            />
            <div className="rm-hero-overlay" />

            {/* STATUS RIBBON — sirf unavailable rooms pe */}
            {unavailable && statusInfo && (
              <div
                className="rm-status-ribbon"
                style={{
                  background: statusInfo.bg,
                  border: `1px solid ${statusInfo.border}`,
                  borderLeft: "none",
                  color: statusInfo.color,
                }}
              >
                <div
                  className="rm-status-dot"
                  style={{ background: statusInfo.color }}
                />
                {statusInfo.text}
              </div>
            )}

            <div className="rm-hero-content">
              <div>
                {room.tag && <div className="rm-tag">{room.tag}</div>}
                <h2 className="rm-title">{room.title}</h2>
              </div>
              <div className="rm-price-badge">
                <div className="rm-price-amount">${room.price}</div>
                <span className="rm-price-night">per night</span>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="rm-body">

            {room.subtitle && (
              <div className="rm-subtitle">{room.subtitle}</div>
            )}

            {/* UNAVAILABILITY BANNER */}
            {unavailable && statusInfo && (
              <div
                className="rm-unavailable-banner"
                style={{
                  background: statusInfo.bg,
                  borderLeftColor: statusInfo.color,
                  color: statusInfo.color,
                }}
              >
                <div className="rm-unavailable-banner-icon">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
                <div className="rm-unavailable-banner-text">
                  <div className="rm-unavailable-banner-title">
                    This room is not available for booking
                  </div>
                  <div style={{ opacity: 0.8 }}>
                    Current status: <strong>{statusInfo.text}</strong> — Please check back later or choose another room.
                  </div>
                </div>
              </div>
            )}

            {/* FEATURES */}
            <div className="rm-features">
              {room.area && (
                <div className="rm-feature-item">
                  <div className="rm-feature-icon"><i className="fa-solid fa-expand"></i></div>
                  <div>
                    <div className="rm-feature-label">Room Size</div>
                    <div className="rm-feature-value">{room.area}</div>
                  </div>
                </div>
              )}
              {room.persons && (
                <div className="rm-feature-item">
                  <div className="rm-feature-icon"><i className="fa-solid fa-users"></i></div>
                  <div>
                    <div className="rm-feature-label">Guests</div>
                    <div className="rm-feature-value">{room.persons}</div>
                  </div>
                </div>
              )}
              {room.bedType && (
                <div className="rm-feature-item">
                  <div className="rm-feature-icon"><i className="fa-solid fa-bed"></i></div>
                  <div>
                    <div className="rm-feature-label">Bed Type</div>
                    <div className="rm-feature-value">{room.bedType}</div>
                  </div>
                </div>
              )}
            </div>

            {room.description && (
              <p className="rm-description">"{room.description}"</p>
            )}

            {/* GALLERY */}
            {room.images?.length > 1 && (
              <>
                <div className="rm-section-title">Gallery</div>
                <div className="rm-gallery">
                  {room.images.slice(1).map((img, i) => (
                    <img key={i} src={getImageUrl(img)} alt={`${room.title} ${i + 2}`} />
                  ))}
                </div>
              </>
            )}

            {/* AMENITIES */}
            {room.amenities?.length > 0 && (
              <>
                <div className="rm-section-title">Amenities</div>
                <div className="rm-amenities">
                  {room.amenities.map((item, i) => (
                    <div key={i} className="rm-amenity-item">
                      <div className="rm-amenity-icon">
                        <i className={`fa-solid ${getAmenityIcon(item)}`}></i>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* HOUSE RULES */}
            <div className="rm-section-title">House Rules</div>
            <div className="rm-rules">
              <div className="rm-rule-item">
                <div className="rm-rule-label">Check-in</div>
                <div className="rm-rule-value">{room.checkIn || "—"}</div>
              </div>
              <div className="rm-rule-item">
                <div className="rm-rule-label">Check-out</div>
                <div className="rm-rule-value">{room.checkOut || "—"}</div>
              </div>
              <div className="rm-rule-item">
                <div className="rm-rule-label">Pets</div>
                <div className="rm-rule-value">{room.pets || "—"}</div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="rm-footer">

              {/* LEFT: live status indicator */}
              <div className="rm-footer-status">
                <div
                  className="rm-footer-status-dot"
                  style={{ background: unavailable ? (statusInfo?.color || "#c0392b") : "#27ae60" }}
                />
                <span style={{ color: unavailable ? (statusInfo?.color || "#c0392b") : "#27ae60" }}>
                  {unavailable ? (statusInfo?.text || "Unavailable") : "Available"}
                </span>
              </div>

              {/* RIGHT: buttons */}
              <div className="rm-footer-btns">
                <button className="rm-btn-close" onClick={onClose}>Close</button>

                {unavailable ? (
                  // DISABLED BOOKING BUTTON
                  <span
                    className="rm-btn-book-disabled"
                    title={`Room is ${statusInfo?.text || "unavailable"}`}
                    style={{
                      color: statusInfo?.color || "#c0392b",
                      borderColor: statusInfo?.border || "rgba(192,57,43,0.4)",
                      background: statusInfo?.bg || "rgba(192,57,43,0.1)",
                    }}
                  >
                    <i className="fa-solid fa-ban" style={{ fontSize: "12px" }}></i>
                    {statusInfo?.text || "Not Available"}
                  </span>
                ) : (
                  // ACTIVE BOOKING BUTTON
                  <Link to={`/rooms/${room._id}`} className="rm-btn-book">
                    Reserve Room
                  </Link>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const RoomsList = () => {
  const [rooms, setRooms]             = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading]         = useState(false);

  useEffect(() => { fetchRooms(); }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(Array.isArray(data) ? data : data.rooms || []);
    } catch (error) {
      console.log("Rooms fetch error:", error);
    }
  };

  const handleDetailsClick = async (e, roomId) => {
    e.preventDefault();
    setLoading(roomId);
    try {
      const data = await getSingleRoom(roomId);
      setSelectedRoom(data.room || data);
    } catch (error) {
      console.log("Room fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedRoom(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedRoom ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedRoom]);

  if (!rooms.length) {
    return <div className="text-center py-5"><h3>Loading Rooms...</h3></div>;
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="room-items-wrap">
            {rooms.map((room, index) => {
              const isEven        = index % 2 === 0;
              const isLoadingThis = loading === room._id;
              const unavailable   = isRoomUnavailable(room.status);
              const statusInfo    = getStatusLabel(room.status);

              return (
                <div key={room._id} className="room-item bg-white rounded-5 mb-5">
                  <div className="row g-0">

                    {/* IMAGE COLUMN */}
                    <div className={`col-lg-6 ${isEven ? "" : "order-lg-2"}`}>
                      <div className="room-item-img rounded-5 position-relative" style={{ cursor: "pointer" }}>
                        <a href="#" onClick={(e) => handleDetailsClick(e, room._id)}>
                          <img
                            className="img-fluid d-block w-100"
                            src={getImageUrl(room.images?.[0])}
                            alt={room.title}
                            style={unavailable ? { filter: "grayscale(40%) brightness(0.85)" } : {}}
                          />
                        </a>

                        {/* TAG */}
                        {room.tag && !unavailable && (
                          <div className="position-absolute top-0 start-0 ms-4 mt-4 px-3 py-1 text-3 fw-500 text-bg-primary rounded-pill">
                            {room.tag}
                          </div>
                        )}

                        {/* STATUS BADGE on card — sirf unavailable rooms pe */}
                        {unavailable && statusInfo && (
                          <div
                            className="position-absolute top-0 start-0 ms-4 mt-4 px-3 py-1 text-3 fw-500 rounded-pill d-flex align-items-center gap-2"
                            style={{
                              background: statusInfo.bg,
                              border: `1px solid ${statusInfo.border}`,
                              color: statusInfo.color,
                              backdropFilter: "blur(4px)",
                              fontSize: "11px",
                              fontWeight: 500,
                              letterSpacing: "0.5px",
                            }}
                          >
                            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "10px" }}></i>
                            {statusInfo.text}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CONTENT COLUMN */}
                    <div className="col-lg-6 align-content-center">
                      <div className="p-4 m-2">

                        <div className="room-discount d-inline-flex text-2 fw-500 rounded-pill border border-dark border-opacity-10 ms-0 mt-0 mb-2">
                          <span className="text-primary me-1"><i className="fa-solid fa-tag"></i></span>
                          {room.subtitle || "Luxury Stay"}
                        </div>

                        <h3 className="text-8 fw-600">{room.title}</h3>
                        <p className="text-3 text-body-secondary">{room.description}</p>

                        <div className="row g-2 text-3 text-body-secondary mb-3">
                          {room.bedType && (
                            <div className="col-6 col-xl-4 d-flex align-items-center">
                              <span className="text-primary text-5 me-2"><i className="fa-solid fa-bed"></i></span>{room.bedType}
                            </div>
                          )}
                          {room.persons && (
                            <div className="col-6 col-xl-4 d-flex align-items-center">
                              <span className="text-primary text-5 me-2"><i className="fa-solid fa-users"></i></span>{room.persons}
                            </div>
                          )}
                          {room.area && (
                            <div className="col-6 col-xl-4 d-flex align-items-center">
                              <span className="text-primary text-5 me-2"><i className="fa-solid fa-expand"></i></span>{room.area}
                            </div>
                          )}
                          {room.amenities?.slice(0, 3).map((item, i) => (
                            <div key={i} className="col-6 col-xl-4 d-flex align-items-center">
                              <span className="text-primary text-5 me-2">
                                <i className={`fa-solid ${getAmenityIcon(item)}`}></i>
                              </span>
                              {item}
                            </div>
                          ))}
                        </div>

                        <hr className="opacity-1" />

                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="text-7 fw-600 d-flex align-items-center gap-1">
                            ${room.price}
                            <span className="text-3 fw-500 text-body-tertiary text-uppercase">/ Per Night</span>
                          </div>

                          <button
                            className="btn btn-new btn-primary rounded-pill"
                            onClick={(e) => handleDetailsClick(e, room._id)}
                            disabled={!!loading}
                          >
                            <span className="btn-text">
                              <span>{isLoadingThis ? "Loading..." : "Details"}</span>
                            </span>
                            <span className="btn-icon">
                              <i className={`fa-solid ${isLoadingThis ? "fa-spinner fa-spin" : "fa-arrow-right"}`}></i>
                            </span>
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={closeModal} />
      )}
    </>
  );
};

export default RoomsList;
