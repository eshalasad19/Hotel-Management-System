import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSingleRoom } from "../../../../api/roomApi";
import { useAuth } from "../../../../Context/AuthContext";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookingPage = () => {

  const { roomId } = useParams();
  const navigate = useNavigate();

  const { user, token } = useAuth();

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ TODAY
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    paymentMethod: "cash",
    specialRequests: ""
  });

  // ✅ LOGIN CHECK
  useEffect(() => {

    if (!user) {

      navigate("/user-login", {
        state: {
          from: `/booking/${roomId}`
        }
      });

    }

  }, [user, navigate, roomId]);

  // ✅ LOAD USER DATA
  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("Hoteluser")
    );

    if (storedUser) {

      setForm((prev) => ({
        ...prev,
        guestName: storedUser.name || "",
        guestEmail: storedUser.email || "",
        guestPhone: storedUser.phone || "",
      }));

    }

  }, []);

  // ✅ FETCH ROOM
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

  // ✅ CREATE BOOKING
  const createBooking = async (bookingData) => {

    const BASE_URL = "http://localhost:5001/api";

    const response = await axios.post(
      `${BASE_URL}/bookings`,
      bookingData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  // ✅ HANDLE CHANGE
 // ✅ HANDLE CHANGE
const handleChange = (e) => {

  const { name, value } = e.target;

  // ✅ CHECK-IN VALIDATION
  if (name === "checkInDate") {

    if (
      form.checkOutDate &&
      value > form.checkOutDate
    ) {

      setForm({
        ...form,
        checkInDate: value,
        checkOutDate: "",
      });

      return;
    }
  }

  // ✅ GUEST LIMIT VALIDATION
  if (name === "guests") {

    let maxGuests = 1;

    // room type ke hisaab se limit
    if (room?.type?.toLowerCase() === "single") {
      maxGuests = 1;
    }

    else if (room?.type?.toLowerCase() === "double") {
      maxGuests = 2;
    }

    else if (room?.type?.toLowerCase() === "deluxe") {
      maxGuests = 3;
    }

    else if (room?.type?.toLowerCase() === "suite") {
      maxGuests = 4;
    }

    // limit exceed na ho
    if (Number(value) > maxGuests) {

      toast.error(
        `${room.type} room allows maximum ${maxGuests} guest(s)`
      );

      return;
    }
  }

  setForm({
    ...form,
    [name]: value
  });
};

  // ✅ TOTAL NIGHTS
  const getNights = () => {

    if (
      !form.checkInDate ||
      !form.checkOutDate
    ) return 0;

    const inDate = new Date(form.checkInDate);

    const outDate = new Date(form.checkOutDate);

    const diff =
      (outDate - inDate) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  };

  const totalAmount =
    getNights() * (room?.price || 0);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await createBooking({
        roomId,
        ...form,
        totalAmount,
      });

      toast.success("Booking Successful!");

      setTimeout(() => {
        navigate("/room");
      }, 1500);

    } catch (err) {

      console.log("Booking error:", err);

      alert("Booking Failed");

    } finally {

      setLoading(false);

    }
  };

  if (!user) return null;

  if (fetching) {
    return (
      <div className="text-center py-5">
        <h3>Loading room details...</h3>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-5">
        <h3>Room not found</h3>
      </div>
    );
  }

  return (

    <section
      className="py-5"
      style={{
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      <div className="container">
<ToastContainer/>
        {/* PAGE TITLE */}
        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Complete Your Booking
          </h1>

          <p className="text-muted">
            Fill your details and confirm your stay
          </p>

        </div>

        <div className="row g-4 align-items-start">

          {/* ================= FORM ================= */}
          <div className="col-lg-7">

            <div
              className="bg-white shadow-sm rounded-4 p-4 p-lg-5"
            >

              <h3 className="fw-bold mb-4">
                Guest Information
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="row g-4">

                  {/* NAME */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="guestName"
                      className="form-control form-control-lg"
                      placeholder="Enter full name"
                      value={form.guestName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* PHONE */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="guestPhone"
                      className="form-control form-control-lg"
                      placeholder="Enter phone number"
                      value={form.guestPhone}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* EMAIL */}
                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="guestEmail"
                      className="form-control form-control-lg"
                      placeholder="Enter email address"
                      value={form.guestEmail}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* CHECK IN */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Check In
                    </label>

                    <input
                      type="date"
                      name="checkInDate"
                      className="form-control form-control-lg"
                      min={today}
                      value={form.checkInDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* CHECK OUT */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Check Out
                    </label>

                    <input
                      type="date"
                      name="checkOutDate"
                      className="form-control form-control-lg"
                      min={
                        form.checkInDate || today
                      }
                      value={form.checkOutDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* GUESTS */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Guests
                    </label>

                    <input
                      type="number"
                      name="guests"
                      className="form-control form-control-lg"
                      min="1"
                      value={form.guests}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* PAYMENT */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Payment Method
                    </label>

                    <select
                      name="paymentMethod"
                      className="form-select form-select-lg"
                      value={form.paymentMethod}
                      onChange={handleChange}
                    >

                      <option value="cash">
                        Cash Payment
                      </option>

                      <option value="online">
                        Online Payment
                      </option>

                    </select>

                  </div>

                  {/* REQUESTS */}
                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Special Requests
                    </label>

                    <textarea
                      rows="5"
                      name="specialRequests"
                      className="form-control"
                      placeholder="Write any special requests..."
                      value={form.specialRequests}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="d-flex gap-3 mt-5">

                  <button
                    type="button"
                    className="btn btn-light border px-4 py-3 rounded-pill"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-3 rounded-pill"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : "Confirm Booking"}
                  </button>

                </div>

              </form>

            </div>

          </div>

          {/* ================= ROOM CARD ================= */}
          {/* ================= ROOM CARD ================= */}
<div className="col-lg-5">

<div
  className="bg-white shadow-sm rounded-4 overflow-hidden position-sticky"
  style={{ top: "100px" }}
>

  {/* IMAGE */}
  <div className="position-relative">

    <img
      src={
        room?.images?.[0]
          ? `http://localhost:5001/Uploads/${room.images[0]}`
          : "https://via.placeholder.com/700x450"
      }
      alt={room.type}
      className="w-100"
      style={{
        height: "280px",
        objectFit: "cover"
      }}
    />

    {/* PRICE TAG */}
    <div
      className="position-absolute top-0 end-0 bg-primary text-white px-3 py-2 m-3 rounded-pill fw-semibold"
    >
      Rs {room.price} / Night
    </div>

    {/* ✅ ROOM NAME OVER IMAGE */}
    <div
      className="position-absolute bottom-0 start-0 w-100 p-3"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
      }}
    >
      <h2 className="text-white fw-bold mb-0">
        {room.title}
      </h2>
    </div>

  </div>

  {/* CONTENT */}
  <div className="p-4">

    {/* ✅ ROOM NAME AGAIN */}
    <div className="mb-3">

      <span className="badge bg-primary mb-2">
        Selected Room
      </span>

      <h3 className="fw-bold">
        {room.type}
      </h3>

    </div>

    <p className="text-muted mb-4">
      {room.description}
    </p>

    {/* DETAILS */}
    <div className="border rounded-4 p-3 bg-light">

      <div className="d-flex justify-content-between mb-3">

        <span className="text-muted">
          Room Name
        </span>

        <strong>
          {room.title}
        </strong>

      </div>

      <div className="d-flex justify-content-between mb-3">

        <span className="text-muted">
          Nights
        </span>

        <strong>
          {getNights()}
        </strong>

      </div>

      <div className="d-flex justify-content-between mb-3">

        <span className="text-muted">
          Guests
        </span>

        <strong>
          {form.guests}
        </strong>

      </div>

      <div className="d-flex justify-content-between mb-3">

        <span className="text-muted">
          Price Per Night
        </span>

        <strong>
          Rs {room.price}
        </strong>

      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center">

        <h5 className="mb-0 fw-bold">
          Total Amount
        </h5>

        <h3 className="text-primary fw-bold mb-0">
          Rs {totalAmount}
        </h3>

      </div>

    </div>

  </div>

</div>

</div>
        </div>

      </div>

    </section>
  );
};

export default BookingPage