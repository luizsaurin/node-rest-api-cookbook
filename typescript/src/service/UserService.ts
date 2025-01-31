import { Request } from 'express'
import User from '../model/User'
import { QueryUtils } from '../util/QueryUtils'

class UserService {
	async findAll(req: Request) {
		const resolvedQuery = new QueryUtils(User.find(), req.query).filter().sort().select().skip().limit()

		const users = await resolvedQuery.query

		if (!users || users.length === 0) return []

		return { totalResults: users.length, users }
	}

	async findById(req: Request) {
		const user = await User.findById(req.params.id)

		if (!user) {
			return undefined
		}

		return user
	}

	async create(req: Request) {
		const user = await User.create(req.body)
		return user
	}
}

export default new UserService()
