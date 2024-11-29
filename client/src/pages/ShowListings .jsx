import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ShowListings() {
  const location = useLocation();
  const { id } = useParams(); // Get the user ID from the URL
  const [listings, setListings] = useState(location.state?.listings || []);
  const [loading, setLoading] = useState(!location.state?.listings);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!location.state?.listings) {
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

  const handleListingDelete = async (listingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Error:", data.message);
        alert(`Error: ${data.message}`);
        return;
      }
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
      alert("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error.message);
      alert("Failed to delete the listing. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-xl mt-6 animate-bounce">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500 mt-6">Error fetching listings. Please try again later.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-center text-blue-600 font-bold mb-8">
          Listings for Sale
        </h1>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition duration-300"
              >
                {listing.imageUrls && (
                  <img
                    src={listing.imageUrls}
                    alt={listing.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {listing.name}
                </h2>
                <div className="flex justify-between mt-4">
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg mt-10">
            No listings available.
          </p>
        )}
      </div>
    </div>
  );
}
