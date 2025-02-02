import express from 'express'
import UserController from './controller/UserController'
import { findAllUsersQueryValidator } from './validator/findAllUsersQueryValidator'
import { createUserValidator } from './validator/createUserValidator'
import { updateUserValidator } from './validator/updateUserValidator'

const router = express.Router()

const createRoute = (path: string) => {
	const newRouter = express.Router()
	router.use(path, newRouter)
	return newRouter
}

const userRoutes = createRoute('/api/v1/users')
userRoutes.get('/', findAllUsersQueryValidator, (req, res) => UserController.findAll(req, res))
userRoutes.get('/:id', (req, res) => UserController.findById(req, res))
userRoutes.post('/', createUserValidator, (req, res) => UserController.create(req, res))
userRoutes.patch('/:id', updateUserValidator, (req, res) => UserController.update(req, res))

export default router
