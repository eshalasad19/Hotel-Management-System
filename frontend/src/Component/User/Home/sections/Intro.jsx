import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAsset } from '../../../../utils/userAssets';
import { getRooms } from '../../../../api/roomApi';

const UNAVAILABLE = ['booked', 'occupied', 'reserved', 'maintenance', 'cleaning'];

const STATUS_EMOJI = {
  booked:      '🔴',
  occupied:    '🟠',
  reserved:    '🟣',
  maintenance: '⚫',
  cleaning:    '🔵',
};

const getStatusLabel = (status) => {
  const labels = {
    booked:      'Already Booked',
    occupied:    'Occupied',
    reserved:    'Reserved',
    maintenance: 'Maintenance',
    cleaning:    'Being Cleaned',
  };
  return labels[status?.toLowerCase()] || null;
};

export default function Intro() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    getRooms()
      .then(data => setRooms(Array.isArray(data) ? data : data.rooms || []))
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) { navigate('/UserLogin'); return; }
    if (selectedRoom) {
      navigate(`/booking/${selectedRoom}`);
    } else {
      navigate('/room');
    }
  };

  return (
    <section className="hero-wrap">
      <div className="hero-mask bg-dark opacity-6"></div>
      <div
        className="hero-bg"
        style={{ backgroundImage: `url('${userAsset('images/slider/slide-1.jpg')}')` }}
      />
      <div className="hero-content section pb-0 d-flex flex-column min-vh-100">
        <div className="container my-auto py-5 text-center">

          <p className="text-3 text-light text-uppercase fw-600 ls-2 wow fadeInUp">
            <span className="rounded-pill border border-white border-opacity-50 px-3 py-1">
              Luxury Hotel Experience
            </span>
          </p>

          <h1
            className="heading-font-family text-19 fw-700 text-white wow fadeInUp"
            data-wow-delay=".2s"
          >
            A Divine Experience<br />The Mist Lifestyle
          </h1>

          {/* <form onSubmit={handleSubmit}>
            <div
              className="intro-booking-form bg-black bg-opacity-75 rounded-pill p-4 p-lg-3 mt-4 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="row gy-3 gx-lg-0 input-group">

                {/* Check In */}
                {/* <div className="col-md-6 col-lg">
                  <div className="position-relative">
                    <input
                      id="hotelsCheckIn"
                      type="text"
                      className="form-control rounded-pill"
                      required
                      placeholder="Check In"
                      value={checkIn}
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                    <span className="icon-inside">
                      <i className="fa-regular fa-calendar-alt" />
                    </span>
                  </div>
                </div> */}

                {/* Check Out */}
                {/* <div className="col-md-6 col-lg">
                  <div className="position-relative">
                    <input
                      id="hotelsCheckOut"
                      type="text"
                      className="form-control rounded-pill"
                      required
                      placeholder="Check Out"
                      value={checkOut}
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                    <span className="icon-inside">
                      <i className="fa-regular fa-calendar-alt" />
                    </span>
                  </div>
                </div> */}

                {/* Room Select */}
                {/* <div className="col-md-6 col-lg">
                  <select
                    className="form-select rounded-pill h-100"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  >
                    <option value="">🛏️ Select Room</option>
                    {rooms.map((room) => {
                      const isUnavailable = UNAVAILABLE.includes(room.status?.toLowerCase());
                      const statusLabel = getStatusLabel(room.status);
                      const emoji = STATUS_EMOJI[room.status?.toLowerCase()] || '🟢';
                      return (
                        <option
                          key={room._id}
                          value={room._id}
                          disabled={isUnavailable}
                        >
                          {emoji} {room.title || room.type}
                          {isUnavailable && statusLabel
                            ? ` — ${statusLabel}`
                            : ` — Rs ${room.price}/night`
                          }
                        </option>
                      );
                    })}
                  </select>
                </div> */}

                {/* Submit */}
                {/* <div className="col-md-6 col-lg col-xl-auto d-grid">
                  <button
                    className="btn btn-primary text-nowrap rounded-pill"
                    type="submit"
                  >
                    Check Now
                  </button>
                </div>

              </div>
            </div>
          </form> */} 

        </div>
      </div>
    </section>
  );
}