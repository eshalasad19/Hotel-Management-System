
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, fallbackRooms, formatCurrency, normalizeRoom, statusClass, titleCase } from './userData';
export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    async function loadRooms() {
      try {
        const data = await apiRequest('/rooms');
        if (alive) setRooms((data || []).map(normalizeRoom));
      } catch (err) {
        if (alive) {
          setRooms(fallbackRooms.map(normalizeRoom));
          setError('Backend rooms load nahi ho rahe, sample rooms show ho rahe hain.');
        }
      }
    }
    loadRooms();
    return () => {
      alive = false;
    };
  }, []);
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch = `${room.roomNumber} ${room.title} ${room.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === 'all' || room.type === type;
      const matchesStatus = status === 'all' || room.status === status;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [rooms, search, type, status]);
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Rooms</div>
          <h1 className="user-page-title">Choose a room for your next stay</h1>
          <p className="user-page-subtitle">Browse live room availability with Themist-style visuals and booking actions connected to your backend.</p>
        </div>
        <Link className="user-btn user-btn-primary" to="/user/booking">
          <i className="ri-add-line"></i>
          Book now
        </Link>
      </div>
      {error && <div className="user-alert error" style={{ marginBottom: 18 }}>{error}</div>}
      <div className="user-filterbar">
        <div className="user-field">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search room number, type, or amenity" />
        </div>
        <div className="user-field">
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">All types</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <div className="user-field">
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>
      {filteredRooms.length === 0 ? (
        <div className="user-card user-empty">No rooms matched your filters.</div>
      ) : (
        <div className="user-grid cols-3">
          {filteredRooms.map((room) => (
            <article className="user-card user-room-card" key={room.id}>
              <img className="user-room-image" src={room.image} alt={`${room.title} ${room.roomNumber}`} />
              <div className="user-room-body">
                <div className="user-actions" style={{ justifyContent: 'space-between' }}>
                  <span className={`user-badge user-badge-${statusClass(room.status)}`}>{room.status}</span>
                  <span className="user-price">
                    {formatCurrency(room.price)}
                    <small> / night</small>
                  </span>
                </div>
                <h2>Room {room.roomNumber}</h2>
                <p style={{ color: 'var(--user-muted)' }}>{titleCase(room.type)} room for up to {room.capacity} guests.</p>
                <div className="user-room-meta">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity}><i className="ri-checkbox-circle-line"></i> {amenity}</span>
                  ))}
                </div>
                <div className="user-actions">
                  <Link className="user-btn user-btn-ghost" to={`/user/room/${room.id}`}>
                    Details
                  </Link>
                  <Link className="user-btn user-btn-primary" to={`/user/booking?roomId=${room.id}`}>
                    Book
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}