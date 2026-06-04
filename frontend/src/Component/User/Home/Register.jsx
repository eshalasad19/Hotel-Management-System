// src/Component/User/Home/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/authApi.js';

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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 3500);
  };

  const handlePhoneInput = (val) => {
    const onlyNums = val.replace(/\D/g, '').slice(0, 11);
    if (onlyNums.length > 0 && !onlyNums.startsWith('03')) {
      return '03' + onlyNums.replace(/^0*3*/, '').slice(0, 9);
    }
    return onlyNums;
  };

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      setFormData({ ...formData, phone: handlePhoneInput(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^03\d{9}$/.test(formData.phone)) {
      showPopup('error', 'Phone number must be Pakistani (03XXXXXXXXX — 11 digits)');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showPopup('error', 'Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (data.user || data.message === 'User registered successfully') {
        showPopup('success', 'Registration successful! Please login.');
        setTimeout(() => navigate('/user-login'), 1500);
      } else {
        showPopup('error', data.message || 'Registration failed.');
      }
   } catch (err) {
      const msg = err.response?.data?.message || 'Server error. Please try again.';
      showPopup('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PopupAlert popup={popup} onClose={() => setPopup({ show: false, type: '', message: '' })} />
      <section className="page-header" style={{ padding: '80px 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg border-0 rounded-4 p-4">

                <div className="text-center mb-4">
                  <h3 className="fw-700">Create Account</h3>
                  <p className="text-muted">Register to book rooms & order food</p>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-600">Full Name</label>
                    <input type="text" name="name" className="form-control"
                      placeholder="Enter your full name"
                      value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-600">Email Address</label>
                    <input type="email" name="email" className="form-control"
                      placeholder="Enter your email"
                      value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-600">Phone Number</label>
                    <input type="tel" name="phone" className="form-control"
                      placeholder="Enter your phone number"
                      value={formData.phone} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-600">Password</label>
                    <input type="password" name="password" className="form-control"
                      placeholder="Create a password"
                      value={formData.password} onChange={handleChange} required minLength={6} />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-600">Confirm Password</label>
                    <input type="password" name="confirmPassword" className="form-control"
                      placeholder="Repeat your password"
                      value={formData.confirmPassword} onChange={handleChange} required />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-600"
                    disabled={loading} style={{ padding: '12px', fontSize: '16px' }}>
                    {loading ? 'Creating account...' : 'Register'}
                  </button>

                </form>

                <div className="text-center mt-3">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/user-login" className="text-primary fw-600">Login here</Link>
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

export default Register;