// src/Component/User/Home/UserLogin.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../../api/authApi.js';
import { useAuth } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';

const UserLogin = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  // ✅ Protected page redirect
  const from = location.state?.from || '/home';

  // ✅ AGAR USER PEHLE SE LOGIN HAI
  // TOH LOGIN PAGE MAT KHOLNA
  useEffect(() => {

    if (user) {
      navigate(from, { replace: true });
    }

  }, [user, navigate, from]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // ✅ OLD STORAGE CLEAR
      localStorage.clear();

      const data = await loginUser(formData);

      if (data.token) {

        // ✅ SAVE USER
        localStorage.setItem(
          "Hoteluser",
          JSON.stringify(data.user)
        );

        // ✅ SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        // ✅ CONTEXT LOGIN
        login(data.user, data.token);

        toast.success(
          `Welcome back, ${data.user.name}!`
        );

        // ✅ LOGIN KE BAAD BACK NA HO
        navigate(from, { replace: true });

      } else {

        toast.error(
          data.message ||
          'Login failed. Please check your credentials.'
        );

      }

    } catch (err) {

      console.log(err);

      toast.error(
        'Server error. Please try again.'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <section
      className="page-header"
      style={{
        padding: '80px 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#f8f9fa'
      }}
    >

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-5 col-md-7">

            <div className="card shadow-lg border-0 rounded-4 p-4">

              {/* HEADER */}
              <div className="text-center mb-4">

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{
                    width: '70px',
                    height: '70px',
                    fontSize: '28px'
                  }}
                >
                  <i className="fa-solid fa-user"></i>
                </div>

                <h3 className="fw-bold">
                  Welcome Back
                </h3>

                <p className="text-muted mb-0">
                  Login to your account
                </p>

              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* PASSWORD */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-pill py-3 fw-semibold"
                  disabled={loading}
                >

                  {loading
                    ? 'Logging in...'
                    : 'Login'}

                </button>

              </form>

              {/* REGISTER */}
              <div className="text-center mt-4">

                <p className="text-muted mb-0">

                  Don't have an account?{' '}

                  <Link
                    to="/register"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Register here
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default UserLogin;