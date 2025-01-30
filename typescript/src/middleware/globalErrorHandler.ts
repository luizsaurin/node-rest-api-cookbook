import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	const response = {
		status: 'error',
		message: err.message || 'Internal Server Error'
	}

	res.status(500).json(response)
}

export default globalErrorHandler
