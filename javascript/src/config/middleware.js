import morgan from 'morgan'
import express from 'express'
import errorHandler from '../middleware/errorHandler.js'

const setupMiddleware = (app) => {
	// Morgan logging
	app.use(morgan('dev'))

	// JSON parser
	app.use(express.json({ limit: '10kb' }))

	// Global error handler
	app.use(errorHandler)
}

export default setupMiddleware
