import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User, { IUser } from '../model/User'
import { errorResponse, exceptionResponse } from '../util/responseUtils'

export const authenticate = (...roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
				errorResponse(res, 401, 'Missing or invalid Authorization header')
				return
			}

			const token = req.headers.authorization.split(' ')[1]

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

			// Check if the user still exists
			const currentUser = (await User.findById(decoded.id)) as IUser

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
}
