import express from 'express'
import usersController from './controller/userController.js'
import payloadValidator from './middleware/payloadValidator.js'

const router = express.Router()

const createRoute = (path) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}
const usersRoutes = createRoute('/api/v1/users')
usersRoutes.get('/', usersController.findAll)
usersRoutes.get('/:id', usersController.findById)
usersRoutes.post('/', payloadValidator.userCreate, usersController.create)
usersRoutes.patch('/:id', payloadValidator.userUpdate, usersController.update)
usersRoutes.delete('/:id', usersController.remove)

export default router
