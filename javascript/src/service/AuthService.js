import User from '../model/User.js'
import jwtUtils from '../util/jwtUtils.js'

class AuthService {
	async signup(req) {
		const user = await User.create(req.body)
		return user
	}

	async login(req) {
		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user || !(await user.comparePassword(password))) {
			return undefined
		}

		const token = jwtUtils.generateAccessToken(user._id, user.role)

		return token
	}
}

export default new AuthService()
