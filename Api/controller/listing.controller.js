import Listing from '../model/listing.model.js';
//import { errorHandler } from '../utills/error.js';


export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
