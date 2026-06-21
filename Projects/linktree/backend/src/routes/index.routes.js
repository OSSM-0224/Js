import { Router } from "express";
import authRoutes from "./auth.routes.js";
import linkRoutes from "./link.routes.js";
import analyticsRoutes from "./analytics.routes.js";
const router = Router();
router.use("/auth", authRoutes);
router.use("/links", linkRoutes);
router.use("/link", analyticsRoutes);
export default router;
