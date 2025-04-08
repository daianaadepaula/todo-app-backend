import { Task } from "../models/task.model";
import { tasks } from "../database/task.memory"

export class TaskRepository {
	async create(task: Task): Promise<Task> {
	 	tasks.push(task)
		return task
	}
	async findAll(): Promise<Task[]>{
		return tasks // retorna a lista em memória
	}
}
