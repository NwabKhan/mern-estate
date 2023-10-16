import express from "express";
import { creatUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", creatUser);
router.post("/update/:id", verifyToken, updateUser); //It first go to verifyToken then forwarded to updateUser

export default router;
