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
		this.setupRouterLogging()
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

	private setupRouterLogging() {
		this.app.use(morgan('dev'))
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
