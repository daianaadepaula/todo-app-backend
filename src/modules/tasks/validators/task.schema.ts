import { z } from 'zod'

export const createTaskSchema = z.object({
	title: z.string().min(3, "Title is required"),
	description: z.string().optional(),
	completed: z.boolean().optional()
})

export const updateTaskSchema = createTaskSchema.partial()

export const completedTaskSchema = z.object({
	completed: z.boolean({
		required_error: "Completed is required",
		invalid_type_error: "Completed must be a boolean"
	})
});