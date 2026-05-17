import React from 'react';
import { rooms} from './roomsData';
import { userAsset } from '../../../../utils/userAssets';

const RoomsList = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="room-items-wrap">
          {rooms.map((room, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div key={room.id} className="room-item bg-white rounded-5 mb-5">
                <div className="row g-0">
                  {/* Image Column */}
                  <div className={`col-lg-6 ${isEven ? '' : 'order-lg-2'}`}>
                    <div className="room-item-img rounded-5 position-relative">
                      <a href="room-details.html">
                        <img className="img-fluid d-block w-100" src={room.image} alt={room.name} />
                      </a>
                      {room.badge && (
                        <div className="position-absolute top-0 start-0 ms-4 mt-4 px-3 py-1 text-3 fw-500 text-bg-primary rounded-pill">
                          {room.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="col-lg-6 align-content-center">
                    <div className="p-4 m-2">
                      <div className="room-discount d-inline-flex text-2 fw-500 rounded-pill border border-dark border-opacity-10 ms-0 mt-0 mb-2">
                        <span className="text-primary me-1"><i className="fa-solid fa-tag"></i></span>
                        {room.discount}
                      </div>
                      <h3 className="text-8 fw-600">{room.name}</h3>
                      <p className="text-3 text-body-secondary">{room.description}</p>
                      
                      <div className="row g-2 text-3 text-body-secondary mb-3">
                        <div className="col-6 col-xl-4 d-flex align-items-center">
                          <span className="text-primary text-5 me-2"><i className="fa-solid fa-bed"></i></span>
                          {room.bed}
                        </div>
                        <div className="col-6 col-xl-4 d-flex align-items-center">
                          <span className="text-primary text-5 me-2"><i className="fa-solid fa-users"></i></span>
                          {room.capacity}
                        </div>
                        <div className="col-6 col-xl-4 d-flex align-items-center">
                          <span className="text-primary text-5 me-2"><i className="fa-solid fa-expand"></i></span>
                          {room.size}
                        </div>
                        <div className="col-6 col-xl-4 d-flex align-items-center">
                          <span className="text-primary text-5 me-2"><i className="fa-solid fa-wifi"></i></span>
                          Free WiFi
                        </div>
                        <div className="col-6 col-xl-4 d-flex align-items-center">
                          <span className="text-primary text-5 me-2"><i className="fa-solid fa-tv"></i></span>
                          {room.tv}
                        </div>
                        <div className="col-6 col-xl-4 d-flex align-items-center">
                          <span className="text-primary text-5 me-2"><i className="fa-solid fa-water-ladder"></i></span>
                          Swimming Pool
                        </div>
                      </div>
                      
                      <hr className="opacity-1" />
                      <div className="d-flex align-items-center justify-content-between w-100 bottom-0 start-0">
                        <div className="text-7 fw-600 d-flex align-items-center gap-1">
                          ${room.price} <span className="text-3 fw-500 text-body-tertiary text-uppercase">/ Per Night</span>
                        </div>
                        <a className="btn btn-new btn-primary rounded-pill" href="room-details.html">
                          <span className="btn-text"><span>Details</span></span>
                          <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
                        </a>
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