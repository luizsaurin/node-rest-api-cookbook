import User from '../model/User.js'
import QueryOptions from '../util/queryOptions.js'

const findAll = async (query) => {
	const options = new QueryOptions(User.find(), query).filter().sort().limitFields().paginate()
	const result = await options.query
	return result
}

const findById = async (id) => await User.findById(id)

const create = async (payload) => await User.create(payload)

const update = async () => {}

const remove = async () => {}

export default { findAll, findById, create, update, remove }
