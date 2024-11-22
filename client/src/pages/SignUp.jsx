import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logoo.png";
import OAuth from "../component/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (!acceptedTerms) {
      setError("You must accept the Terms and Privacy Policy.");
      return;
    }

    try {
      setError(null); // Reset errors
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Signup failed: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Signup successful:", data);
      setSuccess(true);
      navigate('/sing-in');
    } catch (err) {
      console.error(err);
      
      setError(err.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/supplements-background.png')",
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
          <img src={logo} alt="Supplement Store Logo" className="w-40 mb-6" />
          <h2 className="text-4xl font-bold mb-4">Welcome to SuperFit</h2>
          <p className="text-xl text-center max-w-md">
            Join our community and discover premium supplements for your fitness journey
          </p>
        </div>
      </div>
      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-white p-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Start your fitness journey with us
          </p>

          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm mt-4">
              Signup successful! You can now log in.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the Terms and Privacy Policy
              </label>
            </div>

            <button
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/singn-in"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex gap-4">
               <OAuth/>
          </div>
        </div>
      </div>
    </div>
  );
}
