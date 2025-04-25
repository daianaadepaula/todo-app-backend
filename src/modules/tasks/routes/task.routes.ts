import { Router } from "express";
import { createTaskController, getTasksController, updateTaskController, updateTaskStatusController, deleteTaskController } from "../controllers/task.controller"
import { validate } from "../../../middlewares/task.validate"
import { createTaskSchema, updateTaskSchema, completedTaskSchema } from "../validators/task.schema";

const router = Router();

router.post("/tasks", validate(createTaskSchema), createTaskController);
router.get("/tasks", getTasksController)
router.put("/tasks/:id", validate(updateTaskSchema), updateTaskController)
router.patch("/tasks/:id/completed", validate(completedTaskSchema), updateTaskStatusController)
router.delete("/tasks/:id", deleteTaskController)

export default router;
