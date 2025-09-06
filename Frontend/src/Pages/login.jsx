import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/authContext"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loggedUser = await login(form.email, form.password); 
    if (!loggedUser) {
      setError("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/", { replace: true });
    } else if (user.role === "user") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative z-10 w-[90%] max-w-md p-8 bg-black/70 rounded-2xl shadow-lg flex flex-col items-center">
        <img
          src="/logo.png"
          className="w-28 h-28 object-cover rounded-full mb-4 shadow-md"
        />
        <h1 className="text-white text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <img src="/logo.png" alt="logo" className="w-7 h-7 rounded-full" />
          Welcome to Event X Studio
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="bg-gray-300 text-black font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-green-400 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
