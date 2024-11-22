import React from 'react'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Supplement Store App</h1>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Find the Best Supplements
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Explore our wide selection of premium-quality supplements to support your health and fitness goals.
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                  Shop Now
                </button>
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/500x300"
                  alt="Supplement Store"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Render featured product cards here */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/300x200"
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
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
              {/* Add more featured product cards */}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Render testimonial cards here */}
              <div className="bg-gray-100 rounded-lg p-6 shadow-lg">
                <p className="text-gray-700 mb-4">
                  "I've been using the supplements from the Supplement Store App and they've been a game-changer for my workout routine. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40x40"
                    alt="Customer 1"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      John Doe
                    </h4>
                    <p className="text-gray-700">Fitness Enthusiast</p>
                  </div>
                </div>
              </div>
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
};


