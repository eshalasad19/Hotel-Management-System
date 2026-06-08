# 🏨 Hotel Management System

A full-stack Hotel Management System developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The system provides hotel administrators and customers with a complete platform for managing hotel operations, room bookings, restaurant services, payments, housekeeping, maintenance requests, and more.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- View Available Rooms
- Room Details Page
- Online Room Booking
- Restaurant Menu Browsing
- Service Requests
- Contact Us & FAQs
- User Profile Management
- Feedback Submission

### 🛠️ Admin Features
- Dashboard Overview
- Room Management
- Booking Management
- Check-In / Check-Out Tracking
- User Management
- Hotel Services Management
- Restaurant Menu Management
- Restaurant Order Management
- Housekeeping Management
- Maintenance Request Management
- Payment Management
- Feedback Management
- FAQ Management
- Settings Management
- Reports Generation

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer

### Database
- MongoDB Atlas / Local MongoDB

---

## 📂 Project Structure

```
Hotel-Management-System
│
├── frontend
│   ├── src
│   │   ├── Component
│   │   │   ├── Admin
│   │   │   └── User
│   │   ├── Layouts
│   │   ├── Context
│   │   ├── Hooks
│   │   ├── API
│   │   └── Utils
│
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Routes
│   ├── Config
│   ├── Middleware
│   └── Cron Jobs
│
└── README.md
```

---

## 📋 Modules

### Room Module
- Add Room
- Edit Room
- Delete Room
- Room Availability

### Booking Module
- Create Booking
- Manage Bookings
- Check-In / Check-Out

### Restaurant Module
- Restaurant Menu
- Food Ordering System

### Service Module
- Hotel Services
- Service Requests

### Housekeeping Module
- Cleaning Requests
- Room Maintenance Tracking

### Payment Module
- Payment Records
- Transaction Management

### Feedback Module
- Customer Reviews
- Ratings Management

---

## 🔐 Authentication

The system implements authentication and authorization for:

- Admin Users
- Registered Customers

Features include:
- Login
- Registration
- Protected Routes
- Session Management

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/hotel-management-system.git
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

## 📊 Future Enhancements

- Online Payment Gateway Integration
- Real-Time Notifications
- Hotel Analytics Dashboard
- Multi-Hotel Support
- Mobile Application
- AI-Based Room Recommendations

---

## 📸 Screens Included

- Home Page
- Rooms Page
- Room Details Page
- Restaurant Page
- Contact Page
- Admin Dashboard
- Booking Management
- Payment Management
- Housekeeping Management

---

## 📄 License

This project is developed for educational and learning purposes.
