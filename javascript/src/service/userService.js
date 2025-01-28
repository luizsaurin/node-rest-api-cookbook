import User from '../model/User.js'
import HttpError from '../util/httpError.js'

const findAll = async () => {
  throw new HttpError('Not Implemented', 501)
}

const findById = async () => {
  throw new HttpError('Not Implemented', 501)
}

const create = async (payload) => {
  const newUser = await User.create(payload)
  return newUser
}

const update = async () => {
  throw new HttpError('Not Implemented', 501)
}

const remove = async () => {
  throw new HttpError('Not Implemented', 501)
}

export default { findAll, findById, create, update, remove }
