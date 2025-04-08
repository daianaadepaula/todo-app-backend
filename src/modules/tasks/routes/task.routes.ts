import { Router } from "express";
import { createTaskController, getTasksController } from "../controllers/task.controller"

const router = Router();

router.post("/tasks", createTaskController);
router.get("/tasks", getTasksController)

export default router;
