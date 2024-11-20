import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logoo.png";
import background from "../assets/back.jpg";

function Signin() {   
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Debugging: log the response from the backend
      console.log('Response Data:', data);

      if (res.status !== 200) {
        setLoading(false);
        setError(data.message || 'Login failed');
        return;
      }

      // Store the token or user data in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      setLoading(false);
      alert("Login successful! Welcome to SuperFit");
      console.log("Login successful! Welcome to SuperFit")
      navigate('/Home');
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Illustration */}
      <div
        className="w-1/2 bg-gray-200 relative"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
          <div>
            <img src={logo} alt="Supplement Store Logo" className="w-24 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-black">Welcome to SuperFit</h2>
            <p className="text-xl mb-8 text-black">Discover premium supplements for your fitness journey</p>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Username or Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                New to SuperFit?{' '}
                <Link to="/sign-up" className="text-blue-700 hover:text-blue-800">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signin;
