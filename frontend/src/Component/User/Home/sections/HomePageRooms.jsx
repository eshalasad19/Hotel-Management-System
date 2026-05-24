import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../../../../api/roomApi';

const BASE_URL = 'http://localhost:5001';

const getImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith('http')) return img;
  if (img.startsWith('uploads/')) return `${BASE_URL}/${img}`;
  return `${BASE_URL}/uploads/${img}`;
};

const getAmenityIcon = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('wifi') || n.includes('internet')) return 'fa-wifi';
  if (n.includes('tv') || n.includes('television')) return 'fa-tv';
  if (n.includes('pool') || n.includes('swimming'))  return 'fa-water-ladder';
  if (n.includes('gym') || n.includes('fitness'))    return 'fa-dumbbell';
  if (n.includes('spa') || n.includes('massage'))    return 'fa-spa';
  if (n.includes('breakfast') || n.includes('meal')) return 'fa-utensils';
  if (n.includes('parking'))                         return 'fa-square-parking';
  if (n.includes('air') || n.includes('ac'))         return 'fa-wind';
  if (n.includes('bath') || n.includes('tub'))       return 'fa-bath';
  if (n.includes('balcony') || n.includes('terrace'))return 'fa-archway';
  return 'fa-circle-check';
};

const UNAVAILABLE = ['booked', 'occupied', 'reserved', 'maintenance', 'cleaning'];

const STATUS_CONFIG = {
  booked:      { label: 'Already Booked',     color: '#e74c3c', bg: 'rgba(231,76,60,0.1)',   border: 'rgba(231,76,60,0.25)' },
  occupied:    { label: 'Currently Occupied', color: '#e67e22', bg: 'rgba(230,126,34,0.1)',  border: 'rgba(230,126,34,0.25)' },
  reserved:    { label: 'Reserved',           color: '#9b59b6', bg: 'rgba(155,89,182,0.1)',  border: 'rgba(155,89,182,0.25)' },
  maintenance: { label: 'Under Maintenance',  color: '#95a5a6', bg: 'rgba(149,165,166,0.1)', border: 'rgba(149,165,166,0.25)' },
  cleaning:    { label: 'Being Cleaned',      color: '#3498db', bg: 'rgba(52,152,219,0.1)',  border: 'rgba(52,152,219,0.25)' },
};

export default function HomePageRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getRooms()
      .then(data => {
        const list = Array.isArray(data) ? data : data.rooms || [];
        setRooms(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="section bg-light-1">
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    </section>
  );

  const activeRoom = rooms[activeIndex];
  if (!activeRoom) return null;

  const isUnavailable = UNAVAILABLE.includes(activeRoom.status?.toLowerCase());
  const statusCfg = STATUS_CONFIG[activeRoom.status?.toLowerCase()];
  const imageUrl = getImageUrl(activeRoom.images?.[0]);

  return (
    <section className="section bg-light-1">
      <div className="container">

        {/* Heading */}
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Rooms & Suites
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            Revel in the{' '}
            <span className="text-primary">
              Unmatched<br className="d-none d-md-block" /> Comfort
            </span>{' '}
            with The Mist
          </h2>
        </div>

        {/* Room Card */}
        <div
          className="bg-white rounded-5 overflow-hidden wow fadeInUp"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
        >
          <div className="row g-0">

            {/* Image */}
            <div className="col-lg-6 position-relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={activeRoom.title}
                  style={{
                    width: '100%', height: '100%', minHeight: 320,
                    objectFit: 'cover', display: 'block',
                    filter: isUnavailable ? 'grayscale(30%) brightness(0.85)' : 'none',
                    transition: 'filter 0.3s',
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ minHeight: 320, height: '100%' }}
                >
                  <i className="fa-solid fa-image fa-3x text-muted opacity-25" />
                </div>
              )}

              {/* Status badge on image */}
              {isUnavailable && statusCfg && (
                <div
                  className="position-absolute top-0 start-0 ms-3 mt-3 px-3 py-1 rounded-pill d-flex align-items-center gap-2"
                  style={{
                    background: statusCfg.bg,
                    border: `1px solid ${statusCfg.border}`,
                    color: statusCfg.color,
                    fontSize: 11, fontWeight: 600,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <span
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: statusCfg.color, display: 'inline-block',
                    }}
                  />
                  {statusCfg.label}
                </div>
              )}

              {/* Tag badge */}
              {!isUnavailable && activeRoom.tag && (
                <div className="position-absolute top-0 start-0 ms-3 mt-3 px-3 py-1 text-3 fw-500 text-bg-primary rounded-pill">
                  {activeRoom.tag}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="col-lg-6 p-4 p-xl-5 d-flex flex-column justify-content-center">

              {/* Subtitle / discount */}
              {activeRoom.subtitle && (
                <div className="mb-2">
                  <span className="d-inline-flex align-items-center gap-1 text-2 fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
                    <i className="fa-solid fa-tag text-primary" style={{ fontSize: 11 }} />
                    {activeRoom.subtitle}
                  </span>
                </div>
              )}

              <h3 className="text-8 fw-600 mb-2">{activeRoom.title}</h3>
              <p className="text-3 text-body-secondary mb-3">{activeRoom.description}</p>

              {/* Features grid */}
              <div className="row g-2 text-3 text-body-secondary mb-3">
                {activeRoom.bedType && (
                  <div className="col-6 col-xl-4 d-flex align-items-center">
                    <span className="text-primary text-5 me-2"><i className="fa-solid fa-bed" /></span>
                    {activeRoom.bedType}
                  </div>
                )}
                {activeRoom.persons && (
                  <div className="col-6 col-xl-4 d-flex align-items-center">
                    <span className="text-primary text-5 me-2"><i className="fa-solid fa-users" /></span>
                    {activeRoom.persons} Persons
                  </div>
                )}
                {activeRoom.area && (
                  <div className="col-6 col-xl-4 d-flex align-items-center">
                    <span className="text-primary text-5 me-2"><i className="fa-solid fa-expand" /></span>
                    {activeRoom.area}
                  </div>
                )}
                {activeRoom.amenities?.slice(0, 3).map((item, i) => (
                  <div key={i} className="col-6 col-xl-4 d-flex align-items-center">
                    <span className="text-primary text-5 me-2">
                      <i className={`fa-solid ${getAmenityIcon(item)}`} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <hr className="opacity-1" />

              {/* Price + Button */}
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-7 fw-600 d-flex align-items-baseline gap-1">
                  Rs {activeRoom.price}
                  <span className="text-3 fw-500 text-body-tertiary text-uppercase">/ Per Night</span>
                </div>
                {isUnavailable ? (
                  <span
                    className="btn rounded-pill px-4 py-2 text-3 fw-600"
                    style={{
                      background: statusCfg?.bg,
                      color: statusCfg?.color,
                      border: `1px solid ${statusCfg?.border}`,
                      cursor: 'not-allowed',
                    }}
                  >
                    <i className="fa-solid fa-lock me-2" style={{ fontSize: 11 }} />
                    {statusCfg?.label}
                  </span>
                ) : (
                  <Link
                    className="btn btn-new btn-primary rounded-pill"
                    to={`/rooms`}
                  >
                    <span className="btn-text"><span>Details</span></span>
                    <span className="btn-icon"><i className="fa-solid fa-arrow-right" /></span>
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Dots Navigation */}
        {rooms.length > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
            {rooms.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? 24 : 10,
                  height: 10,
                  borderRadius: 20,
                  border: 'none',
                  background: i === activeIndex ? '#c9a96e' : '#ddd',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-4 wow fadeInUp">
          <Link className="btn btn-new btn-outline-primary rounded-pill" to="/room">
            <span className="btn-text"><span>View All Rooms</span></span>
            <span className="btn-icon"><i className="fa-solid fa-arrow-right" /></span>
          </Link>
        </div>

      </div>
    </section>
  );
}