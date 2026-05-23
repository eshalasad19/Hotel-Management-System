import React, { useState, useEffect } from "react";
import { userAsset } from "../../../../utils/userAssets";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function ContactFormSection() {

  const [form, setForm] = useState({
    name: "Guest",
    phone: "",
    email: "",
    rating: 0,
    review: ""
  });

  // ✅ LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Hoteluser"));

    if (storedUser?.name) {
      setForm((prev) => ({
        ...prev,
        name: storedUser.name,
        email: storedUser.email || "",
        phone: storedUser.phone || ""
      }));
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const storedUser = JSON.parse(localStorage.getItem("hotelUser"));
  
      // ✅ Prepare payload
      const payload = {
        rating: Number(form.rating),   // Must be Number
        review: form.review,
        userId: storedUser?.id || "000000000000000000000000" // dummy ObjectId for guest
      };
  
      // Validation
      if (!payload.rating || payload.rating < 1) {
        toast.error("Please select a rating");
        return;
      }
      if (!payload.review) {
        toast.error("Please write a review");
        return;
      }
  
      const BASE_URL = "http://localhost:5001/api";
  
      await axios.post(`${BASE_URL}/feedbacks`, payload);
  
      toast.success("Review submitted successfully!");
  
      // Reset form
      setForm({
        name: storedUser?.name || "Guest",
        phone: "",
        email: "",
        rating: 0,
        review: "",
      });
  
    } catch (error) {
      console.log("Feedback error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to submit review");
    }
  };
  return (
    <div className="section pt-0">
      <ToastContainer/>
      <div className="container">
        <div className="row g-5 mt-4">

          {/* IMAGE SECTION */}
          <div className="col-lg-6 text-center wow fadeInLeft">
            <div className="position-relative d-inline-flex">
              <img
                className="img-fluid rounded-5"
                src={userAsset("images/contact-us.jpg")}
                alt="Contact Us"
              />

              <div className="position-absolute top-0 end-0">
                <div className="circle-text bg-white border border-2 border-primary mt-5 me-5 wow bounceIn">
                  <svg viewBox="0 0 500 500">
                    <defs>
                      <path
                        id="circlePath"
                        d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                      ></path>
                    </defs>

                    <text className="text-uppercase fw-700 ls-4">
                      <textPath xlinkHref="#circlePath">
                        Luxury Hotel ✦ Experience ✦
                      </textPath>
                    </text>
                  </svg>

                  <div className="circle-icon text-bg-primary translate-middle">
                    <i className="fa-solid fa-bell-concierge"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="col-lg-6 wow fadeInRight">
            <h2 className="text-8 fw-600 mb-4">
              Get in <span className="text-primary">Touch</span>
            </h2>

            <form onSubmit={handleSubmit} className="form-border">

              {/* GUEST NAME */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">
                  Guest Name*
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                  readOnly={form.name !== "Guest"}   // 👈 important
                />
              </div>

            

              {/* EMAIL */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              {/* ⭐ RATING */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">
                  Rating*
                </label>

                <div style={{ fontSize: "22px", cursor: "pointer" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa-solid fa-star ${
                        form.rating >= star
                          ? "text-warning"
                          : "text-muted"
                      }`}
                      onClick={() =>
                        setForm({ ...form, rating: star })
                      }
                      style={{ marginRight: "6px" }}
                    ></i>
                  ))}
                </div>
              </div>

              {/* REVIEW */}
              <div className="mb-4">
                <label className="form-label text-3 fw-600">
                  Your Review*
                </label>

                <textarea
                  className="form-control rounded-5"
                  rows="5"
                  placeholder="Write your experience..."
                  value={form.review}
                  onChange={(e) =>
                    setForm({ ...form, review: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="d-grid">
                <button
                  className="btn btn-new btn-primary text-nowrap rounded-pill"
                  type="submit"
                >
                  <span className="btn-text">
                    <span>Send Message</span>
                  </span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}