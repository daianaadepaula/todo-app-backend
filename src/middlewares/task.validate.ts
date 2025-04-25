import { NextFunction, Request, RequestHandler, Response } from "express"
import { ZodSchema } from "zod"

export const validate = (schema: ZodSchema<any>): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const result = schema.safeParse(req.body)

		if (!result.success) {
			const errors = result.error.errors.map((e) => ({
				field: e.path.join("."),
				message: e.message,
			}))

			res.status(400).json({ errors })
			return
		}

		req.body = result.data
		next()
	}
}