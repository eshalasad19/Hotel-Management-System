import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AdminLayout from './Layouts/AdminLayout';

// Auth
import Login from './Component/Admin/Login';

// Admin Pages
import Dashboard from './Component/Admin/Dashboard';
import Rooms from './Component/Admin/Rooms';
import Bookings from './Component/Admin/Bookings';
import BookingNew from './Component/Admin/BookingNew';
import CheckinCheckout from './Component/Admin/CheckinCheckout';
import Users from './Component/Admin/users';
import Staff from './Component/Admin/Staff';
import Payments from './Component/Admin/Payments';
import Housekeeping from './Component/Admin/Housekeeping';
import Maintenance from './Component/Admin/Maintenance';
import Feedback from './Component/Admin/Feedback';
import Reports from './Component/Admin/Reports';

// User Pages
import UserDashboard from './Component/Users/UserDashboard';
import UserRooms from './Component/Users/Rooms';
import RoomDetails from './Component/Users/RoomDetails';
import UserBooking from './Component/Users/Booking';
import MyBookings from './Component/Users/MyBookings';
import UserPayments from './Component/Users/Payment';
import UserFeedback from './Component/Users/Feedback';
import UserProfile from './Component/Users/Profile';
import UserNotifications from './Component/Users/Notifications';
import UserServices from './Component/Users/Services';

// CSS — template ka
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.min.css';
import './assets/css/custom.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Panel */}
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
        </Route>
         <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="rooms" element={<UserRooms />} />
          <Route path="room/:id" element={<RoomDetails />} />
          <Route path="booking" element={<UserBooking />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="payment" element={<UserPayments />} />
          <Route path="feedback" element={<UserFeedback />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<UserNotifications />} />
          <Route path="services" element={<UserServices />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;