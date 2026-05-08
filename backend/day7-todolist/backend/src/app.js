let express = require("express");
let listRoutes = require("./routes/list.routes");

let cors = require("cors");

let app = express();

app.use(
    cors({
        origin: "http://localhost:5173"
    })
)

app.use(express.json());

app.use('/api/lists', listRoutes);

module.exports = app;
