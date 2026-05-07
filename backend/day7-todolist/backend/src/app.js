let express = require("express");
let listRoutes = require("./routes/list.routes");
let app = express();
let cors = require("cors");

app.use(express.json());

app.use('/api/lists', listRoutes);

module.exports = app;
