import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: { type: String, required: true, unique: true },
		active: { type: Boolean, default: true },
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user'
		},
		password: {
			type: String,
			required: true
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date
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

// Create and export the model
const User = mongoose.model('User', schema)

export default User
