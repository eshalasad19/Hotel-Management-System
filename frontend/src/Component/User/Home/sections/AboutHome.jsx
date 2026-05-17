import { userAsset } from '../../../../utils/userAssets';

export default function AboutHome() {
  return (
    <section className="section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInLeft">
            <p>
              <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
                About The Luxury Stay
              </span>
            </p>
            <h2 className="heading-font-family text-13 fw-600 lh-sm mb-4">
              Discover <span className="text-primary">unique holidays</span> enhanced by personalized
            </h2>
            <p className="text-5 text-body-secondary">
              Uncover a luxurious haven at Hotel The Mist, United States. Nestled in Los Ageless heart, our hotel
              offers modern elegance and warm hospitality.
            </p>
            <p className="text-body-secondary mb-4">
              Experience comfort in stylish rooms, savor culinary delights at our restaurant, and host memorable
              events in our versatile spaces. Unwind at our wellness center or explore nearby attractions easily.
              With impeccable service and a prime location, Hotel The Mist ensures a delightful.
            </p>
            <div className="d-inline-flex align-items-center gap-4">
              <a className="btn btn-new btn-primary rounded-pill" href="/about-us">
                <span className="btn-text">
                  <span>Know More</span>
                </span>
                <span className="btn-icon">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </a>
              <div className="d-flex align-items-center gap-3 ms-sm-2 h-100">
                <div className="text-body-tertiary text-7 opacity-7 d-inline-flex">
                  <i className="fa-solid fa-phone-volume" />
                </div>
                <div className="vr my-1 opacity-1" />
                <div className="text-start">
                  <div className="text-2 fw-600 text-body-tertiary mb-1">Call us for Inquiry:</div>
                  <h3 className="text-4 fw-700 mb-0">(+060) 444 5346</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center wow fadeInRight">
            <div className="position-relative d-inline-flex">
              <img className="img-fluid rounded-5" src={userAsset('images/about.jpg')} alt="About The Mist" />
              <div className="position-absolute top-0 end-0">
                <div
                  className="circle-text bg-white border border-2 border-primary mt-5 me-5 wow bounceIn"
                  data-wow-delay="0.5s"
                >
                  <svg viewBox="0 0 500 500">
                    <defs>
                      <path id="circlePath" d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" />
                    </defs>
                    <text className="text-uppercase fw-700 ls-4">
                      <textPath xlinkHref="#circlePath">Luxury Hotel ✦ Experience ✦</textPath>
                    </text>
                  </svg>
                  <div className="circle-icon text-bg-primary translate-middle">
                    <i className="fa-solid fa-bell-concierge" />
                  </div>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x w-100">
                <div className="text-light text-start bg-dark bg-opacity-50 rounded-5 m-5 p-4 wow fadeInUp">
                  A new kind of hospitality experience, crafted for business and leisure travellers alike.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
