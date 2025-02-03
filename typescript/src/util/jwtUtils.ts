import jwt from 'jsonwebtoken'

const generateAccessToken = (id: string, role: string) =>
	jwt.sign({ id, role }, process.env.JWT_SECRET!, {
		expiresIn: Number(process.env.JWT_EXPIRES_IN!)
	})

export default { generateAccessToken }
