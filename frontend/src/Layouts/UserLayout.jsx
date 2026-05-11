
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserNavbar from '../Component/Users/UserNavbar';
import '../Component/Users/user.css';
export default function UserLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  return (
    <div className="user-app">
      <div className="user-shell">
        <UserNavbar />
        <main className="user-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}