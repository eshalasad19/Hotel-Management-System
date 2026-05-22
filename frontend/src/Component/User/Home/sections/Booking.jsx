import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSingleRoom } from "../../../../api/roomApi";

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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

  // 🔥 INLINE CREATE BOOKING FUNCTION
  const createBooking = async (bookingData) => {
    const BASE_URL = "http://localhost:5001/api";

    const response = await axios.post(`${BASE_URL}/bookings`, bookingData, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`, // uncomment if JWT
      },
    });

    return response.data;
  };

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getNights = () => {
    if (!form.checkInDate || !form.checkOutDate) return 0;

    const inDate = new Date(form.checkInDate);
    const outDate = new Date(form.checkOutDate);

    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalAmount = getNights() * (room?.price || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBooking({
        roomId,
        ...form,
        totalAmount,
      });

      alert("Booking Successful!");
      navigate("/rooms");
    } catch (err) {
      console.log("Booking error:", err);
      alert("Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <h3>Loading room details...</h3>;
  if (!room) return <h3>Room not found</h3>;

  return (
    <div className="container py-5">

      <h2>Book Room: {room.title}</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        <div className="row g-3">

          <div className="col-md-6">
            <input name="guestName" className="form-control" placeholder="Name" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <input name="guestPhone" className="form-control" placeholder="Phone" onChange={handleChange} required />
          </div>

          <div className="col-md-12">
            <input name="guestEmail" className="form-control" placeholder="Email" type="email" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label>Check In</label>
            <input type="date" name="checkInDate" className="form-control" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label>Check Out</label>
            <input type="date" name="checkOutDate" className="form-control" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <input type="number" name="guests" className="form-control" min="1" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <select name="paymentMethod" className="form-control" onChange={handleChange}>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>

          <div className="col-md-12">
            <textarea name="specialRequests" className="form-control" placeholder="Special Requests" onChange={handleChange} />
          </div>

        </div>

        <div className="mt-3">
          <h5>Total: ${totalAmount}</h5>
          <small>{getNights()} nights × ${room?.price || 0}</small>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default BookingPage;