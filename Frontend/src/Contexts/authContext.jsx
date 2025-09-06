import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") return jwt_decode(token); 
      return null;
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token"); 
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const token = res.data.token;
      if (!token) throw new Error("no token received");

      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      setUser(decoded);
      return decoded; 
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return null;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
