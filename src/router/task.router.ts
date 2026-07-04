import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createTask, getTask, updateTask, deleteTask } from "../controller/task.controller";

const router = express.Router();

router.get("/", authenticate, getTask);
router.post("/", authenticate, createTask);
router.delete("/:id", authenticate, deleteTask);
router.put("/:id", authenticate, updateTask);

export default router;