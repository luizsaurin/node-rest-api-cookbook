import express from 'express'
import usersController from './controller/userController.js'
import payloadValidator from './middleware/payloadValidator.js'
import authController from './controller/authController.js'
import authorization from './middleware/authorization.js'

const router = express.Router()

const createRoute = (path) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}

const usersRoutes = createRoute('/api/v1/users')
usersRoutes.get('/', usersController.findAll)
usersRoutes.get('/:id', usersController.findById)
usersRoutes.post('/', authorization('user', 'admin'), payloadValidator.userCreate, usersController.create)
usersRoutes.patch('/:id', authorization('admin'), payloadValidator.userUpdate, usersController.update)
usersRoutes.delete('/:id', authorization('admin'), usersController.remove)

const authRoutes = createRoute('/api/v1/auth')
authRoutes.post('/signup', payloadValidator.userSignup, authController.signup)
authRoutes.post('/login', payloadValidator.userLogin, authController.login)

export default router
