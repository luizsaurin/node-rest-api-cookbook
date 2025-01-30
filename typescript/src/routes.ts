import express from 'express'

const router = express.Router()

const createRoute = (path: string) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}

const testRoutes = createRoute('/api/v1/test')
testRoutes.get('/', (req, res) => {
	res.status(200).json({ status: 'success', message: 'Hello from test route' })
})

export default router
