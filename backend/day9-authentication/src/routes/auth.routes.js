let express = require("express");
const { registerController } = require("../controllers/auth.controllers");

let router = express.Router();

router.get("/register", registerController)

module.exports = router;