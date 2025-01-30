/* eslint-disable no-console */
import dotenv from 'dotenv'
import express from 'express'
import connectToDatabase from './config/connectToDatabase'
import setupMiddleware from './config/setupMiddleware'
import setupRoutes from './config/setupRoutes'
import handleUncaughtException from './config/uncaughtExceptionHandler'
import handleUnhandledRejections from './config/unhandledRejectionHandler'

dotenv.config()

handleUncaughtException()

const app = express()

setupMiddleware(app)
setupRoutes(app)
connectToDatabase()

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

handleUnhandledRejections(server)
