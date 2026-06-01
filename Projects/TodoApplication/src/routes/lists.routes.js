import express from "express";
import {
  createListController,
  getAllListController,
} from "../controllers/list.controllers.js";
const router = express.Router();

router.post("/", createListController); //Create the lists
router.get("/", getAllListController);//Gets all the lists

export default router;
