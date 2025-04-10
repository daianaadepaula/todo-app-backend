import { Router } from "express";
import { createTaskController, getTasksController, updateTaskController, updateTaskStatusController } from "../controllers/task.controller"

const router = Router();

router.post("/tasks", createTaskController);
router.get("/tasks", getTasksController)
router.put("/tasks/:id", updateTaskController)
router.patch("/tasks/:id/completed", updateTaskStatusController)

export default router;
