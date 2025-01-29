import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import { response401, responseError } from '../util/responseUtils.js'

function authorization(...roles) {
	return async (req, res, next) => {
		try {
			let token
			if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
				token = req.headers.authorization.split(' ')[1]
			}

			if (!token) {
				return response401(res)
			}

			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// Check if the user still exists
			const currentUser = await User.findById(decoded.id)
			if (!currentUser) {
				return response401(res)
			}

			// Check if the user changed password after the token was issued
			if (currentUser.changedPasswordAfterTokenIssued(decoded.iat)) {
				return response401(res)
			}

			// Authorization check (role-based)
			if (roles.length && !roles.includes(currentUser.role)) {
				return response401(res)
			}

			next()
		} catch (error) {
			responseError(res, error)
		}
	}
}

export default authorization
