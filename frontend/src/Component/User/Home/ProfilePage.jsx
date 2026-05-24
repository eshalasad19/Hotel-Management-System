import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5001/api";

const PROFILE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600;700&display=swap');

  .profile-page {
    min-height: 80vh;
    background: #f5f0eb;
    padding: 48px 0;
    font-family: 'Jost', sans-serif;
  }

  .profile-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .profile-page-title span {
    color: #c9a96e;
  }

  .profile-page-sub {
    font-size: 13px;
    color: #999;
    letter-spacing: 0.5px;
  }

  /* ── LEFT CARD ── */
  .profile-user-card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid #ede5d8;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .profile-card-header {
    background: linear-gradient(135deg, #1a1510 0%, #2d231a 100%);
    padding: 32px 24px 28px;
    text-align: center;
    position: relative;
  }

  .profile-avatar {
    width: 76px;
    height: 76px;
    background: linear-gradient(135deg, #c9a96e, #a67c45);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    margin: 0 auto 14px;
    border: 3px solid rgba(201,169,110,0.3);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }

  .profile-card-name {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  .profile-card-email {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 14px;
  }

  .profile-member-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(201,169,110,0.15);
    border: 1px solid rgba(201,169,110,0.35);
    color: #c9a96e;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
  }

  .profile-card-body {
    padding: 24px;
  }

  .profile-info-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: #fdf8f2;
    border: 1px solid #f0e8dc;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .profile-info-icon {
    width: 34px;
    height: 34px;
    background: rgba(201,169,110,0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a96e;
    font-size: 13px;
    flex-shrink: 0;
  }

  .profile-info-label {
    font-size: 10px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .profile-info-value {
    font-size: 14px;
    color: #1a1a1a;
    font-weight: 600;
  }

  .profile-edit-btn {
    width: 100%;
    background: linear-gradient(135deg, #c9a96e, #a67c45) !important;
    color: #fff !important;
    border: none !important;
    border-radius: 50px !important;
    padding: 11px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px;
    margin-top: 6px;
    transition: all 0.2s !important;
    box-shadow: 0 4px 14px rgba(201,169,110,0.3);
  }

  .profile-edit-btn:hover {
    box-shadow: 0 6px 20px rgba(201,169,110,0.45) !important;
    transform: translateY(-1px);
  }

  /* EDIT FORM */
  .profile-form-input {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid #ede5d8;
    border-radius: 50px;
    font-size: 13px;
    color: #1a1a1a;
    background: #fdf8f2;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
    font-family: 'Jost', sans-serif;
  }

  .profile-form-input:focus {
    border-color: #c9a96e;
    box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
    background: #fff;
  }

  .profile-form-input:disabled {
    background: #f5f0eb;
    color: #bbb;
    cursor: not-allowed;
  }

  .profile-form-label {
    font-size: 11px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    display: block;
  }

  .profile-save-btn {
    flex: 1;
    background: linear-gradient(135deg, #c9a96e, #a67c45) !important;
    color: #fff !important;
    border: none !important;
    border-radius: 50px !important;
    padding: 10px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    transition: all 0.2s !important;
  }

  .profile-cancel-btn {
    flex: 1;
    background: transparent !important;
    color: #888 !important;
    border: 1px solid #ddd !important;
    border-radius: 50px !important;
    padding: 10px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    transition: all 0.2s !important;
  }

  .profile-cancel-btn:hover {
    border-color: #aaa !important;
    color: #444 !important;
  }

  /* STATS */
  .profile-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
  }

  .profile-stat-item {
    background: #fdf8f2;
    border: 1px solid #f0e8dc;
    border-radius: 12px;
    padding: 14px 10px;
    text-align: center;
  }

  .profile-stat-num {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 4px;
  }

  .profile-stat-label {
    font-size: 10px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  /* ── RIGHT CARD ── */
  .profile-bookings-card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid #ede5d8;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .profile-bookings-header {
    padding: 24px 28px 0;
  }

  .profile-bookings-title {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  /* TABS */
  .profile-tabs {
    display: flex;
    gap: 6px;
    border-bottom: 1px solid #f0e8dc;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .profile-tab-btn {
    background: transparent;
    border: none;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 500;
    color: #999;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
    font-family: 'Jost', sans-serif;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }

  .profile-tab-btn:hover { color: #c9a96e; }

  .profile-tab-btn.active {
    color: #c9a96e;
    font-weight: 700;
    border-bottom-color: #c9a96e;
  }

  .profile-tab-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: #f0e8dc;
    color: #c9a96e;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
    margin-left: 5px;
  }

  .profile-tab-btn.active .profile-tab-count {
    background: rgba(201,169,110,0.15);
  }

  .profile-bookings-body {
    padding: 20px 28px 28px;
    max-height: 580px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ede5d8 transparent;
  }

  .profile-bookings-body::-webkit-scrollbar { width: 5px; }
  .profile-bookings-body::-webkit-scrollbar-track { background: transparent; }
  .profile-bookings-body::-webkit-scrollbar-thumb { background: #ede5d8; border-radius: 10px; }

  /* BOOKING CARD */
  .booking-card {
    border: 1px solid #ede5d8;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 14px;
    transition: box-shadow 0.2s;
  }

  .booking-card:hover {
    box-shadow: 0 4px 18px rgba(0,0,0,0.07);
  }

  .booking-card:last-child { margin-bottom: 0; }

  .booking-card-inner {
    display: flex;
  }

  .booking-img-wrap {
    width: 130px;
    min-height: 130px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
  }

  .booking-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 130px;
  }

  .booking-img-fallback {
    width: 100%;
    min-height: 130px;
    background: #f5f0eb;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .booking-details {
    padding: 14px 16px;
    flex: 1;
  }

  .booking-room-name {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2px;
  }

  .booking-id {
    font-size: 11px;
    color: #bbb;
    margin-bottom: 12px;
  }

  .booking-meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 10px;
  }

  .booking-meta-item {}
  .booking-meta-label {
    font-size: 10px;
    color: #bbb;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .booking-meta-value {
    font-size: 12px;
    font-weight: 600;
    color: #333;
  }

  .booking-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
  }

  .booking-status-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
  }

  .booking-pay-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .booking-method-badge {
    font-size: 10px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
    background: #f5f0eb;
    color: #888;
  }

  .booking-special-req {
    margin-top: 8px;
    padding: 8px 12px;
    background: #fdf8f2;
    border: 1px solid #f0e8dc;
    border-radius: 8px;
    font-size: 12px;
    color: #888;
  }

  .profile-empty {
    text-align: center;
    padding: 48px 24px;
  }

  .profile-empty-icon {
    width: 64px;
    height: 64px;
    background: #fdf8f2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 24px;
    color: #c9a96e;
  }

  @media (max-width: 768px) {
    .booking-card-inner { flex-direction: column; }
    .booking-img-wrap { width: 100%; min-height: 160px; }
    .booking-meta-grid { grid-template-columns: repeat(2, 1fr); }
    .profile-stats { grid-template-columns: repeat(3, 1fr); }
  }
`;

const statusConfig = {
  pending:     { color: "#f39c12", bg: "rgba(243,156,18,0.1)",   label: "PENDING"     },
  confirmed:   { color: "#3498db", bg: "rgba(52,152,219,0.1)",   label: "CONFIRMED"   },
  checked_in:  { color: "#8e44ad", bg: "rgba(142,68,173,0.1)",   label: "CHECKED IN"  },
  checked_out: { color: "#7f8c8d", bg: "rgba(127,140,141,0.1)",  label: "CHECKED OUT" },
  completed:   { color: "#27ae60", bg: "rgba(39,174,96,0.1)",    label: "COMPLETED"   },
  cancelled:   { color: "#e74c3c", bg: "rgba(231,76,60,0.1)",    label: "CANCELLED"   },
};

const getImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  if (img.startsWith("uploads/")) return `http://localhost:5001/${img}`;
  return `http://localhost:5001/uploads/${img}`;
};

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
};

export default function ProfilePage() {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings]             = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [editMode, setEditMode]             = useState(false);
  const [updating, setUpdating]             = useState(false);
  const [activeTab, setActiveTab]           = useState("all");

  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (!user) { navigate("/user-login"); return; }
    setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
  }, [user]);

  useEffect(() => {
    if (!user?._id && !user?.id) return;
    const fetchBookings = async () => {
      try {
        const userId = user._id || user.id;
        const res = await axios.get(`${BASE_URL}/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        toast.error("Bookings load nahi ho saki");
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Naam required hai"); return; }
    try {
      setUpdating(true);
      const res = await axios.put(
        `${BASE_URL}/auth/profile/update`,
        { name: form.name, phone: form.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(res.data.user, token);
      toast.success("Profile update ho gayi!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const tabs = [
    { key: "all",      label: "All",      filter: () => true },
    { key: "upcoming", label: "Upcoming", filter: (b) => ["pending", "confirmed"].includes(b.bookingStatus) },
    { key: "active",   label: "Active",   filter: (b) => b.bookingStatus === "checked_in" },
    { key: "past",     label: "Past",     filter: (b) => ["checked_out", "completed", "cancelled"].includes(b.bookingStatus) },
  ];

  const filteredBookings = bookings.filter(
    tabs.find(t => t.key === activeTab)?.filter || (() => true)
  );

  if (!user) return null;

  return (
    <>
      <style>{PROFILE_STYLES}</style>
      <div className="profile-page">
        <ToastContainer />
        <div className="container">

          {/* TITLE */}
          <div className="text-center mb-5">
            <h2 className="profile-page-title">My <span>Profile</span></h2>
            <p className="profile-page-sub">Manage your details and view your bookings</p>
          </div>

          <div className="row g-4">

            {/* ===== LEFT ===== */}
            <div className="col-lg-4">
              <div className="profile-user-card">

                {/* HEADER */}
                <div className="profile-card-header">
                  <div className="profile-avatar">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="profile-card-name">{user.name}</div>
                  <div className="profile-card-email">{user.email}</div>
                  <div className="profile-member-badge">
                    <i className="fa-solid fa-crown" style={{ fontSize: "10px" }}></i>
                    Guest Member
                  </div>
                </div>

                {/* BODY */}
                <div className="profile-card-body">

                  {!editMode ? (
                    <>
                      <div className="profile-info-item">
                        <div className="profile-info-icon"><i className="fa-solid fa-user"></i></div>
                        <div>
                          <div className="profile-info-label">Full Name</div>
                          <div className="profile-info-value">{user.name}</div>
                        </div>
                      </div>
                      <div className="profile-info-item">
                        <div className="profile-info-icon"><i className="fa-solid fa-envelope"></i></div>
                        <div>
                          <div className="profile-info-label">Email</div>
                          <div className="profile-info-value">{user.email}</div>
                        </div>
                      </div>
                      <div className="profile-info-item">
                        <div className="profile-info-icon"><i className="fa-solid fa-phone"></i></div>
                        <div>
                          <div className="profile-info-label">Phone</div>
                          <div className="profile-info-value">{user.phone || "Not added"}</div>
                        </div>
                      </div>
                      <button className="btn profile-edit-btn mt-2" onClick={() => setEditMode(true)}>
                        <i className="fa-solid fa-pen me-2"></i> Edit Profile
                      </button>
                    </>
                  ) : (
                    <form onSubmit={handleUpdate}>
                      <div className="mb-3">
                        <label className="profile-form-label">Full Name *</label>
                        <input
                          type="text"
                          className="profile-form-input"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="profile-form-label">Email</label>
                        <input
                          type="email"
                          className="profile-form-input"
                          value={form.email}
                          disabled
                        />
                        <small style={{ fontSize: "11px", color: "#bbb", paddingLeft: "14px" }}>
                          Email change nahi ho sakta
                        </small>
                      </div>
                      <div className="mb-4">
                        <label className="profile-form-label">Phone</label>
                        <input
                          type="tel"
                          className="profile-form-input"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="03XXXXXXXXX"
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <button type="submit" className="btn profile-save-btn" disabled={updating}>
                          {updating
                            ? <span className="spinner-border spinner-border-sm me-1"></span>
                            : <i className="fa-solid fa-check me-1"></i>
                          }
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn profile-cancel-btn"
                          onClick={() => {
                            setEditMode(false);
                            setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STATS */}
                  <div className="profile-stats">
                    <div className="profile-stat-item">
                      <div className="profile-stat-num" style={{ color: "#c9a96e" }}>{bookings.length}</div>
                      <div className="profile-stat-label">Total</div>
                    </div>
                    <div className="profile-stat-item">
                      <div className="profile-stat-num" style={{ color: "#27ae60" }}>
                        {bookings.filter(b => b.bookingStatus === "completed").length}
                      </div>
                      <div className="profile-stat-label">Done</div>
                    </div>
                    <div className="profile-stat-item">
                      <div className="profile-stat-num" style={{ color: "#f39c12" }}>
                        {bookings.filter(b => b.bookingStatus === "pending").length}
                      </div>
                      <div className="profile-stat-label">Pending</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ===== RIGHT ===== */}
            <div className="col-lg-8">
              <div className="profile-bookings-card">

                <div className="profile-bookings-header">
                  <div className="profile-bookings-title">
                    <i className="fa-solid fa-calendar-check me-2" style={{ color: "#c9a96e" }}></i>
                    My Bookings
                  </div>

                  {/* TABS */}
                  <div className="profile-tabs">
                    {tabs.map((tab) => {
                      const count = bookings.filter(tab.filter).length;
                      return (
                        <button
                          key={tab.key}
                          className={`profile-tab-btn ${activeTab === tab.key ? "active" : ""}`}
                          onClick={() => setActiveTab(tab.key)}
                        >
                          {tab.label}
                          {count > 0 && (
                            <span className="profile-tab-count">{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="profile-bookings-body">

                  {/* LOADING */}
                  {loadingBookings ? (
                    <div className="profile-empty">
                      <div className="spinner-border" style={{ color: "#c9a96e" }}></div>
                      <p className="mt-3" style={{ color: "#bbb", fontSize: "13px" }}>Loading bookings...</p>
                    </div>

                  ) : filteredBookings.length === 0 ? (

                    /* EMPTY */
                    <div className="profile-empty">
                      <div className="profile-empty-icon">
                        <i className="fa-solid fa-calendar-xmark"></i>
                      </div>
                      <p style={{ color: "#bbb", fontSize: "14px", margin: 0 }}>
                        No bookings in this category
                      </p>
                    </div>

                  ) : (

                    /* BOOKING CARDS */
                    filteredBookings.map((booking) => {
                      const st = statusConfig[booking.bookingStatus] || statusConfig.pending;
                      const roomImg = getImageUrl(booking.roomId?.images?.[0]);

                      return (
                        <div key={booking._id} className="booking-card">
                          <div className="booking-card-inner">

                            {/* IMAGE */}
                            <div className="booking-img-wrap">
                              {roomImg ? (
                                <img src={roomImg} alt="room" />
                              ) : (
                                <div className="booking-img-fallback">
                                  <i className="fa-solid fa-bed fa-2x" style={{ color: "#c9a96e", opacity: 0.4 }}></i>
                                </div>
                              )}
                            </div>

                            {/* DETAILS */}
                            <div className="booking-details">

                              <div className="d-flex justify-content-between align-items-start mb-1">
                                <div>
                                  <div className="booking-room-name">
                                    {booking.roomId?.name || `Room ${booking.roomId?.roomNumber || ""}`}
                                  </div>
                                  <div className="booking-id">
                                    #{booking._id.slice(-6).toUpperCase()}
                                    {booking.roomId?.type && ` • ${booking.roomId.type.charAt(0).toUpperCase() + booking.roomId.type.slice(1)}`}
                                  </div>
                                </div>
                                <span
                                  className="booking-status-badge"
                                  style={{ color: st.color, background: st.bg }}
                                >
                                  {st.label}
                                </span>
                              </div>

                              <div className="booking-meta-grid">
                                <div className="booking-meta-item">
                                  <div className="booking-meta-label">Check-in</div>
                                  <div className="booking-meta-value" style={{ color: "#27ae60" }}>
                                    {formatDate(booking.checkInDate)}
                                  </div>
                                </div>
                                <div className="booking-meta-item">
                                  <div className="booking-meta-label">Check-out</div>
                                  <div className="booking-meta-value" style={{ color: "#e74c3c" }}>
                                    {formatDate(booking.checkOutDate)}
                                  </div>
                                </div>
                                <div className="booking-meta-item">
                                  <div className="booking-meta-label">Guests</div>
                                  <div className="booking-meta-value">{booking.guests}</div>
                                </div>
                                <div className="booking-meta-item">
                                  <div className="booking-meta-label">Total</div>
                                  <div className="booking-meta-value" style={{ color: "#27ae60" }}>
                                    Rs. {booking.totalAmount?.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              {booking.specialRequests && (
                                <div className="booking-special-req">
                                  <i className="fa-solid fa-note-sticky me-1" style={{ color: "#c9a96e" }}></i>
                                  {booking.specialRequests}
                                </div>
                              )}

                              <div className="booking-badges mt-2">
                                <span
                                  className="booking-pay-badge"
                                  style={{
                                    color: booking.paymentStatus === "paid" ? "#27ae60" : "#f39c12",
                                    background: booking.paymentStatus === "paid" ? "rgba(39,174,96,0.1)" : "rgba(243,156,18,0.1)",
                                  }}
                                >
                                  <i className={`fa-solid ${booking.paymentStatus === "paid" ? "fa-circle-check" : "fa-clock"} me-1`}></i>
                                  {booking.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                                </span>
                                <span className="booking-method-badge">
                                  <i className="fa-solid fa-money-bill me-1"></i>
                                  {booking.paymentMethod?.toUpperCase()}
                                </span>
                              </div>

                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}