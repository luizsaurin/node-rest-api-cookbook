/* eslint-disable no-useless-escape */
import joi from 'joi'
import { response400, response500 } from '../util/responseUtils.js'

const userCreate = async (req, res, next) => {
	try {
		const schema = joi.object({
			firstName: joi.string().required(),
			lastName: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required()
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
	try {
		const schema = joi.object({
			firstName: joi.string().optional(),
			lastName: joi.string().optional(),
			email: joi.string().email().optional(),
			active: joi.boolean().optional(),
			password: joi.string().optional(),
			role: joi.string().optional()
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

const userSignup = async (req, res, next) => {
	try {
		const schema = joi.object({
			firstName: joi.string().required(),
			lastName: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required()
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

const userLogin = async (req, res, next) => {
	try {
		const schema = joi.object({
			email: joi.string().email().required(),
			password: joi.string().required()
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

export default { userCreate, userUpdate, userSignup, userLogin }
