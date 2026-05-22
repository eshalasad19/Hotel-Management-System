import { userAsset } from '../../../../utils/userAssets';

export default function Intro() {
  return (
    <section className="hero-wrap">
      <div className="hero-mask bg-dark opacity-6"></div>
      <div
        className="hero-bg"
        style={{ backgroundImage: `url('${userAsset('images/slider/slide-3.jpg')}')` }}
      />
      <div className="hero-content section pb-0 d-flex flex-column min-vh-100">
        <div className="container my-auto py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 col-xl-7 text-center text-lg-start wow fadeInLeft">
              <p className="mb-4">
                <span className="text-3 text-light text-uppercase fw-600 rounded-pill border border-light border-opacity-25 px-3 py-1">
                  Luxury Hotel Experience
                </span>
              </p>
              <h2 className="text-17 text-white fw-600 lh-sm mb-4">
                Make Your Plan, <br className="d-none d-xl-block" />
                Enjoy Your Trip
              </h2>
              <div className="row align-items-center justify-content-center justify-content-lg-start gap-3 pt-3">
                <div className="col-sm-auto">
                  <div className="bg-black rounded-4 p-3 d-inline-flex align-items-center gap-3">
                    <div className="text-primary text-7 d-inline-flex">
                      <i className="fa-solid fa-phone-volume" />
                    </div>
                    <div className="vr my-1 bg-white" />
                    <div className="text-start">
                      <div className="text-2 fw-600 text-light text-opacity-75 mb-1">Call us for Inquiry:</div>
                      <h3 className="text-4 text-white fw-700 mb-0">(+060) 444 5346</h3>
                    </div>
                  </div>
                </div>
                <div className="col-sm-auto">
                  <a
                    className="fw-500 link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-0-hover"
                    href="/rooms"
                  >
                    Rooms & Suites
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-5 wow fadeInRight">
              <div className="bg-black bg-opacity-75 rounded-5 p-4">
                <div className="m-3">
                  <h3 className="text-8 fw-600 text-white text-center mb-4">
                    Book Your <span className="text-primary">Stay</span>
                  </h3>
                  <form id="searchHotels" className="form-dark" method="post" onSubmit={(e) => e.preventDefault()}>
                    <div className="row gy-3 gx-3">
                      <div className="col-12">
                        <label className="form-label text-3 fw-600" htmlFor="searchCheckIn">
                          Check In:
                        </label>
                        <div className="position-relative">
                          <input
                            id="searchCheckIn"
                            type="text"
                            className="form-control rounded-pill"
                            required
                            placeholder="Check In"
                          />
                          <span className="icon-inside">
                            <i className="fa-regular fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label text-3 fw-600" htmlFor="searchCheckOut">
                          Check Out:
                        </label>
                        <div className="position-relative">
                          <input
                            id="searchCheckOut"
                            type="text"
                            className="form-control rounded-pill"
                            required
                            placeholder="Check Out"
                          />
                          <span className="icon-inside">
                            <i className="fa-regular fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg">
                        <label className="form-label text-3 fw-600" htmlFor="searchAdults">
                          Adults:
                        </label>
                        <select id="searchAdults" className="form-select rounded-pill h-100" required defaultValue="">
                          <option value="">Adults</option>
                          <option>1 Adult</option>
                          <option>2 Adults</option>
                          <option>3 Adults</option>
                          <option>4 Adults</option>
                        </select>
                      </div>
                      <div className="col-md-6 col-lg">
                        <label className="form-label text-3 fw-600" htmlFor="searchChild">
                          Children:
                        </label>
                        <select id="searchChild" className="form-select rounded-pill h-100" required defaultValue="">
                          <option value="">Children</option>
                          <option>1 Child</option>
                          <option>2 Children</option>
                          <option>3 Children</option>
                          <option>4 Children</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label text-3 fw-600" htmlFor="searchRoom">
                          Select Room:
                        </label>
                        <select id="searchRoom" className="form-select rounded-pill h-100" required defaultValue="">
                          <option value="">Select Room</option>
                          <option>1 Room</option>
                          <option>2 Rooms</option>
                          <option>3 Rooms</option>
                          <option>4 Rooms</option>
                          <option>5 Rooms</option>
                        </select>
                      </div>
                      <div className="col-12 d-grid pt-1">
                        <button className="btn btn-new btn-primary text-nowrap rounded-pill" type="submit">
                          <span className="btn-text">
                            <span>Check Availability</span>
                          </span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
