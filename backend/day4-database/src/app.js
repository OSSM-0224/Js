const express = require("express");
const UserModel = require("./models/user.model");

const app = express();

app.use(express.json);

app.post("/create-users", async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

    let newUser = await UserModel.create({
      name,
      email,
      password,
      mobile,
    });

    return res.status(201).json({
      message: "New user has been sucessfullly connected",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "INternal server error",
    });
  }
});

app.get('/get-users', async(req, res) =>{
    let users = await UserModel.find();

    return res.status(200).json({
        message:"users fetched sucesfully",
        user: users
    })
});

app.get('/get-users/:index', async (req, res) => {
    let {index} = req.params;
    let users = await UserModel.findById(index); 

    return res.status(200).json({
        message:`user has been fetched sucessfully=> ${index}`,
        users
    })

})

module.exports = app;
