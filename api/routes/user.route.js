import express from "express";
import { creatUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", creatUser);

export default router;
