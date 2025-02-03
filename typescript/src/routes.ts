import express from 'express'
import { authenticate } from './auth/authenticate'
import AuthController from './controller/AuthController'
import UserController from './controller/UserController'
import { loginValidator } from './validator/auth/loginValidator'
import { signupValidator } from './validator/auth/signupValidator'
import { createUserValidator } from './validator/user/createUserValidator'
import { findAllUsersQueryValidator } from './validator/user/findAllUsersQueryValidator'
import { updateUserValidator } from './validator/user/updateUserValidator'

const router = express.Router()

const createRoute = (path: string) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}

const authRoutes = createRoute('/api/v1/auth')
authRoutes.post('/login', loginValidator, (req, res) => AuthController.login(req, res))
authRoutes.post('/signup', signupValidator, (req, res) => AuthController.signup(req, res))

const userRoutes = createRoute('/api/v1/users')
userRoutes.get('/', findAllUsersQueryValidator, (req, res) => UserController.findAll(req, res))
userRoutes.get('/:id', (req, res) => UserController.findById(req, res))
userRoutes.post('/', authenticate('admin', 'user'), createUserValidator, (req, res) => UserController.create(req, res))
userRoutes.patch('/:id', authenticate('admin'), updateUserValidator, (req, res) => UserController.update(req, res))
userRoutes.delete('/:id', authenticate('admin'), (req, res) => UserController.remove(req, res))

export default router
