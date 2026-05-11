
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest, fallbackRooms, formatCurrency, normalizeRoom, statusClass, titleCase } from './userData';
export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    async function loadRoom() {
      try {
        const data = await apiRequest(`/rooms/${id}`);
        if (alive) setRoom(normalizeRoom(data));
      } catch (err) {
        const fallback = fallbackRooms.find((item) => item._id === id) || fallbackRooms[0];
        if (alive) {
          setRoom(normalizeRoom(fallback));
          setError('Room backend se load nahi hua, sample room detail show ho rahi hai.');
        }
      }
    }
    loadRoom();
    return () => {
      alive = false;
    };
  }, [id]);
  if (!room) {
    return <section className="user-page"><div className="user-card user-empty">Loading room details...</div></section>;
  }
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Room Details</div>
          <h1 className="user-page-title">Room {room.roomNumber}</h1>
          <p className="user-page-subtitle">{titleCase(room.type)} room with capacity for {room.capacity} guests.</p>
        </div>
        <Link className="user-btn user-btn-ghost" to="/user/rooms">
          <i className="ri-arrow-left-line"></i>
          Back to rooms
        </Link>
      </div>
      {error && <div className="user-alert error" style={{ marginBottom: 18 }}>{error}</div>}
      <div className="user-detail-layout">
        <img className="user-detail-image" src={room.image} alt={`Room ${room.roomNumber}`} />
        <aside className="user-card user-card-pad">
          <div className="user-actions" style={{ justifyContent: 'space-between' }}>
            <span className={`user-badge user-badge-${statusClass(room.status)}`}>{room.status}</span>
            <span className="user-price">
              {formatCurrency(room.price)}
              <small> / night</small>
            </span>
          </div>
          <h2 style={{ marginTop: 22 }}>{room.title}</h2>
          <p style={{ color: 'var(--user-muted)' }}>{room.description}</p>
          <div className="user-amenities">
            {room.amenities.map((amenity) => (
              <span className="user-amenity" key={amenity}>{amenity}</span>
            ))}
          </div>
          <div className="user-grid cols-2" style={{ marginTop: 22 }}>
            <div className="user-alert">
              <strong>{room.capacity}</strong>
              <div>Guest capacity</div>
            </div>
            <div className="user-alert">
              <strong>{titleCase(room.type)}</strong>
              <div>Room type</div>
            </div>
          </div>
          <div className="user-actions" style={{ marginTop: 22 }}>
            <Link className="user-btn user-btn-primary" to={`/user/booking?roomId=${room.id}`}>
              <i className="ri-calendar-check-line"></i>
              Book this room
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}




