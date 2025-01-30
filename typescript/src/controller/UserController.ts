import { Request, Response } from 'express'
import { errorResponse, exceptionResponse } from '../util/responseUtils'

class UserController {
	async findAll(req: Request, res: Response) {
		try {
			errorResponse(res, 501)
		} catch (error) {
			exceptionResponse(res, error)
		}
	}
}

export default new UserController()
