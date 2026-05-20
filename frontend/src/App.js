import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './Layouts/AdminLayout';
// import UserLayout from './Layouts/UserLayout';

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
import HomePage from './Component/UserPanel/Home';
import ContactPage from './Component/UserPanel/Contact';
import AboutPage from './Component/UserPanel/About';
import RoomsPage from './Component/UserPanel/Room';
import ServicesPage from './Component/UserPanel/Services';
import RestaurantPage from './Component/UserPanel/Restaurant';
import SpaPage from './Component/UserPanel/Spa';
import BlogPage from './Component/UserPanel/Blog';
import Navbar from './Component/UserPanel/Navbar';

// User pages
// import Home from './Component/User/Home/Home';
// import ContactUs from './Component/User/Home/ContactUs';
// import About from './Component/User/Home/About';
// import RoomsPage from './Component/User/Home/RoomsPage';
// import ServicesPage from './Component/User/Home/ServicesPage';
// import RestaurantPage from './Component/User/Home/RestaurantPage';
// import Gallery from './Component/User/Home/Gallery';
// import Spa from './Component/User/Home/Spa';
// import Faq from './Component/User/Home/Faq';
// import RoomDetailsPage from './Component/User/Home/RoomDetailsPage';
// import BlogDetailsPage from './Component/User/Home/BlogDetailsPage';
// import BlogPage from './Component/User/Home/BlogPage';



// CSS/JS: public/index.html → /assets (admin), /user-assets (hotel site)
// Images: use userAsset() from utils/userAssets.js → public/user-assets/images/

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER HOME */}
        <Route
          path="/user"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
         <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <BlogPage />
            </>
          }
        />

        {/* CONTACT */}
        <Route
          path="/contact-us"
          element={
            <>
              <Navbar />
              <ContactPage />
            </>
          }
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <AboutPage />
            </>
          }
        />

        {/* ROOMS */}
        <Route
          path="/Rooms"
          element={
            <>
              <Navbar />
              <RoomsPage />
            </>
          }
        />

        {/* SERVICES */}
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <ServicesPage />
            </>
          }
        />

        {/* RESTAURANT */}
        <Route
          path="/restaurant"
          element={
            <>
              <Navbar />
              <RestaurantPage />
            </>
          }
        />

        {/* SPA */}
        <Route
          path="/spa"
          element={
            <>
              <Navbar />
              <SpaPage />
            </>
          }
        />
        {/* <Route path="/roomsdetails/:id" element={<RoomDetailsPage />} /> */}
        <Route path="/blog" element={<BlogPage />} />
        {/* <Route path="/blog/:id" element={<BlogDetailsPage />} />   */}


        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Admin panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
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

        {/* Unknown URLs → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
