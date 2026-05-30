import express from "express";
import createListController from "../controllers/list.controllers.js"
const router = express.Router();

router.post("/", createListController);

export default router;
