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
  if (n.includes("gym") || n.includes("fitness"))            return "fa-dumbbell";
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
  if (n.includes("hair") || n.includes("dryer"))               return "fa-wind";
  if (n.includes("towel") || n.includes("linen"))             return "fa-scroll";
  if (n.includes("24") || n.includes("reception") || n.includes("concierge")) return "fa-bell-concierge";
  if (n.includes("room service"))                             return "fa-bell-concierge";
  if (n.includes("pet"))                                      return "fa-paw";
  if (n.includes("smoke") || n.includes("smoking"))           return "fa-smoking";
  if (n.includes("disable") || n.includes("accessible") || n.includes("wheelchair")) return "fa-wheelchair";
  if (n.includes("child") || n.includes("kid") || n.includes("baby"))        return "fa-baby";
  if (n.includes("garden") || n.includes("outdoor"))          return "fa-tree";
  if (n.includes("security") || n.includes("cctv"))           return "fa-shield-halved";
  if (n.includes("elevator") || n.includes("lift"))           return "fa-elevator";
  return "fa-circle-check";
};

// ─── BOOKING STATUS HELPER ────────────────────────────────────────────────────
const isRoomUnavailable = (status) => {
  const unavailable = ["booked", "occupied", "reserved", "maintenance", "cleaning"];
  return unavailable.includes(status?.toLowerCase());
};

const getStatusLabel = (status) => {
  const labels = {
    booked:      { text: "Already Booked",    color: "#e74c3c", bg: "rgba(231, 76, 60, 0.1)",  border: "rgba(231, 76, 60, 0.2)"  },
    occupied:    { text: "Currently Occupied",  color: "#e67e22", bg: "rgba(230,126,34,0.1)", border: "rgba(230,126,34,0.2)" },
    reserved:    { text: "Reserved",            color: "#9b59b6", bg: "rgba(155, 89, 182, 0.1)", border: "rgba(155, 89, 182, 0.2)" },
    maintenance: { text: "Under Maintenance",   color: "#95a5a6", bg: "rgba(149, 165, 166, 0.1)",border: "rgba(149, 165, 166, 0.2)"},
    cleaning:    { text: "Being Cleaned",       color: "#3498db", bg: "rgba(52, 152, 219, 0.1)", border: "rgba(52, 152, 219, 0.2)" },
  };
  return labels[status?.toLowerCase()] || null;
};

// ─── MODAL STYLES (Premium Refined UI) ─────────────────────────────
const MODAL_STYLES = `
  .rm-backdrop {
    position: fixed; inset: 0; z-index: 1050;
    background: rgba(7, 6, 5, 0.82);
    backdrop-filter: blur(12px);
    animation: rm-fade-in 0.3s ease forwards;
  }

  .rm-modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1055;
    width: min(1080px, 95vw);
    height: min(720px, 85vh);
    display: flex;
    flex-direction: column;
    background: #110e0c;
    border-radius: 12px;
    border: 1px solid rgba(212, 175, 115, 0.18);
    box-shadow: 0 30px 70px rgba(0,0,0,0.8);
    overflow: hidden;
    animation: rm-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    font-family: 'Jost', sans-serif;
  }

  .rm-modal-container {
    display: flex;
    flex: 1;
    overflow: hidden;
    height: calc(100% - 80px); /* Adjust for footer */
  }

  .rm-modal-sidebar {
    width: 45%;
    position: relative;
    overflow: hidden;
    background: #090807;
  }

  .rm-modal-sidebar img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .rm-modal-sidebar img.rm-unavailable-img {
    filter: grayscale(40%) brightness(0.5);
  }
  .rm-modal:hover .rm-modal-sidebar img { transform: scale(1.04); }

  .rm-sidebar-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(17,14,12,0.1) 0%, rgba(17,14,12,0.4) 60%, rgba(17,14,12,0.95) 100%);
  }

  .rm-sidebar-details {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 30px;
  }

  .rm-modal-inner {
    width: 55%;
    overflow-y: auto;
    background: #110e0c;
    padding: 35px;
    scrollbar-width: thin;
    scrollbar-color: rgba(212,175,115,0.2) transparent;
  }
  .rm-modal-inner::-webkit-scrollbar { width: 5px; }
  .rm-modal-inner::-webkit-scrollbar-track { background: transparent; }
  .rm-modal-inner::-webkit-scrollbar-thumb { background: rgba(212,175,115,0.2); border-radius: 10px; }

  .rm-status-ribbon {
    position: absolute; top: 20px; left: 20px;
    padding: 6px 14px;
    font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; border-radius: 4px;
    display: inline-flex; align-items: center; gap: 8px; z-index: 5;
  }

  .rm-status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    animation: rm-pulse 2s ease-in-out infinite;
  }

  .rm-tag {
    display: inline-block;
    font-size: 9px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #d4af73;
    border: 1px solid rgba(212,175,115,0.35);
    padding: 4px 10px; border-radius: 3px; margin-bottom: 12px;
    background: rgba(212,175,115,0.03);
  }

  .rm-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px; font-weight: 500; color: #faf6f0;
    line-height: 1.2; margin: 0 0 5px 0;
  }

  .rm-price-badge {
    display: flex; align-items: baseline; gap: 6px; margin-top: 5px;
  }
  .rm-price-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 500; color: #d4af73; line-height: 1;
  }
  .rm-price-night {
    font-size: 11px; font-weight: 300; letter-spacing: 1px;
    text-transform: uppercase; color: rgba(250,246,240,0.45);
  }

  .rm-subtitle {
    font-size: 13px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; color: rgba(212,175,115,0.9);
    margin-bottom: 24px; display: block;
  }

  .rm-unavailable-banner {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 18px; border-radius: 6px; margin-bottom: 25px;
    border-left: 3px solid; background: rgba(255,255,255,0.02);
  }
  .rm-unavailable-banner-icon { font-size: 15px; margin-top: 2px; }
  .rm-unavailable-banner-title { font-weight: 600; font-size: 13px; margin-bottom: 2px; letter-spacing: 0.5px; }
  .rm-unavailable-banner-text { font-size: 12px; line-height: 1.5; opacity: 0.85; }

  .rm-features {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    margin-bottom: 30px;
  }
  .rm-feature-item {
    background: #171412; padding: 14px;
    display: flex; flex-direction: column; gap: 8px;
    border-radius: 6px; border: 1px solid rgba(212,175,115,0.05);
  }
  .rm-feature-icon {
    width: 28px; height: 28px; border-radius: 4px;
    background: rgba(212,175,115,0.05); display: flex; align-items: center; justify-content: center;
    color: #d4af73; font-size: 13px;
  }
  .rm-feature-label { font-size: 10px; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(250,246,240,0.35); }
  .rm-feature-value { font-size: 13px; color: #faf6f0; font-weight: 500; }

  .rm-description {
    font-size: 14px; color: rgba(250,246,240,0.65);
    line-height: 1.6; margin-bottom: 30px; font-weight: 300;
  }

  .rm-section-title {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #d4af73;
    margin: 30px 0 16px 0; display: flex; align-items: center; gap: 12px;
  }
  .rm-section-title::after { content: ''; flex: 1; height: 1px; background: rgba(212,175,115,0.12); }

  .rm-gallery {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px;
  }
  .rm-gallery img {
    width: 100%; aspect-ratio: 4/3; object-fit: cover;
    border-radius: 4px; filter: brightness(0.75); transition: all 0.3s ease;
  }
  .rm-gallery img:hover { filter: brightness(1); transform: scale(1.02); }

  .rm-amenities {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
  }
  .rm-amenity-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    background: #171412; border: 1px solid rgba(255,255,255,0.02); border-radius: 5px;
    font-size: 13px; color: rgba(250,246,240,0.7);
  }
  .rm-amenity-icon { color: #d4af73; font-size: 12px; width: 16px; text-align: center; }

  .rm-rules {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  }
  .rm-rule-item { background: #171412; padding: 12px 14px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.01); }
  .rm-rule-label { font-size: 9px; letter-spacing: 0.5px; text-transform: uppercase; color: #d4af73; opacity: 0.8; margin-bottom: 4px; }
  .rm-rule-value { font-size: 13px; color: #faf6f0; font-weight: 500; }

  .rm-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 35px; background: #0a0807; height: 80px;
    border-top: 1px solid rgba(212,175,115,0.1); flex-shrink: 0;
  }
  .rm-footer-status { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; }
  .rm-footer-status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .rm-footer-btns { display: flex; align-items: center; gap: 12px; }

  .rm-btn-close {
    font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
    color: rgba(250,246,240,0.5); background: transparent;
    border: 1px solid rgba(255,255,255,0.12); padding: 10px 20px; border-radius: 4px;
    cursor: pointer; transition: all 0.2s;
  }
  .rm-btn-close:hover { color: #faf6f0; border-color: rgba(255,255,255,0.3); }

  .rm-btn-book {
    font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    color: #110e0c; background: #d4af73; border: none; padding: 11px 24px; border-radius: 4px;
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .rm-btn-book:hover { background: #e0c08a; transform: translateY(-1px); }

  .rm-btn-book-disabled {
    font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
    padding: 10px 20px; border-radius: 4px; border: 1px solid;
    cursor: not-allowed; display: inline-flex; align-items: center; gap: 6px;
  }

  .rm-close-btn {
    position: absolute; top: 20px; right: 20px; z-index: 20;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(17,14,12,0.6); border: 1px solid rgba(255,255,255,0.1);
    color: #faf6f0; font-size: 18px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; backdrop-filter: blur(4px); line-height: 1;
  }
  .rm-close-btn:hover { background: #d4af73; color: #110e0c; border-color: #d4af73; }

  @keyframes rm-fade-in { from { opacity: 0 } to { opacity: 1 } }
  @keyframes rm-slide-up {
    from { opacity: 0; transform: translate(-50%, -47%) scale(0.97) }
    to   { opacity: 1; transform: translate(-50%, -50%) scale(1) }
  }
  @keyframes rm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  @media (max-width: 868px) {
    .rm-modal { height: 90vh; width: 94vw; }
    .rm-modal-container { flex-direction: column; overflow-y: auto; height: calc(100% - 70px); }
    .rm-modal-sidebar { width: 100%; height: 240px; flex-shrink: 0; }
    .rm-modal-inner { width: 100%; padding: 24px; overflow-y: visible; }
    .rm-title { font-size: 28px; }
    .rm-features { grid-template-columns: 1fr; gap: 8px; }
    .rm-amenities { grid-template-columns: 1fr; }
    .rm-rules { grid-template-columns: 1fr; gap: 6px; }
    .rm-footer { padding: 15px 24px; height: auto; flex-direction: column; gap: 12px; align-items: flex-start; }
    .rm-footer-btns { width: 100%; justify-content: flex-end; }
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
      <div className="rm-backdrop" onClick={onClose} />
      <div className="rm-modal" role="dialog" aria-modal="true">
        <button className="rm-close-btn" onClick={onClose} aria-label="Close">×</button>
        
        <div className="rm-modal-container">
          {/* LEFT SIDEBAR (Sticky Media View) */}
          <div className="rm-modal-sidebar">
            <img
              src={getImageUrl(room.images?.[0])}
              alt={room.title}
              className={unavailable ? "rm-unavailable-img" : ""}
            />
            <div className="rm-sidebar-overlay" />

            {unavailable && statusInfo && (
              <div
                className="rm-status-ribbon"
                style={{
                  background: statusInfo.bg,
                  border: `1px solid ${statusInfo.border}`,
                  color: statusInfo.color,
                }}
              >
                <div className="rm-status-dot" style={{ background: statusInfo.color }} />
                {statusInfo.text}
              </div>
            )}

            <div className="rm-sidebar-details">
              {room.tag && <div className="rm-tag">{room.tag}</div>}
              <h2 className="rm-title">{room.title}</h2>
              <div className="rm-price-badge">
                <span className="rm-price-amount">${room.price}</span>
                <span className="rm-price-night">/ night</span>
              </div>
            </div>
          </div>

          {/* RIGHT DETAILS PANEL (Scrollable) */}
          <div className="rm-modal-inner">
            {room.subtitle && <span className="rm-subtitle">{room.subtitle}</span>}

            {unavailable && statusInfo && (
              <div
                className="rm-unavailable-banner"
                style={{
                  borderLeftColor: statusInfo.color,
                  color: statusInfo.color,
                }}
              >
                <div className="rm-unavailable-banner-icon">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
                <div className="rm-unavailable-banner-text">
                  <div className="rm-unavailable-banner-title">Space Temporarily Locked</div>
                  <div>
                    This room is currently marked as <strong>{statusInfo.text}</strong>. Reservations will open shortly.
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
                    <div className="rm-feature-label">Size</div>
                    <div className="rm-feature-value">{room.area}</div>
                  </div>
                </div>
              )}
              {room.persons && (
                <div className="rm-feature-item">
                  <div className="rm-feature-icon"><i className="fa-solid fa-users"></i></div>
                  <div>
                    <div className="rm-feature-label">Capacity</div>
                    <div className="rm-feature-value">{room.persons} Guests</div>
                  </div>
                </div>
              )}
              {room.bedType && (
                <div className="rm-feature-item">
                  <div className="rm-feature-icon"><i className="fa-solid fa-bed"></i></div>
                  <div>
                    <div className="rm-feature-label">Bed config</div>
                    <div className="rm-feature-value">{room.bedType}</div>
                  </div>
                </div>
              )}
            </div>

            {room.description && <p className="rm-description">{room.description}</p>}

            {/* AMENITIES */}
            {room.amenities?.length > 0 && (
              <>
                <div className="rm-section-title">Included Amenities</div>
                <div className="rm-amenities">
                  {room.amenities.map((item, i) => (
                    <div key={i} className="rm-amenity-item">
                      <i className={`fa-solid ${getAmenityIcon(item)} rm-amenity-icon`}></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* HOUSE RULES */}
            <div className="rm-section-title">Policies & Timeline</div>
            <div className="rm-rules">
              <div className="rm-rule-item">
                <div className="rm-rule-label">Check-in</div>
                <div className="rm-rule-value">{room.checkIn || "14:00 PM"}</div>
              </div>
              <div className="rm-rule-item">
                <div className="rm-rule-label">Check-out</div>
                <div className="rm-rule-value">{room.checkOut || "12:00 PM"}</div>
              </div>
              <div className="rm-rule-item">
                <div className="rm-rule-label">Pets</div>
                <div className="rm-rule-value">{room.pets || "Not Allowed"}</div>
              </div>
            </div>

            {/* GALLERY */}
            {room.images?.length > 1 && (
              <>
                <div className="rm-section-title">Interior Gallery</div>
                <div className="rm-gallery">
                  {room.images.slice(1).map((img, i) => (
                    <img key={i} src={getImageUrl(img)} alt={`${room.title} view ${i + 2}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* FIXED FOOTER */}
        <div className="rm-footer">
          <div className="rm-footer-status">
            <div
              className="rm-footer-status-dot"
              style={{ background: unavailable ? (statusInfo?.color || "#e74c3c") : "#2ecc71" }}
            />
            <span style={{ color: unavailable ? (statusInfo?.color || "#e74c3c") : "#2ecc71" }}>
              {unavailable ? (statusInfo?.text || "Unavailable") : "Ready to Reserve"}
            </span>
          </div>

          <div className="rm-footer-btns">
            <button className="rm-btn-close" onClick={onClose}>Close</button>
            {unavailable ? (
              <span
                className="rm-btn-book-disabled"
                style={{
                  color: statusInfo?.color || "#e74c3c",
                  borderColor: statusInfo?.border || "rgba(231,76,60,0.2)",
                  background: statusInfo?.bg || "rgba(231,76,60,0.05)",
                }}
              >
                <i className="fa-solid fa-lock" style={{ fontSize: "10px" }}></i> Fully Booked
              </span>
            ) : (
              <Link to={`/rooms/${room._id}`} className="rm-btn-book">
                Book Suite
              </Link>
            )}
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
    if (selectedRoom) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
                        {room.tag && !unavailable && (
                          <div className="position-absolute top-0 start-0 ms-4 mt-4 px-3 py-1 text-3 fw-500 text-bg-primary rounded-pill">
                            {room.tag}
                          </div>
                        )}
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

      {selectedRoom && <RoomModal room={selectedRoom} onClose={closeModal} />}
    </>
  );
};

export default RoomsList;