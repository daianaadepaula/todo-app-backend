import { Router } from "express";
import { createTaskController } from "../controllers/task.controller"

const router = Router();

router.post("/tasks", createTaskController);

export default router;
