/* eslint-disable no-console */
import dotenv from 'dotenv'
import express from 'express'
import handleUncaughtException from './config/uncaughtException.js'
import setupMiddleware from './config/middleware.js'
import setupRoutes from './config/routes.js'
import connectToDatabase from './config/database.js'
import handleUnhandledRejection from './config/unhandledRejection.js'

dotenv.config()

handleUncaughtException()

const app = express()

setupMiddleware(app)
setupRoutes(app)
connectToDatabase()

const server = app.listen(process.env.PORT, () => {
	console.log(`App running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

handleUnhandledRejection(server)
