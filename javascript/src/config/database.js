/* eslint-disable no-console */
import mongoose from 'mongoose'

const connectToDatabase = () => {
	mongoose
		.connect(process.env.DATABASE_CONNECTION)
		.then(() => {
			console.log('Database connected')
		})
		.catch((err) => {
			console.error('Database connection failed:', err.message)
			process.exit(1)
		})
}

export default connectToDatabase
