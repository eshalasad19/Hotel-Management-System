const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./Config/Db');

dotenv.config();

const app = express();

// ============================================================
// SECURITY MIDDLEWARE (must be first)
// ============================================================
const {
  helmetConfig,
  generalLimiter,
  mongoSanitizeConfig,
  xssConfig,
  hppConfig,
  corsConfig,
  requestSizeConfig,
} = require('./Middleware/securityMiddleware');

app.use(helmetConfig);                            // Security headers
app.use(cors(corsConfig));                        // CORS
app.use(express.json({ limit: requestSizeConfig.json }));
app.use(express.urlencoded(requestSizeConfig.urlencoded));
app.use(mongoSanitizeConfig);                     // NoSQL injection protection
app.use(xssConfig);                               // XSS protection
app.use(hppConfig);                               // HTTP param pollution protection
app.use(generalLimiter);                          // Rate limiting (all routes)

// ============================================================
// DATABASE
// ============================================================
connectDB();

// ============================================================
// CRON JOBS
// ============================================================
require('./cron/checkinReminder');
require('./cron/checkoutReminder');
require('./cron/feedbackReminder');

// ============================================================
// STATIC FILES
// ============================================================
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.static('Public'));

// ============================================================
// ROUTES
// ============================================================
const { authLimiter } = require('./Middleware/securityMiddleware');

// Auth (with strict rate limiting)
const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authLimiter, authRoutes);

// Core
const roomRoutes = require('./Routes/roomRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

// Operations
const serviceRoutes = require('./Routes/serviceRoutes');
const maintenanceRoutes = require('./Routes/maintenanceRoutes');
const housekeepingRoutes = require('./Routes/housekeepingRoutes');
app.use('/api/services', serviceRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/housekeeping', housekeepingRoutes);

// Restaurant
const restaurantMenuRoutes = require('./Routes/restaurantMenuRoutes');
const restaurantOrderRoutes = require('./Routes/restaurantOrderRoutes');
app.use('/api/restaurant/menu', restaurantMenuRoutes);
app.use('/api/restaurant/orders', restaurantOrderRoutes);

// Notifications & Content
const notificationRoutes = require('./Routes/notificationRoutes');
const faqRoutes = require('./Routes/faqRoutes');
const hotelServiceRoutes = require('./Routes/hotelServiceRoutes');
const aboutUsRoutes = require('./Routes/aboutUsRoutes');
const settingsRoutes = require('./Routes/settingsRoutes');
const feedbackRoutes = require('./Routes/feedbackRoutes');
app.use('/api/notifications', notificationRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/hotel-services', hotelServiceRoutes);
app.use('/api/about', aboutUsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Audit Logs (Admin only)
const auditLogRoutes = require('./Routes/auditLogRoutes');
app.use('/api/audit-logs', auditLogRoutes);

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hotel Management API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// 404 HANDLER
// ============================================================
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);

  if (err.message?.includes('CORS')) {
    return res.status(403).json({ success: false, message: 'CORS: Origin not allowed.' });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ============================================================
// START SERVER
// ============================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
