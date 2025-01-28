import mongoose from 'mongoose'

const schema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		age: Number,
		email: { type: String, unique: true },
		active: { type: Boolean, default: true }
	},
	{
		timestamps: true, // Automatically adds `createdAt` and `updatedAt`
		toJSON: {
			virtuals: true, // Include virtuals like `id`
			versionKey: false, // Remove the `__v` field
			transform: (doc, ret) => {
				ret.id = ret._id // Add the virtual `id` field
				delete ret._id // Remove `_id`
				return ret // Return the transformed object
			}
		},
		toObject: {
			virtuals: true // Include virtuals when converting to plain objects
		}
	}
)

// Define the virtual `id` field
schema.virtual('id').get(function () {
	return this._id.toHexString()
})

// Create and export the model
const User = mongoose.model('User', schema)

export default User
