/* eslint-disable no-useless-escape */
import Joi from 'joi'
import { errorResponse, exceptionResponse } from '../../util/responseUtils.js'

const loginValidator = async (req, res, next) => {
	try {
		const schema = Joi.object({
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

export default loginValidator
