import jwt from 'jsonwebtoken'

const generateAccessToken = (user) =>
	jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})

export default { generateAccessToken }
