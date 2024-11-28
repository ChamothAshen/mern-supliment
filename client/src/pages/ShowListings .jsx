import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ShowListings() {
  const location = useLocation();
  const { id } = useParams(); // Get the user ID from the URL
  const [listings, setListings] = useState(location.state?.listings || []);
  const [loading, setLoading] = useState(!location.state?.listings);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!location.state?.listings) {
      // Fetch listings if not provided via state
      const fetchListings = async () => {
        try {
          const res = await fetch(`/api/user/listings/${id}`);
          if (!res.ok) throw new Error("Failed to fetch listings");
          const data = await res.json();
          setListings(data.data || []);
        } catch (err) {
          console.error("Error fetching listings:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchListings();
    }
  }, [id, location.state]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching listings.Please try again later.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl text-center text-green-400 font-bold mb-6">Listings for Sale</h1>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-lg shadow-lg p-6">
                 {listing.imageUrls && (
                  <img
                    src={listing.imageUrls}
                    alt={listing.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
          <div className="mb-4">
               <h2 className="text-2xl font-bold text-gray-800 mb-2">{listing.name}</h2>
                </div>
             {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                    onClick={() => handleUpdate(listing)}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                    Update
                    </button>
                    <button
                    onClick={() => handleDelete(listing._id)}
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                    Delete
                    </button>
                </div>
        </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No listings available.</p>
        )}
      </div>
    </div>
  );
}
