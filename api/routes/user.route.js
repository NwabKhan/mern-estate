import express from "express";
import {
  deleteUser,
  updateUser,
  getUserListings,
  getUser,
  getListings
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/update/:id", verifyToken, updateUser); //It first go to verifyToken then forwarded to updateUser
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser); //Get data to send message i.e Contact Landlord in Listing page
router.get("/get", getListings); //Get all listing based on Search
export default router;
