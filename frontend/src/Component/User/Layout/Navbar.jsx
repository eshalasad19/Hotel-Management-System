import React from 'react'

export default function Navbar() {
  return (
    <div>
        <header id="header" className="sticky-top-slide">
            {/* <!-- Navbar --> */}
            <nav className="primary-menu navbar navbar-expand-lg bg-transparent border-bottom-0 text-3 fw-600 mt-3">
                <div className="container">
                    {/* <!-- Logo --> */}
                    <a className="logo" href="index.html"> <img src="images/logo.png" alt=""> </a>
                    {/* <!-- Logo End --> */}
                    <div id="header-nav" className="collapse navbar-collapse justify-content-center">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle active" href="#">Home</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item active" href="index.html">Home - 1</a></li>
                                    <li><a className="dropdown-item" href="index-2.html">Home - 2</a></li>
									<li><a className="dropdown-item" href="index-3.html">Home - 3 (Carousel)</a></li>
									<li><a className="dropdown-item" href="index-4.html">Slideshow Bg</a></li>
									<li><a className="dropdown-item" href="index-5.html">Slideshow Bg - 2</a></li>
									<li><a className="dropdown-item" href="index-6.html">Video Bg</a></li>
									<li><a className="dropdown-item" href="index-7.html">Video Bg - 2</a></li>
									<li><a className="dropdown-item" href="index-8.html">Sidebar Menu</a></li>
									<li><a className="dropdown-item" href="index-9.html">Sidebar Menu (Light)</a></li>
									<li><a className="dropdown-item" href="index-10.html">Overlay Menu</a></li>
                                </ul>
                            </li>
							<li className="nav-item"><a className="nav-link" href="about-us.html">About</a></li>
							<li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#">Rooms</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="rooms.html">Rooms - 1</a></li>
                                    <li><a className="dropdown-item" href="rooms-2.html">Rooms - 2</a></li>
									<li><a className="dropdown-item" href="rooms-3.html">Rooms - 3</a></li>
									<li><a className="dropdown-item" href="rooms-4.html">Rooms - 4</a></li>
									<li><a className="dropdown-item" href="room-details.html">Room Details</a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="restaurant.html">Restaurant</a></li>
                            <li className="nav-item"><a className="nav-link" href="banquets.html">Banquets</a></li>
                            <li className="nav-item"><a className="nav-link" href="spa.html">Spa</a></li>
                            <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#">Pages</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="services.html">Services</a></li>
                                    <li><a className="dropdown-item" href="facilities.html">Facilities</a></li>
									<li><a className="dropdown-item" href="gallery.html">Gallery</a></li>
									<li><a className="dropdown-item" href="faqs.html">FAQs</a></li>
									<li><a className="dropdown-item" href="testimonials.html">testimonials</a></li>
									<li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Blog</a>
										<ul className="dropdown-menu">
											<li><a className="dropdown-item" href="blog.html">Blog</a></li>
											<li><a className="dropdown-item" href="blog-grid.html">Blog - Grid</a></li>
											<li><a className="dropdown-item" href="blog-single-post.html">Blog Single Post</a></li>
										</ul>
									</li>
									<li><a className="dropdown-item" href="404.html">404</a></li>
									<li><a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
									
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="contact-us.html">Contact</a></li>
                        </ul>
                    </div>

                    {/* <!-- Button --> */}
                    <a href="contact.html" className="btn btn-new btn-primary text-capitalize rounded-pill text-nowrap ms-auto">
						<span className="btn-text"><span>Book Now</span></span>
						<span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
					</a>
                    {/* <!-- Button End --> */}
					
					{/* <!-- Hamburger Menu Button --> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav"><span></span><span></span><span></span></button>
                    {/* <!-- Hamburger Menu Button End --> */}
                </div>
            </nav>
            {/* <!-- Navbar End --> */}
        </header>
        {/* <!-- Header End --> */}</div>
  )
}
