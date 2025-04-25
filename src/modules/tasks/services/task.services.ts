import { TaskRepository } from "../repositories/task.repository"
import { createTaskSchema, updateTaskSchema } from "../validators/task.schema"
import { Task } from "../models/task.model"
import { CreateTaskDTO } from "../dtos/task.dto";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod"

export class TaskService {
	constructor(private repository: TaskRepository) { }

	async createTask(data: CreateTaskDTO): Promise<Task> {
		const result = createTaskSchema.safeParse(data);
		if (!result.success) {
			throw new Error(result.error.errors.map((e) => e.message).join(", "));
		}

		const newTask: Task = {
			id: uuidv4(),
			title: result.data.title,
			description: result.data.description ?? "",
			completed: false,
		};

		return await this.repository.create(newTask);
	}

	async getAllTasks(): Promise<Task[]> {
		return await this.repository.findAll()
	}

	async updateTask(id: string, data: Partial<CreateTaskDTO>): Promise<Task> {
		const result = updateTaskSchema.safeParse(data);
		if (!result.success) {
			throw new Error(result.error.errors.map((e) => e.message).join(", "));
		}

		const update = await this.repository.update(id, {
			title: result.data.title ?? "",
			description: result.data.description ?? "",
		});

		if (!update) {
			throw new Error("Task not found");
		}

		return update;
	}

	async updateTaskStatus(id: string, completed: boolean) {
		const taskUpdateStatus = await this.repository.updateStatus(id, completed)

		if (!taskUpdateStatus) throw new Error("Task not found");

		return taskUpdateStatus;
	}

	async deleteTask(id: string): Promise<Task> {
		const deleted = await this.repository.delete(id)

		if (!deleted) throw new Error("Task not found");

		return deleted;
	}
}

