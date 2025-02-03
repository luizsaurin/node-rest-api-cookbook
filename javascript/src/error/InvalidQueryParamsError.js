class InvalidQueryParamError extends Error {
	constructor(message) {
		super(message)
		this.name = 'InvalidQueryParamError'
		Error.captureStackTrace(this, this.constructor)
	}
}

export default InvalidQueryParamError
