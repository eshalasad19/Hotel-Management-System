import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../../../../api/roomApi";

const RoomsList = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {

      const data = await getRooms();

      // backend response handle
      setRooms(data.rooms || data);

    } catch (error) {
      console.log("Rooms fetch error:", error);
    }
  };

  // LOADING
  if (!rooms.length) {
    return (
      <div className="text-center py-5">
        <h3>Loading Rooms...</h3>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">

        <div className="room-items-wrap">

          {rooms.map((room, index) => {

            const isEven = index % 2 === 0;

            return (

              <div
                key={room._id}
                className="room-item bg-white rounded-5 mb-5"
              >

                <div className="row g-0">

                  {/* IMAGE COLUMN */}
                  <div
                    className={`col-lg-6 ${
                      isEven ? "" : "order-lg-2"
                    }`}
                  >

                    <div className="room-item-img rounded-5 position-relative">

                      <Link to={`/rooms/${room._id}`}>

                        <img
                          className="img-fluid d-block w-100"
                          src={
                            room.images?.[0]?.startsWith("http")
                              ? room.images[0]
                              : `http://localhost:5000/${room.images?.[0]}`
                          }
                          alt={room.title}
                        />

                      </Link>

                      {room.tag && (
                        <div className="position-absolute top-0 start-0 ms-4 mt-4 px-3 py-1 text-3 fw-500 text-bg-primary rounded-pill">

                          {room.tag}

                        </div>
                      )}

                    </div>
                  </div>

                  {/* CONTENT COLUMN */}
                  <div className="col-lg-6 align-content-center">

                    <div className="p-4 m-2">

                      <div className="room-discount d-inline-flex text-2 fw-500 rounded-pill border border-dark border-opacity-10 ms-0 mt-0 mb-2">

                        <span className="text-primary me-1">
                          <i className="fa-solid fa-tag"></i>
                        </span>

                        {room.subtitle || "Luxury Stay"}

                      </div>

                      <h3 className="text-8 fw-600">
                        {room.title}
                      </h3>

                      <p className="text-3 text-body-secondary">
                        {room.description}
                      </p>

                      {/* FEATURES */}
                      <div className="row g-2 text-3 text-body-secondary mb-3">

                        <div className="col-6 col-xl-4 d-flex align-items-center">

                          <span className="text-primary text-5 me-2">
                            <i className="fa-solid fa-bed"></i>
                          </span>

                          {room.bedType}

                        </div>

                        <div className="col-6 col-xl-4 d-flex align-items-center">

                          <span className="text-primary text-5 me-2">
                            <i className="fa-solid fa-users"></i>
                          </span>

                          {room.persons}

                        </div>

                        <div className="col-6 col-xl-4 d-flex align-items-center">

                          <span className="text-primary text-5 me-2">
                            <i className="fa-solid fa-expand"></i>
                          </span>

                          {room.area}

                        </div>

                        <div className="col-6 col-xl-4 d-flex align-items-center">

                          <span className="text-primary text-5 me-2">
                            <i className="fa-solid fa-wifi"></i>
                          </span>

                          Free WiFi

                        </div>

                        <div className="col-6 col-xl-4 d-flex align-items-center">

                          <span className="text-primary text-5 me-2">
                            <i className="fa-solid fa-tv"></i>
                          </span>

                          Smart TV

                        </div>

                        <div className="col-6 col-xl-4 d-flex align-items-center">

                          <span className="text-primary text-5 me-2">
                            <i className="fa-solid fa-water-ladder"></i>
                          </span>

                          Swimming Pool

                        </div>

                      </div>

                      <hr className="opacity-1" />

                      {/* PRICE + BUTTON */}
                      <div className="d-flex align-items-center justify-content-between w-100 bottom-0 start-0">

                        <div className="text-7 fw-600 d-flex align-items-center gap-1">

                          ${room.price}

                          <span className="text-3 fw-500 text-body-tertiary text-uppercase">
                            / Per Night
                          </span>

                        </div>

                        <Link
                          className="btn btn-new btn-primary rounded-pill"
                          to={`/rooms/${room._id}`}
                        >

                          <span className="btn-text">
                            <span>Details</span>
                          </span>

                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>

                        </Link>

                      </div>

                    </div>
                  </div>

                </div>
              </div>

            );
          })}

        </div>
      </div>
    </section>
  );
};

export default RoomsList;