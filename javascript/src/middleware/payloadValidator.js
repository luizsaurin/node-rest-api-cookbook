/* eslint-disable no-useless-escape */
import joi from 'joi'
import { response400 } from '../util/responseUtils.js'

const userCreate = async (req, res, next) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    age: joi.number().required(),
    email: joi.string().email().required()
  })

  const { error } = await schema.validate(req.body, { abortEarly: false })

  if (error) {
    const message = error.details
      .map((err) => err.message)
      .join('; ')
      .replace(/\"/g, '')
    return response400(res, message)
  }

  next()
}

const userUpdate = (req, res, next) => {
  // TODO
  next()
}

export default { userCreate, userUpdate }
