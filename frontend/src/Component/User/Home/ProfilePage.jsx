import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5001/api";

export default function ProfilePage() {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/user-login");
      return;
    }
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
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
        console.error("Bookings fetch error:", err.message);
        toast.error("Bookings load nahi ho saki");
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Naam required hai");
      return;
    }
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

  const statusBadge = (status) => {
    const map = {
      pending: "warning",
      confirmed: "info",
      checked_in: "primary",
      checked_out: "secondary",
      completed: "success",
      cancelled: "danger",
    };
    return map[status] || "secondary";
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "upcoming") return ["pending", "confirmed"].includes(b.bookingStatus);
    if (activeTab === "active") return b.bookingStatus === "checked_in";
    if (activeTab === "past") return ["checked_out", "completed", "cancelled"].includes(b.bookingStatus);
    return true;
  });

  if (!user) return null;

  return (
    <div className="section py-5" style={{ minHeight: "80vh", background: "#f8f9fa" }}>
      <ToastContainer />
      <div className="container">

        {/* PAGE TITLE */}
        <div className="text-center mb-5">
          <h2 className="fw-700 text-8">
            My <span className="text-primary">Profile</span>
          </h2>
          <p className="text-muted">Apni details aur bookings dekhein</p>
        </div>

        <div className="row g-4">

          {/* ===== LEFT — USER CARD ===== */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">

              {/* Avatar */}
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "80px", height: "80px", fontSize: "32px", fontWeight: "bold" }}
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <h5 className="fw-700 mb-1">{user.name}</h5>
              <p className="text-muted small mb-3">{user.email}</p>

              <span className="badge bg-primary rounded-pill px-3 py-2 mb-4">
                <i className="fa-solid fa-user me-1"></i> Guest Member
              </span>

              <hr />

              {!editMode ? (
                <div className="text-start">
                  <div className="mb-3">
                    <label className="text-muted small fw-600">
                      <i className="fa-solid fa-user text-primary me-1"></i> Full Name
                    </label>
                    <p className="fw-600 mb-0">{user.name}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted small fw-600">
                      <i className="fa-solid fa-envelope text-primary me-1"></i> Email
                    </label>
                    <p className="fw-600 mb-0">{user.email}</p>
                  </div>
                  <div className="mb-4">
                    <label className="text-muted small fw-600">
                      <i className="fa-solid fa-phone text-primary me-1"></i> Phone
                    </label>
                    <p className="fw-600 mb-0">{user.phone || "—"}</p>
                  </div>
                  <button
                    className="btn btn-primary rounded-pill w-100"
                    onClick={() => setEditMode(true)}
                  >
                    <i className="fa-solid fa-pen me-2"></i> Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="text-start">
                  <div className="mb-3">
                    <label className="form-label fw-600 small">Full Name*</label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-600 small">Email</label>
                    <input
                      type="email"
                      className="form-control rounded-pill"
                      value={form.email}
                      disabled
                      style={{ background: "#f0f0f0" }}
                    />
                    <small className="text-muted">Email change nahi ho sakta</small>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-600 small">Phone</label>
                    <input
                      type="tel"
                      className="form-control rounded-pill"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="03XXXXXXXXX"
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill flex-fill"
                      disabled={updating}
                    >
                      {updating ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        <i className="fa-solid fa-check me-2"></i>
                      )}
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill flex-fill"
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
              <hr className="mt-4" />
              <div className="row text-center g-2 mt-1">
                <div className="col-4">
                  <h5 className="fw-700 text-primary mb-0">{bookings.length}</h5>
                  <small className="text-muted">Total</small>
                </div>
                <div className="col-4">
                  <h5 className="fw-700 text-success mb-0">
                    {bookings.filter(b => b.bookingStatus === "completed").length}
                  </h5>
                  <small className="text-muted">Completed</small>
                </div>
                <div className="col-4">
                  <h5 className="fw-700 text-warning mb-0">
                    {bookings.filter(b => b.bookingStatus === "pending").length}
                  </h5>
                  <small className="text-muted">Pending</small>
                </div>
              </div>

            </div>
          </div>

          {/* ===== RIGHT — BOOKINGS ===== */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4">

              <h5 className="fw-700 mb-3">
                <i className="fa-solid fa-calendar-check text-primary me-2"></i>
                My Bookings
              </h5>

              {/* TABS */}
              <ul className="nav nav-pills mb-4 gap-2">
                {[
                  { key: "all", label: "All" },
                  { key: "upcoming", label: "Upcoming" },
                  { key: "active", label: "Active" },
                  { key: "past", label: "Past" },
                ].map((tab) => (
                  <li className="nav-item" key={tab.key}>
                    <button
                      className={`nav-link rounded-pill px-3 py-1 ${activeTab === tab.key ? "active" : "text-dark"}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              {loadingBookings ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary"></div>
                  <p className="mt-3 text-muted">Bookings load ho rahi hain...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
                  <p className="text-muted">Is category mein koi booking nahi hai</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filteredBookings.map((booking) => {

                    // ✅ Room image
                    const roomImages = booking.roomId?.images || [];
                    const roomImage = roomImages.length > 0 ? roomImages[0] : null;

                    return (
                      <div
                        key={booking._id}
                        className="border rounded-4 overflow-hidden"
                        style={{ background: "#fafafa" }}
                      >

                        {/* ✅ ROOM IMAGE + DETAILS ROW */}
                        <div className="d-flex flex-column flex-md-row">

                          {/* ✅ ROOM IMAGE */}
                          <div
                            style={{
                              width: "100%",
                              maxWidth: "160px",
                              minHeight: "140px",
                              flexShrink: 0,
                              overflow: "hidden",
                            }}
                          >
                            {roomImage ? (
                              <img
                                src={roomImage}
                                alt={booking.roomId?.name || "Room"}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  minHeight: "140px",
                                }}
                              />
                            ) : (
                              // ✅ fallback — image nahi hai
                              <div
                                className="bg-light d-flex align-items-center justify-content-center"
                                style={{ width: "100%", minHeight: "140px" }}
                              >
                                <i className="fa-solid fa-bed fa-2x text-muted"></i>
                              </div>
                            )}
                          </div>

                          {/* BOOKING DETAILS */}
                          <div className="p-3 flex-fill">

                            {/* TOP ROW */}
                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                              <div>
                                <h6 className="fw-700 mb-0">
                                  {booking.roomId?.name || `Room ${booking.roomId?.roomNumber || ""}`}
                                </h6>
                                <small className="text-muted">
                                  #{booking._id.slice(-6).toUpperCase()} •{" "}
                                  <span className="text-capitalize">{booking.roomId?.type}</span>
                                </small>
                              </div>
                              <span className={`badge bg-${statusBadge(booking.bookingStatus)} rounded-pill px-3 py-2`}>
                                {booking.bookingStatus?.replace("_", " ").toUpperCase()}
                              </span>
                            </div>

                            {/* DETAILS GRID */}
                            <div className="row g-2 mt-1">
                              <div className="col-6 col-md-3">
                                <small className="text-muted d-block">Check-in</small>
                                <span className="fw-600 small">
                                  <i className="fa-regular fa-calendar text-success me-1"></i>
                                  {formatDate(booking.checkInDate)}
                                </span>
                              </div>
                              <div className="col-6 col-md-3">
                                <small className="text-muted d-block">Check-out</small>
                                <span className="fw-600 small">
                                  <i className="fa-regular fa-calendar text-danger me-1"></i>
                                  {formatDate(booking.checkOutDate)}
                                </span>
                              </div>
                              <div className="col-6 col-md-3">
                                <small className="text-muted d-block">Guests</small>
                                <span className="fw-600 small">
                                  <i className="fa-solid fa-users text-primary me-1"></i>
                                  {booking.guests}
                                </span>
                              </div>
                              <div className="col-6 col-md-3">
                                <small className="text-muted d-block">Total</small>
                                <span className="fw-600 small text-success">
                                  Rs. {booking.totalAmount?.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* SPECIAL REQUEST */}
                            {booking.specialRequests && (
                              <div className="mt-2 p-2 bg-white rounded-3 border">
                                <small className="text-muted">
                                  <i className="fa-solid fa-note-sticky text-warning me-1"></i>
                                  {booking.specialRequests}
                                </small>
                              </div>
                            )}

                            {/* PAYMENT BADGES */}
                            <div className="mt-2 d-flex gap-2 flex-wrap">
                              <span className={`badge rounded-pill px-3 ${booking.paymentStatus === "paid" ? "bg-success" : "bg-warning text-dark"}`}>
                                <i className="fa-solid fa-credit-card me-1"></i>
                                {booking.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                              </span>
                              <span className="badge bg-light text-dark rounded-pill px-3">
                                <i className="fa-solid fa-money-bill me-1"></i>
                                {booking.paymentMethod?.toUpperCase()}
                              </span>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}