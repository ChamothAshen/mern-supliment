import mongoose from 'mongoose';

const listingSchema  = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., "Vitamins", "Protein", "Energy Boosters"
    },
    brand: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number, // Optional field for discounted price
    },
    stock: {
      type: Number,
      required: true, // Inventory count
    },
    dosageForm: {
      type: String,
      required: true, // e.g., "Capsules", "Powder", "Liquid"
    },
    available: {
      type: Boolean,
      required: true, // Whether the product is in stock or not
    },
    offer: {
        type: Boolean,
        required: true,
      },
    imageUrls: {
      type: Array,
      required: true, // Array of image URLs for the product
    },
    userRef: {
      type: String,
      required: true, // Reference to the user (admin/seller) who added the listing
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;