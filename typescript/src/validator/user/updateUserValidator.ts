/* eslint-disable no-useless-escape */
import { Request, Response, NextFunction } from 'express'
import { errorResponse, exceptionResponse } from '../../util/responseUtils'
import Joi from 'joi'
import { UserRole } from '../../enum/userRole'

export const updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const schema = Joi.object({
			name: Joi.string().optional(),
			email: Joi.string().email().optional(),
			password: Joi.string().optional(),
			role: Joi.string().valid(UserRole.ADMIN, UserRole.USER).optional()
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
