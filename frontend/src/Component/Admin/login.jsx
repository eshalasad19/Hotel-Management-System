import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const role = user.role;
      if (role === 'admin' || role === 'manager') {
        navigate('/admin/dashboard');
      } else if (role === 'receptionist') {
        navigate('/admin/bookings');
      } else if (role === 'housekeeping') {
        navigate('/admin/housekeeping');
      } else if (role === 'maintenance') {
        navigate('/admin/maintenance');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-page-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">

              <div className="text-center mb-4 mt-4">
                <h3 className="fw-bold">🏨 Hotel Management System</h3>
                <p className="text-muted">Sign in to access your dashboard</p>
              </div>

              <div className="card mt-2">
                <div className="card-body p-4">

                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}

                  <div className="p-2">
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type={showPass ? 'text' : 'password'}
                            className="form-control pe-5"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                          >
                            <i className={`ri-${showPass ? 'eye-off' : 'eye'}-fill align-middle`}></i>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit" disabled={loading}>
                          {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-muted mb-0">&copy; 2024 Hotel Management System</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;