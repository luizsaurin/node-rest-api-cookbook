/* eslint-disable no-console */
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import app from './app'
import unhandledRejectionsHandler from './config/unhandledRejectionsHandler'

console.log('💫 Connecting to database...')

mongoose
	.connect(process.env.DATABASE_CONNECTION_URL!, {
		serverSelectionTimeoutMS: Number(process.env.DATABASE_CONNECTION_TIMEOUT!)
	})
	.then(() => {
		console.log('✅ Database connected successfully')

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
