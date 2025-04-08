import { TaskRepository } from "../repositories/task.repository"
import { validateTaskInput } from "../validators/task.validator"
import { Task } from "../models/task.model"
import { CreateTaskDTO } from "../dtos/task.dto";
import { v4 as uuidv4 } from "uuid";

const repository = new TaskRepository();

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
}
