import { z } from "zod"
import { createTaskSchema } from "../validators/task.schema"

export type CreateTaskDTO = z.infer<typeof createTaskSchema>
