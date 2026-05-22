import { Outlet } from 'react-router-dom';
import Navbar from '../Component/User/Layout/Navbar';
import Footer from '../Component/User/Layout/Footer';
import BackToTop from '../Component/User/Layout/BackToTop';

export default function UserLayout() {
  return (
    <div className="user-app">
      <Navbar />
      <main className="user-main">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
