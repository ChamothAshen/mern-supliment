import Listing from '../model/listing.model.js';
import { errorHandler } from '../utills/error.js';


export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);  
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

      export const updateListing = async (req, res, next) => {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
          return next(errorHandler(404, 'Listing not found!'));
        }
        if (req.user.id !== listing.userRef) {
          return next(errorHandler(401, 'You can only update your own listings!'));
        }

        try {
          const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
          res.status(200).json(updatedListing);
        } catch (error) {
          next(error);
        }
      };

      export const getListing = async (req, res, next) => {
        try {
          const listing = await Listing.findById(req.params.id);
          if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
          }
          res.status(200).json(listing);
        } catch (error) {
          next(error);
        }
      };
     export const getListings = async (req, res, next) => {
        try {
          // Parse query parameters
          const limit = parseInt(req.query.limit) || 9; // Default to 9 listings per page
          const startIndex = parseInt(req.query.startIndex) || 0; // Default to starting index 0
          const searchTerm = req.query.searchTerm || ""; // Default to an empty search term
      
          // Filters based on query parameters
          let offer = req.query.offer;
          let available = req.query.available;
      
          // Handle `offer` and `available` values properly
          offer = offer !== undefined ? offer === "true" : { $in: [true, false] };
          available = available !== undefined ? available === "true" : { $in: [true, false] };
      
          // Other optional filters
          const category = req.query.category;
          const brand = req.query.brand;
          const dosageForm = req.query.dosageForm;
      
          // Build the filter query
          const filterQuery = {
            name: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
            offer,
            available,
          };
      
          if (category) filterQuery.category = category;
          if (brand) filterQuery.brand = brand;
          if (dosageForm) filterQuery.dosageForm = dosageForm;
      
          // Fetch listings from the database
          const listings = await Listing.find(filterQuery)
            .sort({ createdAt: "desc" }) // Sort by newest first
            .limit(limit) // Limit results
            .skip(startIndex); // Skip results for pagination
      
          // Get total count of matching documents for pagination
          const total = await Listing.countDocuments(filterQuery);
      
          // Return the listings and total count as the response
          return res.status(200).json({
            listings,
            total,
          });
        } catch (error) {
          console.error("Error fetching listings:", error);
          return res.status(500).json({
            message: "An error occurred while fetching listings.",
            error: error.message,
          });
        }
      };
      