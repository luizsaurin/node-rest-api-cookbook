import { Request, Response } from 'express'
import UserService from '../service/UserService'
import { exceptionResponse, successResponse } from '../util/responseUtils'

class UserController {
	async findAll(req: Request, res: Response) {
		try {
			const users = await UserService.findAll(req)
			successResponse(res, 200, undefined, users)
		} catch (error) {
			exceptionResponse(res, error)
		}
	}
}

export default new UserController()
