import userService from '../service/userService.js'
import {
	response200,
	response200FindAndCount,
	response201,
	response204,
	response404,
	responseError
} from '../util/responseUtils.js'

const findAll = async (req, res) => {
	try {
		const results = await userService.findAll(req.query)
		response200FindAndCount(res, results, results.length)
	} catch (error) {
		responseError(res, error)
	}
}

const findById = async (req, res) => {
	try {
		const user = await userService.findById(req.params.id)

		if (!user) return response404(res, `User with id ${req.params.id} not found`)

		response200(res, user)
	} catch (error) {
		responseError(res, error)
	}
}

const create = async (req, res) => {
	try {
		response201(res, await userService.create(req.body))
	} catch (error) {
		responseError(res, error)
	}
}

const update = async (req, res) => {
	try {
		const user = await userService.update(req.params.id, req.body)

		if (!user) return response404(res, `User with id ${req.params.id} not found`)

		response200(res, user)
	} catch (error) {
		responseError(res, error)
	}
}

const remove = async (req, res) => {
	try {
		const user = await userService.remove(req.params.id)

		if (!user) return response404(res, `User with id ${req.params.id} not found`)

		response204(res)
	} catch (error) {
		responseError(res, error)
	}
}

export default { findAll, findById, create, update, remove }
