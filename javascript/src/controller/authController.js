import authService from '../service/authService.js'
import { response200, response201, response400, responseError } from '../util/responseUtils.js'

const signup = async (req, res) => {
	try {
		response201(res, await authService.signup(req.body))
	} catch (error) {
		responseError(res, error)
	}
}

const login = async (req, res) => {
	try {
		const token = await authService.login(req.body)

		if (!token) return response400(res, `Invalid credentiais`)

		response200(res, token)
	} catch (error) {
		responseError(res, error)
	}
}

export default { signup, login }
