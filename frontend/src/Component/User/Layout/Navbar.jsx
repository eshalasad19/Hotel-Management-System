// import React from 'react'
// import { userAsset } from '../../../utils/userAssets'

// export default function Navbar() {
//   return (
//     <div>
//         <header id="header" className="sticky-top-slide">
//             {/* <!-- Navbar --> */}
//             <nav className="primary-menu navbar navbar-expand-lg bg-transparent border-bottom-0 text-3 fw-600 mt-3">
//                 <div className="container">
//                     {/* <!-- Logo --> */}
//                     <a className="logo" href="index.html"> <img src={userAsset('images/logo.png')} alt="" /> </a>
//                     {/* <!-- Logo End --> */}
//                     <div id="header-nav" className="collapse navbar-collapse justify-content-center">
//                         <ul className="navbar-nav">
//                             <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle active" href="#">Home</a></li>
// 							<li className="nav-item"><a className="nav-link" href="about-us.html">About</a></li>
// 							<li className="nav-item dropdown"> <a className="nav-link " href="#">Rooms</a></li>
        
//                             <li className="nav-item"><a className="nav-link" href="banquets.html">Services</a></li>
//                             <li className="nav-item"><a className="nav-link" href="spa.html">Facilities</a></li>
//                             <li className="nav-item"><a className="nav-link" href="spa.html">Gallery</a></li>
//                             <li className="nav-item"><a className="nav-link" href="spa.html">FAQs</a></li>
//                             <li className="nav-item "> <a className="nav-link " href="#">Blog</a></li>
//                             <li className="nav-item"><a className="nav-link" href="ContactUs.jsx">Contact</a></li>
//                         </ul>
//                     </div>

//                     {/* <!-- Button --> */}
//                     <a href="contact.html" className="btn btn-new btn-primary text-capitalize rounded-pill text-nowrap ms-auto">
// 						<span className="btn-text"><span>Book Now</span></span>
// 						<span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
// 					</a>
//                     {/* <!-- Button End --> */}
					
// 					{/* <!-- Hamburger Menu Button --> */}
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav"><span></span><span></span><span></span></button>
//                     {/* <!-- Hamburger Menu Button End --> */}
//                 </div>
//             </nav>
//             {/* <!-- Navbar End --> */}
//         </header>
//         {/* <!-- Header End --> */}</div>
//   )
// }


import { NavLink, Link } from 'react-router-dom';
import { userAsset } from '../../../utils/userAssets';

export default function Navbar() {
  return (
    <header id="header" className="sticky-top-slide">
      <nav className="primary-menu navbar navbar-expand-lg bg-transparent border-bottom-0 text-3 fw-600 mt-3">
        <div className="container">
          <Link className="logo" to="/">
            <img src={userAsset('images/logo.png')} alt="Logo" />
          </Link>

          <div id="header-nav" className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/rooms"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Rooms
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/services"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Services
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/restaurant"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Restaurant
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/gallery"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Gallery
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/faq"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  FAQs
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/blog"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Blog
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/spa"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Spa
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <Link
            to="/contact-us"
            className="btn btn-new btn-primary text-capitalize rounded-pill text-nowrap ms-auto"
          >
            <span className="btn-text"><span>Book Now</span></span>
            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#header-nav"
            aria-controls="header-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}