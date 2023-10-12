// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
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
app.listen(4000, (req, res) => {
  console.log("Runin");
});
app.use(express.json()); //It allow json as input to the server

app.use("/api/user", userRouter);
app.use("/api/signup", authRouter);
