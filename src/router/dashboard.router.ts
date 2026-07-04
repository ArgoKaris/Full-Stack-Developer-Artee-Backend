import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getDashboardSummary } from "../controller/dashboard.controller";

const router = express.Router();

router.get("/", authenticate, getDashboardSummary);

export default router;