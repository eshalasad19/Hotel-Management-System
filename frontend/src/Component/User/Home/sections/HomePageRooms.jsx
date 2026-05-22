import { userAsset } from '../../../../utils/userAssets';
import { rooms } from './roomsData';
import { Link } from 'react-router-dom'; // ✅ ADD THIS

function RoomFeatures({ bed, guests, size, tv }) {
  const items = [
    { icon: 'fa-bed', label: bed },
    { icon: 'fa-users', label: guests },
    { icon: 'fa-expand', label: size },
    { icon: 'fa-wifi', label: 'Free WiFi' },
    { icon: 'fa-tv', label: tv },
    { icon: 'fa-water-ladder', label: 'Swimming Pool' },
  ];

  return (
    <div className="row g-2 text-3 text-body-secondary mb-3">
      {items.map((item) => (
        <div key={item.label} className="col-6 col-xl-4 d-flex align-items-center">
          <span className="text-primary text-5 me-2">
            <i className={`fa-solid ${item.icon}`} />
          </span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default function HomePageRooms() {
  return (
    <section className="section bg-light-1">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Rooms & Suites
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            Revel in the <span className="text-primary">Unmatched<br className="d-none d-md-block" /> Comfort</span> with
            The Mist
          </h2>
        </div>

        <div className="swiper room-items-wrap wow fadeInUp">
          <div className="swiper-wrapper">
            {rooms.map((room) => (
              <div key={room.title} className="swiper-slide">
                <div className="room-item bg-white rounded-5">
                  <div className="row g-0">

                    {/* IMAGE CLICK */}
                    <div className="col-lg-6">
                      <div className="room-item-img rounded-5">
                        <Link to={`/roomsdetails/${room._id || room.id}`}> {/* ✅ FIX */}
                          <img 
                            className="img-fluid d-block" 
                            src={userAsset(room.image)} 
                            alt={room.title || room.name} 
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150'; 
                            }}
                          />
                        </Link>

                        {room.badge && (
                          <div className="position-absolute top-0 start-0 ms-4 mt-4 px-3 py-1 text-3 fw-500 text-bg-primary rounded-pill">
                            {room.badge}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="col-lg-6 align-content-center">
                      <div className="p-4 m-2">
                        <div className="room-discount d-inline-flex text-2 fw-500 rounded-pill border border-dark border-opacity-10 ms-0 mt-0 mb-2">
                          <span className="text-primary me-1">
                            <i className="fa-solid fa-tag" />
                          </span>
                          {room.discount}
                        </div>

                        <h3 className="text-8 fw-600">{room.title}</h3>
                        <p className="text-3 text-body-secondary">{room.description}</p>

                        <RoomFeatures
                          bed={room.bed}
                          guests={room.guests}
                          size={room.size}
                          tv={room.tv}
                        />

                        <hr className="opacity-1" />

                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="text-7 fw-600 d-flex align-items-center gap-1">
                            {room.price}{' '}
                            <span className="text-3 fw-500 text-body-tertiary text-uppercase">
                              / Per Night
                            </span>
                          </div>

                          {/* BUTTON CLICK */}
                          <Link
                            className="btn btn-new btn-primary rounded-pill"
                            to={`/roomsdetails/${room._id || room.id}`} // ✅ FIX
                          >
                            <span className="btn-text">
                              <span>Details</span>
                            </span>
                            <span className="btn-icon">
                              <i className="fa-solid fa-arrow-right" />
                            </span>
                          </Link>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-button-next mt-n5">
            <i className="fa-solid fa-angle-right" />
          </div>
          <div className="swiper-button-prev mt-n5">
            <i className="fa-solid fa-angle-left" />
          </div>
          <div className="swiper-pagination position-relative mt-4" />
        </div>

        {/* VIEW ALL */}
        <div className="position-relative text-center z-1 mt-5 wow fadeInUp">
          <Link className="btn btn-new btn-outline-primary rounded-pill" to="/rooms"> {/* optional fix */}
            <span className="btn-text">
              <span>View all Rooms</span>
            </span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-right" />
            </span>
          </Link>
        </div>

        <div className="text-30 text-body-tertiary fw-700 opacity-1 text-center text-nowrap position-absolute bottom-0 start-50 translate-middle-x z-0 lh-1 mb-n2 mb-sm-n3 mb-lg-n4 mb-xl-n5">
          The Luxury Stay
        </div>
      </div>
    </section>
  );
}