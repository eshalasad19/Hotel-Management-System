import { userAsset } from '../../../../utils/userAssets';
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