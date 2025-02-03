import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import { errorResponse, exceptionResponse } from '../util/responseUtils.js'

const authenticate =
	(...roles) =>
	async (req, res, next) => {
		try {
			if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
				errorResponse(res, 401, 'Missing or invalid Authorization header')
				return
			}

			const token = req.headers.authorization.split(' ')[1]

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// Check if the user still exists
			const currentUser = await User.findById(decoded.id)

			if (!currentUser) {
				errorResponse(res, 401, 'Invalid credentials')
				return
			}

			// Check if user changed password after the token was issued
			if (currentUser.changedPasswordAfterTokenIssued(Number(decoded.iat))) {
				errorResponse(res, 401, 'User recently changed password! Please log in again.')
				return
			}

			// Check if user has the required role
			if (roles.length && !roles.includes(currentUser.role)) {
				errorResponse(res, 401, 'Invalid credentials')
				return
			}

			next()
		} catch (error) {
			exceptionResponse(res, error)
		}
	}

export default authenticate
