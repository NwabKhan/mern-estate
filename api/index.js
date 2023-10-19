// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path"; //To get dirtory name
dotenv.config();
mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const app = express();
app.listen(5000, (req, res) => {
  console.log("Runin");
});
app.use(express.json()); //It allow json as input to the server
app.use(cookieParser()); //To get the info from the cookie

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

const __dirname = path.resolve();
// Creat a static folder and join it to /client/dist
app.use(express.static(path.join(__dirname, "/client/dist"))); //if we use creat-reacy-app instead of vite it would be build file instead of dist

//If we have any other address except the top 3(api/..)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // same as '/client/dist/index.html
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
