// src/api/authApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/auth';

// Register
export const registerUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/register`, formData);
  return res.data;
};

// Login
export const loginUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/login`, formData);
  return res.data;
};

// Get Profile
export const getProfile = async (token) => {
  const res = await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};