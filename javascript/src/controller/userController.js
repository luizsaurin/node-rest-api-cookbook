import UserService from '../service/UserService.js'
import { errorResponse, exceptionResponse, successResponse } from '../util/responseUtils.js'

class UserController {
	async findAll(req, res) {
		try {
			successResponse(res, 200, undefined, await UserService.findAll(req))
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async findById(req, res) {
		try {
			const user = await UserService.findById(req)

			if (!user) {
				errorResponse(res, 404, `User with id ${req.params.id} not found`)
				return
			}

			successResponse(res, 200, undefined, user)
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async create(req, res) {
		try {
			successResponse(res, 201, undefined, await UserService.create(req))
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async update(req, res) {
		try {
			const user = await UserService.update(req)

			if (!user) {
				errorResponse(res, 404, `User with id ${req.params.id} not found`)
				return
			}

			successResponse(res, 200, undefined, user)
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async remove(req, res) {
		try {
			const user = await UserService.remove(req)

			if (!user) {
				errorResponse(res, 404, `User with id ${req.params.id} not found`)
				return
			}

			successResponse(res, 204)
		} catch (error) {
			exceptionResponse(res, error)
		}
	}
}

export default new UserController()
