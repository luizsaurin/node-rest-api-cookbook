/* eslint-disable no-console */
import express from 'express'
import dotenv from 'dotenv'
import handleUncaughtException from './config/uncaughtException'
import handleUnhandledRejections from './config/unhandledRejection'
import setupMiddleware from './config/middleware'

dotenv.config()

handleUncaughtException()

const app = express()

setupMiddleware(app)

app.get('/', (req, res) => {
	res.send('Hello, TypeScript!')
})

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

handleUnhandledRejections(server)
