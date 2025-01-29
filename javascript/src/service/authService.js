import userCreatedResponse from '../dto/user/userCreatedResponse.js'
import User from '../model/User.js'
import jwtUtils from '../util/jwtUtils.js'

const signup = async (payload) => {
	const user = await User.create(payload)
	const formattedResponse = userCreatedResponse(user)
	return userCreatedResponse(formattedResponse)
}

const login = async (payload) => {
	const { email, password } = payload

	const user = await User.findOne({ email })

	if (!user || !(await user.verifyPassword(password, user.password))) {
		return undefined
	}

	const token = jwtUtils.generateAccessToken(user)

	return token
}

export default { signup, login }
