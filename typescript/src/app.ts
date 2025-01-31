/* eslint-disable no-console */
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import xss from 'xss-clean'
import router from './routes'
import { errorResponse, exceptionResponse } from './util/responseUtils'

dotenv.config()

class App {
	public app: express.Application

	constructor() {
		console.log('💫 App setup started')
		this.setupUncaughtExceptionHandler()
		this.app = express()
		this.setupMiddlewares()
		this.setupRequestLogging()
		this.setupRouter()
		this.setupExceptionHandler()
		console.log('✅ App setup finished')
	}

	private setupUncaughtExceptionHandler() {
		process.on('uncaughtException', (err) => {
			console.error(err.name, err.message)
			process.exit(1)
		})
	}

	private setupMiddlewares() {
		this.app.use(cors())
		this.app.use(helmet())
		this.app.use('/api', rateLimit({ max: 50, windowMs: 60000, message: null }))
		this.app.use(express.json({ type: 'application/json', limit: '10kb' }))
		this.app.use(mongoSanitize())
		this.app.use(xss())
	}

	private setupRequestLogging() {
		this.app.use(
			morgan((tokens, req, res) => {
				const url = decodeURIComponent(tokens.url(req, res) || '')
				const status = Number(tokens.status(req, res))
				const statusColor =
					status >= 500
						? 31 // red
						: status >= 400
							? 33 // yellow
							: status >= 300
								? 36 // cyan
								: status >= 200
									? 32 // green
									: 0 // no color
				const responseTime = tokens['response-time'](req, res)

				// Example output: GET /api/v1/users?filter={"role":"admin"}&sort={"name":1} 200 - 1.000 ms
				return `\x1b[m${tokens.method(req, res)}\x1b[0m ${url} \x1b[${statusColor}m${status}\x1b[0m - ${responseTime} ms`
			})
		)
	}

	private setupRouter() {
		this.app.use(router)

		// Handle unexisting routes
		this.app.all('*', (req: Request, res: Response) => {
			errorResponse(res, 403)
		})
	}

	private setupExceptionHandler() {
		this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			exceptionResponse(res, err)
		})
	}
}

export default new App().app
