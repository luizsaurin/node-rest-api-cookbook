/* eslint-disable no-console */
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import globalErrorHandler from './middleware/globalErrorHandler.js'
import router from './routes.js'

// Uncaught Exception rrror handler
process.on('uncaughtException', (err) => {
  console.error(err.name, err.message)
  process.exit(1)
})

// Import .env file
dotenv.config()

const app = express()

// Morgan logging
app.use(morgan('dev'))

// Config express to use json as default
app.use(express.json({ limit: '10kb' }))

// Routes
app.use(router)

// Error handler for non existing routes
app.all('*', (req, res, next) => {
  res.status(403).send(null)
})

// Global error handler
app.use(globalErrorHandler)

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Unhandled Rejection error handler
process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
