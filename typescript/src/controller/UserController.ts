import { Request, Response } from 'express'
import UserService from '../service/UserService'
import { errorResponse, exceptionResponse, successResponse } from '../util/responseUtils'

class UserController {
	async findAll(req: Request, res: Response) {
		try {
			successResponse(res, 200, undefined, await UserService.findAll(req))
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async findById(req: Request, res: Response) {
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

	async create(req: Request, res: Response) {
		try {
			successResponse(res, 201, undefined, await UserService.create(req))
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async update(req: Request, res: Response) {
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
}

export default new UserController()
