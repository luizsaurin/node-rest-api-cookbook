export class InvalidQueryParamError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidQueryParamError'
		Error.captureStackTrace(this, this.constructor)
	}
}
