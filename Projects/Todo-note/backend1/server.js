import express from "express";
import app from "./src/app.js";
import connectDB from "../backend/src/config/db.js";

connectDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server has been connected to Port ${PORT}`);
});
