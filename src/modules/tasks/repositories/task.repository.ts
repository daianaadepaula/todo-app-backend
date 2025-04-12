import { Task } from "../models/task.model";
import { tasks } from "../database/task.memory"

export class TaskRepository {
	async create(task: Task): Promise<Task> {
		tasks.push(task)
		return task
	}

	async findAll(): Promise<Task[]> {
		return [...tasks] // retorna uma cópia imutabilidade
	}

	async update(id: string, data: Pick<Task, "title" | "description">): Promise<Task | null> {
		const task = tasks.find(t => t.id === id);
		if (!task) return null;

		Object.assign(task, {
			title: data.title,
			description: data.description,
		})

		return task;
	}

	async updateStatus(id: string, completed: boolean): Promise<Task | null> {
		const taskIndex = tasks.findIndex(t => t.id === id);
		if (taskIndex === -1) return null;

		tasks[taskIndex].completed = completed;
		return tasks[taskIndex];
	}

	async delete(id: string): Promise<Task | null> {
		const taskIndex = tasks.findIndex(t => t.id === id);
		if (taskIndex === -1) return null;

		const deletedTask = tasks[taskIndex];
		tasks.splice(taskIndex, 1);

		return deletedTask;
	}
}
