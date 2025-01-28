/* eslint-disable no-useless-escape */
import joi from 'joi'
import { response400, response500 } from '../util/responseUtils.js'

const userCreate = async (req, res, next) => {
	try {
		const schema = joi.object({
			firstName: joi.string().required(),
			lastName: joi.string().required(),
			age: joi.number().required(),
			email: joi.string().email().required()
		})

		const { error } = schema.validate(req.body, { abortEarly: false })

		if (error) {
			const message = error.details
				.map((err) => err.message)
				.join('; ')
				.replace(/\"/g, '')
			return response400(res, message)
		}

		next()
	} catch (error) {
		response500(res, error.message)
	}
}

const userUpdate = (req, res, next) => {
	// TODO
	next()
}

export default { userCreate, userUpdate }
