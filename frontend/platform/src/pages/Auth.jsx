import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/authService";
import logo from "../assets/logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    let response;
    if (isLogin) {
      response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
    } else {
      response = await registerUser(formData);
    }

    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage(isLogin ? "Login Successful!" : "Registration Successful!");
      setTimeout(() => {
        navigate("/communities");
      }, 1000);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Left Section - Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white px-16">
        <div className="w-full max-w-sm">
          {/* Welcome Message */}
          <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
          <p className="text-gray-600 mb-6">Login to your account.</p>

          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 text-center font-semibold ${
                isLogin ? "border-b-2 border-black" : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 text-center font-semibold ${
                !isLogin ? "border-b-2 border-black" : "text-gray-400"
              }`}
            >
              Register
            </button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <p className="text-center text-red-500 mb-4">{message}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                  placeholder="Enter username"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none"
                placeholder="Enter password"
              />
            </div>
            <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Community Info */}
      <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center px-16">
        <img src={logo} alt="Nexora Logo" className="w-24 h-24 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-center text-gray-300 text-base">
          Connect with people who share your interests. Create and join
          communities, share your thoughts, and engage in meaningful
          discussions.
        </p>
      </div>
    </div>
  );
};

export default Auth;
