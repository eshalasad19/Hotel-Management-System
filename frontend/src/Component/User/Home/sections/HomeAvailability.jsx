export default function HomeAvailability() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Plan Your Stay
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            Embark on <span className="text-primary">Your <br className="d-none d-md-block" />Bespoke</span> Experience
          </h2>
        </div>

        <form id="bookingHotels" method="post" onSubmit={(e) => e.preventDefault()}>
          <div className="intro-booking-form bg-light-1 rounded-pill p-4 p-lg-3 mt-4 wow fadeInUp" data-wow-delay=".4s">
            <div className="row gy-3 gx-lg-0 input-group">
              <div className="col-md-6 col-lg">
                <div className="position-relative">
                  <input id="hotelsCheckIn" type="text" className="form-control rounded-pill" required placeholder="Check In" />
                  <span className="icon-inside">
                    <i className="fa-regular fa-calendar-alt" />
                  </span>
                </div>
              </div>
              <div className="col-md-6 col-lg">
                <div className="position-relative">
                  <input id="hotelsCheckOut" type="text" className="form-control rounded-pill" required placeholder="Check Out" />
                  <span className="icon-inside">
                    <i className="fa-regular fa-calendar-alt" />
                  </span>
                </div>
              </div>
              <div className="col-md-6 col-lg">
                <select className="form-select rounded-pill h-100" id="adults" required defaultValue="">
                  <option value="">Adults</option>
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                </select>
              </div>
              <div className="col-md-6 col-lg">
                <select className="form-select rounded-pill h-100" id="child" required defaultValue="">
                  <option value="">Children</option>
                  <option>1 Child</option>
                  <option>2 Children</option>
                  <option>3 Children</option>
                  <option>4 Children</option>
                </select>
              </div>
              <div className="col-md-6 col-lg">
                <select className="form-select rounded-pill h-100" id="room" required defaultValue="">
                  <option value="">Select Room</option>
                  <option>1 Room</option>
                  <option>2 Rooms</option>
                  <option>3 Rooms</option>
                  <option>4 Rooms</option>
                  <option>5 Rooms</option>
                </select>
              </div>
              <div className="col-md-6 col-lg col-xl-auto d-grid">
                <button className="btn btn-primary text-nowrap rounded-pill" type="submit">
                  Check Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
