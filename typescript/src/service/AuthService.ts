import { Request } from 'express'
import User, { IUser } from '../model/User'
import jwtUtils from '../util/jwtUtils'

class AuthService {
	async signup(req: Request) {
		const user = await User.create(req.body)
		return user
	}

	async login(req: Request) {
		const { email, password } = req.body

		const user = (await User.findOne({ email })) as IUser

		if (!user || !(await user.comparePassword(password))) {
			return undefined
		}

		const token = jwtUtils.generateAccessToken(user.id, user.role)

		return token
	}
}

export default new AuthService()
