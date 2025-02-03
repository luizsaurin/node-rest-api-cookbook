/* eslint-disable no-console */
import { Response } from 'express'

/**
 * Handles success responses
 */
export const successResponse = (res: Response, statusCode: number, message?: string, data?: unknown) => {
	return res.status(statusCode).json({
		status: 'success',
		message,
		data
	})
}

/**
 * Handles expected error responses (e.g. validation errors, bad request, unauthorized)
 */
export const errorResponse = (res: Response, statusCode: number, message?: string) => {
	return res.status(statusCode || 500).json({
		status: 'error',
		message
	})
}

/**
 * Handles unexpected error responses (e.g. internal server error, database errors)
 */
export const exceptionResponse = (res: Response, err: Error | unknown) => {
	console.error(err)

	// MongoDB - CastError (e.g. invalid ObjectId)
	if (err instanceof Error && err.name === 'CastError') {
		const param = (err as { path?: string }).path || 'input'
		const { value } = err as { value?: string }
		errorResponse(res, 400, `Invalid ${param} ${value}`)
		return
	}

	// Invalid query parameters (e.g. filter, sort)
	if (err instanceof Error && err.name === 'InvalidQueryParamError') {
		errorResponse(res, 400, err.message)
		return
	}

	// SyntaxError (e.g. invalid JSON)
	if (err instanceof Error && err.name === 'SyntaxError') {
		errorResponse(res, 400, err.message)
		return
	}

	// TypeError (e.g. invalid mongo query params)
	if (err instanceof Error && err.name === 'TypeError') {
		errorResponse(res, 400, err.message)
		return
	}

	// JWT - TokenExpiredError
	if (err instanceof Error && err.name === 'TokenExpiredError') {
		errorResponse(res, 401, 'Invalid or expired token')
		return
	}

	return res.status(500).json({
		status: 'error',
		message: err instanceof Error ? err.message : 'Internal Server Error'
	})
}
