import { CreateTaskDTO } from "../dtos/task.dto";

export function validateTaskInput(data: CreateTaskDTO): string[] {
	const errors: string[] = [];

	if (!data.title || data.title.trim() === "") {
		errors.push("Title is required");
	}

	if (!data.description || data.description.trim() === "") {
		errors.push("Description is required");
	}

	return errors;
}
