import morgan from 'morgan'
import express from 'express'
import errorHandler from '../middleware/errorHandler'
import { Express } from 'express-serve-static-core'

const setupMiddleware = async (app: Express) => {
	// Morgan logging
	app.use(morgan('dev'))

	// JSON parser
	app.use(express.json({ limit: '10kb' }))

	// Global error handler
	app.use(errorHandler)
}

export default setupMiddleware
