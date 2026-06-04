import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSingleRoom } from "../../../../api/roomApi";
import { useAuth } from "../../../../Context/AuthContext";

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate   = useNavigate();
  const { user, token } = useAuth();

  const [room, setRoom]                   = useState(null);
  const [loading, setLoading]             = useState(false);
  const [fetching, setFetching]           = useState(true);
  const [guestError, setGuestError]       = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    guestName: "", guestPhone: "", guestEmail: "",
    checkInDate: "", checkOutDate: "",
    guests: 1, paymentMethod: "cash", specialRequests: ""
  });

  useEffect(() => {
    if (!user) navigate("/user-login", { state: { from: `/booking/${roomId}` } });
  }, [user, navigate, roomId]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("hotelUser"));
    if (storedUser) {
      setForm(prev => ({
        ...prev,
        guestName:  storedUser.name  || "",
        guestEmail: storedUser.email || "",
        guestPhone: storedUser.phone || "",
      }));
    }
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setFetching(true);
        const data = await getSingleRoom(roomId);
        setRoom(data.room || data);
      } catch (err) {
        console.log("Room fetch error:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const createBooking = async (bookingData) => {
    const response = await axios.post(
      "http://localhost:5001/api/bookings",
      bookingData,
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

  const getMaxGuests = () => {
    const type = room?.type?.toLowerCase();
    if (type === "single") return 1;
    if (type === "double") return 2;
    if (type === "deluxe") return 3;
    if (type === "suite")  return 4;
    return room?.capacity || 4;
  };

  const handlePhoneInput = (val) => {
    const onlyNums = val.replace(/\D/g, '').slice(0, 11);
    if (onlyNums.length > 0 && !onlyNums.startsWith('03')) {
      return '03' + onlyNums.replace(/^0*3*/, '').slice(0, 9);
    }
    return onlyNums;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'guestPhone') {
      setForm({ ...form, guestPhone: handlePhoneInput(value) });
      return;
    }

    if (name === "checkInDate") {
      if (form.checkOutDate && value > form.checkOutDate) {
        setForm({ ...form, checkInDate: value, checkOutDate: "" });
        return;
      }
    }

    if (name === "guests") {
      const max = getMaxGuests();
      if (Number(value) > max) {
        setGuestError(`${room.type} room allows maximum ${max} guest(s).`);
        return;
      } else {
        setGuestError('');
      }
    }

    setForm({ ...form, [name]: value });
  };

  const getNights = () => {
    if (!form.checkInDate || !form.checkOutDate) return 0;
    const diff = (new Date(form.checkOutDate) - new Date(form.checkInDate)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalAmount = getNights() * (room?.price || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     await createBooking({ roomId, ...form, totalAmount, userId: user?._id || user?.id });
      setShowSuccessModal(true);
    } catch (err) {
      console.log("Booking error:", err);
      alert("Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user)    return null;
  if (fetching) return <div className="text-center py-5"><h3>Loading room details...</h3></div>;
  if (!room)    return <div className="text-center py-5"><h3>Room not found</h3></div>;

  return (
    <section className="py-5" style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      <div className="container">

        {/* PAGE TITLE */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Complete Your Booking</h1>
          <p className="text-muted">Fill your details and confirm your stay</p>
        </div>

        <div className="row g-4 align-items-start">

          {/* FORM */}
          <div className="col-lg-7">
            <div className="bg-white shadow-sm rounded-4 p-4 p-lg-5">
              <h3 className="fw-bold mb-4">Guest Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input type="text" name="guestName" className="form-control form-control-lg"
                      placeholder="Enter full name" value={form.guestName} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input type="text" name="guestPhone" className="form-control form-control-lg"
                      placeholder="Enter phone number" value={form.guestPhone} onChange={handleChange} required />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input type="email" name="guestEmail" className="form-control form-control-lg"
                      placeholder="Enter email address" value={form.guestEmail} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Check In</label>
                    <input type="date" name="checkInDate" className="form-control form-control-lg"
                      min={today} value={form.checkInDate} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Check Out</label>
                    <input type="date" name="checkOutDate" className="form-control form-control-lg"
                      min={form.checkInDate || today} value={form.checkOutDate} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Guests</label>
                    <input type="number" name="guests" className={`form-control form-control-lg ${guestError ? 'is-invalid' : ''}`}
                      min="1" max={getMaxGuests()} value={form.guests} onChange={handleChange} required />
                    {guestError ? (
                      <small className="text-danger mt-1 d-block">
                        <i className="fa-solid fa-circle-exclamation me-1"></i>{guestError}
                      </small>
                    ) : (
                      <small className="text-muted mt-1 d-block">
                        <i className="fa-solid fa-circle-info me-1 text-primary"></i>
                        Maximum {getMaxGuests()} guest{getMaxGuests() > 1 ? 's' : ''} allowed for {room?.type} room
                      </small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Payment Method</label>
                    <select name="paymentMethod" className="form-select form-select-lg"
                      value={form.paymentMethod} onChange={handleChange}>
                      <option value="cash">Cash Payment</option>
                      <option value="online">Online Payment</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Special Requests</label>
                    <textarea rows="4" name="specialRequests" className="form-control"
                      placeholder="Write any special requests..." value={form.specialRequests} onChange={handleChange} />
                  </div>

                </div>

                <div className="d-flex gap-3 mt-5">
                  <button type="button" className="btn btn-light border px-4 py-3 rounded-pill"
                    onClick={() => navigate(-1)}>Back</button>
                  <button type="submit" className="btn btn-primary px-5 py-3 rounded-pill" disabled={loading}>
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ROOM CARD */}
          <div className="col-lg-5">
            <div className="bg-white shadow-sm rounded-4 overflow-hidden position-sticky" style={{ top: "100px" }}>

              <div className="position-relative">
                <img
                  src={room?.images?.[0] ? `http://localhost:5001/Uploads/${room.images[0]}` : "https://via.placeholder.com/700x450"}
                  alt={room.type} className="w-100" style={{ height: "280px", objectFit: "cover" }}
                />
                <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-2 m-3 rounded-pill fw-semibold">
                  Rs {room.price?.toLocaleString()} / Night
                </div>
                <div className="position-absolute bottom-0 start-0 w-100 p-3"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {room.roomNumber && (
                      <span style={{ background: '#c9a96e', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: '3px 12px', borderRadius: 20, textTransform: 'uppercase' }}>
                        Room {room.roomNumber}
                      </span>
                    )}
                    {room.type && (
                      <span style={{ color: '#c9a96e', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: '3px 12px', borderRadius: 20, textTransform: 'uppercase', border: '1px solid rgba(201,169,110,0.6)' }}>
                        {room.type} Room
                      </span>
                    )}
                    {room.floor && (
                      <span style={{ color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: 1, padding: '3px 12px', borderRadius: 20, textTransform: 'capitalize', border: '1px solid rgba(255,255,255,0.4)' }}>
                        {room.floor} Floor
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {room.description && <p className="text-muted mb-4">{room.description}</p>}
                <div className="border rounded-4 p-3 bg-light">
                  {[
                    { label: 'Room Type',      value: `${room.type} Room`,                style: { textTransform: 'capitalize' } },
                    { label: 'Floor',          value: `${room.floor || '—'} Floor`,       style: { textTransform: 'capitalize' } },
                    { label: 'Max Capacity',   value: `${room.capacity} Guest${room.capacity > 1 ? 's' : ''}` },
                    { label: 'Nights',         value: getNights()                          },
                    { label: 'Guests',         value: form.guests                          },
                    { label: 'Price/Night',    value: `Rs ${room.price?.toLocaleString()}`},
                  ].map((item, i) => (
                    <div key={i} className="d-flex justify-content-between mb-3">
                      <span className="text-muted">{item.label}</span>
                      <strong style={item.style || {}}>{item.value}</strong>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Total Amount</h5>
                    <h3 className="text-primary fw-bold mb-0">Rs {totalAmount.toLocaleString()}</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, maxWidth: 460, width: '100%',
            textAlign: 'center', padding: '48px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a96e, #a67c40)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: 36, color: '#fff', fontWeight: 700
            }}>✓</div>

            <h3 style={{ fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>Booking Confirmed!</h3>
            <p style={{ color: '#6c757d', marginBottom: 24, lineHeight: 1.6 }}>
              Your booking for <strong>{room?.type} Room {room?.roomNumber}</strong> has been successfully placed.
              Our team will contact you shortly.
            </p>

            <div style={{ background: '#f8f6f2', borderRadius: 12, padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
              {[
                { label: 'Guest',     value: form.guestName     },
                { label: 'Check In',  value: form.checkInDate   },
                { label: 'Check Out', value: form.checkOutDate  },
                { label: 'Guests',    value: form.guests        },
                { label: 'Total',     value: `Rs ${totalAmount.toLocaleString()}` },
                { label: 'Payment',   value: form.paymentMethod === 'cash' ? 'Cash at Hotel' : 'Online' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '6px 0', borderBottom: i < 5 ? '1px solid #ede8df' : 'none'
                }}>
                  <span style={{ color: '#888', fontSize: 13 }}>{item.label}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{item.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setShowSuccessModal(false); navigate('/profile'); }}
              style={{
                background: 'linear-gradient(135deg, #c9a96e, #a67c40)',
                color: '#fff', border: 'none', borderRadius: 50,
                padding: '14px 40px', fontWeight: 600, fontSize: 15,
                cursor: 'pointer', width: '100%'
              }}
            >
              View My Bookings
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default BookingPage;