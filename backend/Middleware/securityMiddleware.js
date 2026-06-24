const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// ============================================================
// 1. HELMET — HTTP security headers
// ============================================================
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      scriptSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Required for image uploads
});

// ============================================================
// 2. RATE LIMITERS
// ============================================================

// General API — 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login/Register — 10 attempts per 15 minutes (brute force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed requests
});

// Password reset — 5 attempts per hour
const passwordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many password reset attempts. Please try again after 1 hour.',
  },
});

// ============================================================
// 3. INPUT SANITIZATION
// ============================================================

// Prevent MongoDB operator injection ($where, $gt attacks)
const mongoSanitizeConfig = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`[SECURITY] MongoDB injection attempt blocked. Key: ${key}, IP: ${req.ip}`);
  },
});

// Prevent XSS attacks (strip <script> tags etc.)
const xssConfig = xss();

// Prevent HTTP Parameter Pollution
const hppConfig = hpp({
  whitelist: ['sort', 'fields', 'page', 'limit', 'status', 'type'], // allowed duplicate params
});

// ============================================================
// 4. CORS CONFIG (production-ready)
// ============================================================
const corsConfig = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000'];

    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// ============================================================
// 5. REQUEST SIZE LIMIT
// ============================================================
const requestSizeConfig = {
  json: '10mb',   // For base64 image uploads
  urlencoded: { extended: true, limit: '10mb' },
};

module.exports = {
  helmetConfig,
  generalLimiter,
  authLimiter,
  passwordLimiter,
  mongoSanitizeConfig,
  xssConfig,
  hppConfig,
  corsConfig,
  requestSizeConfig,
};
