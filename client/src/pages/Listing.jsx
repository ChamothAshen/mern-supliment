import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaShare, FaPhoneAlt } from "react-icons/fa";
import "swiper/css/bundle";
import Contact from "../component/Contact";

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const params = useParams();

  // Fetch the listing data
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        if (!res.ok) throw new Error("Failed to fetch listing data.");
        const data = await res.json();
        setListing(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching listing:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <p className="text-center my-7 text-2xl animate-bounce">Loading...</p>;
  }

  if (error || !listing) {
    return (
      <p className="text-center my-7 text-2xl text-red-500">
        Error fetching listing! Please try again later.
      </p>
    );
  }

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Full-Width Image Slider */}
        <div className="relative">
          <Swiper navigation modules={[Navigation]} className="w-full h-[500px] sm:h-[600px]">
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-full"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <FaShare
              className="text-gray-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
            {copied && <span className="absolute text-xs text-green-500 mt-2">Link Copied!</span>}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{listing.name}</h1>
          <p className="text-gray-700 mb-6">{listing.description}</p>

          {/* Price and Stock */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-semibold text-green-500">
              ${listing.discountPrice || listing.regularPrice}
            </span>
            {listing.discountPrice && (
              <span className="text-lg line-through text-gray-400">
                ${listing.regularPrice}
              </span>
            )}
            {listing.offer && <span className="text-lg text-red-500">Special Offer</span>}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <p className="text-gray-600">
              <strong>Category:</strong> {listing.category}
            </p>
            <p className="text-gray-600">
              <strong>Brand:</strong> {listing.brand}
            </p>
            <p className="text-gray-600">
              <strong>Stock:</strong> {listing.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-gray-600">
              <strong>Dosage Form:</strong> {listing.dosageForm}
            </p>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => alert("Added to Favorites!")}
            >
              Add to Favorites
            </button>

            {/* Show Contact Form if Current User is Listing Owner */}
            {currentUser && listing.userRef !== currentUser._id ? (
              <button
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
                onClick={() => setContact(!contact)}
              >
                <FaPhoneAlt />
                Contact Seller
              </button>
            ) : (
              <p className="text-gray-500">You are owner of this listing.</p>
            )}
          </div>

          {/* Contact Form */}
          {contact && (
            <div className="mt-6 p-4 border rounded-md bg-gray-100 shadow-inner">
              <Contact listing={listing} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
