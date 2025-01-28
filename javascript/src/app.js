/* eslint-disable no-console */
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import errorHandler from './middleware/errorHandler.js'
import router from './routes.js'

// Uncaught Exception rrror handler
process.on('uncaughtException', (err) => {
	console.error(err.name, err.message)
	process.exit(1)
})

// Import .env file
dotenv.config()

const app = express()

// Morgan logging
app.use(morgan('dev'))

// Config express to use json as default
app.use(express.json({ limit: '10kb' }))

// Routes
app.use(router)

// Error handler for non existing routes
app.all('*', (req, res, next) => {
	res.status(403).send(null)
})

// Error handler for errors that were not handled bu the previous middlewares
app.use(errorHandler)

// Connect to database
mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
	console.log('Database connected')
})

const server = app.listen(process.env.PORT, () => {
	console.log(`App running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Unhandled Rejection error handler
process.on('unhandledRejection', (err) => {
	console.error(err.name, err.message)
	server.close(() => {
		process.exit(1)
	})
})
