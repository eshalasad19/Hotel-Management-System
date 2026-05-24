const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./Config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(
  '/Uploads',
  express.static(
    path.join(__dirname, 'Uploads')
  )
);

// Static files 
app.use(express.static('Public'));

// Auth Routes
const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

// Room Routes
const roomRoutes = require('./Routes/roomRoutes');
app.use('/api/rooms', roomRoutes);
// Booking Routes
const bookingRoutes = require('./Routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);
// Payment Routes
const paymentRoutes = require('./Routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);
// Feedback Routes
const feedbackRoutes = require('./Routes/feedbackRoutes');
app.use('/api/feedbacks', feedbackRoutes);
// Restaurant Routes
const restaurantMenuRoutes = require('./Routes/restaurantMenuRoutes');
const restaurantOrderRoutes = require('./Routes/restaurantOrderRoutes');
app.use('/api/restaurant/menu', restaurantMenuRoutes);
app.use('/api/restaurant/orders', restaurantOrderRoutes);

// Settings Routes
const settingsRoutes = require('./Routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hotel Management API is running...');
});
const serviceRoutes = require('./Routes/serviceRoutes');
const maintenanceRoutes = require('./Routes/maintenanceRoutes');
const housekeepingRoutes = require('./Routes/housekeepingRoutes');

app.use('/api/services', serviceRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/housekeeping', housekeepingRoutes);

const notificationRoutes = require('./Routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

// FAQ Routes
const faqRoutes = require('./Routes/faqRoutes');
app.use('/api/faqs', faqRoutes);

// Hotel Services Routes
const hotelServiceRoutes = require('./Routes/hotelServiceRoutes');
app.use('/api/hotel-services', hotelServiceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});