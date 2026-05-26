const UserModel = require("../models/user.model");
let jwt = require("jsonwebtoken");
let registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;

    if (!email || !password || !mobile)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await UserModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User already registered try another email",
      });
    let newUser = await UserModel.create({
      name,
      email,
      password,
      mobile,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie


    return res.status(201).json({
      message: "User Created Sucessfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
};
