import { Request } from 'express'
import User from '../model/User'

class UserService {
	async findAll(req: Request) {
		const { filter, sort, select, skip, limit } = req.query

		const query = User.find(JSON.parse((filter as string) || '{}'))
			.sort(JSON.parse((sort as string) || '{"createdAt":-1}'))
			.select(JSON.parse((select as string) || '{}'))
			.skip(parseInt(skip as string, 10) || 0)
			.limit(parseInt(limit as string, 10) || 10)

		const users = await query.exec()

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
