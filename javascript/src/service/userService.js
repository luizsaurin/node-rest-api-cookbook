import userCreatedResponse from '../dto/user/userCreatedResponse.js'
import findAllUsersReponse from '../dto/user/findAllUsersReponse.js'
import findUserByIdResponse from '../dto/user/findUserByIdResponse.js'
import userUpdatedResponse from '../dto/user/userUpdatedResponse.js'
import User from '../model/User.js'
import QueryOptions from '../util/queryOptions.js'

const findAll = async (query) => {
	const options = new QueryOptions(User.find(), query).filter().sort().limitFields().paginate()
	const users = await options.query

	if (!users) return undefined

	const formattedResponse = findAllUsersReponse(users)
	return formattedResponse
}

const findById = async (id) => {
	const user = await User.findById(id)

	if (!user) return undefined

	const formattedResponse = findUserByIdResponse(user)
	return formattedResponse
}

const create = async (payload) => {
	const user = await User.create(payload)
	const formattedResponse = userCreatedResponse(user)
	return userCreatedResponse(formattedResponse)
}

const update = async (id, payload) => {
	const user = await User.findByIdAndUpdate(id, payload, { new: true })

	if (!user) return undefined

	const formattedResponse = userUpdatedResponse(user)
	return formattedResponse
}

const remove = async (id) => {
	const user = await User.findByIdAndDelete(id)
	return user
}

export default { findAll, findById, create, update, remove }
