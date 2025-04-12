import { Request, Response } from "express"
import { TaskService } from "../services/task.services"
import { CreateTaskDTO } from "../dtos/task.dto";
import { TaskRepository } from "../repositories/task.repository";

const service = new TaskService(new TaskRepository());

export async function createTaskController(req: Request, res: Response): Promise<void> {
	try {
		const result = await service.createTask(req.body as CreateTaskDTO);
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

export async function updateTaskController(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;
		const update = await service.updateTask(id, req.body);

		res.status(200).json(update);
	} catch (error: any) {
		res.status(400).json({ message: error.message })
	}
}


export async function updateTaskStatusController(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;
		const { completed } = req.body;

		const result = await service.updateTaskStatus(id, completed);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(400).json({ message: error.message })
	}
}

export async function deleteTaskController(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params
		const deletedTask = await service.deleteTask(id);
		res.status(200).json({ message: `Task '${deletedTask.title}' deleted successfully` });
	} catch (error: any) {
		res.status(400).json({ message: error.message })
	}
}