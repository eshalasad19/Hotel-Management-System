import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001/api";

const BookingNew = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [guestError, setGuestError] = useState("");

  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    paymentMethod: "cash",
    specialRequests: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadRooms();
  }, []);
const loadRooms = async () => {
  try {
    const [roomsRes, bookingsRes] = await Promise.all([
      axios.get(`${API_URL}/rooms`, { headers }),
      axios.get(`${API_URL}/bookings/all`, { headers }),
    ]);

    const allRooms = roomsRes.data;
    const allBookings = bookingsRes.data;

    const activeStatuses = [
      "pending",
      "confirmed",
      "checked_in",
    ];

    const blockedRoomIds = allBookings
      .filter((b) =>
        activeStatuses.includes(b.bookingStatus)
      )
      .map((b) => b.roomId?._id || b.roomId);

    const availableRooms = allRooms.filter(
      (room) =>
        room.status === "available" &&
        !blockedRoomIds.includes(room._id)
    );

    setRooms(availableRooms);

  } catch (err) {
    console.error(err);
  }
};

  const calcSummary = (roomId, checkIn, checkOut) => {
    const room = rooms.find((r) => r._id === roomId);

    if (!room || !checkIn || !checkOut) {
      setSummary(null);
      return;
    }

    const days = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
    );

    if (days <= 0) {
      setSummary(null);
      return;
    }

    setSummary({
      room,
      days,
      total: days * room.price,
    });
  };

  const validateGuests = (roomId, guests) => {
    const room = rooms.find((r) => r._id === roomId);

    if (!room) {
      setGuestError("");
      return;
    }

    const maxGuests = room.capacity || room.maxGuests || 1;

    if (Number(guests) > maxGuests) {
      setGuestError(`This room allows maximum ${maxGuests} guest(s) only.`);
    } else {
      setGuestError("");
    }
  };

  const handleChange = (field, value) => {
    const newForm = {
      ...form,
      [field]: value,
    };

    setForm(newForm);

    calcSummary(
      field === "roomId" ? value : newForm.roomId,
      field === "checkIn" ? value : newForm.checkIn,
      field === "checkOut" ? value : newForm.checkOut,
    );

    validateGuests(
      field === "roomId" ? value : newForm.roomId,
      field === "guests" ? value : newForm.guests,
    );
  };

const handleSubmit = async () => {
  setError("");
  setSuccess("");

  if (!form.guestName.trim()) {
    setError("Guest name is required.");
    return;
  }

  if (!form.guestPhone.trim()) {
    setError("Guest phone is required.");
    return;
  }

  if (!form.roomId) {
    setError("Please select a room.");
    return;
  }

  // Phone validation
  const phoneRegex = /^03\d{9}$/;

  if (!phoneRegex.test(form.guestPhone)) {
    setError("Enter valid Pakistani phone number (03XXXXXXXXX)");
    return;
  }

  // Email validation
  if (form.guestEmail) {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(form.guestEmail)) {
      setError("Enter valid email address.");
      return;
    }
  }

  if (!form.checkIn || !form.checkOut) {
    setError("Check-in and check-out dates are required.");
    return;
  }

  if (!summary) {
    setError("Invalid dates selected.");
    return;
  }

  if (guestError) {
    setError(guestError);
    return;
  }

  const selectedRoom = rooms.find(
    (r) => r._id === form.roomId
  );

  if (
    selectedRoom &&
    Number(form.guests) > Number(selectedRoom.capacity)
  ) {
    setError(
      `Room capacity is only ${selectedRoom.capacity} guest(s).`
    );
    return;
  }

  setLoading(true);

  try {

    // Temporary email if empty
    const email =
      form.guestEmail?.trim() ||
      `guest${Date.now()}@hotel.com`;

    let userId = null;

    // Create walk-in guest account
    const regRes = await axios.post(
      `${API_URL}/auth/register`,
      {
        name: form.guestName.trim(),
        email,
        phone: form.guestPhone.trim(),
        password: "guest123",
        role: "guest",
      }
    );

    userId = regRes.data.user._id;

    // Booking status
    const bookingStatus =
      form.paymentMethod === "cash"
        ? "confirmed"
        : "pending";

    // Payment status
    const paymentStatus =
      form.paymentMethod === "cash"
        ? "paid"
        : "unpaid";

    // Create booking
    await axios.post(
      `${API_URL}/bookings`,
      {
        roomId: form.roomId,
        userId,
        checkInDate: form.checkIn,
        checkOutDate: form.checkOut,
        guests: form.guests,
        totalAmount: summary.total,
        paymentMethod: form.paymentMethod,
        paymentStatus,
        specialRequests: form.specialRequests,
        bookingStatus,
      },
      { headers }
    );

    setSuccess(
      `Booking created successfully! Room ${summary.room.roomNumber} booked for ${form.guestName}`
    );

    setTimeout(() => {
      navigate("/admin/bookings");
    }, 2000);

  } catch (err) {

    console.log(err.response?.data);

    setError(
      err.response?.data?.message ||
      "Error creating booking."
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">New Booking</h4>

            <button
              className="btn btn-light"
              onClick={() => navigate("/admin/bookings")}
            >
              <i className="ri-arrow-left-line me-1"></i>
              Back to Bookings
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9">
          {error && <div className="alert alert-danger">{error}</div>}

          {success && <div className="alert alert-success">{success}</div>}

          <div className="row g-3">
            {/* Guest Information */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    <i className="ri-user-line me-2 text-primary"></i>
                    Guest Information
                  </h5>
                </div>

                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">
                        Guest Name
                        <span className="text-danger"> *</span>
                      </label>

                      <input
                        className="form-control"
                        placeholder="Full name"
                        value={form.guestName}
                        onChange={(e) =>
                          handleChange("guestName", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        Phone
                        <span className="text-danger"> *</span>
                      </label>

                      <input
                        className="form-control"
                        value={form.guestPhone}
                        maxLength="11"
                        onChange={(e) =>
  handleChange(
    "guestPhone",
    e.target.value.replace(/\D/g, "")
  )
}
                        placeholder="03XXXXXXXXX"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Email</label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Optional"
                        value={form.guestEmail}
                        onChange={(e) =>
                          handleChange("guestEmail", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Special Requests</label>

                      <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Any special requests..."
                        value={form.specialRequests}
                        onChange={(e) =>
                          handleChange("specialRequests", e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    <i className="ri-calendar-check-line me-2 text-success"></i>
                    Booking Details
                  </h5>
                </div>

                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">
                        Select Room
                        <span className="text-danger"> *</span>
                      </label>

                      <select
                        className="form-select"
                        value={form.roomId}
                        onChange={(e) => handleChange("roomId", e.target.value)}
                      >
                        <option value="">Select Available Room</option>

                        {rooms.map((r) => (
                          <option key={r._id} value={r._id}>
                            Room {r.roomNumber} — {r.type} — {r.capacity}{" "}
                            Persons — PKR {Number(r.price).toLocaleString()}
                            /night
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label">
                        Check In
                        <span className="text-danger"> *</span>
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        min={today}
                        value={form.checkIn}
                        onChange={(e) =>
                          handleChange("checkIn", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label">
                        Check Out
                        <span className="text-danger"> *</span>
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        min={form.checkIn || today}
                        value={form.checkOut}
                        onChange={(e) =>
                          handleChange("checkOut", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Number of Guests</label>

                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max={summary?.room?.capacity || 1}
                        value={form.guests}
                        onChange={(e) => handleChange("guests", e.target.value)}
                      />
                      {summary?.room?.capacity && (
                        <small className="text-muted">
                          Max capacity: {summary.room.capacity} guest(s)
                        </small>
                      )}

                      {guestError && (
                        <small className="text-danger">{guestError}</small>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Payment Method</label>

                      <select
                        className="form-select"
                        value={form.paymentMethod}
                        onChange={(e) =>
                          handleChange("paymentMethod", e.target.value)
                        }
                      >
                        <option value="cash">Cash</option>

                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            {summary && (
              <div className="col-12">
                <div className="card border border-success">
                  <div className="card-header bg-success-subtle">
                    <h5 className="card-title mb-0 text-success">
                      <i className="ri-file-list-3-line me-2"></i>
                      Booking Summary
                    </h5>
                  </div>

                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Room</p>

                        <h6 className="fw-semibold">
                          Room {summary.room.roomNumber}
                        </h6>
                      </div>

                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Type</p>

                        <h6 className="fw-semibold">{summary.room.type}</h6>
                      </div>

                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Guests Allowed</p>

                        <h6 className="fw-semibold">
                          {summary.room.capacity || summary.room.maxGuests || 1}
                        </h6>
                      </div>

                      <div className="col-md-3 col-6">
                        <p className="text-muted mb-1 fs-12">Nights</p>

                        <h6 className="fw-semibold">{summary.days}</h6>
                      </div>

                      <div className="col-12 border-top pt-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fs-15 text-muted">
                            Total Amount:
                          </span>

                          <span className="fs-20 fw-bold text-success">
                            PKR {summary.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-12 text-end">
              <button
                className="btn btn-light me-2"
                onClick={() => navigate("/admin/bookings")}
              >
                Cancel
              </button>

              <button
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                <i className="ri-calendar-check-line me-1"></i>

                {loading ? "Creating..." : "Create Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingNew;
