/* eslint-disable no-useless-escape */
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { errorResponse, exceptionResponse } from '../../util/responseUtils'

export const updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const schema = Joi.object({
			name: Joi.string().optional(),
			email: Joi.string().email().optional(),
			password: Joi.string().optional(),
			role: Joi.string().valid('admin', 'user').optional()
		})

		const { error } = schema.validate(req.body, { abortEarly: false })

		if (error) {
			const message = error.details
				.map((err) => err.message)
				.join('; ')
				.replace(/\"/g, '')
			errorResponse(res, 400, message)
			return
		}

		next()
	} catch (error) {
		exceptionResponse(res, error)
	}
}
