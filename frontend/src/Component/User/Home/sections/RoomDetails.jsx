import React from "react";
import HomeAvailability from "./HomeAvailability";


const RoomDetails = ({ room }) => {
  // room = data from MongoDB

  if (!room) return <div>Loading...</div>;

  return (
    <>
      {/* HERO */}
      <section className="page-header page-header-text-light py-0 mb-0">
        <div className="hero-wrap py-5">
          <div className="hero-mask opacity-6 bg-black"></div>

          {/* Dynamic Background */}
          <div
            className="hero-bg hero-bg-scroll"
            style={{ backgroundImage: `url(${room.images?.[0]})` }}
          ></div>

          <div className="hero-content py-2 py-lg-4 my-2 my-md-4">
            <div className="container text-center mt-5 pt-5 pb-2">
              <h1 className="text-17 mb-4">{room.title}</h1>

              <ul className="breadcrumb justify-content-center mb-0">
                <li><a href="/">Home</a></li>
                <li><a href="/rooms">Rooms</a></li>
                <li className="active">{room.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div id="content" role="main">
        <section className="section">
          <div className="container">
            <div className="row gx-4 gy-5">

              {/* LEFT SIDE */}
              <div className="col-lg-8 col-xl-9">

                {/* IMAGE SLIDER */}
                <div className="swiper rounded-5 mb-4">
                  <div className="swiper-wrapper">
                    {room.images?.map((img, index) => (
                      <div className="swiper-slide" key={index}>
                        <img className="img-fluid rounded-5" src={img} alt="" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* DETAILS */}
                <p className="mb-2">
                  <span className="text-3 text-uppercase fw-600 rounded-pill border px-3 py-1">
                    {room.tag || "Meal with us"}
                  </span>
                </p>

                <h2 className="text-13 fw-600">
                  {room.title}
                </h2>

                <p className="text-body-secondary">
                  {room.subtitle}
                </p>

                {/* FEATURES */}
                <div className="row gy-2 gx-5 text-body-secondary mb-4">
                  <div className="col-md-auto d-flex align-items-center">
                    {room.area}
                  </div>
                  <div className="col-md-auto d-flex align-items-center">
                    {room.persons}
                  </div>
                  <div className="col-md-auto d-flex align-items-center">
                    {room.bedType}
                  </div>
                </div>

                <p className="text-body-secondary">{room.description}</p>

                {/* AMENITIES */}
                <h3 className="text-7 fw-600 mt-5 mb-3">Room Amenities</h3>
                <div className="row g-3">
                  {room.amenities?.map((item, i) => (
                    <div key={i} className="col-md-6 d-flex gap-3">
                      {item}
                    </div>
                  ))}
                </div>

                {/* RULES */}
                <h3 className="text-7 fw-600 mt-5 mb-3">Hotel Rules</h3>
                <div className="row g-3">
                  <div className="col-md-3">
                    <p>Check-in</p>
                    <div>{room.checkIn}</div>
                  </div>
                  <div className="col-md-3">
                    <p>Check-out</p>
                    <div>{room.checkOut}</div>
                  </div>
                  <div className="col-md-3">
                    <p>Pets</p>
                    <div>{room.pets}</div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="d-flex justify-content-between mt-4">
                  <div className="text-9 fw-600">
                    ${room.price} / night
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-4 col-xl-3">

                {/* OTHER ROOMS */}
                <div className="bg-white rounded-5 p-4 mb-4">
                  <h4>Other Rooms</h4>
                  <ul>
                    {room.otherRooms?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* AVAILABILITY SECTION (Already Component) */}
        <HomeAvailability />
      </div>
    </>
  );
};

export default RoomDetails;