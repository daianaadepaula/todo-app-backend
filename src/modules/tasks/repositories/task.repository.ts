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

	async updateTask(id: string, data: {title: string, description: string}): Promise<Task | null>{
		const task = tasks.find((task) => task.id === id);

		if(!task) return null;

		task.title = data.title;
		task.description = data.description;

		return task;
	} 

	async updateStatus(id: string, completed: boolean): Promise<Task | null>{
		const taskIndex = tasks.findIndex((task) => task.id === id);

		if (taskIndex === -1) return null;

		tasks[taskIndex].completed = completed;
		return tasks[taskIndex];
	} 
}
