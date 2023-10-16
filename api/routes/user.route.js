import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/update/:id", verifyToken, updateUser); //It first go to verifyToken then forwarded to updateUser
router.delete("/delete/:id",verifyToken, deleteUser);

export default router;
