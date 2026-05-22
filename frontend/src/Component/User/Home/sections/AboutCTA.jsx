export default function AboutCTA() {
    return (
      <section className="call-to-action bg-primary section">
        <div className="container text-center">
          <h2 className="text-14 fw-600 text-white lh-sm wow fadeInUp mb-3">
            The Most Memorable <span className="text-black">Rest <br className="d-none d-md-block" />Time</span> Starts at The Mist
          </h2>
          <div className="wow fadeInUp" data-wow-delay=".2s">
            <a className="btn btn-new btn-dark rounded-pill" href="/contact-us">
              <span className="btn-text"><span>Contact Us</span></span>
              <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
            </a>
          </div>
        </div>
      </section>
    );
  }