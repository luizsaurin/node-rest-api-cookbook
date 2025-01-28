import User from '../model/User.js'
import QueryOptions from '../util/queryOptions.js'

const findAll = async (query) => {
	const options = new QueryOptions(User.find(), query).filter().sort().limitFields().paginate()
	const result = await options.query
	return result
}

const findById = async (id) => {
	const user = await User.findById(id)
	return user
}

const create = async (payload) => {
	const user = await User.create(payload)
	return user
}

const update = async (id, payload) => {
	const user = await User.findByIdAndUpdate(id, payload, { new: true })
	return user
}

const remove = async (id) => {
	const user = await User.findByIdAndDelete(id)
	return user
}

export default { findAll, findById, create, update, remove }
