/* eslint-disable no-console */
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello, TypeScript!')
})

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
