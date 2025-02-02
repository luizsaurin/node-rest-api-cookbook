import mongoose, { Document } from 'mongoose'

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
		versionKey: false // Removes `__v` from the response
	}
)

export default mongoose.model<IUser>('User', schema)
