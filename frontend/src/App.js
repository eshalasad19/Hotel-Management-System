// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

// User pages
import Home from './Component/User/Home/Home';
import About from './Component/User/Home/About';
import RoomsPage from './Component/User/Home/RoomsPage';
import ServicesPage from './Component/User/Home/ServicesPage';
import RestaurantPage from './Component/User/Home/RestaurantPage';
import Gallery from './Component/User/Home/Gallery';
import Spa from './Component/User/Home/Spa';
import Faq from './Component/User/Home/Faq';
import ContactUs from './Component/User/Home/ContactUs';
import RoomDetailsPage from './Component/User/Home/RoomDetailsPage';
import BlogPage from './Component/User/Home/BlogPage';
import BlogDetailsPage from './Component/User/Home/BlogDetailsPage';
import BookingPage from './Component/User/Home/sections/Booking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth route */}
        <Route path="/login" element={<Login />} />

        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="room" element={<RoomsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="restaurant" element={<RestaurantPage />} />
          <Route path="spa" element={<Spa />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<Faq />} />
          <Route path="roomsdetails/:id" element={<RoomDetailsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetailsPage />} />
          <Route path="/booking/:roomId" element={<BookingPage />} />
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
        </Route>

        {/* Catch-all redirect for unknown URLs */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;