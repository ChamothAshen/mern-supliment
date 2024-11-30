import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ListingsPage = () => {
  const [listings, setListings] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    brand: "",
    dosageForm: "",
    offer: "",
    available: "",
  });
  const [page, setPage] = useState(1);
  const [totalListings, setTotalListings] = useState(0);

  const limit = 9; // Number of listings per page

  // Fetch listings function
  const fetchListings = async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      searchTerm: filters.searchTerm,
      category: filters.category,
      brand: filters.brand,
      dosageForm: filters.dosageForm,
      offer: filters.offer,
      available: filters.available,
      limit,
      startIndex: (page - 1) * limit,
    });

    try {
      const response = await fetch(`/api/listing/get?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setListings(data.listings || []);
        setTotalListings(data.total || 0);
      } else {
        setError(data.message || "Error fetching listings");
      }
    } catch (err) {
      setError("Error fetching listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filters, page]); // Re-fetch when filters or page change

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <div className="space-y-4">
          <input
            type="text"
            id="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            placeholder="Search listings"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="Category"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            placeholder="Brand"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="dosageForm"
            value={filters.dosageForm}
            onChange={handleFilterChange}
            placeholder="Dosage Form"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="checkbox"
            id="offer"
            checked={filters.offer === "true"}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                offer: e.target.checked ? "true" : "",
              }))
            }
          />
          <label htmlFor="offer" className="ml-2">
            Offer
          </label>
          <input
            type="checkbox"
            id="available"
            checked={filters.available === "true"}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                available: e.target.checked ? "true" : "",
              }))
            }
          />
          <label htmlFor="available" className="ml-2">
            Available
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Listings Section */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Link
                to={`/listing/${listing._id}`}
                key={listing._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
              >
                <img
                  src={listing.imageUrls?.[0] || "placeholder.jpg"} // Fallback image
                  alt={listing.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
                  <p className="text-gray-600 mt-2">{listing.description}</p>
                  <p className="text-gray-800 font-semibold mt-2">${listing.regularPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No listings found.</div>
        )}

        {/* Pagination Section */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-3 bg-blue-500 text-white rounded-lg mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={listings.length < limit}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
