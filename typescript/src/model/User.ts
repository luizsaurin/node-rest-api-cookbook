import mongoose from 'mongoose'

const schema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user'
		}
	},
	{
		timestamps: true
	}
)

const User = mongoose.model('User', schema)

export default User
