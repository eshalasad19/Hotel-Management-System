import { userAsset } from '../../../../utils/userAssets';


export default function ContactFormSection() {
    return (
      <div className="section pt-0">
        <div className="container">
          <div className="row g-5 mt-4">
            <div className="col-lg-6 text-center wow fadeInLeft">
              <div className="position-relative d-inline-flex">
                <img className="img-fluid rounded-5" src={userAsset('images/contact-us.jpg')} alt="Contact Us" />
               
                <div className="position-absolute top-0 end-0">
                  <div className="circle-text bg-white border border-2 border-primary mt-5 me-5 wow bounceIn" data-wow-delay="0.5s">
                    <svg viewBox="0 0 500 500">
                      <defs>
                        <path id="circlePath" d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"></path>
                      </defs>
                      <text className="text-uppercase fw-700 ls-4">
                        <textPath xlinkHref="#circlePath">Luxury Hotel ✦ Experience ✦</textPath>
                      </text>
                    </svg>
                    <div className="circle-icon text-bg-primary translate-middle">
                      <i className="fa-solid fa-bell-concierge"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-lg-6 wow fadeInRight">
              <h2 className="text-8 fw-600 mb-4">Get in <span className="text-primary">Touch</span></h2>
  
              <form id="contact-form" className="form-border" action="php/mail.php" method="post">
                <div className="mb-4">
                  <label className="form-label text-3 fw-600" htmlFor="name">Full Name*</label>
                  <input id="name" name="name" type="text" className="form-control rounded-pill" required placeholder="Your Full Name" />
                </div>
  
                <div className="mb-4">
                  <label className="form-label text-3 fw-600" htmlFor="phone">Phone*</label>
                  <input id="phone" name="phone" type="text" className="form-control rounded-pill" required placeholder="Your Phone Number" />
                </div>
  
                <div className="mb-4">
                  <label className="form-label text-3 fw-600" htmlFor="email">Email*</label>
                  <input id="email" name="email" type="email" className="form-control rounded-pill" required placeholder="Your Email" />
                </div>
  
                <div className="mb-4">
                  <label className="form-label text-3 fw-600" htmlFor="form-message">Message*</label>
                  <textarea id="form-message" name="form-message" className="form-control rounded-5" rows="5" required placeholder="Your Message"></textarea>
                </div>
  
                <div className="d-grid">
                  <button id="submit-btn" className="btn btn-new btn-primary text-nowrap rounded-pill" type="submit">
                    <span className="btn-text"><span>Send Message</span></span>
                    <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }