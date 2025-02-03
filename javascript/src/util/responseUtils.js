/* eslint-disable no-console */
/**
 * Handles success responses
 */
export const successResponse = (res, statusCode, message, data) =>
	res.status(statusCode).json({
		status: 'success',
		message,
		data
	})

/**
 * Handles expected error responses (e.g. validation errors, bad request, unauthorized)
 */
export const errorResponse = (res, statusCode, message) =>
	res.status(statusCode || 500).json({
		status: 'error',
		message
	})

/**
 * Handles unexpected error responses (e.g. internal server error, database errors)
 */
export const exceptionResponse = (res, err) => {
	console.error(err)

	// MongoDB - CastError (e.g. invalid ObjectId)
	if (err.name === 'CastError') {
		const param = err.path || 'input'
		const { value } = err
		errorResponse(res, 400, `Invalid ${param} ${value}`)
		return
	}

	// Invalid query parameters (e.g. filter, sort)
	if (err.name === 'InvalidQueryParamError') {
		errorResponse(res, 400, err.message)
		return
	}

	// SyntaxError (e.g. invalid JSON)
	if (err.name === 'SyntaxError') {
		errorResponse(res, 400, err.message)
		return
	}

	// TypeError (e.g. invalid mongo query params)
	if (err.name === 'TypeError') {
		errorResponse(res, 400, err.message)
		return
	}

	// JWT - TokenExpiredError
	if (err.name === 'TokenExpiredError') {
		errorResponse(res, 401, 'Invalid or expired token')
		return
	}

	return res.status(500).json({
		status: 'error',
		message: err.message || 'Internal Server Error'
	})
}
