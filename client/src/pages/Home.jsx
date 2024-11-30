import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import plastic  from "../assets/plastic-bottle-pills.jpg"
import product1 from "../assets/product1.jpg"
import project from '../assets/project.jpg';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900" 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          >
            Supplement Store App
          </motion.h1>
        </div>
      </header>

      <main>
        {/* Hero Section with animated background */}
        <motion.div 
          className="py-16 bg-gradient-to-r from-blue-500 to-teal-400"
          animate={{ backgroundPosition: '400% 0' }} // Adds motion to background gradient
          transition={{ duration: 5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="flex flex-col justify-center text-white"
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, type: 'spring', stiffness: 100 }}
              >
                <h2 className="text-4xl font-extrabold text-white mb-4">
                  Find the Best Supplements
                </h2>
                <p className="text-lg mb-8">
                  Explore our wide selection of premium-quality supplements to support your health and fitness goals.
                </p>
                <Link to="/listings">
                <motion.button 
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}  // Active hover effect
                >
                  Shop Now
                </motion.button>
                </Link>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, type: 'spring', stiffness: 100 }}
              >
                <img
                  src={plastic}
                  alt="Supplement Store"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Featured Products */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              Featured Products
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Render featured product cards here */}
              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }} // Hover zoom effect
              >
                <img
                  src={product1}
                  alt="Product 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Product 1
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Description of Product 1
                  </p>
                  <motion.button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                    whileHover={{ scale: 1.1 }}  // Active hover effect for button
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
              {/* Add more featured product cards */}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              What Our Customers Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Render testimonial cards */}
              <motion.div
                className="bg-gray-100 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}  // Hover zoom effect for cards
              >
                <p className="text-gray-700 mb-4">
                  "I've been using the supplements from the Supplement Store App and they've been a game-changer for my workout routine. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <img 
                   src={project}
                    alt="Customer 1"
                    className="rounded-full mr-4"
                  />
                </div>
              </motion.div>
              {/* Add more testimonial cards */}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">
            &copy; 2023 Supplement Store App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
