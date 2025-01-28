import userService from '../service/userService.js'
import {
	responseFindAndCount,
	response201,
	response501,
	responseError,
	response404,
	response200
} from '../util/responseUtils.js'

const findAll = async (req, res) => {
	try {
		const results = await userService.findAll(req.query)
		responseFindAndCount(res, results, results.length)
	} catch (error) {
		responseError(res, error)
	}
}

const findById = async (req, res) => {
	try {
		const user = await userService.findById(req.params.id)

		if (!user) return response404(res, `User with id [${req.params.id}] not found`)

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
	response501(res)
}

const remove = async (req, res) => {
	response501(res)
}

export default { findAll, findById, create, update, remove }
