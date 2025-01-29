import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import { response401, responseError } from '../util/responseUtils.js'

async function protect(req, res, next) {
	try {
		let token
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1]
		}

		if (!token) {
			return response401(res)
		}

		// const decoded = await util.promisify(jwt.verify())(token, process.env.JWT_SECRET)
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// Check if the user still exists
		const currentUser = await User.findById(decoded.id)

		if (!currentUser) {
			return response401(res)
		}

		// Check if user changed password after the token was issued
		if (currentUser.changedPasswordAfterTokenIssued(decoded.iat)) {
			return response401(res)
		}

		req.user = currentUser
		next()
	} catch (error) {
		responseError(res, error)
	}
}

export default protect
