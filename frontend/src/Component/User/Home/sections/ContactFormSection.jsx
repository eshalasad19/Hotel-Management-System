import React, { useState, useEffect } from "react";
import { userAsset } from "../../../../utils/userAssets";
import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

export default function ContactFormSection() {
  const [form, setForm] = useState({ name: "Guest", phone: "", email: "", rating: 0, review: "" });
  const [submitted, setSubmitted] = useState(false);
  const [ratingError, setRatingError] = useState('');
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Hoteluser"));
    if (storedUser?.name) {
      setForm(prev => ({
        ...prev,
        name:  storedUser.name  || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRatingError('');
    setReviewError('');

    let hasError = false;
    if (!form.rating || form.rating < 1) {
      setRatingError('Please select a rating');
      hasError = true;
    }
    if (!form.review.trim()) {
      setReviewError('Please write your review');
      hasError = true;
    }
    if (hasError) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem("Hoteluser"));
      const payload = {
        name: form.name, email: form.email,
        phone: form.phone, rating: Number(form.rating), review: form.review,
      };
      const userId = storedUser?._id || storedUser?.id;
      if (userId && /^[a-fA-F0-9]{24}$/.test(userId)) payload.userId = userId;

      await axios.post(`${BASE_URL}/feedbacks`, payload);
      setSubmitted(true);
      setForm(prev => ({ ...prev, rating: 0, review: "" }));
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setReviewError(error.response?.data?.error || "Failed to submit. Please try again.");
    }
  };

  return (
    <div className="section pt-0">
      <div className="container">
        <div className="row g-5 mt-4">

          {/* IMAGE */}
          <div className="col-lg-6 text-center wow fadeInLeft">
            <div className="position-relative d-inline-flex">
              <img className="img-fluid rounded-5" src={userAsset("images/contact-us.jpg")} alt="Contact Us" />
              <div className="position-absolute top-0 end-0">
                <div className="circle-text bg-white border border-2 border-primary mt-5 me-5 wow bounceIn">
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

          {/* FORM */}
          <div className="col-lg-6 wow fadeInRight">
            <h2 className="text-8 fw-600 mb-4">
              Share Your <span className="text-primary">Experience</span>
            </h2>

            {/* Success message */}
            {submitted && (
              <div className="mb-4 p-4 rounded-4 text-center" style={{
                background: 'linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.05))',
                border: '1px solid rgba(201,169,110,0.3)'
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c9a96e, #a67c40)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px', fontSize: 24, color: '#fff'
                }}>✓</div>
                <h5 className="fw-700 mb-1">Thank You!</h5>
                <p className="text-muted mb-0">Your review has been submitted successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="form-border">

              {/* Name */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">Guest Name</label>
                <input type="text" className="form-control rounded-pill"
                  placeholder="Enter your name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required readOnly={form.name !== "Guest"} />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">Phone</label>
                <input type="tel" className="form-control rounded-pill"
                  placeholder="Your Phone Number" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">Email</label>
                <input type="email" className="form-control rounded-pill"
                  placeholder="Your Email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">Rating <span className="text-danger">*</span></label>
                <div style={{ fontSize: "26px", cursor: "pointer", lineHeight: 1 }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <i key={star}
                      className={`fa-solid fa-star ${form.rating >= star ? "text-warning" : "text-muted"}`}
                      onClick={() => { setForm({ ...form, rating: star }); setRatingError(''); }}
                      style={{ marginRight: "6px", transition: 'transform 0.1s' }}
                    />
                  ))}
                </div>
                {ratingError && (
                  <small className="text-danger mt-1 d-block">
                    <i className="fa-solid fa-circle-exclamation me-1"></i>{ratingError}
                  </small>
                )}
              </div>

              {/* Review */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">Your Review <span className="text-danger">*</span></label>
                <textarea className="form-control rounded-5" rows="5"
                  placeholder="Write your experience..."
                  value={form.review}
                  onChange={e => { setForm({ ...form, review: e.target.value }); setReviewError(''); }}
                  required
                />
                {reviewError && (
                  <small className="text-danger mt-1 d-block">
                    <i className="fa-solid fa-circle-exclamation me-1"></i>{reviewError}
                  </small>
                )}
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button className="btn btn-new btn-primary text-nowrap rounded-pill" type="submit">
                  <span className="btn-text"><span>Submit Review</span></span>
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