// src/Component/User/Home/UserLogin.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../../api/authApi.js';
import { useAuth } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Agar user kisi protected page pe jaana chahta tha toh wahan wapis bhejo
  const from = location.state?.from || '/home';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (data.token) {
        login(data.user, data.token);
        toast.success(`Welcome back, ${data.user.name}!`);
        navigate(from, { replace: true });
      } else {
        toast.error(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-header" style={{ padding: '80px 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="fw-700">Welcome Back</h3>
                <p className="text-muted">Login to your account</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-600">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-600"
                  disabled={loading}
                  style={{ padding: '12px', fontSize: '16px' }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

              </form>

              {/* Register Link */}
              <div className="text-center mt-3">
                <p className="text-muted mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-600">
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