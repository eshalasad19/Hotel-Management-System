import React from 'react'
import { userAsset } from '../../../utils/userAssets'

export default function Footer() {
  return (
    <footer id="footer" className="footer-dark">
      <div className="hero-wrap section pb-0">
        <div className="hero-mask opacity-9 bg-black"></div>
        <div
          className="hero-bg hero-bg-scroll"
          style={{ backgroundImage: `url('${userAsset('images/footer-bg.jpg')}')` }}
        ></div>
        <div className="hero-content">
          <div className="container">
            <div className="row gy-4">
              <div className="col-sm-7 col-md-6 col-lg-4">
                <div className="mb-4">
                  <a href="index.html">
                    <img src={userAsset('images/logo.png')} alt="" />
                  </a>
                </div>
                <p className="text-3">
                  Welcome uncover a luxurious haven at Hotel The Mist, United States. Nestled in Los Ageless heart, our hotel offers modern elegance and warm hospitality.
                </p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-3 ms-auto">
                <ul className="nav flex-column fw-500">
                  <li className="nav-item">
                    <a className="nav-link" href="about-us.html">About Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="rooms.html">Rooms</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="restaurant.html">Restaurant</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="banquets.html">Banquets</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="spa.html">
                      Spa <span className="badge bg-primary text-1 fw-600 rounded-pill text-uppercase ms-1">New</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact-us.html">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-4">
                <div className="d-flex gap-4 mb-3">
                  <span className="text-7 me-1">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <div className="text-3 lh-lg">423 W 9th St, Los Angeles, CA 90014, United States</div>
                </div>
                <a
                  href="#"
                  className="d-flex align-items-center gap-4 mb-1 link-primary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                >
                  <span className="text-6">
                    <i className="fa-solid fa-phone-volume"></i>
                  </span>
                  <div className="text-5 fw-700 lh-lg">(+060) 444 5346</div>
                </a>
                <a
                  href="mailto:info@themist.com"
                  className="d-flex align-items-center gap-4 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                >
                  <span className="text-6">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <div className="text-5 fw-600 lh-lg">info@themist.com</div>
                </a>
                <div className="mt-3">
                  <ul className="social-icons social-icons-light">
                    <li>
                      <a data-bs-toggle="tooltip" href="http://www.facebook.com/" target="_blank" rel="noreferrer" title="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a data-bs-toggle="tooltip" href="http://www.x.com/" target="_blank" rel="noreferrer" title="X">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a data-bs-toggle="tooltip" href="http://www.instagram.com/" target="_blank" rel="noreferrer" title="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a data-bs-toggle="tooltip" href="http://www.whatsapp.com/" target="_blank" rel="noreferrer" title="WhatsApp">
                        <i className="fa-brands fa-whatsapp"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              <div className="row gy-3">
                <div className="col-lg">
                  <p className="text-3 text-center mb-2">
                    Copyright &copy; 2026{' '}
                    <a
                      className="fw-500 link-primary link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                      href="#"
                    >
                      The Mist
                    </a>
                    . All Rights Reserved.
                  </p>
                  <p className="text-3 text-center mb-0">
                    Designed by{' '}
                    <a
                      className="fw-500 link-primary link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                      href="https://harnishdesign.net/"
                    >
                      Harnish Design
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
