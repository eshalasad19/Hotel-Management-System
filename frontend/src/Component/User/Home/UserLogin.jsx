// src/Component/User/Home/UserLogin.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../../api/authApi.js';
import { useAuth } from '../../../Context/AuthContext';

const PopupAlert = ({ popup, onClose }) => !popup.show ? null : (
  <div style={{
    position:'fixed',top:24,right:24,zIndex:99999,minWidth:300,maxWidth:380,
    background:'#fff',borderRadius:16,boxShadow:'0 8px 32px rgba(0,0,0,0.15)',
    padding:'18px 22px',display:'flex',alignItems:'center',gap:14,
    borderLeft:`4px solid ${popup.type==='success'?'#c9a96e':'#e74c3c'}`
  }}>
    <div style={{
      width:38,height:38,borderRadius:'50%',flexShrink:0,
      background:popup.type==='success'?'linear-gradient(135deg,#c9a96e,#a67c40)':'#e74c3c',
      display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:18,fontWeight:700
    }}>{popup.type==='success'?'✓':'✕'}</div>
    <div>
      <div style={{fontWeight:700,fontSize:14,color:'#1a1a2e',marginBottom:2}}>
        {popup.type==='success'?'Success':'Error'}
      </div>
      <div style={{fontSize:13,color:'#6c757d'}}>{popup.message}</div>
    </div>
    <button onClick={onClose}
      style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:'#adb5bd',fontSize:18}}>✕</button>
  </div>
);

const UserLogin = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 3500);
  };

  const from = location.state?.from || '/home';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.clear();
      const data = await loginUser(formData);

      if (data.token) {
        localStorage.setItem("Hoteluser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        login(data.user, data.token);
        showPopup('success', `Welcome back, ${data.user.name}!`);
        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else {
        showPopup('error', data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.log(err);
      showPopup('error', 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PopupAlert popup={popup} onClose={() => setPopup({ show: false, type: '', message: '' })} />
      <section
        className="page-header"
        style={{ padding: '80px 0', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#f8f9fa' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card shadow-lg border-0 rounded-4 p-4">

                {/* HEADER */}
                <div className="text-center mb-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                    style={{ width: '70px', height: '70px', fontSize: '28px' }}
                  >
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <h3 className="fw-bold">Welcome Back</h3>
                  <p className="text-muted mb-0">Login to your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email" name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={formData.email} onChange={handleChange} required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password" name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={formData.password} onChange={handleChange} required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 fw-semibold" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                      Register here
                    </Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserLogin;