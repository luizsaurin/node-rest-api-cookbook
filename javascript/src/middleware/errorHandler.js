const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500

	const response = {
		status: 'error',
		message: err.message || 'Internal Server Error'
	}

	res.status(statusCode).json(response)
}

export default errorHandler
