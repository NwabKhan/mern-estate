import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing); //The verified user can create Listing
router.get("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing); //Everyone can see it     
router.get('/get', getListings);
export default router;
