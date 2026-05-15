import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Admin/navbar';
import Sidebar from '../Component/Admin/sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token) { navigate('/login'); return; }
    const allowedRoles = ['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance'];
    if (!allowedRoles.includes(user.role)) { navigate('/login'); return; }

    // Set template attributes
    document.documentElement.setAttribute('data-layout', 'vertical');
    document.documentElement.setAttribute('data-topbar', 'light');
    document.documentElement.setAttribute('data-sidebar', 'dark');
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
    document.documentElement.setAttribute('data-sidebar-image', 'none');
    document.documentElement.setAttribute('data-preloader', 'disable');
    document.documentElement.setAttribute('data-theme', 'default');
    document.documentElement.setAttribute('data-theme-colors', 'default');

    // Hamburger toggle
    const hamburger = document.getElementById('topnav-hamburger-icon');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        const body = document.body;
        if (window.innerWidth >= 768) {
          body.classList.toggle('vertical-collpsed');
          body.classList.toggle('sidebar-enable');
        } else {
          body.classList.toggle('sidebar-enable');
        }
      });
    }

    // Vertical overlay click — close sidebar on mobile
    const overlay = document.querySelector('.vertical-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-sidebar-enable');
      });
    }

    // Sidebar hamburger inside sidebar
    const verticalHover = document.getElementById('vertical-hover');
    if (verticalHover) {
      verticalHover.addEventListener('click', () => {
        const sidebarSize = document.documentElement.getAttribute('data-sidebar-size');
        if (sidebarSize === 'sm-hover-active') {
          document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        } else {
          document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
        }
      });
    }

    // Mobile hamburger
    const topHamburger = document.querySelector('.topnav-hamburger');
    if (topHamburger) {
      topHamburger.addEventListener('click', () => {
        document.body.classList.toggle('vertical-sidebar-enable');
      });
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
      <div className="vertical-overlay"></div>
    </div>
  );
};

export default AdminLayout;