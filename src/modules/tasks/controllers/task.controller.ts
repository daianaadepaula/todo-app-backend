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
		const status = error.statusCode || 500;
		res.status(status).json({ message: error.message });
	}
}