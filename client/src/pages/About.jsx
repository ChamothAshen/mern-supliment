import React from 'react';
import { motion } from 'framer-motion';
import ceo from '../assets/ceo2.jpg';
import nextp from '../assets/ceo.jpg';
import project from '../assets/project.jpg';
export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 text-center"
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          >
            About Us
          </motion.h1>
        </div>
      </header>

      <main>
        {/* About Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-teal-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              <h2 className="text-4xl font-extrabold mb-4">
                Our Mission
              </h2>
              <p className="text-lg mb-8">
                At Supplement Store, our mission is to provide you with the highest-quality supplements to fuel your health and fitness journey. We believe in empowering individuals to achieve their goals with the best nutrition and products.
              </p>
              <motion.button 
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.1 }}  // Hover animation
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-gray-900 text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              Meet the Team
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={ceo}
                  alt="Team Member 1"
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                <p className="text-gray-700">Founder & CEO</p>
                <p className="text-gray-600 mt-4">
                John Doe has been passionate about fitness and wellness for over a decade. He is committed to providing top-tier supplements to help people lead healthier lives.
                </p>
              </motion.div>
              {/* Team Member 2 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src= {nextp}
                  alt="Team Member 2"
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">Jane Smith</h3>
                <p className="text-gray-700">Product Manager</p>
                <p className="text-gray-600 mt-4">
                  Jane brings years of experience in the supplement industry. Her focus is on ensuring that all products are of the highest quality and meet our customers' needs.
                </p>
              </motion.div>
              {/* Team Member 3 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={project}
                  alt="Team Member 3"
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">Michael Lee</h3>
                <p className="text-gray-700">Marketing Specialist</p>
                <p className="text-gray-600 mt-4">
                  Michael is passionate about spreading the word about supplements that work. His goal is to help customers make informed decisions about their health.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 bg-gradient-to-r from-teal-400 to-blue-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              <h2 className="text-4xl font-extrabold mb-4">
                Our Vision
              </h2>
              <p className="text-lg mb-8">
                We envision a world where everyone has access to quality supplements that enhance their life. Our goal is to make premium products available at affordable prices to help individuals reach their fullest potential.
              </p>
            </motion.div>
          </div>
        </section>
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
