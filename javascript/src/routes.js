import express from 'express'
import usersController from './controller/userController.js'
import asyncErrorHandler from './util/asyncErrorHandler.js'
import payloadValidator from './middleware/payloadValidator.js'

const router = express.Router()

const createRoute = (path) => {
  const newRouter = express.Router()
  router.use(path, newRouter)
  return newRouter
}
const usersRoutes = createRoute('/api/v1/users')
usersRoutes.get('/', asyncErrorHandler(usersController.findAll))
usersRoutes.get('/:id', asyncErrorHandler(usersController.findById))
usersRoutes.post('/', payloadValidator.userCreate, asyncErrorHandler(usersController.create))
usersRoutes.put('/:id', asyncErrorHandler(usersController.update))
usersRoutes.delete('/:id', asyncErrorHandler(usersController.remove))

export default router
