import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleRoom } from "../../../../api/roomApi";
import HomeAvailability from "./HomeAvailability";

const RoomDetails = () => {

  const { id } = useParams();

  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (id) {
      fetchRoom();
    }
  }, [id]);

  const fetchRoom = async () => {
    try {

      const data = await getSingleRoom(id);

      console.log("ROOM DATA:", data);

      setRoom(data.room || data);

    } catch (error) {
      console.log("Room fetch error:", error);
    }
  };

  // IMAGE URL FIX
  const getImageUrl = (img) => {

    if (!img) {
      return "https://via.placeholder.com/1200x700?text=No+Image";
    }

    // Agar full URL already hai
    if (img.startsWith("http")) {
      return img;
    }

    // Agar DB mein uploads/filename save hai
    if (img.startsWith("uploads/")) {
      return `http://localhost:5001/${img}`;
    }

    // Agar sirf filename save hai
    return `http://localhost:5001/uploads/${img}`;
  };

  // LOADING
  if (!room) {
    return (
      <div className="text-center py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="page-header page-header-text-light py-0 mb-0">

        <div className="hero-wrap py-5">

          <div className="hero-mask opacity-6 bg-black"></div>

          {/* HERO IMAGE */}
          <div
            className="hero-bg hero-bg-scroll"
            style={{
              backgroundImage: `url(${getImageUrl(room.images?.[0])})`,
            }}
          ></div>

          <div className="hero-content py-2 py-lg-4 my-2 my-md-4">

            <div className="container text-center mt-5 pt-5 pb-2">

              <h1 className="text-17 mb-4">
                {room.title}
              </h1>

              <ul className="breadcrumb justify-content-center mb-0">

                <li>
                  <a href="/">Home</a>
                </li>

                <li>
                  <a href="/rooms">Rooms</a>
                </li>

                <li className="active">
                  {room.title}
                </li>

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

                {/* IMAGE GALLERY */}
                <div className="row g-3 mb-4">

                  {room.images?.map((img, index) => (

                    <div
                      className="col-md-6"
                      key={index}
                    >

                      <img
                        className="img-fluid rounded-5 w-100"
                        src={getImageUrl(img)}
                        alt={room.title}
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />

                    </div>

                  ))}

                </div>

                {/* TAG */}
                <p className="mb-2">

                  <span className="text-3 text-uppercase fw-600 rounded-pill border px-3 py-1">

                    {room.tag || "Luxury Room"}

                  </span>

                </p>

                {/* TITLE */}
                <h2 className="text-13 fw-600">
                  {room.title}
                </h2>

                {/* SUBTITLE */}
                <p className="text-body-secondary">
                  {room.subtitle}
                </p>

                {/* FEATURES */}
                <div className="row gy-2 gx-5 text-body-secondary mb-4">

                  <div className="col-md-auto d-flex align-items-center">

                    <i className="fa-solid fa-expand me-2 text-primary"></i>

                    {room.area}

                  </div>

                  <div className="col-md-auto d-flex align-items-center">

                    <i className="fa-solid fa-users me-2 text-primary"></i>

                    {room.persons}

                  </div>

                  <div className="col-md-auto d-flex align-items-center">

                    <i className="fa-solid fa-bed me-2 text-primary"></i>

                    {room.bedType}

                  </div>

                </div>

                {/* DESCRIPTION */}
                <p className="text-body-secondary">
                  {room.description}
                </p>

                {/* AMENITIES */}
                <h3 className="text-7 fw-600 mt-5 mb-3">
                  Room Amenities
                </h3>

                <div className="row g-3">

                  {room.amenities?.map((item, i) => (

                    <div
                      key={i}
                      className="col-md-6 d-flex align-items-center gap-2"
                    >

                      <i className="fa-solid fa-check text-success"></i>

                      {item}

                    </div>

                  ))}

                </div>

                {/* HOTEL RULES */}
                <h3 className="text-7 fw-600 mt-5 mb-3">
                  Hotel Rules
                </h3>

                <div className="row g-3">

                  <div className="col-md-4">

                    <p className="fw-600 mb-1">
                      Check-in
                    </p>

                    <div>
                      {room.checkIn}
                    </div>

                  </div>

                  <div className="col-md-4">

                    <p className="fw-600 mb-1">
                      Check-out
                    </p>

                    <div>
                      {room.checkOut}
                    </div>

                  </div>

                  <div className="col-md-4">

                    <p className="fw-600 mb-1">
                      Pets
                    </p>

                    <div>
                      {room.pets}
                    </div>

                  </div>

                </div>

                {/* PRICE */}
                <div className="d-flex justify-content-between align-items-center mt-5">

                  <div className="text-9 fw-600">

                    Rs{room.price}

                    <span className="text-4 text-body-secondary">
                      {" "} / night
                    </span>

                  </div>

                  <button className="btn btn-primary rounded-pill px-4">
                    Book Now
                  </button>

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-4 col-xl-3">

                <div className="bg-white rounded-5 p-4 mb-4 shadow-sm">

                  <h4 className="mb-3">
                    Other Rooms
                  </h4>

                  <ul className="list-unstyled">

                    {room.otherRooms?.map((r, i) => (

                      <li
                        key={i}
                        className="mb-2"
                      >
                        • {r}
                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            </div>
          </div>

        </section>

        {/* AVAILABILITY */}
        <HomeAvailability />

      </div>
    </>
  );
};

export default RoomDetails;