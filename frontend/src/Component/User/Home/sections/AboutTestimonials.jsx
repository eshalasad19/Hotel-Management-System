import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export default function AboutTestimonials() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/feedbacks/public`)
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa-star ${i < rating ? 'fa-solid text-warning' : 'fa-regular text-muted'}`}
        style={{ fontSize: 14 }}
      />
    ));
  };

  if (feedbacks.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Guest Reviews
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            What Our <span className="text-primary">Guests Say <br className="d-none d-md-block" />About</span> Their Stay
          </h2>
        </div>

        <div className="swiper wow fadeInUp" data-loop="true" data-autoplay="true" data-margin="30" data-items-xs="1" data-items-sm="1" data-items-md="1" data-items-lg="2">
          <div className="swiper-wrapper">
            {feedbacks.map((item) => (
              <div className="swiper-slide" key={item._id}>
                <div className="bg-white rounded-5 p-5">
                  <div className="mb-2">{renderStars(item.rating)}</div>
                  <p className="lh-lg">"{item.review}"</p>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                      style={{ width: 50, height: 50, fontSize: 20, color: '#fff', flexShrink: 0 }}
                    >
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-4 fw-600 mb-1">{item.name}</h3>
                      <div className="text-3 fw-500 text-body-tertiary">
                        {new Date(item.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-button-next mt-n5"><i className="fa-solid fa-angle-right"></i></div>
          <div className="swiper-button-prev mt-n5"><i className="fa-solid fa-angle-left"></i></div>
          <div className="swiper-pagination position-relative mt-4"></div>
        </div>
      </div>
    </section>
  );
}