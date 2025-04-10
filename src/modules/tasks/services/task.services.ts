import { TaskRepository } from "../repositories/task.repository"
import { validateTaskInput } from "../validators/task.validator"
import { Task } from "../models/task.model"
import { CreateTaskDTO } from "../dtos/task.dto";
import { v4 as uuidv4 } from "uuid";
import { tasks } from './../database/task.memory';

// const repository = new TaskRepository();

export class TaskService {
	constructor(private repository: TaskRepository) { }

	async createTask(data: CreateTaskDTO): Promise<Task> {
		const errors = validateTaskInput(data);
		if (errors.length > 0) {
			throw new Error(errors.join(", "));
		}

		const newTask: Task = {
			id: uuidv4(),
			title: data.title,
			description: data.description,
			completed: false,
		};

		return await this.repository.create(newTask);
	}

	async getAllTasks(): Promise<Task[]> {
		return await this.repository.findAll()
	}

	async updateTask(id: string, data: CreateTaskDTO): Promise<Task> {
		const errors = validateTaskInput(data);
		if (errors.length > 0) {
			throw new Error(errors.join(", "));
		}

		const update = await this.repository.updateTask(id, data);

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
}
	
