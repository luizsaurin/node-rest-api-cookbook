/* eslint-disable no-console */
import express from 'express'
import dotenv from 'dotenv'
import handleUncaughtException from './config/uncaughtException'
import handleUnhandledRejections from './config/unhandledRejection'
import setupMiddleware from './config/middleware'
import setupRoutes from './config/routes'

dotenv.config()

handleUncaughtException()

const app = express()

setupMiddleware(app)
setupRoutes(app)

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

handleUnhandledRejections(server)
