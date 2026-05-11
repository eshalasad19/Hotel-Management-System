
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiRequest, fallbackRooms, formatCurrency, getNights, normalizeRoom, titleCase } from './userData';
const today = new Date().toISOString().slice(0, 10);
function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}
export default function Booking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomId: params.get('roomId') || '',
    checkInDate: today,
    checkOutDate: tomorrow(),
    guests: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    async function loadRooms() {
      try {
        const data = await apiRequest('/rooms');
        const normalized = (data || []).map(normalizeRoom);
        if (alive) {
          setRooms(normalized);
          if (!form.roomId && normalized[0]) {
            setForm((current) => ({ ...current, roomId: normalized[0].id }));
          }
        }
      } catch (err) {
        const normalized = fallbackRooms.map(normalizeRoom);
        if (alive) {
          setRooms(normalized);
          setError('Backend rooms load nahi ho rahe. Booking submit karne ke liye backend running hona chahiye.');
          if (!form.roomId && normalized[0]) {
            setForm((current) => ({ ...current, roomId: normalized[0].id }));
          }
        }
      }
    }
    loadRooms();
    return () => {
      alive = false;
    };
  }, []);
  const selectedRoom = useMemo(() => rooms.find((room) => room.id === form.roomId), [rooms, form.roomId]);
  const nights = getNights(form.checkInDate, form.checkOutDate);
  const totalAmount = Number(selectedRoom?.price || 0) * nights;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          roomId: form.roomId,
          checkInDate: form.checkInDate,
          checkOutDate: form.checkOutDate,
          guests: Number(form.guests),
          specialRequests: form.specialRequests,
          totalAmount,
          bookingStatus: 'confirmed'
        })
      });
      setMessage('Booking created successfully.');
      setTimeout(() => navigate('/user/my-bookings'), 700);
    } catch (err) {
      setError(err.message || 'Booking create nahi hui.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Booking</div>
          <h1 className="user-page-title">Reserve your room</h1>
          <p className="user-page-subtitle">Select a room, dates, guest count, and send the booking to your backend.</p>
        </div>
        <Link className="user-btn user-btn-ghost" to="/user/rooms">
          View rooms
        </Link>
      </div>
      <div className="user-detail-layout">
        <form className="user-card user-card-pad user-form" onSubmit={handleSubmit}>
          {error && <div className="user-alert error">{error}</div>}
          {message && <div className="user-alert success">{message}</div>}
          <div className="user-field">
            <label htmlFor="roomId">Room</label>
            <select id="roomId" name="roomId" value={form.roomId} onChange={handleChange} required>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.roomNumber} - {titleCase(room.type)} - {formatCurrency(room.price)}
                </option>
              ))}
            </select>
          </div>
          <div className="user-form-grid">
            <div className="user-field">
              <label htmlFor="checkInDate">Check in</label>
              <input id="checkInDate" name="checkInDate" type="date" value={form.checkInDate} min={today} onChange={handleChange} required />
            </div>
            <div className="user-field">
              <label htmlFor="checkOutDate">Check out</label>
              <input id="checkOutDate" name="checkOutDate" type="date" value={form.checkOutDate} min={form.checkInDate || today} onChange={handleChange} required />
            </div>
          </div>
          <div className="user-field">
            <label htmlFor="guests">Guests</label>
            <input id="guests" name="guests" type="number" min="1" max={selectedRoom?.capacity || 6} value={form.guests} onChange={handleChange} required />
          </div>
          <div className="user-field">
            <label htmlFor="specialRequests">Special requests</label>
            <textarea id="specialRequests" name="specialRequests" value={form.specialRequests} onChange={handleChange} placeholder="Late check-in, breakfast preference, accessibility notes" />
          </div>
          <button className="user-btn user-btn-primary" type="submit" disabled={loading || !selectedRoom}>
            <i className="ri-calendar-check-line"></i>
            {loading ? 'Creating booking...' : 'Confirm booking'}
          </button>
        </form>
        <aside className="user-card">
          {selectedRoom ? (
            <>
              <img className="user-room-image" src={selectedRoom.image} alt={`Room ${selectedRoom.roomNumber}`} />
              <div className="user-card-pad">
                <h2>Room {selectedRoom.roomNumber}</h2>
                <p style={{ color: 'var(--user-muted)' }}>{selectedRoom.description}</p>
                <div className="user-table-wrap">
                  <table className="user-table" style={{ minWidth: 0 }}>
                    <tbody>
                      <tr><th>Rate</th><td>{formatCurrency(selectedRoom.price)}</td></tr>
                      <tr><th>Nights</th><td>{nights}</td></tr>
                      <tr><th>Guests</th><td>{form.guests}</td></tr>
                      <tr><th>Total</th><td><strong>{formatCurrency(totalAmount)}</strong></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="user-empty">Rooms loading...</div>
          )}
        </aside>
      </div>
    </section>
  );
}

