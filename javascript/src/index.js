/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import app from './app.js'
import unhandledRejectionsHandler from './config/unhandledRejectionsHandler.js'

console.log('💫 Connecting to database...')

mongoose
	.connect(process.env.DATABASE_CONNECTION_URL, {
		serverSelectionTimeoutMS: 5000
	})
	.then(() => {
		console.log('🌟 Database connected successfully')

		console.log('💫 Starting app...')

		const server = app.listen(process.env.PORT, () => {
			console.log(`🚀 App is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
		})

		unhandledRejectionsHandler(server)
	})
	.catch((error) => {
		console.error('❌', error)
		process.exit(1)
	})
