// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // initial load check

  // App open hote hi localStorage se user aur token load karo
  useEffect(() => {
    const savedToken = localStorage.getItem('hotelToken');
    const savedUser = localStorage.getItem('hotelUser');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function — backend se token aur user milta hai
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('hotelToken', userToken);
    localStorage.setItem('hotelUser', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hotelToken');
    localStorage.removeItem('hotelUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — easily use karo kisi bhi component mein
export const useAuth = () => useContext(AuthContext);