import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Admin/Navbar';
import Sidebar from '../Component/Admin/Sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token) { navigate('/login'); return; }
    const allowedRoles = ['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance'];
    if (!allowedRoles.includes(user.role)) { navigate('/login'); }

    // Template JS initialize karo
    if (window.AOS) window.AOS.init();
  }, []);

  return (
    <div id="layout-wrapper">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      <div className="vertical-overlay"></div>
    </div>
  );
};

export default AdminLayout;