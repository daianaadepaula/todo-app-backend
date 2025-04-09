import { Router } from "express";
import { createTaskController, getTasksController, updateTaskController } from "../controllers/task.controller"

const router = Router();

router.post("/tasks", createTaskController);
router.get("/tasks", getTasksController)
router.put("/tasks/:id", updateTaskController)

export default router;
