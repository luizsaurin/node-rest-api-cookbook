import AuthService from '../service/AuthService.js'
import { errorResponse, exceptionResponse, successResponse } from '../util/responseUtils.js'

class AuthController {
	async signup(req, res) {
		try {
			successResponse(res, 201, undefined, await AuthService.signup(req))
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

	async login(req, res) {
		try {
			const token = await AuthService.login(req)

			if (!token) {
				errorResponse(res, 401, 'Invalid credentials')
				return
			}

			successResponse(res, 200, undefined, await AuthService.login(req))
		} catch (error) {
			exceptionResponse(res, error)
		}
	}
}

export default new AuthController()
