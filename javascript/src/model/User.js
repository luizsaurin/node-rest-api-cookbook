import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'

const schema = new Schema(
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
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
		},
		passwordChangedAt: {
			type: Date
		}
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password
				delete ret.passwordChangedAt
			}
		}
	}
)

// Encrypt password before save
schema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	this.password = await bcrypt.hash(this.password, 12)

	next()
})

// Encrypt password before update
schema.pre('findOneAndUpdate', async function (next) {
	const update = this.getUpdate()

	if (update.password) {
		update.password = await bcrypt.hash(update.password, 12)
		update.passwordChangedAt = new Date()
	}

	next()
})

// Compare password
schema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password)
}

// Verify if password was changed after jwt was issued
schema.methods.changedPasswordAfterTokenIssued = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(String(this.passwordChangedAt.getTime() / 1000), 10)
		return JWTTimestamp < changedTimestamp
	}

	return false
}

export default model('User', schema)
