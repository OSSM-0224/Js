import express from "express";
import app from "./src/app.js";

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server has been connected to Port ${PORT}`);
});
