require("dotenv").config();

const { connect } = require('mongoose');


let app = require('./src/app');
const connectDb = require('./src/config/db');

connectDb();

app.listen(3000, () => {
    console.log("Server is running on 3000");
})