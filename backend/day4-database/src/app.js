const express = require('express')
const UserModel = require('./models/user.model')

const app = express()

app.post('/create-user', async (req, res)=>{
    let { name, email, mobile, password}=req.body;

    let newUser = UserModel.create({
        name, email, password, mobile,
    });
})

module.exports = app;