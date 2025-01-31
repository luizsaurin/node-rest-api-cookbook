import express from 'express'
import UserController from './controller/UserController'

const router = express.Router()

const createRoute = (path: string) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}

const userRoutes = createRoute('/api/v1/users')
userRoutes.get('/', (req, res) => UserController.findAll(req, res))
userRoutes.get('/:id', (req, res) => UserController.findById(req, res))
userRoutes.post('/', (req, res) => UserController.create(req, res))

export default router
