/* eslint-disable no-console */
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import globalErrorHandler from './middleware/globalErrorHandler'
import router from './routes'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

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
		this.setupGlobalErrorHandler()
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
		this.app.use(express.text())
		this.app.use(express.urlencoded({ extended: true }))
	}

	private setupRouterLogging() {
		this.app.use(morgan('dev'))
	}

	private setupRouter() {
		this.app.use(router)

		// Handle unexisting routes
		this.app.all('*', (req: Request, res: Response) => {
			res.status(403).send(null)
		})
	}

	private setupGlobalErrorHandler() {
		this.app.use(globalErrorHandler)
	}
}

export default new App().app
