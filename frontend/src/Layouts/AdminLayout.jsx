import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Component/Admin/Sidebar';
import Navbar from '../Component/Admin/Navbar';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token) {
      navigate('/login');
      return;
    }
    const allowedRoles = ['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance'];
    if (!allowedRoles.includes(user.role)) {
      navigate('/login');
    }
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
    </div>
  );
};

export default AdminLayout;