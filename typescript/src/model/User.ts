import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
	_id: string
	name: string
	email: string
	password: string
	role: 'admin' | 'user'
	createdAt: Date
	updatedAt: Date
}

const schema = new mongoose.Schema<IUser>(
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
			required: true,
			select: false
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
			select: false
		}
	},
	{
		timestamps: true, // Automatically adds `createdAt` and `updatedAt`
		versionKey: false, // Removes `__v` from the response
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password
				delete ret.updatedAt
				delete ret.createdAt
			}
		}
	}
)

// Encrypt password before save
schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

export default mongoose.model<IUser>('User', schema)
