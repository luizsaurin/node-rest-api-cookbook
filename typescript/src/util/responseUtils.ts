/* eslint-disable no-console */
import { Response } from 'express'

type SuccessResponse = {
	status: 'success'
	message?: string
	data?: unknown
}

type ErrorResponse = {
	status: 'error'
	message?: string
}

type ExceptionResponse = {
	status: 'error'
	message: string
	error?: unknown
}

/**
 * Handles success responses
 */
export const successResponse = (res: Response, statusCode: number, message?: string, data?: unknown) => {
	const response: SuccessResponse = {
		status: 'success',
		message,
		data
	}

	if (message || data) {
		return res.status(statusCode).json(response)
	}

	return res.status(statusCode).send(null)
}

/**
 * Handles expected error responses (e.g. validation errors, bad request, unauthorized)
 */
export const errorResponse = (res: Response, statusCode: number, message?: string) => {
	const code = statusCode || 500

	const response: ErrorResponse = {
		status: 'error',
		message
	}

	if (message) {
		return res.status(code).json(response)
	}

	return res.status(code).send(null)
}

/**
 * Handles unexpected error responses (e.g. internal server error, database errors)
 */
export const exceptionResponse = (res: Response, err: unknown) => {
	console.error(err)

	const response: ExceptionResponse = {
		status: 'error',
		message: err instanceof Error ? err.message : 'Internal Server Error'
	}
	return res.status(500).json(response)
}
