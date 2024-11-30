import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);  // Append the search term to the query params
    navigate(`/listings?${urlParams.toString()}`);  // Redirect to the search page
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);  // Set the search term if it's in the URL
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to='/Home' className="flex items-center space-x-2">
          <h1 className="font-bold text-xl text-white flex flex-wrap">
            <span className="text-white">Sahand</span>
            <span className="text-yellow-200">Store</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-lg flex items-center space-x-2 shadow-md transition-transform transform hover:scale-105">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 p-2 text-gray-700 placeholder-gray-400 rounded-md shadow-md"
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
          />
          <button type="submit" className="text-slate-600 hover:text-white transition-colors">
            <FaSearch className="text-xl" />
          </button>
        </form>

        <ul className="flex gap-6 items-center">
          <Link to='/Home'>
            <li className="text-white text-lg font-medium hover:text-yellow-300 transition-colors">
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className="text-white text-lg font-medium hover:text-yellow-300 transition-colors">
              About
            </li>
          </Link>
          <Link to='/Profile'>
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover border-2 border-white shadow-lg transition-transform hover:scale-110"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-white font-medium hover:text-yellow-300 transition-colors">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
