let express = require("express");
const {
  createListController,
  getAllListsController,
  updateListController,
} = require("../controllers/list.controller");

let router = express.Router();

router.post("/create", createListController);
router.get("/", getAllListsController);
router.put("/update/:id", updateListController);
module.export = router;
