import express from "express";
import listroutes from "./routes/lists.routes.js";
import ApiError from "./utils/apiError.js";
import userModel from "./models/users.models.js";

const app = express();
app.use(express.json());

/**
 * @route POST /api/users
 * @description Register a new user name and emal in the request body
 * @access Public
 **/
app.post("/api/auth/register", async (req, res) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).json({ ApiError: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ ApiError: "Email is required" });
  }
  if (name.trim().length < 2) {
    return res
      .status(400)
      .json({ ApiError: "Name must be at least 2 charcters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ ApiError: "In valid email format" });
  }

  const newUser = await userModel.create({ name, email });

  const token = JSON.stringify({ id: newUser._id, email: newUser.email });

  return res.status(201).json({
    message: "User registered sucessfully",
    user:newUser 
  });
});
app.use("/api/lists", listroutes);
export default app;
