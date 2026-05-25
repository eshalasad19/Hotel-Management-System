// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './Context/AuthContext';

// Layouts
import AdminLayout from './Layouts/AdminLayout';
import UserLayout from './Layouts/UserLayout';

// Auth
import Login from './Component/Admin/login';

// Admin pages
import Dashboard from './Component/Admin/Dashboard';
import Rooms from './Component/Admin/rooms';
import Bookings from './Component/Admin/bookings';
import BookingNew from './Component/Admin/BookingNew';
import CheckinCheckout from './Component/Admin/CheckinCheckout';
import Users from './Component/Admin/users';
import Staff from './Component/Admin/staff';
import Payments from './Component/Admin/payments';
import Housekeeping from './Component/Admin/housekeeping';
import Maintenance from './Component/Admin/Maintenance';
import Feedback from './Component/Admin/Feedback';
import Reports from './Component/Admin/Reports';
import Settings from './Component/Admin/Settings';
import RestaurantMenu from './Component/Admin/RestaurantMenu';
import RestaurantOrders from './Component/Admin/RestaurantOrders';
import Services from './Component/Admin/Services';
import FAQs from './Component/Admin/FAQs';
import HotelServices from './Component/Admin/HotelServices';
import AboutUs from './Component/Admin/AboutUs';

// User pages
import Home from './Component/User/Home/Home';
import About from './Component/User/Home/About';
import RoomsPage from './Component/User/Home/RoomsPage';
import RestaurantPage from './Component/User/Home/RestaurantPage';
import Faq from './Component/User/Home/Faq';
import ContactUs from './Component/User/Home/ContactUs';
import RoomDetailsPage from './Component/User/Home/RoomDetailsPage';
import BookingPage from './Component/User/Home/sections/Booking';
import UserLogin from './Component/User/Home/UserLogin';
import Register from './Component/User/Home/Register';

// ✅ Profile Page
import ProfilePage from './Component/User/Home/ProfilePage';
import ServicesPage from './Component/User/Home/ServicesPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Admin login */}
          <Route path="/login" element={<Login />} />

          {/* User Auth routes */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />

          {/* User routes */}
          <Route path="/" element={<UserLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="room" element={<RoomsPage />} />
            <Route path="restaurant" element={<RestaurantPage />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="faq" element={<Faq />} />
             <Route path="services" element={<ServicesPage />} />
            <Route path="roomsdetails/:id" element={<RoomDetailsPage />} />
            <Route path="booking/:roomId" element={<BookingPage />} />

            {/* ✅ Profile Route */}
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="booking-new" element={<BookingNew />} />
            <Route path="checkin-checkout" element={<CheckinCheckout />} />
            <Route path="users" element={<Users />} />
            <Route path="staff" element={<Staff />} />
            <Route path="payments" element={<Payments />} />
            <Route path="housekeeping" element={<Housekeeping />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="restaurant-menu" element={<RestaurantMenu />} />
            <Route path="restaurant-orders" element={<RestaurantOrders />} />
            <Route path="services" element={<Services />} />
            <Route path="/admin/faqs" element={<FAQs />} />
            <Route path="/admin/hotel-services" element={<HotelServices />} />
            <Route path="/admin/about-us" element={<AboutUs />} />

            
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;