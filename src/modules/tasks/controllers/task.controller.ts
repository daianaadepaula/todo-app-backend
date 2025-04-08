import { Request, Response } from "express"
import { TaskService } from "../services/task.services"
import { CreateTaskDTO } from "../dtos/task.dto";
import { TaskRepository } from "../repositories/task.repository";

const repository = new TaskRepository();
const service = new TaskService(repository);

export async function createTaskController(req: Request, res: Response): Promise<void> {
	try {
		const data: CreateTaskDTO = req.body;
		const result = await service.createTask(data);
		res.status(201).json(result); 

	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
}

export async function getTasksController(req: Request, res: Response): Promise<void> {
	try {
		const result = await service.getAllTasks();
		res.status(200).json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
}