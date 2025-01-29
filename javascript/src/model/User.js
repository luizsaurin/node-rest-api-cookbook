import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: { type: String, required: true, unique: true },
		active: { type: Boolean, default: true },
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user'
		}
	},
	{
		timestamps: true // Automatically adds `createdAt` and `updatedAt`
	}
)

// Encrypt password before save
schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

// Verify input password
schema.methods.verifyPassword = async function (input, userPassword) {
	return await bcrypt.compare(input, userPassword)
}

// Verify if password was changed after jwt was issued
schema.methods.changedPasswordAfterTokenIssued = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
		return JWTTimestamp < changedTimestamp
	}

	return false
}

const User = mongoose.model('User', schema)

export default User
