import User from '../model/User.js'

class UserService {
	async findAll(req) {
		const { filter, sort, select, skip, limit } = req.query

		const query = User.find(JSON.parse(filter || '{}'))
			.sort(JSON.parse(sort || '{"createdAt":-1}'))
			.select(JSON.parse(select || '{}'))
			.skip(parseInt(skip, 10) || 0)
			.limit(parseInt(limit, 10) || 10)

		const users = await query.exec()

		if (!users || users.length === 0) return []

		return { totalResults: users.length, users }
	}

	async findById(req) {
		const user = await User.findById(req.params.id)

		if (!user) {
			return undefined
		}

		return user
	}

	async create(req) {
		const user = await User.create(req.body)
		return user
	}

	async update(req) {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

		if (!user) return undefined

		return user
	}

	async remove(req) {
		const user = await User.findByIdAndDelete(req.params.id)
		return user
	}
}

export default new UserService()
