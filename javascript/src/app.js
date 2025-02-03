/* eslint-disable no-console */
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import xss from 'xss-clean'
import User from './model/User.js'
import router from './routes.js'
import { errorResponse, exceptionResponse } from './util/responseUtils.js'

dotenv.config()

class App {
	constructor() {
		console.log('💫 App setup started')
		this.setupUncaughtExceptionHandler()
		this.app = express()
		this.setupMiddlewares()
		this.setupRequestLogging()
		this.setupRouter()
		this.setupExceptionHandler()
		this.addInitialUsersToDatabase()
		console.log('🌟 App setup finished')
	}

	setupUncaughtExceptionHandler() {
		process.on('uncaughtException', (err) => {
			console.error(err.name, err.message)
			process.exit(1)
		})
	}

	setupMiddlewares() {
		this.app.use(cors())
		this.app.use(helmet())
		this.app.use('/api', rateLimit({ max: 50, windowMs: 60000, message: null }))
		this.app.use(express.json({ type: 'application/json', limit: '10kb' }))
		this.app.use(mongoSanitize())
		this.app.use(xss())
	}

	setupRequestLogging() {
		this.app.use(
			morgan((tokens, req, res) => {
				const url = decodeURIComponent(tokens.url(req, res) || '')
				const status = Number(tokens.status(req, res))

				let statusColor = 0 // no color
				if (status >= 500) {
					statusColor = 31 // red
				} else if (status >= 400) {
					statusColor = 33 // yellow
				} else if (status >= 300) {
					statusColor = 36 // cyan
				} else if (status >= 200) {
					statusColor = 32 // green
				}

				const responseTime = tokens['response-time'](req, res)

				// Example output: GET /api/v1/users?filter={"role":"admin"}&sort={"name":1} 200 - 1.000 ms
				return `\x1b[m${tokens.method(req, res)}\x1b[0m ${url} \x1b[${statusColor}m${status}\x1b[0m - ${responseTime} ms`
			})
		)
	}

	setupRouter() {
		this.app.use(router)

		// Handle unexisting routes
		this.app.all('*', (req, res) => {
			errorResponse(res, 404, 'Route not found')
		})
	}

	setupExceptionHandler() {
		this.app.use((err, req, res, next) => {
			exceptionResponse(res, err)
		})
	}

	async addInitialUsersToDatabase() {
		if (process.env.NODE_ENV === 'production') {
			return
		}

		await User.deleteMany()

		await User.create([
			{
				name: 'Admin User',
				email: 'admin@mail.com',
				password: 'password',
				role: 'admin'
			},
			{
				name: 'Regular User',
				email: 'user@mail.com',
				password: 'password',
				role: 'user'
			}
		])
	}
}

export default new App().app
