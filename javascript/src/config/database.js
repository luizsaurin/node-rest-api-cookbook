/* eslint-disable no-console */
import mongoose from 'mongoose'
import User from '../model/User.js'

async function addInitialUsers() {
	await User.deleteMany()
	console.log('Deleted all existing users from database')

	await User.create([
		{
			firstName: 'Admin',
			lastName: 'User',
			email: 'admin@mail.com',
			password: 'admin123',
			role: 'admin'
		},
		{
			firstName: 'Regular',
			lastName: 'User',
			email: 'user@mail.com',
			password: 'user123',
			role: 'user'
		}
	])
	console.log('Added test users')
}

const connectToDatabase = async () => {
	mongoose
		.connect(process.env.DATABASE_CONNECTION)
		.then(() => {
			console.log('Database connected')
			if (process.env.NODE_ENV === 'development') addInitialUsers()
		})
		.catch((err) => {
			console.error('Database connection failed:', err.message)
			process.exit(1)
		})
}

export default connectToDatabase
