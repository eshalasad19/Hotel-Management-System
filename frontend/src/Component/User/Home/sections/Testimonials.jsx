import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fa-star ${i < rating ? 'fa-solid text-warning' : 'fa-regular text-muted'}`}
      style={{ fontSize: '12px' }}
    />
  ));
};

const getInitials = (name = '') => {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

const AVATAR_COLORS = ['#c9a96e', '#e67e22', '#9b59b6', '#3498db', '#27ae60', '#e74c3c'];

const getAvatarColor = (name = '') => {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const FALLBACK = [
  {
    _id: '1', name: 'Dennis Jacques', rating: 5,
    review: 'Easy to use, reasonably priced. Simply dummy text of the printing and typesetting industry.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2', name: 'Patrick Cary', rating: 5,
    review: 'We hosted our anniversary celebration here, and it was simply perfect. The event team handled every detail flawlessly.',
    createdAt: new Date().toISOString(),
  },
];

export default function Testimonials() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/feedbacks/public`)
      .then(res => res.json())
      .then(data => {
        const valid = Array.isArray(data) ? data.filter(f => f.review) : [];
        setFeedbacks(valid);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const display = feedbacks.length ? feedbacks : FALLBACK;

  return (
    <section className="section">
      <div className="container">

        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Our Feedbacks
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            What Our <span className="text-primary">Guests Say <br className="d-none d-md-block" />About</span> Hotel The Luxury Stay
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <div
            className="swiper wow fadeInUp"
            data-loop="true"
            data-autoplay="true"
            data-margin="30"
            data-items-xs="1"
            data-items-sm="1"
            data-items-md="1"
            data-items-lg="2"
          >
            <div className="swiper-wrapper">
              {display.map((item) => (
                <div key={item._id} className="swiper-slide">
                  <div className="bg-white rounded-5 p-5 h-100 d-flex flex-column justify-content-between">

                    <div className="d-flex gap-1 mb-3">
                      {renderStars(item.rating)}
                    </div>

                    <p className="lh-lg text-body-secondary flex-grow-1">
                      "{item.review}"
                    </p>

                    {item.adminReply && (
                      <div
                        className="mt-3 p-3 rounded-4"
                        style={{ background: 'rgba(201,169,110,0.08)', borderLeft: '3px solid #c9a96e' }}
                      >
                        <div className="text-2 fw-600 text-primary mb-1">
                          <i className="fa-solid fa-reply me-1" /> Hotel Response
                        </div>
                        <p className="text-2 text-body-secondary mb-0">{item.adminReply}</p>
                      </div>
                    )}

                    <hr className="my-3 opacity-1" />

                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 46, height: 46,
                          background: getAvatarColor(item.name),
                          color: '#fff', fontWeight: 700, fontSize: 14,
                        }}
                      >
                        {getInitials(item.name)}
                      </div>
                      <div>
                        <h3 className="text-4 fw-600 mb-0">{item.name}</h3>
                        <div className="text-2 text-body-tertiary">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="ms-auto">
                        <span
                          className="rounded-pill px-3 py-1 text-2 fw-700"
                          style={{
                            background: 'rgba(201,169,110,0.1)',
                            color: '#c9a96e',
                            border: '1px solid rgba(201,169,110,0.3)',
                          }}
                        >
                          {item.rating}.0 ★
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="swiper-button-next mt-n5">
              <i className="fa-solid fa-angle-right" />
            </div>
            <div className="swiper-button-prev mt-n5">
              <i className="fa-solid fa-angle-left" />
            </div>
            <div className="swiper-pagination position-relative mt-4" />
          </div>
        )}

        <div className="fw-500 text-center mt-4 wow fadeInUp">
          Share Your Experience{' '}
          <a href="/feedback" className="fw-600 link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-0-hover">
            Leave a Review
          </a>
        </div>

      </div>
    </section>
  );
}