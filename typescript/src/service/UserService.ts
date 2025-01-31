import { Request } from 'express'
import User from '../model/User'

class UserService {
	async findAll(req: Request) {
		const { filter, sort, limit, skip, projection } = req.query

		const query = User.find(JSON.parse((filter as string) || '{}')) // Safe default empty object
			.sort(JSON.parse((sort as string) || '{}')) // Sorting
			.select(JSON.parse((projection as string) || '{}')) // Projections
			.skip(parseInt(skip as string, 10) || 0) // Pagination
			.limit(parseInt(limit as string, 10) || 10)
		return await query.exec()
	}
}

export default new UserService()
