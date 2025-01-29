import express from 'express'
import usersController from './controller/userController.js'
import payloadValidator from './middleware/payloadValidator.js'
import authController from './controller/authController.js'
import protect from './middleware/protect.js'

const router = express.Router()

const createRoute = (path) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}

const usersRoutes = createRoute('/api/v1/users')
usersRoutes.get('/', protect, usersController.findAll)
usersRoutes.get('/:id', usersController.findById)
usersRoutes.post('/', payloadValidator.userCreate, usersController.create)
usersRoutes.patch('/:id', payloadValidator.userUpdate, usersController.update)
usersRoutes.delete('/:id', usersController.remove)

const authRoutes = createRoute('/api/v1/auth')
authRoutes.post('/signup', payloadValidator.userSignup, authController.signup)
authRoutes.post('/login', payloadValidator.userLogin, authController.login)

export default router
