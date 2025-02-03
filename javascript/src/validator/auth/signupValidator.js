/* eslint-disable no-useless-escape */
import Joi from 'joi'
import { errorResponse, exceptionResponse } from '../../util/responseUtils.js'

const signupValidator = async (req, res, next) => {
	try {
		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required()
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

export default signupValidator
