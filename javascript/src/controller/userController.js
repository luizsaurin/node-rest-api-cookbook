import userService from '../service/userService.js'
import HttpError from '../util/httpError.js'

const findAll = async (req, res) => {
  throw new HttpError('Not Implemented', 501)
}

const findById = async (req, res) => {
  throw new HttpError('Not Implemented', 501)
}

const create = async (req, res) => {
  const newUser = await userService.create(req.body)
  res.status(201).json(newUser)
}

const update = async (req, res) => {
  throw new HttpError('Not Implemented', 501)
}

const remove = async (req, res) => {
  throw new HttpError('Not Implemented', 501)
}

export default { findAll, findById, create, update, remove }
