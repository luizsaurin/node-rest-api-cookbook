const successStatus = 'success'
const errorStatus = 'error'

export const response200 = (res, data) => {
	res.status(200).json({
		status: successStatus,
		data
	})
}

export const response200FindAndCount = (res, data, totalResults) => {
	res.status(200).json({
		status: successStatus,
		totalResults,
		data
	})
}

export const response201 = (res, data) => {
	res.status(201).json({
		status: successStatus,
		data
	})
}

export const response204 = (res) => {
	res.status(204).send(null)
}

export const response400 = (res, message) => {
	res.status(400).json({
		status: errorStatus,
		message
	})
}

export const response401 = (res) => {
	res.status(401).send(null)
}

export const response403 = (res) => {
	res.status(403).send(null)
}

export const response404 = (res, message) => {
	res.status(404).json({
		status: errorStatus,
		message
	})
}

export const response500 = (res, message) => {
	res.status(500).json({
		status: errorStatus,
		message
	})
}

export const response501 = (res) => {
	res.status(501).send(null)
}

// Generic error handler
export const responseError = (res, err) => {
	// MongoDB - E11000 duplicate key error
	if (err.code === 11000) {
		const field = Object.keys(err.keyValue)[0]

		const value = err.keyValue[field]

		const message = `The ${field} ${value} is unavailable. Please use a different value.`

		// return { statusCode: 400, message: customErrorMessage }
		return response400(res, message)
	}

	// MongoDB - CastError
	if (err.name === 'CastError') {
		const message = `Invalid ${err.path}: ${err.value}`

		// return { statusCode: 400, message: customErrorMessage }
		return response400(res, message)
	}

	// jsonwebtoken - Toekn expired or malformed
	if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
		// return { statusCode: 401, message: 'Token is invalid or expired' }
		return response401(res)
	}

	const statusCode = err.statusCode || 500
	const errMessage = err.message || 'Internal Server Error'

	const responseBody = {
		status: errorStatus,
		message: errMessage
	}

	res.status(statusCode).json(responseBody)
}
