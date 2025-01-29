import jwt from 'jsonwebtoken'
import userCreatedResponse from '../dto/user/userCreatedResponse.js'
import User from '../model/User.js'

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

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

	const token = signToken(user._id)

	return token
}

export default { signup, login }
